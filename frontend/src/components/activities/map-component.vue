<script setup lang="ts">
import type { Feature } from "ol";
import type { Coordinate } from "ol/coordinate";

import { fromLonLat } from "ol/proj";
import { Stroke, Style } from "ol/style";
import { inject, ref } from "vue";

const props = defineProps<{
  overlayLayerUrl?: string;
  features?: { serialNumber: string; color: string; coordinate: [number, number] }[];
  center: Coordinate;
}>();

const zoom = ref(9);
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

const osmLayer = ref(null);
const vectorSourceRef = ref(null);

function styleFunction(feature: Feature) {
  const currentColor = props.features?.find(f => f.serialNumber === feature.getProperties().serialNumber);
  return new Style({
    stroke: new Stroke({ color: currentColor?.color, width: 2 }),
  });
}
</script>

<template>
  <ol-map style="min-height: 400px;">
    <ol-view
      :center="center"
      :zoom="zoom"
    />
    <ol-tile-layer ref="osmLayer" title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer
      ref="vectorSourceRef"
      :style="styleFunction"
    >
      <ol-source-vector
        :url="overlayLayerUrl"
        :format="geoJson"
      />
    </ol-vector-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="feature in features" :key="feature.serialNumber">
          <ol-geom-point :coordinates="fromLonLat(feature.coordinate)" />
          <ol-style>
            <ol-style-circle :radius="5">
              <ol-style-fill color="#ffffff" />
              <ol-style-stroke
                :color="feature.color"
                :width="1"
              />
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>
