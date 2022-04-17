import { Disco } from "./src/disco.js";
import { DiscoDescription } from "./src/discoDescription.js";
import { Toogle } from "./src/toogle.js"

const hdSataWD = document.getElementById('hdSataWD')
const hdSataSeagate = document.getElementById('hdSataSeagate')
const ssdSataSamdisk = document.getElementById('ssdSataSamdisk')
const ssdSataKingston = document.getElementById('ssdSataKingston')
const ssdM2Kingston = document.getElementById('ssdM2Kingston')
const ssdM2WD = document.getElementById('ssdM2WD')

const description = new DiscoDescription(document.getElementById('description'))
const toogleDescription = new Toogle(description)

const discosArray = new Array(
  new Disco(hdSataWD.dataset),
  new Disco(hdSataSeagate.dataset),
  new Disco(ssdSataSamdisk.dataset),
  new Disco(ssdSataKingston.dataset),
  new Disco(ssdM2Kingston.dataset),
  new Disco(ssdM2WD.dataset)
)

console.log(discosArray)

discosArray.forEach(disco => {
  let button = document.querySelector(`a[data-interface='${disco.interface}'][data-fabricante='${disco.fabricante}']`)

  if(button !== null && button !== undefined){
    button.addEventListener('click', function(){ setDescription(disco) })
  }
})

function setDescription(disco){
  description.disco = disco
  toogleDescription.toogle()
}
