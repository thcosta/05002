import { Disco } from './disco.js'

export class DiscoDescription {
  _disco
  _content
  parentBox

  constructor(parentBox=null) {
    this.parentBox = parentBox
  }

  get disco() { return this._disco }
  set disco(newDisco) { this._disco = newDisco }

  get content() { return this._content }
  set content(newContent) { this._content = newContent }

  #title(){
    return `<h4 id="titDes">${this.disco.fabricante}</h4>`
  }

  #image(){
    return `<img alt="Imagem do HD Selecionado" src="${this.disco.imagem}" id="imgDes">`
  }

  #body(){
    let divElement =  document.createElement('div')
    divElement.setAttribute('id', 'prcDes')
    divElement.insertAdjacentHTML('afterbegin', `<p>Interface: ${this.disco.interface}</p>`)
    divElement.insertAdjacentHTML('beforeend', `<p>Capacidade: ${this.disco.capacidade}</p>`)
    divElement.insertAdjacentHTML('beforeend', `<p>Preço: R$ <span class='preco'>${this.disco.preco}</span></p>`)
    return divElement.outerHTML
  }

  #emptyBody(){
    return '<img alt="Imagem Vazia" src="images/vazio.jpg" id="imgDes">'
  }

  description(){
    return this.#title() + this.#image() + this.#body()
  }

  show(){
    this.content = this.description()

    if(this.parentBox === null){
      document.body.insertAdjacentHTML('beforeend', this.content)
      return
    }
    this.parentBox.innerHTML = ''
    this.parentBox.insertAdjacentHTML('beforeend', this.content)
  }

  empty(){
    this.content = null

    if(this.parentBox === null) return
    this.parentBox.innerHTML = ''
    this.parentBox.insertAdjacentHTML('afterbegin', this.#emptyBody())
  }

  changed() {  
    return this.content !== this.description()
  }
}