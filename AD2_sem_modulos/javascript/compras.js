/**
 * Class of shopping list
 * @property  {Map} products map list of products, where the key is the name of the product and the value is de price of the product
 * @property  {Number} cost total cost of the list
 */
class ShopList {
  #products
  #cost

  constructor(){
    this.#products = new Map()
    this.#cost = 0
  }

/**
 * Getter of the list with all products and their quantity 
 * @return {String} list of products separated by \n
 */
  get list(){
    let list = []
    for (let [description, quantity] of  this.#products.entries()) {
      list.push(`${description} - Quantidade: ${quantity}`)
    }
    return list.join('\n')
  }

/**
 * Getter of the cost with two decimal places and in BR format
 * @return {String} number in BR format
 */
  get cost(){ 
    return this.#cost.toFixed(2).replace(/\./, ',')
  }

/**
 * Add the product to the list and update the cost
 * If the product is already on the list, update its quantity
 * @param {String} description the product description
 * @param {String} price the product price
 */
  add(description, price){
    let quantity = this.#products.get(description)
    quantity === undefined ?  quantity = 1 : quantity +=1
    this.#products.set(description, quantity);
    this.#cost += parseFloat(price)
  }

/**
 * Clear the products list and the cost
 */
  empty(){
    this.#products.clear()
    this.#cost = 0
  }
}

/**
 * Search the elements on DOM tree
 */

const listBox = document.getElementById('lisPedArea');
const priceBox = document.getElementById('valor');
const productSelector = document.getElementById('selProduto');
const addButton = document.querySelector('#btnIncluir button');
const cleanButton = document.getElementById('btnLimpar');

/**
 * Start new ShopList
 */
const shopList = new ShopList();

/**
 * Adding listener on 'Incluir' button to add new Product when it is clicked
 */
addButton.addEventListener('click', addToCart)

/**
 * Adding listener on 'Limpar' button to clean shopList when it is clicked
 */
cleanButton.addEventListener('click', clearCard)

/**
 * Adding select product on shopList where description is the selected optgroup label concatenated with selected option text
 * And Filling lisPedArea and valor
 */
function addToCart(){
  const selectedProduct = productSelector.selectedOptions[0]

  if(selectedProduct.value.length > 0){
    const description = `${selectedProduct.parentElement.label} ${selectedProduct.text}`
    shopList.add(description, selectedProduct.value);
    listBox.value = shopList.list;
    priceBox.value = shopList.cost;
    productSelector.value = ''
  } else { 
    alert('Nenhum produto selecionado!') 
  }
}

/**
 * Clear lisPedArea and valor
 */
function clearCard(){
  shopList.empty();
  listBox.value = shopList.list;
  priceBox.value = shopList.cost;
}
