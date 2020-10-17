//const NAMES = ['mango people t-shirt', 'banana people t-shirt', 'strawberry people t-shirt', 'orange people t-shirt', 
//				'pumpkin people t-shirt', 'pineapple people t-shirt', 'cucumber people t-shirt', 'tomato people t-shirt'];
//const PRICES = ['52', '53', '55', '67', '69', '94', '23', '45'];

const catalog = {
	items: [],
	basket: null,
	container: null,
	imgFTPurl: 'https://raw.githubusercontent.com/kellolo/static/master/img/JS1_shop',
	url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json',
	init() {
		this.container = document.querySelector('#catalog');
		this.basket = basket;
		//this.items = compile();
		this._get(this.url)
		.then(items => {
			this.items = items;
		})
		.then(() => {
			this._render();
			this._handleEvents();
		})

		// this._handleEvents();
	},
	_get(url) {
		return fetch(url).then(d => d.json())
	},
	_handleEvents() {
		this.container.addEventListener('click', e => {
			if (e.target.name == 'add') {
				let item = {
					productId: e.target.dataset.id,
					productName: e.target.dataset.name,
					productImg: e.target.dataset.img,
					productPrice: +e.target.dataset.price,
				};
				this.basket.add(item)
			}
		})
	},
	_render() {
	let htmlStr = '';
	this.items.forEach((item, index) => {
		let imgURL = `${this.imgFTPurl}/featuredItem${index + 1}.jpg`;
		htmlStr += `
		<div class="featured__item">
			<div>
				<img src="${imgURL}" alt="">
				<div class="item__hover">
					<button name="add" class="cart" 
					data-id="${item.productId}"
					data-name="${item.productName}"
					data-img="${item.productImg}"
					data-price="${item.productPrice}"
					><img src="../src/assets/img/Forma_1_copy.svg" alt="">Add to Cart</button>
				</div>
			</div>
			<div class="item__bot">${item.productName}<br><span>$${item.productPrice}</span>
			</div>

		</div>
		`
	});
	this.container.innerHTML = htmlStr;
	}
}
catalog.init()
					 
/*
					function compile() {
						return NAMES.map((name,index) => create(NAMES[index], PRICES[index]));
					}

					function create(name, price) {
						return {
							productName: name,
							productPrice: price
						}
					} */