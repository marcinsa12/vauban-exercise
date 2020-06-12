const omdbKey = process.env.VUE_APP_OMDB_KEY
const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}`
const swapiUrl = `https://swapi.dev/api`

export const swapi = {
  async req(url) {
    try {
      const resp = await new Promise((resolve)=>{
        fetch(url)
          .then(resp => resp.json())
          .then(resp => resolve(resp))
      })
      return resp
    } catch (error) {
      return { error: true, msg: error }
    }
  },
  async reqAll(urls) {
    const prom = await Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => res.json())
          .then(res => res)
      )
    )
    return prom
  },
  async getPoster(movie) {
    try {
      const resp = await new Promise((resolve)=>{
        fetch(`${omdbUrl}&s=${movie}`)
          .then(resp => resp.json())
          .then(resp => resolve(resp.Search[0]))
      })
      return resp
    } catch (error) {
      return { error: true, msg: error }
    }
  },
  async getCharacterFilms(urls) {
    const prom = await Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => res.json())
          .then(res => res.title)
      )
    )
    return prom.filter(title => !!title)
  },
  async getAllFilms() {
    const prom = await new Promise((resolve)=>{
      fetch(`${swapiUrl}/films/`)
        .then(resp => resp.json())
        .then(resp => resolve(resp.results))
    })
    return prom
  }
}