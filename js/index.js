const saveButton = document.querySelector('#save')
const clearButton = document.querySelector('#clear')
const formTitle = document.querySelector('#title')
const formLanguage = document.querySelector('#skill')
const formCategory = document.querySelector('#category')
const formDescription = document.querySelector('#description')
const formVideo = document.querySelector('#video')
const form = document.querySelector('#form')
let entries = new Array()

form.addEventListener('submit', event => {
  event = event || window.event
  event.preventDefault()
})

class Cards {
  constructor(title, language, category, description, video) {
    this.title = title
    this.language = language
    this.category = category
    this.description = description
    this.video = video
  }

  RenderCard() {
    const cardsContainer = document.querySelector('.cards-container')
    cardsContainer.innerHTML = /*html*/ `
        <div class="card">
        <h2 class="cardTitle">Título</h2>
            <h4 class="cardSkill">Linguagem/Skill:</h4>
            <h4 class="cardCategory">Categoria:</h4>
            <p class="cardContent">
                Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan
                disputationi eu sit. Vide electram sadipscing et per. Per aumento de
                cachacis, eu reclamis. Paisis, filhis, espiritis santis. Cevadis im
                ampola pa arma uma pindureta.
            </p>
          <div class="card-buttons">
            <button class="cardDelete">
              <img src="/assets/images/delete-card.png" alt="deletar a dica" />
            </button>
            <button class="cardEdit">
             <img src="/assets/images/edit-card.png" alt="editar a dica" />
            </button>
            <button class="cardVideo">
              <img
                src="/assets/images/video-card.png"
                alt="video sobre a dica"
              />
            </button>
          </div>
        </div>`
  }
}

function getFormInput() {
  const title = formTitle.value
  const language = formLanguage.value
  const category = formCategory.value
  const description = formDescription.value
  const video = formVideo.value
  return { title, language, category, description, video }
}

function isUrlValid(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
    url
  )
}

function save() {}

function update() {}

function validateInputs(title, language, category, description, video) {
  let validation = true

  if (title.length < 8 || title.length > 64) {
    validation = false
  } else if (language.length < 4 || language.length > 16) {
    validation = false
  } else if (category === 'none') {
    validation = false
  } else if (description.length < 32 || description.length > 512) {
    validation = false
  } else if (!isUrlValid(video)) {
    video = ''
  }
  return validation
}

saveButton.addEventListener('click', () => {
  const { title, language, category, description, video } = getFormInput()

  const Card = new Cards(title, language, category, description, video)
  const isOk = validateInputs(title, language, category, description, video)
  if (isOk) {
    entries.push(Card)
  }
  console.log(entries)
})
