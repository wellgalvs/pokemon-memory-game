// Métodos estáticos não podem acessar o "this"
// por isso, não vamos colocar o util no construtor
const util = Util

const ID_CONTENT = "contents"
const ID_BTN_PLAY = "play"
const ID_MESSAGE = "message"
const ID_LOADING = "loading"
const ID_COUNTER = "counter"
const INVISIBLE_CLASS = "invisible"
const ID_BTN_SHOW_ALL = 'showAll'
const MESSAGES = {
  success: {
    text: 'Combinação correta!',
    class: 'alert-success'
  },
  error: {
    text: 'Combinação incorreta!',
    class: 'alert-danger'
  }
}

class Screen {
  static getHtmlCode(item) {
    return `
    <div class="col-md-3">
      <div class="card" style="width: 50%" onclick="window.verifySelection('${item.id}', '${item.name}')">
        <img src="${item.img}" name="${item.name}" class="card-img-top" alt="${item.name}" />
      </div>
      <br />
    </div>
    `
  }

  static configBtnCheckSelection(functionOnClick) {
    window.verifySelection = functionOnClick
  }

  static changeHtmlContent(htmlCode) {
    const content = document.getElementById(ID_CONTENT)
    content.innerHTML = htmlCode
  }

  static createStringHtmlByImage(itens) {
    return itens.map(Screen.getHtmlCode).join('')
  }

  static updateImages(itens) {
    const htmlCode = Screen.createStringHtmlByImage(itens)
    Screen.changeHtmlContent(htmlCode)
  }

  static configBtnPlay(functionOnClick) {
    const btnPlay = document.getElementById(ID_BTN_PLAY);
    btnPlay.onclick = functionOnClick
  }

  static displayPokemons(pokemonName, img) {
    const elementsHtml = document.getElementsByName(pokemonName)
    elementsHtml.forEach(item => (item.src = img))
  }

  static async displayMessage(success = true) {
    const element = document.getElementById(ID_MESSAGE)
    if(success) {
      element.classList.remove(MESSAGES.error.class)
      element.classList.add(MESSAGES.success.class)
      element.innerText = MESSAGES.success.text
    } else {
      element.classList.remove(MESSAGES.success.class)
      element.classList.add(MESSAGES.error.class)
      element.innerText = MESSAGES.error.text
    }
    element.classList.remove(INVISIBLE_CLASS)
    await util.timeout(1000)
    element.classList.add(INVISIBLE_CLASS)
  }

  static displayLoading(show = true) {
    const loading = document.getElementById(ID_LOADING)
    if(show) {
      loading.classList.remove(INVISIBLE_CLASS)
      return;
    }

    loading.classList.add(INVISIBLE_CLASS)
  }

  static initCounter() {
    let countAt = 3
    const elementCounter = document.getElementById(ID_COUNTER)
    const textIdentifier = "$$counter"
    const textDefault = `Começando em ${textIdentifier} segundos...`
    const updateText = () =>
    (elementCounter.innerHTML = textDefault.replace(textIdentifier, countAt--))

    updateText()
    const intervalId = setInterval(updateText, 1000)
    return intervalId;
  }

  static clearCounter(intervalId) {
    clearInterval(intervalId)
    document.getElementById(ID_COUNTER).innerHTML = ""
  }

  static configBtnShowAll(functionOnClick) {
    const btnShowAll = document.getElementById(ID_BTN_SHOW_ALL)
    btnShowAll.onclick = functionOnClick
  }
}