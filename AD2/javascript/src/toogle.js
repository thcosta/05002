export class Toogle {
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