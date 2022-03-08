class MemoryGame {
  constructor({ screen, util }) {
    this.screen = screen
    this.util = util
    this.initialPokemons = [
      { img: './images/pikachu.png', name: 'pikachu' },
      { img: './images/bulbasaur.png', name: 'bulbasaur' },
      { img: './images/meowth.png', name: 'meowth' },
      { img: './images/psyduck.png', name: 'psyduck' },
    ]
    this.defaultIcon = './images/default.png'
    this.hidePokemons = []
    this.selectedPokemons = []
  }

  initialize() {
    this.screen.updateImages(this.initialPokemons)
    this.screen.configBtnPlay(this.play.bind(this))
    this.screen.configBtnCheckSelection(this.verifySelection.bind(this))
    this.screen.configBtnShowAll(this.displayHiddenPokemons.bind(this))
  }

  async shuffle() {
    const copys = this.initialPokemons
    .concat(this.initialPokemons)
    .map(item => {
      return Object.assign({}, item, { id: Math.random() / 0.5 })
    })
    .sort(() => Math.random() - 0.5)

    this.screen.updateImages(copys)
    this.screen.displayLoading()

    const intervalId = this.screen.initCounter()

    await this.util.timeout(3000)
    this.screen.clearCounter(intervalId)
    this.hiddenPokemons(copys)
    this.screen.displayLoading(false)
  }

  hiddenPokemons(pokemons) {
    const occultPokemons = pokemons.map(({ name, id }) => ({
      id,
      name,
      img: this.defaultIcon
    }))
    this.screen.updateImages(occultPokemons)
    this.hidePokemons = occultPokemons
  }

  displayPokemons(pokemonName) {
    const { img } = this.initialPokemons.find(({ name }) => pokemonName === name)
    this.screen.displayPokemons(pokemonName, img)
  }

  verifySelection(id, name) {
    const item = { id, name };
    const selectedPokemons = this.selectedPokemons.length
    switch(selectedPokemons) {
      case 0:
        this.selectedPokemons.push(item)
        break;
      case 1:
        const [ firstOption ] = this.selectedPokemons
        this.selectedPokemons = []
        if(firstOption.name === item.name && firstOption.id !== item.id) {
            this.displayPokemons(item.name)
            this.screen.displayMessage()
            return;
          }

          this.screen.displayMessage(false)
          break;
    }
  }

  displayHiddenPokemons() {
    const hidePokemons = this.hidePokemons
    for(const pokemon of hidePokemons) {
      const { img } = this.initialPokemons.find(item => item.name === pokemon.name)
      pokemon.img = img
    }

    this.screen.updateImages(hidePokemons)
  }

  play() {
    this.shuffle();
  }
}