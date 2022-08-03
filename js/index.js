import { Cards } from './cards.js'

const saveButton = document.querySelector('#save')
const clearButton = document.querySelector('#clear')
const formTitle = document.querySelector('#title')
const formLanguage = document.querySelector('#skill')
const formCategory = document.querySelector('#category')
const formDescription = document.querySelector('#description')
const formVideo = document.querySelector('#video')
const form = document.querySelector('#form')
const saveEdit = document.querySelector('#saveEdit')
let beingEditedId
let entries = new Array()

form.addEventListener('submit', event => {
  event = event || window.event
  event.preventDefault()
})

function editCard(cardId) {
  const cardIndex = entries.findIndex(object => {
    return String(object.id) === String(cardId)
  })
  const { title, language, category, description, video, id } =
    entries[cardIndex]
  console.log(title, language, category, description, video, id)
  formTitle.value = title
  formCategory.value = category
  formDescription.value = description
  formLanguage.value = language
  formVideo.value = video
  beingEditedId = id
  saveEdit.classList.remove('hidden')
  clearButton.classList.add('hidden')
  saveButton.classList.add('hidden')
}

function finishEdit(cardId, title, language, category, description, video) {
  const cardIndex = entries.findIndex(object => {
    return String(object.id) === String(cardId)
  })
  entries[cardIndex].title = title
  entries[cardIndex].language = language
  entries[cardIndex].category = category
  entries[cardIndex].description = description
  entries[cardIndex].video = video
  saveData()
  removeAll()
  loadCards()
}

saveEdit.addEventListener('click', function () {
  const confirmed = confirm('Terminou a edição?')
  if (confirmed) {
    saveEdit.classList.add('hidden')
    clearButton.classList.remove('hidden')
    saveButton.classList.remove('hidden')
    const { title, language, category, description, video } = getFormInput()
    validateInputs(title, language, category, description, video)
    finishEdit(beingEditedId, title, language, category, description, video)
  }
})

function removeAll() {
  const allCards = document.body.querySelectorAll('.card')
  allCards.forEach(element => {
    element.remove()
  })
}

function calculateCategoryAmount() {}

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

function render(title, language, category, description, video, id, hasYoutube) {
  const cardsContainer = document.querySelector('.cards-container')
  cardsContainer.innerHTML += `
    <div class="card" id="${id}">
          <h2 class="cardTitle">${title}</h2>
          <h4 class="cardSkill">Linguagem/Skill: ${language}</h4>
          <h4 class="cardCategory">Categoria: ${category}</h4>
          <p class="cardContent">
              ${description}
          </p>
        <div class="card-buttons">
          <button class="cardDelete">
            <img src="/assets/images/delete-card.png"  class="cardDelete" alt="deletar a dica" />
          </button>
          <button class="cardEdit">
           <img src="/assets/images/edit-card.png" class="cardEdit" alt="editar a dica" />
          </button>
          <button class="videoCard ${hasYoutube}">
            <a href="${video}" target="_blank"
              ><img
                src="/assets/images/video-card.png"
                alt="video sobre a dica"
                class="videoCard"   
            /></a>
          </button>
        </div>
    </div>`
}

function deleteCard(cardId) {
  const cardIndex = entries.findIndex(object => {
    return String(object.id) === String(cardId)
  })
  console.log(entries)
  entries.splice(cardIndex, 1)
  saveData()
}

function saveData() {
  localStorage.setItem('@DEVinKnowledge:', JSON.stringify(entries))
}

function loadCards() {
  entries = JSON.parse(localStorage.getItem('@DEVinKnowledge:')) || []

  entries.forEach(card => {
    const { title, language, category, description, video, id, hasYoutube } =
      card

    render(title, language, category, description, video, id, hasYoutube)
  })
}

function validateInputs(title, language, category, description, video) {
  let validation = true

  if (title.length < 8 || title.length > 64 || title.value == '') {
    validation = false
  } else if (
    language.length < 4 ||
    language.length > 16 ||
    language.value == ''
  ) {
    validation = false
  } else if (category === 'none') {
    alert('Você precisa selecionar uma categoria.')
    validation = false
  } else if (
    description.length < 32 ||
    description.length > 512 ||
    description.value == ''
  ) {
    alert('A descrição é obrigatória e precisa ter entre 32 e 512 caracteres.')
    validation = false
  } else if (!isUrlValid(video) && video.value != '') {
  }
  return validation
}

saveButton.addEventListener('click', () => {
  const { title, language, category, description, video } = getFormInput()

  const isOk = validateInputs(title, language, category, description, video)
  if (isOk) {
    const Card = new Cards(title, language, category, description, video)
    entries.push(Card)
    saveData()
    removeAll()
    loadCards()
  }
})

loadCards()

const cardsContainer = document.querySelector('main')

cardsContainer.addEventListener('click', event => {
  const img = event.target
  const button = img.parentNode
  const buttonCards = button.parentNode
  const wholeCard = buttonCards.parentNode
  if (event.target.className === 'cardDelete') {
    if (button.className === 'cardDelete') {
      let confirmed = confirm('Tem certeza que deseja deletar a dica?')
      if (confirmed) {
        cardsContainer.removeChild(wholeCard)
        deleteCard(wholeCard.id)
      }
    }
  } else if (button.className === 'cardEdit') {
    let confirmed = confirm('Deseja editar a dica?')
    if (confirmed) {
      editCard(wholeCard.id)
    }
  }
})

console.log(entries)
