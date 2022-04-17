export class DiscoDescription {
  enabled
  element
  disco

  constructor(element) {
    this.enabled = false;
    this.element = element;
    this.#empty();
  }

  #empty(){
    this.enabled = false;
    this.element.innerHTML = ''
    this.element.insertAdjacentHTML('afterbegin', '<img alt="Imagem Vazia" src="images/vazio.jpg" id="imgDes">')
  }

  #show() {
    this.enabled = true;
    this.element.innerHTML = ''
    this.element.insertAdjacentHTML('afterbegin', `<h4 id="titDes">${this.disco.fabricante}</h4>`)
    this.element.insertAdjacentHTML('beforeend', `<img src="${this.disco.imagem}" id="imgDes">`)

    let div =  document.createElement('div');
    div.setAttribute('id', 'prcDes')
    div.insertAdjacentHTML('beforeend', `<p>Interface: ${this.disco.interface}</p>`)
    div.insertAdjacentHTML('beforeend', `<p>Capacidade: ${this.disco.capacidade}</p>`)
    div.insertAdjacentHTML('beforeend', `<p>Preço: R$ <span class='preco'>${this.disco.preco}</span></p>`)
    this.element.appendChild(div)
  }

  toogle(novoDisco){
    if(!this.enabled || novoDisco != this.disco) {
      this.disco = novoDisco
      this.#show()
    } else {
      this.#empty()
    }
  }

}