<template>

  <div v-show="isVisible" class="loading-spinner-wrapper">
    <div class="loading-spinner"></div>
  </div>

</template>


<script>

  module.exports = {
    props: {
      delay: {
        type: Number,
        default: 2500,
      },
    },
    data: () => ({
      timeoutId: undefined,
      isVisible: false,
    }),
    methods: {
      show() {
        this.isVisible = true;
      },
    },
    mounted() {
      this.isVisible = false;
      this.timeoutId = window.setTimeout(this.show, this.delay);
    },
    destroyed() {
      window.clearTimeout(this.timeoutId);
    },
  };

</script>


<style lang="stylus" scoped>

  .loading-spinner-wrapper
    width: 100%
    height: 100%
    position: relative

  .loading-spinner
    width: 125px
    height: 125px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: url('loading-spinner.gif') no-repeat center
    background-size: contain

</style>
