export class Cards {
  constructor(title, language, category, description, video, display) {
    this.title = title
    this.language = language
    this.category = category
    this.description = description
    this.video = video
    this.id = this.GenerateId()
    this.hasYoutube
    this.display = display
    if (this.video == '') {
      this.hasYoutube = `hidden`
    }
  }

  GenerateId() {
    return new Date().getTime()
  }
}
