
/**
 * Class to create a floating window with dynamic content
 * @property  {HTMLElement} blackoutElement element div that is placed out of focus
 * @property  {HTMLElement} modalElement element div of the modal window
 */
class Modal {
  #blackoutElement
  #modalElement
  
  constructor(options) {
    this.#appendModal(options)
    this.#enableBackground()
    this.#enableButtonClose()
  }

/**
 * Create the modal div and 
 * append to the body
 */
  #appendModal(options) {
    this.#modalElement = document.createElement('div')
    Object.assign(this.#modalElement, {...options, className: 'modal' })
    this.#modalElement.innerHTML = `<div class="modal-body">
      <div id="modalContent"></div>
      <button type="button" class="modal-close">Fechar</button>
    </div>`
    document.body.append(this.#modalElement)
  }

/**
 * Create the blackout div and append to the body
 * Enable it to close the modal
 */
  #enableBackground() {
    this.#blackoutElement = document.querySelector('.blackout')
    if (this.#blackoutElement === null) {
      this.#blackoutElement = document.createElement('div')
      this.#blackoutElement.className = 'blackout'
      document.body.prepend(this.#blackoutElement)
    }
      
    this.#blackoutElement.addEventListener('click', () => { this.close() })
  }

/**
 * Enable modal button to close it
 */
  #enableButtonClose() {
    const button = this.#modalElement.querySelector('.modal-close')
    button.addEventListener('click', () => { this.close() })
  }

/**
 * Insert template in modal content
 * @param {HTMLString} template html parsed string that is the modal content
 */
  fill(template){
    const contentDiv = this.#modalElement.querySelector('#modalContent')
    contentDiv.innerHTML = ''
    contentDiv.innerHTML = template
  }

/**
 * Put modal and blackout visible
 */
  open() {
    this.#blackoutElement.classList.add('visible')  
    this.#modalElement.classList.add('visible')
  }

/**
 * Put modal and blackout invisible
 */
  close(){
    this.#modalElement.classList.remove('visible')
    this.#blackoutElement.classList.remove('visible')
  }
}

/**
 * Create modal object
 */
const modal = new Modal({id: 'modal-memorias'})

/**
 * Search links that open the modal on DOM tree and enable them to open it
 */
const modalsButtons = document.querySelectorAll(`a[data-trigger='modal-memorias']`)
modalsButtons.forEach(button => {
    button.addEventListener('click', openModal)
})

/**
 * Fill modal content with template and open it
 * @param {EventTarget} event event
 */
function openModal(event){
  const template = modalTemplate(event.currentTarget.dataset)
  modal.fill(template)
  modal.open()
}

/**
 * Create template from dataset attributes of the current link
 * @param {DOMStringMap} attributes dataset attributes
 * @return {String} template in html parsed string
 */
function modalTemplate(attributes){
  const title = `<h2>${attributes.type}</h2>`
  const image = `<img src="images/${attributes.image}">`
  const info = `<div id="janInfoDetalhe">
    <p>Fabricante: ${attributes.manufacturer}</p>
    <p>Capacidade: ${attributes.capacity}</p>
    <p>Preço:  ${attributes.price}</p>
  </div>`

  return title + image + info
}