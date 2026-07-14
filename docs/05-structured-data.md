# Structured Data (agentic commerce foundation)

Horizon already emits `Product`+`Offer` JSON-LD via the native `structured_data` filter
(`sections/product-information.liquid`, line 1) and `Article` on blog posts. Keep both.

## Additions (ours)

| Snippet | Emits | Rendered from |
|---|---|---|
| `snippets/konbini-jsonld-organization.liquid` | `Organization` + `WebSite` w/ `SearchAction`, `sameAs` socials from settings | `layout/theme.liquid` head, homepage-guarded (`request.page_type == 'index'`) |
| `snippets/konbini-jsonld-breadcrumbs.liquid` | `BreadcrumbList` | PDP + collection (paired with visible `_konbini-breadcrumbs` nav) |
| `snippets/konbini-jsonld-faq.liquid` | `FAQPage` from `konbini.faq` | PDP FAQ block, only when data present |
| `snippets/konbini-jsonld-product-extras.liquid` | `countryOfOrigin`, `alternateName`, `inLanguage` as a second graph node | PDP (fenced edit or `_konbini-jsonld` static block) |

Note: the `structured_data` filter output cannot be extended in place — extras go in a
separate node referencing the product `@id`; decide exact wiring in Phase 5.

## Platform-level agentic commerce

Shopify Catalog / UCP / agentic checkout operate at platform level. The theme's
responsibilities: clean JSON-LD, semantic HTML, rich metafields (they feed the Catalog),
and keeping `blocks/accelerated-checkout.liquid` functional (verified in Phase 6).

## Validation

Google Rich Results Test + schema.org validator on preview URLs — part of every
phase checklist that touches JSON-LD (4, 5, 8).
