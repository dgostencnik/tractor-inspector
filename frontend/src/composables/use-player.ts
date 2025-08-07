import { ref, watch } from "vue";

type PlayerOptions = {
  minValue?: number;
  maxValue?: number;
  speed?: number;
  isPlaying?: boolean;
  isEnabled?: boolean;
  step: number;
};
const defaultPlayerOptions: PlayerOptions = {
  minValue: 0,
  maxValue: 0,
  speed: 1,
  step: 1000,
  isPlaying: false,
  isEnabled: false,
};

export function usePlayer(options: PlayerOptions) {
  const isPlaying = ref(options.isPlaying ?? defaultPlayerOptions.isPlaying!);
  const speed = ref(options.speed ?? defaultPlayerOptions.speed!);
  const currentValue = ref<number>(0);
  const intervalId = ref();
  const minValue = ref(options.minValue ?? defaultPlayerOptions.minValue!);
  const maxValue = ref(options.maxValue ?? defaultPlayerOptions.maxValue!);
  const isEnabled = ref(options.isEnabled ?? defaultPlayerOptions.isEnabled!);
  const step = ref(options.step ?? defaultPlayerOptions.step!);

  function onPlay() {
    if (!isEnabled.value) {
      return;
    }
    isPlaying.value = true;
    intervalId.value = setInterval(() => {
      let nextValue = currentValue.value + speed.value! * step.value;
      if (nextValue >= maxValue.value!) {
        nextValue = minValue.value!;
      }
      currentValue.value = nextValue;
    }, 1000);
  }

  function onPause() {
    if (!isEnabled.value) {
      return;
    }
    isPlaying.value = false;
    clearInterval(intervalId.value);
  }

  function onStop() {
    if (!isEnabled.value) {
      return;
    }
    isPlaying.value = false;
    clearInterval(intervalId.value);
    currentValue.value = 0;
  }

  function onSpeedChange(newSpeed: number) {
    if (!isEnabled.value) {
      return;
    }
    clearInterval(intervalId.value);
    speed.value = newSpeed;
    onPlay();
  }

  function onSeek(newTime: number) {
    if (!isEnabled.value) {
      return;
    }
    if (isPlaying.value) {
      clearInterval(intervalId.value);
    }
    currentValue.value = newTime;
    if (isPlaying.value) {
      onPlay();
    }
  }

  function cleanUp() {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  }

  function initialize(options: { speed: number; minValue: number; maxValue: number }) {
    cleanUp();
    speed.value = options.speed;
    minValue.value = options.minValue;
    maxValue.value = options.maxValue;
    isPlaying.value = false;
    currentValue.value = options.minValue;
    isEnabled.value = true;
  }

  watch(() => isEnabled.value, (newValue) => {
    if (!newValue) {
      cleanUp();
    }
  });

  return {
    isPlaying,
    speed,
    currentValue,
    onStop,
    onPlay,
    onPause,
    onSpeedChange,
    onSeek,
    cleanUp,
    minValue,
    maxValue,
    initialize,
    isEnabled,
  };
}
