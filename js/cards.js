export class Cards {
  constructor(title, language, category, description, video) {
    this.title = title
    this.language = language
    this.category = category
    this.description = description
    this.video = video
    this.id = this.GenerateId()
    this.hasYoutube
    if (this.video == '') {
      this.hasYoutube = `hidden`
    }
  }

  GenerateId() {
    return new Date().getTime()
  }
}
