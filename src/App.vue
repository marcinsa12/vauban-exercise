<template>
  <v-app id="app">
    <v-app-bar app dark >
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        v-model="filterByPhrase"
        class="mr-2"
      ></v-text-field>
      <v-select
        prepend-inner-icon="mdi-gender-transgender"
        :items="genders"
        v-model="filterByGender"
        flat
        solo-inverted
        hide-details
        multiple
        label="Filter By Gender"
      ></v-select>
    </v-app-bar>
    <Characters :filterByPhrase="filterByPhrase" :filterByGender="filterByGender" />
  </v-app>
</template>

<script>
import Characters from './components/Characters.vue'
import { characters } from './data/characters'

export default {
  name: 'app',
  data() {
    return {
      filterByPhrase: '',
      filterByGender: [],
      genders: []
    }
  },
  components: {
    Characters
  },
  methods: {
    getValidGenders() {
      return [...new Set(characters.map(c => c.gender ))]
    }
  },
  mounted() {
    this.genders = this.getValidGenders()
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
