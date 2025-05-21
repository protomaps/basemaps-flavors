# 

The skeleton of the MapLibre GL style and the tileset generation belongs to the [basemaps]() repository. For changes to those, refer to the [CONTRIBUTING.md]() guide in that repository.

The Basemaps Flavors repository is designed to have a low barrier to contributions.

Adding a Flavor will be accepted as long as it meets these requirements:

1. The Flavor must have a distinct string name.

* Must be distinct, examples: "Raspberry", "Hologram", "Peachy". not: "Light", "Dark", "Green"
* Should not contain third party trademarks
* Spaces in the names must be slugged as underscores

2. The Flavor must be license-compatible.

* Do not make a derivative work or "clone" of a proprietary map like Google, Apple Maps, Mapbox, or Esri.

3. The Flavor must be visually distinct from an existing Flavor.

4. Your PR is formatted `npm run check` and the test suite passes
