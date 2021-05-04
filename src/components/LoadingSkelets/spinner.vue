<template>
  <div class="spinner">
    <pulse-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <grid-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <clip-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <rise-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <beat-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <sync-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <rotate-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <fade-loader
      :loading="loading"
      :color="color"
      :height="height"
      :width="width"
    />
    <pacman-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <square-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <scale-loader
      :loading="loading"
      :color="color"
      :height="height"
      :width="width"
    />
    <skew-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <moon-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <ring-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <bounce-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
    <dot-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import RiseLoader from 'vue-spinner/src/RiseLoader.vue';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import DotLoader from 'vue-spinner/src/DotLoader.vue';
import RingLoader from 'vue-spinner/src/RingLoader.vue';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
import SkewLoader from 'vue-spinner/src/SkewLoader.vue';
import SquareLoader from 'vue-spinner/src/SquareLoader.vue';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import RotateLoader from 'vue-spinner/src/RotateLoader.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue';

export default {
  name: 'Spinner',
  components: {
    PulseLoader,
    GridLoader,
    RiseLoader,
    BounceLoader,
    DotLoader,
    RingLoader,
    MoonLoader,
    SkewLoader,
    SquareLoader,
    ScaleLoader,
    ClipLoader,
    BeatLoader,
    SyncLoader,
    RotateLoader,
    FadeLoader,
    PacmanLoader,
  },
  data() {
    return {
      color: '#464D5F',
    };
  },

};
</script>

<style>
.spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    align-content: center;
    display: grid;
    grid-template-columns: 50px 50px 50px 50px 50px;
    grid-template-rows: 50px 50px 50px;
    grid-gap: 5px;
}
</style>
