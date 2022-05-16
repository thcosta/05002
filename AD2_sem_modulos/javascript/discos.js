/**
 * Class to create disk objects
 * @property  {String} fabricante disk manufacturer
 * @property  {String} interface disk interface
 * @property  {String} capacidade disk capacity
 * @property  {String} imagem disk image file name
 * @property  {String} preco disk price
 */
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

/**
 * Getter of disk description template in html
 * @return {String} html parsed string
 */
  get template() {
    const title = `<h4 id="titDes">${this.fabricante}</h4>`
    const image = `<img alt="Imagem do HD Selecionado" src="images/${this.imagem}" id="imgDes">`
    const div = `<div id="prcDes">
      <p>Interface: ${this.interface}</p>
      <p>Capacidade: ${this.capacidade}</p>
      <p>Preço: R$ <span class='preco'>${this.preco}</span></p>
    </div>`
    return title + image + div
  }
}

/**
 * Class to toggle html content of a html element
 * @property  {HTMLElement} element html element  
 * @property  {String} emptyTemplate html template when object is empty
 * @property  {String} currentContent current html content of the element
 * @property  {String} newContent  new html content
 */
class Toggle {
  element
  #emptyTemplate
  #currentContent
  #newContent

  constructor(element, emptyTemplate) {
    this.element = element
    this.#emptyTemplate = emptyTemplate
    this.#currentContent = null
    this.#newContent = null
  }

/**
 * Getter of element's current content
 * @return {HTMLString} current html content of the element
 */
  get content() { return this.#currentContent }

/**
 * Setter of element's content'
 * Fill with innerContent if is not null or with emptyTemplate
 * @param {HTMLString} innerContent html parsed content
 */
  set content(innerContent) { 
    this.#newContent = innerContent ||  this.#emptyTemplate
  }


/**
 * Private method that check if element changed, i.e., 
 * current content is the same of new content
 * @return {Boolean}
 */
  #hasChanged() {  
    return this.#currentContent !== this.#newContent
  }

/**
 * Private method that change element content to new content
 */
  #change(){ 
    this.#currentContent = this.#newContent
    this.element.innerHTML = ''
    this.element.insertAdjacentHTML('afterbegin', this.content)
  }


/**
 * Method that change element content if new content is different from current content.
 * If not, it change for empty template.
 * @param {HTMLString} newContent html parsed content
 */
  toggle(newContent){
    this.content = newContent
    
    if(!this.#hasChanged()) {
      this.content = null
    }
    this.#change()
  }
}

/**
 * Search description table row 
 */
const description = document.getElementById('description')

/**
 * Set empty template
 */
const emptyTemplate = `<h4 id="titDes"></h4>
  <img alt="Imagem Vazia" src="images/vazio.jpg" id="imgDes">
  <div id="prcDes">
    <p></p>
    <p></p>
    <p></p>
</div>`

/**
 * Create toggle object and toggle element content to empty template
 */
const toggleDescription = new Toggle(description, emptyTemplate)
toggleDescription.toggle()


/**
 * Search links that represents disk elements
 */
const hdSataWD = document.getElementById('hdSataWD')
const hdSataSeagate = document.getElementById('hdSataSeagate')
const ssdSataSamdisk = document.getElementById('ssdSataSamdisk')
const ssdSataKingston = document.getElementById('ssdSataKingston')
const ssdM2Kingston = document.getElementById('ssdM2Kingston')
const ssdM2WD = document.getElementById('ssdM2WD')

/**
 * Create disks vector
 */
const discosArray = [
  new Disco(hdSataWD.dataset),
  new Disco(hdSataSeagate.dataset),
  new Disco(ssdSataSamdisk.dataset),
  new Disco(ssdSataKingston.dataset),
  new Disco(ssdM2Kingston.dataset),
  new Disco(ssdM2WD.dataset)
]

/**
 * Print disks vector on console in JSON format
 */
console.log(JSON.stringify(discosArray, null, 2));

/**
 * For each disk object, enable matched link when clicked to toggle description content with disk template
 */
discosArray.forEach(disco => {
  const button = document.querySelector(`a[data-interface='${disco.interface}'][data-fabricante='${disco.fabricante}']`)

  if(button !== null){
    button.addEventListener('click', () => { toggleDescription.toggle(disco.template) })
  }
})