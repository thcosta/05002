import { telValidator } from "./src/telValidator.js";
import { celValidator } from "./src/celValidator.js";

const telElement = document.getElementById('telefone')
const celElement = document.getElementById('celular')

telElement.addEventListener('change', function(){ telValidator.validate(telElement) })
celElement.addEventListener('change', function(){ celValidator.validate(celElement) })