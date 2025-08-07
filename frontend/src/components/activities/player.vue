<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const props = defineProps<{
  isPlaying: boolean;
  speed: number;
  minTime: number;
  maxTime: number;
  currentTime?: number;
  isEnabled: boolean;
  isLoading?: boolean;
  titleFormatter: (val: string | number) => string;
}>();

const emit = defineEmits<{
  onPlay: [];
  onPause: [];
  onStop: [];
  onSpeedChange: [speed: number];
  onSeek: [time: number];
}>();

const speeds = [1, 2, 4, 8];

function togglePlay() {
  if (props.isPlaying) {
    emit("onPause");
  }
  else {
    emit("onPlay");
  }
}

function handleStop() {
  emit("onStop");
}

function handleSpeedChange(speed: number) {
  emit("onSpeedChange", speed);
}

function handleSeek(event: Event) {
  const target = event.target as HTMLInputElement;
  const newTime = Number.parseFloat(target.value);
  emit("onSeek", newTime);
}
</script>

<template>
  <div class="flex flex-col bg-base-200">
    <div class="p-4">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <div class="mb-4">
            <div class="text-center mb-2">
              <span class="text-md font-semibold">
                {{ currentTime ? titleFormatter(currentTime) : '' }}
              </span>
            </div>
            <input
              :key="`${minTime}-${maxTime}`"
              :value="currentTime ?? minTime"
              type="range"
              :min="minTime"
              :max="maxTime"
              :disabled="!isEnabled || isLoading"
              class="range range-primary range-sm w-full"
              @input="handleSeek"
            >
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                class="btn btn-primary btn-sm min-w-22"
                :disabled="!isEnabled || isLoading"
                @click="togglePlay"
              >
                <span
                  v-if="isLoading"
                  class="loading loading-spinner loading-xs"
                />

                <Icon
                  v-else-if="!isPlaying"
                  icon="tabler:player-play-filled"
                  class="w-4 h-4"
                />

                <Icon
                  v-else-if="isPlaying"
                  icon="tabler:player-pause-filled"
                  class="w-4 h-4"
                />
                {{ isLoading ? '' : (isPlaying ? 'Pause' : 'Start') }}
              </button>

              <button
                class="btn btn-ghost btn-sm min-w-22"
                :disabled="!isEnabled || isLoading"
                @click="handleStop"
              >
                <Icon
                  icon="tabler:player-stop-filled"
                  class="w-4 h-4"
                />
                Stop
              </button>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm text-base-content/70">Speed:</span>
              <div class="flex gap-1">
                <button
                  v-for="spd in speeds"
                  :key="spd"
                  :disabled="!isEnabled || isLoading"
                  class="btn btn-xs"
                  :class="{
                    'btn-primary': speed === spd,
                    'btn-ghost': speed !== spd,
                  }"
                  @click="handleSpeedChange(spd)"
                >
                  {{ spd }}x
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
