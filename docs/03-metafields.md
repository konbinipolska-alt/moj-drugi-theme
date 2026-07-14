# Metafields Architecture

Namespace: **`konbini`** (definitions created in Admin; enable "Storefronts access"
so the Storefront API and agentic surfaces can read them).

| Definition | Key | Type | Consumers |
|---|---|---|---|
| Country of origin | `konbini.origin_country` | single_line_text (allowed values JP/KR/CN/TH/VN/PL/…) | origin badge, JSON-LD `countryOfOrigin`, future filters |
| Original name | `konbini.name_original` | single_line_text (出汁, 고추장…) | PDP sub-line (`lang` attr!), JSON-LD `alternateName` |
| Allergens | `konbini.allergens` | list.single_line_text (EU-14 canonical slugs) | allergen block |
| Ingredients | `konbini.ingredients` | multi_line_text | PDP accordion (food-legal) |
| Usage / how-to | `konbini.usage` | rich_text | usage-pairing block |
| Pairings | `konbini.pairings` | list.product_reference | cross-sell block (CRO) |
| Spice level | `konbini.spice_level` | number_integer 0–5 | badge, future filter |
| FAQ | `konbini.faq` | list.metaobject_reference → `konbini_faq` (question, answer) | FAQ block + FAQPage JSON-LD |

## Read pattern

One snippet: `snippets/konbini-product-meta.liquid` (params: `product`, `field`).
Every consumer blank-checks and renders nothing when data is missing — the theme must
ship before data entry. Cheap tag fallbacks where possible (e.g. origin from tags
`japonia|korea|…`).

## Data workstream (separate from theme code)

- Bulk tag→metafield backfill via Admin GraphQL (`metafieldsSet`).
- Assign Standard Product Taxonomy categories + `productType` during enrichment
  (improves Shopify Catalog / agent discovery for free).
- Collection filters launch on tags/price/availability; metafield filters are enabled
  post-backfill (admin Search & Discovery config).
