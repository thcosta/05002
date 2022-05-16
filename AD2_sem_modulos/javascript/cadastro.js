/**
 * Interface class for validate form elements
 * @property  {HTMLElement} element a form element
 * @property  {Array} errors array with errors of validation
 */
class Validator {
  #element
  #errors

  constructor(element){
    this.#element = element
    this.#errors = []
  }

  get element() { return this.#element }
  get errors() { return this.#errors }
  
/**
 * Getter of the element label
 * @return {String} label string without ':' 
 */
  get elementLabel() { return this.element.labels[0].textContent.replace(/:/, '') }

/**
 * Add invalid messages on errors
 * Must be implemented
 */
  checkErrors() { }

/**
 * Validate the element and display errors if any
 */
  validate(){
    this.checkErrors()
    if(this.errors.length == 0) return

    alert(this.errors.join('\n'))
  }
}

/**
 * Class for validate telephone form elements
 * inherits from Validator
 * @property  {HTMLElement} element a form element
 * @property  {Array} errors array with errors of validation
 */
class TelValidator extends Validator {
/**
 * Static method to get the number of digits allowed for a telephone
 * @return {Number} maximum number of digits
 */
  static get numberOfDigits() { return 8 }

/**
 * Add invalid messages on errors
 * check for total number of digits and invalid characters
 */
  checkErrors(){
    const qtdDigits = this.constructor.numberOfDigits
    if (this.#numberOfDigits() !== qtdDigits){
      this.errors.push(`${this.elementLabel} tem de ter ${qtdDigits} dígitos!`)
    }
    else {
      const invalidChars = this.#invalidChars()
      if(invalidChars.length > 0){
        this.errors.push(`${this.elementLabel} só pode ter dígitos, caracter(es) '${invalidChars}' inválido(s)!`)
        return
      } 
    }
  }

/**
 * Private method  to get the element's number of digits
 * @return {Number} number of digits of element 
 */
  #numberOfDigits(){ return this.element.value.length }

/**
 * Private method  to get the element's invalid chars
 * @return {String} list of invalid chars 
 */
  #invalidChars(){
    const invalidChars = this.element.value.match(/\D/g)
    if(invalidChars === null) return '';

    const uniqChars = invalidChars.filter((v, i, a) => a.indexOf(v) === i)
    return uniqChars.join("', '") 
  }
}

/**
 * Class for validate cellphone form elements
 * inherits from Validator
 * @property  {HTMLElement} element a form element
 * @property  {Array} errors array with errors of validation
 */
class CelValidator extends TelValidator {
/**
 * Static method to get the number of digits allowed for a cellphone
 * @return {Number} maximum number of digits
 */
  static get numberOfDigits() { return 9 }
}

/**
 * Search the element on DOM tree
 */

const telElement = document.getElementById('telefone')
const celElement = document.getElementById('celular')

/**
 * Adding listener on the form element to validate field when it changes
 */
telElement.addEventListener('change', function(){ validate(telElement) })
celElement.addEventListener('change', function(){ validate(celElement) })

/**
 * Method that receive a element and call correct element validator
 * @param {HTMLElement} element the form element
 */
function validate(element){
  if (element == telElement) {
    new TelValidator(element).validate()
    return
  } 
  if (element == celElement) {
    new CelValidator(element).validate()
    return
  }
}