/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {};

api.dados = function (req, res) {
  res.json([
    {
      id: 104893,
      img: "./assets/shirt.svg",
      name: "casaco Jumping bear vermelho",
      price: 499.9,
      promotionPrice: 399.9,
      quantity: 1,
    },
    {
      id: 104894,
      img: "./assets/blusa-verde.svg",
      name: "t-shirt jumping bear verde",
      price: 299.0,
      promotionPrice: 129.9,
      quantity: 1,
    },
    {
      id: 104895,
      img: "./assets/calça-rosa.svg",
      name: "calça moletom bear",
      price: 359.0,
      promotionPrice: 299.9,
      quantity: 1,
    },
    {
      id: 104896,
      img: "./assets/blusa-cinza.svg",
      name: "t-shirt jumping bear cinza",
      price: 299.0,
      promotionPrice: 269.9,
      quantity: 1,
    },
    {
      id: 104897,
      img: "./assets/blusa-branca.svg",
      name: "t-shirt jumping bear branca",
      price: 299.0,
      promotionPrice: 199.9,
      quantity: 1,
    },
    {
      id: 104898,
      img: "./assets/jaqueta-azul.svg",
      name: "casaco jumping bear azul",
      price: 469.0,
      promotionPrice: 399.9,
      quantity: 1,
    },
  ]);
};

module.exports = api;
