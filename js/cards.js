export class Cards {
  constructor(title, language, category, description, video) {
    this.title = title
    this.language = language
    this.category = category
    this.description = description
    this.video = video
    this.id = this.GenerateId()
  }

  GenerateId() {
    return new Date().getTime()
  }

  /*  RenderCard() {
    const cardsContainer = document.querySelector('.cards-container')
    cardsContainer.innerHTML += `
      <div class="card" id="${this.id}">
            <h2 class="cardTitle">${this.title}</h2>
            <h4 class="cardSkill">Linguagem/Skill: ${this.language}</h4>
            <h4 class="cardCategory">Categoria: ${this.category}</h4>
            <p class="cardContent">
                ${this.description}
            </p>
          <div class="card-buttons">
            <button class="cardDelete">
              <img src="/assets/images/delete-card.png" alt="deletar a dica" />
            </button>
            <button class="cardEdit">
             <img src="/assets/images/edit-card.png" alt="editar a dica" />
            </button>
            <button class="videoCard hidden">
              <a href="${this.video}" target="_blank"
                ><img
                  src="/assets/images/video-card.png"
                  alt="video sobre a dica"
              /></a>
          </div>
      </div>`
    if (this.video != '') {
      const videoButton = document.querySelector('.videoCard')
      videoButton.classList.remove('hidden')
    }
  } */
}

