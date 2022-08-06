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
const searchInput = document.querySelector('#searchInput')
const expandedCard = document.querySelector('article')
const expandedTitle = document.querySelector('.extended-title')
const expandedSkill = document.querySelector('.extended-skill')
const expandedCategory = document.querySelector('.extended-category')
const expandedDescription = document.querySelector('.extended-description')
const expandedVideo = document.querySelector('#extended-video')
const closeExpanded = document.querySelector('.close-expanded')
const cardsContainer = document.querySelector('ul')

let beingEditedId
let entries = new Array()

form.addEventListener('submit', event => {
  event = event || window.event
  event.preventDefault()
})

saveEdit.addEventListener('click', function () {
  const confirmed = confirm('Terminou a edição?')
  if (confirmed) {
    saveEdit.classList.add('hidden')
    clearButton.classList.remove('hidden')
    saveButton.classList.remove('hidden')
    const { title, language, category, description, video, hasYoutube } =
      getFormInput()
    validateInputs(title, language, category, description, video)
    finishEdit(
      beingEditedId,
      title,
      language,
      category,
      description,
      video,
      hasYoutube
    )
  }
})

saveButton.addEventListener('click', () => {
  const { title, language, category, description, video } = getFormInput()

  const isOk = validateInputs(title, language, category, description, video)
  if (isOk) {
    const Card = new Cards(title, language, category, description, video, true)
    entries.unshift(Card)
    saveData()
    removeAll()
    loadCards()
    resetFormInput()
    alert('Dica adicionada com sucesso')
  }
})

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
  } else if (button.className === 'expand-card') {
    cardsContainer.classList.add('hidden')
    expandCard(wholeCard.id)
  }
})

//search-bar inspirada pelo estudo deste video: https://www.youtube.com/watch?v=TlP5WIxVirU
searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase()
  entries.forEach(card => {
    const isVisible = card.title.toLowerCase().includes(value)
    if (!isVisible) {
      card.display = false
    } else {
      card.display = true
    }
    saveData()
  })
  removeAll()
  loadCards()
})

closeExpanded.addEventListener('click', function () {
  expandedCard.classList.add('hidden')
  cardsContainer.classList.remove('hidden')
})

function expandCard(cardId) {
  const cardIndex = entries.findIndex(object => {
    return String(object.id) === String(cardId)
  })
  const { title, language, category, description, video, id, hasYoutube } =
    entries[cardIndex]

  expandedCard.classList.remove('hidden')
  expandedTitle.textContent = title
  expandedSkill.textContent = `Linguagem/Skill: ${language}`
  expandedCategory.textContent = `Categoria: ${category}`
  expandedDescription.textContent = description
  const videoUrl = video.substring(video.indexOf('=') + 1)
  expandedVideo.src = `https://www.youtube.com/embed/${videoUrl}`
}

function editCard(cardId) {
  const cardIndex = entries.findIndex(object => {
    return String(object.id) === String(cardId)
  })
  const { title, language, category, description, video, id, hasYoutube } =
    entries[cardIndex]
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
  if (formVideo.value == '') {
    entries[cardIndex].hasYoutube = `hidden`
  } else {
    entries[cardIndex].hasYoutube = true
  }
  saveData()
  removeAll()
  loadCards()
  alert('Card editado com sucesso')
  resetFormInput()
}

function removeAll() {
  const allCards = document.body.querySelectorAll('.card')
  allCards.forEach(element => {
    element.remove()
  })
}

function getFormInput() {
  const title = formTitle.value
  const language = formLanguage.value
  const category = formCategory.value
  const description = formDescription.value
  const video = formVideo.value
  return { title, language, category, description, video }
}

// fonte: https://stackoverflow.com/questions/63997829/regex-for-youtube-url-with-javascript
function isUrlValid(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
    url
  )
}

function render(title, language, category, description, video, id, hasYoutube) {
  const cardsContainer = document.querySelector('.cards-container')
  cardsContainer.innerHTML += `
    <li class="card" id="${id}">
          
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
          <button class="expand-card">
            <img src="/assets/images/launch-icon.png" class="expand-card" alt="expande a dica" />
          </button>
        </div>
    </li>`
}

function deleteCard(cardId) {
  const cardIndex = entries.findIndex(object => {
    return String(object.id) === String(cardId)
  })
  entries.splice(cardIndex, 1)
  saveData()
  alert('Dica deletada com sucesso.')
}

function saveData() {
  localStorage.setItem('@DEVinKnowledge:', JSON.stringify(entries))
}

function loadCards() {
  entries = JSON.parse(localStorage.getItem('@DEVinKnowledge:')) || []

  entries.forEach(card => {
    const {
      title,
      language,
      category,
      description,
      video,
      id,
      hasYoutube,
      display
    } = card
    if (display) {
      render(
        title,
        language,
        category,
        description,
        video,
        id,
        hasYoutube,
        display
      )
    }
  })
  updateCategoryCount()
}

function resetFormInput() {
  formTitle.value = ''
  formCategory.value = ''
  formDescription.value = ''
  formLanguage.value = ''
  formVideo.value = ''
}

function validateInputs(title, language, category, description, video) {
  let validation = true

  if (title.length < 8 || title.length > 64 || title.value == '') {
    alert('Título deve ter entre 8 e 64 caracteres, tente outra vez.')
    validation = false
  } else if (
    language.length < 4 ||
    language.length > 16 ||
    language.value == ''
  ) {
    alert(
      'O campo linguagem/skill deve ter entre 4 e 16 caracteres, tente outra vez.'
    )
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
  } else if (video.value != undefined) {
    if (!isUrlValid(video)) {
      alert('URL Inválida, tente outra vez.')
      validation = false
    }
  }
  return validation
}

function updateCategoryCount() {
  const totalCounter = document.querySelector('.totalCounter')
  const frontEndCounter = document.querySelector('.frontEndCounter')
  const backEndCounter = document.querySelector('.backEndCounter')
  const fullStackCounter = document.querySelector('.fullStackCounter')
  const softSkillCounter = document.querySelector('.softSkillCounter')
  let totalAmount = 0

  const frontEndAmount = entries.filter(
    card => card.category === 'Front-End'
  ).length
  const backEndAmount = entries.filter(
    card => card.category === 'Back-End'
  ).length
  const fullStackAmount = entries.filter(
    card => card.category === 'FullStack'
  ).length
  const SoftSkillAmount = entries.filter(
    card => card.category === 'SoftSkill'
  ).length
  totalAmount =
    frontEndAmount + backEndAmount + fullStackAmount + SoftSkillAmount

  totalCounter.textContent = totalAmount
  frontEndCounter.textContent = frontEndAmount
  backEndCounter.textContent = backEndAmount
  fullStackCounter.textContent = fullStackAmount
  softSkillCounter.textContent = SoftSkillAmount
}

loadCards()
