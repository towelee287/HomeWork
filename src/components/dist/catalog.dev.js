"use strict";

var NAMES = ['mango people t-shirt', 'banana people t-shirt', 'strawberry people t-shirt', 'orange people t-shirt', 'pumpkin people t-shirt', 'pineapple people t-shirt', 'cucumber people t-shirt', 'tomato people t-shirt'];
var PRICES = ['52', '53', '55', '67', '69', '94', '23', '45'];
var catalog = {
  items: [],
  container: null,
  init: function init() {
    this.container = document.querySelector('#catalog');
    this.items = compile();
    this.render();
  },
  render: function render() {
    var htmlStr = '';
    this.items.forEach(function (item, index) {
      htmlStr += "\n\t\t\t\t\t\t\t<div class=\"featured__item\">\n\n\t\t\t\t\t\t\t\t<a href=\"#\">\n\t\t\t\t\t\t\t\t\t<img src=\"../src/assets/img/Layer_".concat(index + 2, ".jpg\" alt=\"\">\n\t\t\t\t\t\t\t\t\t<div class=\"item__hover\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"cart\"><img src=\"../src/assets/img/Forma_1_copy.svg\" alt=\"\">Add to Cart</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class=\"item__bot\">").concat(item.productName, "<br><span>$").concat(item.productPrice, "</span>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t");
    });
    this.container.innerHTML = htmlStr;
  }
};
catalog.init();

function compile() {
  return NAMES.map(function (name, index) {
    return create(NAMES[index], PRICES[index]);
  });
}

function create(name, price) {
  return {
    productName: name,
    productPrice: price
  };
}