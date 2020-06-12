<template>
  <v-container class="character-list">
    <v-expansion-panels flat tile v-if="dataLoaded">
        <CharactersCard
          v-for="character in filteredCharacters"
          :key="character.name"
          :character="character"
          :filmPosters="filmPosters"
          class="character-list_element"
        />
    </v-expansion-panels>
    <v-snackbar
      v-model="isError.flag" color="error" :timeout="0"
    >
      There was a problem connecting to {{isError.msg}}. Make sure you've added all API Keys to env variables
      <v-btn text @click.native="isError.flag = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { characters } from "../data/characters.js";
import CharactersCard from "./CharacterCard";

export default {
  name: "Characters",
  props: {
    filterByPhrase: {
      type: String,
      default: ""
    },
    filterByGender: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  components: {
    CharactersCard
  },
  computed: {
    filteredCharacters() {
      let chars = this.characters
      if(this.filterByGender.length) {
        chars = chars.filter(char => this.filterByGender.includes(char.gender))
      }
      if(this.filterByPhrase) {
        chars = chars.filter(char => char.name.toLowerCase().indexOf(this.filterByPhrase.toLowerCase()) != -1)
      }
      return chars
    }
  },
  data: () => ({
    characters: characters,
    films: [],
    filmPosters: [],
    dataLoaded: false,
    isError: {
      flag: false,
      msg: ''
    }
  }),
  async mounted() {
    this.characters.map(async char => {
      char.species = await this.getSpecies(char.species[0])
      char.films = await this.getCharacterFilms(char.films)
      if(char.films.error || char.species.error) {
        this.isError.flag = true,
        this.isError.msg = 'swapi'
      }
    })
    this.films = await this.$swapi.getAllFilms();
    this.films.map(async film => {
      film.poster = await this.$swapi.getPoster(film.title)
      if(film.poster.error) {
        this.isError.flag = true,
        this.isError.msg = 'OMDB'
        return
      }
      this.filmPosters.push(film.poster)

    })
    this.dataLoaded = true
  },
  methods: {
    async getSpecies(url) {
      const resp = await this.$swapi.req(url);
      return resp;
    },
    async getCharacterFilms(urls) {
      const resp = await this.$swapi.getCharacterFilms(urls)
      return resp
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.character-list {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 20px;
  row-gap: 20px;
}
</style>
