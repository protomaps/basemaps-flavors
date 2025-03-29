import { For, createSignal, createEffect, onMount, Component } from "solid-js";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import maplibregl from "maplibre-gl";
import { StyleSpecification } from "maplibre-gl";
import { Flavor, layers } from "@protomaps/basemaps";

const FLAVORS = ["bio", "dusk_rose", "iris_bloom","rainforest", "seafoam"];

const nameToFlavor = new Map<string, Flavor>();

import bio from "../flavors/bio.ts";
nameToFlavor.set("bio", bio);

import iris_bloom from "../flavors/iris_bloom.ts";
nameToFlavor.set("iris_bloom", iris_bloom);

import seafoam from "../flavors/seafoam.ts";
nameToFlavor.set("seafoam", seafoam);

// import sol from "../flavors/sol.ts";
// themeToLayers.set("sol", sol);

import dusk_rose from "../flavors/dusk_rose.ts";
nameToFlavor.set("dusk_rose", dusk_rose);

import rainforest from "../flavors/rainforest.ts";
nameToFlavor.set("rainforest", rainforest);

const getStyle = (index: number, showLabels: boolean):StyleSpecification => {
  let flavorName = FLAVORS[index];
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
    layers: layers("protomaps", nameToFlavor.get(flavorName)!, {lang: showLabels ? "en" : undefined}),
  };
};

const FlavorRow: Component<{name: string, flavor: Flavor}> = (props) => {
  return (
    <div class="flavorRow" style={{"background-color":props.flavor.background,"color":props.flavor.city_label}}>
      {props.name}
    </div>
  )
}

function App() {
  let map: maplibregl.Map;

  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [showLabels, setShowLabels] = createSignal(true);

  onMount(async () => {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
      true,
    );

    map = new maplibregl.Map({
      container: "map",
      style: getStyle(selectedIndex(),showLabels()),
    });
  });

  createEffect(() => {
    map.setStyle(getStyle(selectedIndex(),showLabels()));
  });

  const selectFlavor = (i: number) => {
    setSelectedIndex(i);
  }

  const handleShowLabelsChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setShowLabels(target.checked);
  };

  return (
    <div id="container">
      <div class="sidebar">
        <For each={FLAVORS}>{(flavorName,i) => <div onClick={() => selectFlavor(i())}><FlavorRow name={flavorName} flavor={nameToFlavor.get(flavorName)!}/></div>}</For>
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
