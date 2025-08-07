import { ref } from "vue";

export function usePlayer(step: number) {
  const isPlaying = ref(false);
  const speed = ref(1);
  const currentValue = ref<number>(0);
  const intervalId = ref();

  function onPlay() {
    isPlaying.value = true;
    intervalId.value = setInterval(() => {
      currentValue.value = currentValue.value + speed.value * step;
    }, 1000);
  }

  function onPause() {
    isPlaying.value = false;
    clearInterval(intervalId.value);
  }

  function onStop() {
    isPlaying.value = false;
    clearInterval(intervalId.value);
    currentValue.value = 0;
  }

  function onSpeedChange(newSpeed: number) {
    clearInterval(intervalId.value);
    speed.value = newSpeed;
    onPlay();
  }

  function onSeek(newTime: number) {
    clearInterval(intervalId.value);
    currentValue.value = newTime;
    onPlay();
  }

  function onUnmount() {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  }

  return {
    isPlaying,
    speed,
    currentValue,
    onStop,
    onPlay,
    onPause,
    onSpeedChange,
    onSeek,
    onUnmount,
  };
}
