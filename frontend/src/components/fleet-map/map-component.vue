<script setup lang="ts">
import { fromLonLat } from "ol/proj";
import { Layers, Map, Sources } from "vue3-openlayers";
</script>

<template>
  <Map.OlMap style=" min-height: 400px;">
    <Map.OlView
      :center="fromLonLat([15, 46])"
      :zoom="8"
    />
    <Layers.OlTileLayer>
      <Sources.OlSourceOsm />
    </Layers.OlTileLayer>
  </Map.OlMap>
</template>
