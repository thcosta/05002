export class Disco {
  fabricante
  interface
  capacidade
  imagem
  preco
  
  constructor(attributes = new Map()) {
    this.fabricante = attributes['fabricante'];
    this.interface = attributes['interface'];
    this.capacidade = attributes['capacidade'];
    this.imagem = attributes['imagem'];
    this.preco = attributes['preco'];
  }
}