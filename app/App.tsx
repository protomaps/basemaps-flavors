import { For, createSignal, createEffect, createResource, onMount, Component, Show } from "solid-js";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import maplibregl from "maplibre-gl";
import { StyleSpecification } from "maplibre-gl";
import { Flavor, layers } from "@protomaps/basemaps";

const getStyle = (flavor: Flavor | undefined, showLabels: boolean): StyleSpecification => {
  return {
    version: 8,
    glyphs:
      "https://bdon.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sources: {
      protomaps: {
        type: "vector",
        url: "https://api.protomaps.com/tiles/v4.json?key=1003762824b9687f",
      },
    },
    layers: flavor ? layers("protomaps", flavor, { lang: showLabels ? "en" : undefined }) : []
  };
};

const FlavorRow: Component<{ name: string }> = (props) => {
  return (
    <div class="flavorRow">
      {props.name}
    </div>
  )
}

function App() {
  let map: maplibregl.Map;

  const [selectedFlavorName, setSelectedFlavorName] = createSignal();
  const [showLabels, setShowLabels] = createSignal(true);

  onMount(async () => {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
      true,
    );

    map = new maplibregl.Map({
      container: "map",
      style: getStyle(undefined, showLabels()),
    });
  });

  const [flavorList] = createResource(async () => {
    const resp = await fetch("/flavors.json");
    return await resp.json();
  })

  const [flavorJson] = createResource(selectedFlavorName, async () => {
    const resp = await fetch(`/flavors/${selectedFlavorName()}.json`);
    return await resp.json();
  });

  createEffect(() => {
    map.setStyle(getStyle(flavorJson(), showLabels()));
  });

  const handleShowLabelsChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setShowLabels(target.checked);
  };

  return (
    <div id="container">
      <div class="sidebar">
        <Show when={flavorList()}>
          <For each={flavorList()}>{(flavorName) => <div onClick={() => setSelectedFlavorName(flavorName)}><FlavorRow name={flavorName}/></div>}</For>
        </Show>
        <input
          id="showLabels"
          type="checkbox"
          checked={showLabels()}
          onChange={handleShowLabelsChange}
        />
        <label for="showLabels">Show labels</label>
      </div>
      <div id="map"></div>
    </div>
  );
}

export default App;
