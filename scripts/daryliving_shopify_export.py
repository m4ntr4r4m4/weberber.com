"""Export products from daryliving.com to a Shopify-ready CSV."""

from __future__ import annotations

import argparse
import csv
import html
import re
from typing import Iterable

import requests


DEFAULT_BASE_URL = "https://daryliving.com"
DEFAULT_OUTPUT = "daryliving_shopify_products.csv"
DEFAULT_TEMPLATE = "product_template.csv"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


FALLBACK_HEADER = [
    "Title",
    "URL handle",
    "Description",
    "Vendor",
    "Product category",
    "Type",
    "Tags",
    "Published on online store",
    "Status",
    "SKU",
    "Barcode",
    "Option1 name",
    "Option1 value",
    "Option1 Linked To",
    "Option2 name",
    "Option2 value",
    "Option2 Linked To",
    "Option3 name",
    "Option3 value",
    "Option3 Linked To",
    "Price",
    "Compare-at price",
    "Cost per item",
    "Charge tax",
    "Tax code",
    "Unit price total measure",
    "Unit price total measure unit",
    "Unit price base measure",
    "Unit price base measure unit",
    "Inventory tracker",
    "Inventory quantity",
    "Continue selling when out of stock",
    "Weight value (grams)",
    "Weight unit for display",
    "Requires shipping",
    "Fulfillment service",
    "Product image URL",
    "Image position",
    "Image alt text",
    "Variant image URL",
    "Gift card",
    "SEO title",
    "SEO description",
    "Color (product.metafields.shopify.color-pattern)",
    "Google Shopping / Google product category",
    "Google Shopping / Gender",
    "Google Shopping / Age group",
    "Google Shopping / Manufacturer part number (MPN)",
    "Google Shopping / Ad group name",
    "Google Shopping / Ads labels",
    "Google Shopping / Condition",
    "Google Shopping / Custom product",
    "Google Shopping / Custom label 0",
    "Google Shopping / Custom label 1",
    "Google Shopping / Custom label 2",
    "Google Shopping / Custom label 3",
    "Google Shopping / Custom label 4",
]


def load_header(template_path: str) -> list[str]:
    try:
        with open(template_path, newline="", encoding="utf-8") as handle:
            reader = csv.reader(handle)
            return next(reader)
    except (FileNotFoundError, StopIteration):
        return FALLBACK_HEADER


def fetch_products(base_url: str) -> list[dict]:
    products: list[dict] = []
    page = 1
    while True:
        url = f"{base_url}/products.json?limit=250&page={page}"
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        batch = response.json().get("products", [])
        if not batch:
            break
        products.extend(batch)
        page += 1
    return products


def bool_to_shopify(value: bool | None) -> str:
    if value is None:
        return ""
    return "TRUE" if value else "FALSE"


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    text = re.sub(r"<[^>]+>", " ", value)
    text = html.unescape(text)
    return " ".join(text.split())


def base_row(header: list[str]) -> dict[str, str]:
    return {key: "" for key in header}


def value_or_blank(value: object) -> str:
    if value is None:
        return ""
    return str(value)


def build_rows(product: dict, header: list[str]) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    options = product.get("options", [])
    option_names = [opt.get("name", "") for opt in options]
    while len(option_names) < 3:
        option_names.append("")

    images = product.get("images", [])
    first_image = images[0] if images else None
    seo_description = clean_text(product.get("body_html"))
    if len(seo_description) > 320:
        seo_description = seo_description[:317].rstrip() + "..."

    variants = product.get("variants", [])
    for index, variant in enumerate(variants):
        row = base_row(header)
        row["URL handle"] = product.get("handle", "")
        row["SKU"] = variant.get("sku", "") or ""
        row["Price"] = variant.get("price", "") or ""
        row["Compare-at price"] = variant.get("compare_at_price", "") or ""
        row["Charge tax"] = bool_to_shopify(variant.get("taxable"))
        row["Requires shipping"] = bool_to_shopify(variant.get("requires_shipping"))
        row["Inventory tracker"] = "shopify"
        row["Continue selling when out of stock"] = "DENY"
        grams = variant.get("grams")
        row["Weight value (grams)"] = value_or_blank(grams)
        row["Weight unit for display"] = "g" if grams else ""
        row["Fulfillment service"] = "manual"
        row["Option1 value"] = variant.get("option1", "") or ""
        row["Option2 value"] = variant.get("option2", "") or ""
        row["Option3 value"] = variant.get("option3", "") or ""

        featured_image = variant.get("featured_image")
        if isinstance(featured_image, dict):
            row["Variant image URL"] = featured_image.get("src", "")

        if index == 0:
            row["Title"] = product.get("title", "")
            row["Description"] = product.get("body_html", "") or ""
            row["Vendor"] = product.get("vendor", "") or ""
            row["Type"] = product.get("product_type", "") or ""
            row["Tags"] = product.get("tags", "") or ""
            row["Published on online store"] = bool_to_shopify(
                bool(product.get("published_at"))
            )
            row["Status"] = "Active" if product.get("published_at") else "Draft"
            row["Option1 name"] = option_names[0]
            row["Option2 name"] = option_names[1]
            row["Option3 name"] = option_names[2]
            row["Gift card"] = "FALSE"
            row["SEO title"] = product.get("title", "")
            row["SEO description"] = seo_description
            if first_image:
                row["Product image URL"] = first_image.get("src", "")
                row["Image position"] = value_or_blank(first_image.get("position"))
                row["Image alt text"] = product.get("title", "")

        rows.append(row)

    for image in images[1:]:
        row = base_row(header)
        row["URL handle"] = product.get("handle", "")
        row["Product image URL"] = image.get("src", "")
        row["Image position"] = value_or_blank(image.get("position"))
        row["Image alt text"] = product.get("title", "")
        rows.append(row)

    return rows


def write_csv(rows: Iterable[dict[str, str]], header: list[str], output: str) -> None:
    with open(output, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=header)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Export daryliving.com products to a Shopify-ready CSV."
    )
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    parser.add_argument("--output", default=DEFAULT_OUTPUT)
    parser.add_argument("--template", default=DEFAULT_TEMPLATE)
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    header = load_header(args.template)
    products = fetch_products(args.base_url)
    if args.limit:
        products = products[: args.limit]
    rows: list[dict[str, str]] = []
    for product in products:
        rows.extend(build_rows(product, header))
    write_csv(rows, header, args.output)
    print(f"Wrote {len(rows)} rows to {args.output}")


if __name__ == "__main__":
    main()
