class ProductCard {
  description
  cost
  quantity
  
  constructor(description, cost, quantity=1) {
    this.description = description;
    this.cost = cost;
    this.quantity = quantity
  }
}

class ShopList {
  products

  constructor(){
    this.products = [];
  }

  get(product){
    return this.products.filter((value, _index, _array) => value.description === product.description)[0]
  }

  add(product){
    const productIncluded = this.get(product)
    if(productIncluded === undefined){
      this.products.push(product);
    } else {
      productIncluded.quantity +=1
    }
  }

  empty(){
    this.products = [];
  }

  list(){
    return this.products.map(product => {
      return `${product.description} - Quantidade: ${product.quantity}`
    }).join('\n')
  }

  cost(){
    let totalValue = this.products.reduce((sum, product) => {
      return sum + parseFloat(product.cost) * product.quantity
    }, 0)
    return totalValue.toFixed(2).replace(/\./, ',')
  }
}

const listBox = document.getElementById('lisPedArea');
const priceBox = document.getElementById('valor');
const productSelector = document.getElementById('selProduto');
const addButton = document.querySelector('#btnIncluir button');

const shopList = new ShopList();

addButton.addEventListener('click', function(){ 
  const selectedProduct = productSelector.options[productSelector.selectedIndex]

  if(selectedProduct.value.length > 0){
    addToCart(selectedProduct)
  } else { 
    alert('Nenhum produto selecionado!') 
  }
})

function addToCart(selectedProduct){
  const product = new ProductCard(selectedProduct.text, selectedProduct.value)
  shopList.add(product);
  listBox.value = shopList.list();
  priceBox.value = shopList.cost();
}
