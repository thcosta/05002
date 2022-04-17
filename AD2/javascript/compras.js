import { ProductCard } from "./src/productCard.js";
import { ShopList } from "./src/shopList.js";

const listBox = document.getElementById('lisPedArea');
const priceBox = document.getElementById('valor');
const productSelector = document.getElementById('selProduto');
const addButton = document.querySelector('#btnIncluir button');

const shopList = new ShopList(listBox, priceBox);

addButton.addEventListener('click', function(){ addToCart()})

function addToCart(){
  let selectedText = productSelector.options[productSelector.selectedIndex].text
  let selectedValue = productSelector.value
  shopList.add(new ProductCard(selectedText, selectedValue));
}
