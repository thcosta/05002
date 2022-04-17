export class Validator {
  _element

  constructor(element){
    this._element = element
  }

  get element() { return this._element }

  // Must be implemented
  get regex() { }

  // Must be implemented
  get error() { }

  isValid(){ this.regex.test(this._element.value) }
  isInvalid(){ !this.isValid() }

  validate(){
    if(this.isValid()) return

    alert(this.error)
  }

  static validate(element){
    new this(element).validate()
  }
}