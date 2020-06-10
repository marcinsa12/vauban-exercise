<template>
  <div class="character-list">
    
  </div>
</template>

<script>
import { characters } from '../data/characters.js'

export default {
  name: 'Characters',
  props: {
    msg: String
  },
  data: () => ({
    characters: characters
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
