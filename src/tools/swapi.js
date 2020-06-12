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
          .catch(e => {
            throw new Error(e)
          })
          .then(resp => resolve(resp.Search))
      })
      if(!resp) throw new Error('Request Failed')
      return resp[0]
    } catch (error) {
      return { error: true, msg: error.message }
    }
  },
  async getCharacterFilms(urls) {
    try {
      const prom = await Promise.all(
        urls.map(url =>
          fetch(url)
            .then(res => res.json())
            .catch(e => {
              throw new Error(e)
            })
            .then(res => res.title)
        )
      )
      return prom.filter(title => !!title)
    } catch (error) {
      return {error: true, msg: error.message}
    }
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