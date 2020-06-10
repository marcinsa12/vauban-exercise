<template>
  <div id="app">
    <Characters />
  </div>
</template>

<script>
import Characters from './components/Characters.vue'

export default {
  name: 'app',
  data() {
    return {
      people: null
    }
  },
  components: {
    Characters
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
