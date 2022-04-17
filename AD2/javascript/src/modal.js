export default class Modal {
  constructor(modalElement, dataAttributes) {
    Modal.setBlackout()

    this.modal = modalElement
    this.#setAttributes(dataAttributes)
    this.#enableClose()
  }

  #setAttributes(dataAttributes) {
    this.attributes = new Map();
    for(let attr in dataAttributes){
      this.attributes.set(attr, dataAttributes[attr])
    }
  }

  #fillBody() {
    for (const [attrMame, attrValue] of this.attributes.entries()) {
      let element = this.modal.querySelector(`.${attrMame}`);
        if (element === undefined || element === null) continue;
        if (attrMame === 'image') {
          element.src = attrValue
        } else {
          element.textContent = attrValue
        }
    }
  }

  #emptyBody() {
    for (const attrMame of this.attributes.keys()) {
      let element = this.modal.querySelector(`.${attrMame}`);
        if (element === undefined || element === null) continue;
        if (attrMame === 'image') {
          element.src = ''
        } else {
          element.textContent = ''
        }
    }
  }

  #enableClose() {
    let blackout = document.querySelector('.body-blackout')

    this.modal.querySelectorAll('.modal-close').forEach(button => {
      button.addEventListener('click', () => { this.close() })
    })
    if(blackout !== null && blackout !== undefined) {
      blackout.addEventListener('click', () => { this.close() })
    }
  }

  open() {
    let blackout = document.querySelector('.body-blackout')
    if(blackout !== null && blackout !== undefined) blackout.classList.add('is-blacked-out')  

    this.#fillBody()
    this.modal.classList.add('is-visible')
  }

  close(){
    let blackout = document.querySelector('.body-blackout')

    this.modal.classList.remove('is-visible')
    this.#emptyBody()
    if(blackout !== null && blackout !== undefined) blackout.classList.remove('is-blacked-out')
  }

  static setBlackout(){
    if (document.querySelector('.body-blackout')) return
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="body-blackout"></div>')
  }

  static enableModals() {
    const modalsButtons = document.querySelectorAll('.modal-trigger')
    if(modalsButtons.length > 0){
      modalsButtons.forEach(button => {
        let modal = document.getElementById(button.dataset.modal)
        let modalObject = new Modal(modal, button.dataset)
        if(modal !== undefined) {
          button.addEventListener('click', function(){ modalObject.open() })
        }
      })
    }
  }
}