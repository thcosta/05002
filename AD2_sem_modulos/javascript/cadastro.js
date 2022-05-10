class Validator {
  #element
  #errors

  constructor(element){
    this.#element = element
    this.#errors = []
  }

  get element() { return this.#element }
  get errors() { return this.#errors }
  get elementLabel() { return this.element.labels[0].textContent.replace(/:/, '') }

  /* Must be implemented */
  checkErrors() { }

  isInvalid(){ 
    this.checkErrors()
    return this.errors.length > 0  
  }
  isValid(){ !this.isInvalid() }

  validate(){
    if(this.isValid()) return

    alert(this.errors.join('\n'))
  }

  static validate(element){
    new this(element).validate()
  }
}

class TelValidator extends Validator {
  static get numberOfDigits() { return 8 }

  #numberOfDigits(){ return this.element.value.length }

  #invalidChars(){
    const invalidChars = this.element.value.match(/\D/g)
    if(invalidChars === null) return new Array()

    const uniqChars = invalidChars.filter((v, i, a) => a.indexOf(v) === i)
    return uniqChars.join("', '") 
  }

  checkErrors(){
    if(this.#invalidChars().length > 0){
      this.errors.push(`${this.elementLabel} só pode ter dígitos, caracter(es) '${this.#invalidChars()}' inválido(s)!`)
      return
    } 
    if (this.#numberOfDigits() !== this.constructor.numberOfDigits){
      this.errors.push(`${this.elementLabel} tem de ter ${this.constructor.numberOfDigits} dígitos!`)
      return
    }
  }
}

class CelValidator extends TelValidator {
  static get numberOfDigits() { return 9 }
}

const telElement = document.getElementById('telefone')
const celElement = document.getElementById('celular')

telElement.addEventListener('change', function(){ TelValidator.validate(telElement) })
celElement.addEventListener('change', function(){ CelValidator.validate(celElement) })