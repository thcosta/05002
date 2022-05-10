class Disco {
  fabricante
  interface
  capacidade
  imagem
  preco
  
  constructor(attributes = new Map()) {
    this.fabricante = attributes['fabricante'];
    this.interface = attributes['interface'];
    this.capacidade = attributes['capacidade'];
    this.imagem = attributes['imagem'];
    this.preco = attributes['preco'];
  }
}

class DiscoDescription {
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

class Toogle {
  enabled
  _element

  constructor(element) {
    this.enabled = false;
    this._element = element; 
    this.#empty()
  }

  get element() { return this._element }

  #empty(){
    this.enabled = false;
    this.element.empty()
  }

  #show() {
    this.enabled = true;
    this.element.show()
  }

  toogle(){
    if(!this.enabled || this.element.changed()) {
      this.#show()
    } else {
      this.#empty()
    }
  }

}

const hdSataWD = document.getElementById('hdSataWD')
const hdSataSeagate = document.getElementById('hdSataSeagate')
const ssdSataSamdisk = document.getElementById('ssdSataSamdisk')
const ssdSataKingston = document.getElementById('ssdSataKingston')
const ssdM2Kingston = document.getElementById('ssdM2Kingston')
const ssdM2WD = document.getElementById('ssdM2WD')

const description = new DiscoDescription(document.getElementById('description'))
const toogleDescription = new Toogle(description)

const discosArray = [
  new Disco(hdSataWD.dataset),
  new Disco(hdSataSeagate.dataset),
  new Disco(ssdSataSamdisk.dataset),
  new Disco(ssdSataKingston.dataset),
  new Disco(ssdM2Kingston.dataset),
  new Disco(ssdM2WD.dataset)
]

console.log(discosArray)

discosArray.forEach(disco => {
  const button = document.querySelector(`a[data-interface='${disco.interface}'][data-fabricante='${disco.fabricante}']`)

  if(button !== null && button !== undefined){
    button.addEventListener('click', function(){ setDescription(disco) })
  }
})

function setDescription(disco){
  description.disco = disco
  toogleDescription.toogle()
}
