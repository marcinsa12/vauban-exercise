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
          <v-toolbar flat color="grey" collapse>Starred At:</v-toolbar>
          <v-card-text class="film-posters">
            <v-img
              v-for="(filmPoster, index) in postersToDisplay"
              :key="filmPoster.Title || index"
              :src="filmPoster.Poster"
              :alt="filmPoster.Title || filmPoster"
              max-width="175px"
              class="film-posters_poster"
            >
              <template v-if="!filmPoster.Poster" slot:placeholder>
                <span>{{filmPoster.Title || filmPoster}}</span>
              </template>
            </v-img>
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
    postersToDisplay() {
      if(this.filmPosters.length) return this.filmPosters.filter(poster => this.character.films.some( film => poster.Title.includes(film)))
      return this.character.films
    }
  },
  props: {
    character: {
      type: Object,
      required: true
    },
    filmPosters: {
      type: Array
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