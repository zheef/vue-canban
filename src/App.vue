<template>
  <div class="container" id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'App'
}
</script>

<style lang="scss">
html body {
  background-color: #E5E5E5;
  font: 15px/18px 'Roboto', Arial, sans-serif;
}

#app {
  padding: 36px 0;
  background: #1D8B77;
  height: 100vh;
}
</style>
