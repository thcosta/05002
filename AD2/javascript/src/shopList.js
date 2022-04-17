export class ShopList {
  _elements
  _listBox
  _priceBox

  constructor(listBox, priceBox){
    this.listBox = listBox
    this.priceBox = priceBox
    this._elements = new Array();
  }

  add(element){
    if(!this.isAdded(element)) this._elements.push(element);
    this.update()
  }

  remove(element){
    this._elements = this._elements.filter((value, _index, _array) => value !== element);
    this.update()
  }

  isAdded(element){
    return this._elements.filter((value, _index, _array) => value === element).length > 0
  }

  print(){
    this.listBox.value = this._elements.map(element => {
      return element.description
    }).join('\n')
  }

  calculate(){
    let totalValue = this._elements.reduce((sum, element) => {
      return sum + parseFloat(element.cost)
    }, 0)
    this.priceBox.value = totalValue.toFixed(2).replace(/\./, ',')
  }

  update(){
    this.print()
    this.calculate()
  }
}