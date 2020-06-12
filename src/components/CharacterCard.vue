<template>
  <v-expansion-panel>
    <v-card elevation="10" width="80%" max-width="850px" class="mx-auto">
      <v-expansion-panel-header hide-actions class="pa-0">
          <v-toolbar dark>
            <v-card-title
              :class="`${$vuetify.breakpoint.xs ? 'overline' : 'title' } white--text d-flex`"
              style="width:100%"
            >
              <v-icon class="mr-4">{{getSpeciesIcon()}}</v-icon>
              <span class="mr-4" style="word-break: normal; max-width: 50%">{{character.name}}</span>
              <v-icon class="ml-auto">mdi-gender-{{getGenderIcon()}}</v-icon>
            </v-card-title>
          </v-toolbar>
      </v-expansion-panel-header>
      <v-expansion-panel-content flat>
        <v-card-text>
          <v-list>
            <v-list-item>Born: {{character.birth_year}}</v-list-item>
            <v-list-item>Weigt: {{character.mass}}</v-list-item>
            <v-list-item>Hair Color: {{character.hair_color}}</v-list-item>
            <v-list-item>Height: {{character.height}}</v-list-item>
          </v-list>
        </v-card-text>
        <v-card flat tile>
          <v-toolbar flat color="grey" collapse>Staring At:</v-toolbar>
          <v-card-text class="film-posters">
            <v-img
              v-for="filmPoster in filmPosters"
              :key="filmPoster"
              max-width="175px"
              :src="filmPoster"
              :alt="filmPoster"
              class="film-posters_poster"
            ></v-img>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-card>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "CharacterCard",
  methods: {
    getSpeciesIcon() {
      let icon;
      if (!this.character.species || !this.character.species.name) return;
      icon = this.character.species.name != "Human" ? "mdi-robot" : "mdi-human";
      return icon;
    },
    getGenderIcon() {
      return (
        (this.character.gender != "n/a" && this.character.gender) ||
        "transgender"
      );
    }
  },
  computed: {
    filmPosters() {
      let posters = []
      this.character.films.map(film => {
        const { poster } = this.films.find(f=> f.title == film) || {}
        if(poster) posters.push(poster.Poster)
      })
      return posters
    }
  },
  props: {
    character: {
      type: Object,
      required: true
    },
    films: {
      type: Array,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.film-posters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  @media (min-width: 668px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    &_poster {
      &:hover {
        transition: 200ms;
        transform: scale(2);
        z-index: 5;
      }
    }
  }
  @media (max-width: 667px) {
    &_poster {
      &:active {
        transition: 200ms;
        z-index: 5;
        transform: scale(4);
      }
      &:nth-child(3n + 1):active {
        transform: scale(4) translateX(50%);
      }
      &:nth-child(3n + 3):active {
        transform: scale(4) translateX(-50%);
      }
    }
  }
}
</style>