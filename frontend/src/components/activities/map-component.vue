<script setup lang="ts">
import { fromLonLat } from "ol/proj";
import { inject, ref } from "vue";

defineProps<{
  url?: string;
}>();
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

const osmLayer = ref(null);
const vectorSourceRef = ref(null);
</script>

<template>
  <ol-map style=" min-height: 400px;">
    <ol-view
      :center="fromLonLat([20, 46])"
      :zoom="8"
    />
    <ol-tile-layer ref="osmLayer" title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer
      ref="vectorSourceRef"
    >
      <ol-source-vector :url="url" :format="geoJson">
        <ol-source-vector :url="url" :format="geoJson" />

        <ol-style>
          <ol-style-stroke color="red" :width="3" />
        </ol-style>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>
