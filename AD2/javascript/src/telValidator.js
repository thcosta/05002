import { Validator } from "./validator.js"

export class telValidator extends Validator {
  _numberOfDigits = 8

  get regex() { return new RegExp(`^\d{${this._numberOfDigits},}$`) }

  #numberOfDigits(){ return this.element.value.length }

  #invalidChar(){
    let invalidChars = this.element.value.match(/\D/g)
    if(invalidChars === null) return new Array()

    let uniqChars = invalidChars.filter((v, i, a) => a.indexOf(v) === i)
    return uniqChars.join("', '") 
  }

  get error(){
    if(this.#invalidChar().length > 0){
      return `${this.element.labels[0].textContent} só pode ter dígitos, caracter(es) '${this.#invalidChar()}' inválido(s)!`
    } 
    if(this.#numberOfDigits() !== this._numberOfDigits){
      return `${this.element.labels[0].textContent} tem de ter ${this._numberOfDigits} dígitos!`
    }
  }
}