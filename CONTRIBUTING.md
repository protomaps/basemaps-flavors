# Contributing

The **Basemaps Flavors** repository has a liberal contribution policy - think of it like a repository of user-designed color palettes or code highlighting themes. If your Flavor meets the below requirements, it will be merged.

The skeleton of the MapLibre GL style tileset generation belongs to the [basemaps](https://github.com/protomaps/basemaps/blob/main/CONTRIBUTING.md) repository. For changes to those, refer to the [CONTRIBUTING.md](https://github.com/protomaps/basemaps/blob/main/CONTRIBUTING.md) in that repository.

1. The Flavor must have a distinct string name.

* Must be distinct: `raspberry`, `hologram`, `peachy`. **not:** `light`, `dark`, `green`
* Should not contain third party trademarks: **not:** `flickr`, `coca_cola`
* Spaces in the names must be slugged as underscores: `dusk_rose` **not:** `dusk-rose`

2. The Flavor must be license-compatible.

* Do not make a derivative work or "clone" of a proprietary map appearance like Google, Apple Maps, Mapbox, or Esri.
* Derivative works of [open source but license-incompatible maps](https://github.com/protomaps/basemaps/blob/main/CONTRIBUTING.md#contributions-we-dont-accept) belong in a different repository, such as your own.

3. The Flavor must be visually distinct from an existing Flavor.

* If only a handful of colors are modified from an existing Flavor, or only the fonts are changed, use that Flavor with overrides:

```ts
import dusk_rose from "./dusk_rose"

let flavor = {...dusk_rose,buildings:"red"}
```