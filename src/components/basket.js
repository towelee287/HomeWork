
const basket = {
    items: [],
    wrapper: null,
    container: null,
    total: null,
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json',
    init() {
        this.wrapper = document.querySelector('.drop-cart');
        this.container = document.querySelector('#basket');
        this.total = document.querySelector('#basket-total');

        this._get(this.url)
            .then(basketObject => {
                this.items = basketObject.content
            })
            .then(() => {
                this._render();
                this._handleEvents();
                this._total();
            })
    },

    _get(url) {
        return fetch(url).then(d => d.json())
    },
    _handleEvents() {
        document.querySelector('#toggle-basket').addEventListener('click', () => {
            this.wrapper.classList.toggle('hidden');
        });
        this.container.addEventListener('click', e => {
            if (e.target.name == 'remove') {
                this.remove(e.target.dataset.id)
            }
        })
    },
    add(item) {
        //console.log('add ' + item.productName);
        let find = this.items.find(basketItem => basketItem.productId == item.productId);

        if (!find) {
            this.items.push(Object.assign({}, item, { amount: 1 }));
        } else {
            find.amount++;
        }
        this._render();
        this._total();
    },
    remove(id) {
        let find = this.items.find(basketItem => basketItem.productId == id);

        if (find.amount > 1) {
            find.amount--;
        } else {
            this.items.splice(this.items.indexOf(find), 1)
        }
        this._render();
        this._total();
    },
    _total() {
        let sum;
        if (this.items.length > 0) {
            let totalStr = '';
        let arr = [];
		this.items.forEach((item) => {
			arr.push((item.productPrice)*(item.amount));
        })
         sum = arr.reduce((sum, current) => {
            return sum + current;
        })
        console.log(sum)
        } else sum = 0;
        
        totalStr = `$${sum}`



        this.total.innerHTML = totalStr;
        
    },
    _render() {
        
        let htmlStr = '';
				this.items.forEach((item) => {
					htmlStr += `
					<div class="drop-cart__product">
                            <a href="product.html" class="drop-cart__product-link">
                                <img src="${item.productImg}" alt="product" class="drop-cart__product-img">
                            </a>
                        <div class="drop-cart__product-info">
                                <a href="product.html" class="drop-cart__product-name">${item.productName}</a>
                            <div class="drop-cart__product-stars">
                                <i class="${item.stars > "0" ? "fas" : "far"} ${item.stars === "0.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                                <i class="${item.stars > "1" ? "fas" : "far"} ${item.stars === "1.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                                <i class="${item.stars > "2" ? "fas" : "far"} ${item.stars === "2.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                                <i class="${item.stars > "3" ? "fas" : "far"} ${item.stars === "3.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                                <i class="${item.stars > "4" ? "fas" : "far"} ${item.stars === "4.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                             </div>
                            <div class="drop-cart__product-price">
                                <span class="drop-cart__product-count">${item.amount} </span> x ${item.productPrice}
                                <span class="drop-cart__product-sum"> = $${item.productPrice * item.amount}</span>
                            </div>
                        </div>
                        <a href="#" data-id="${item.productId}"name="remove" class="drop-cart__product-close far fa-times-circle"></a>
                    </div>
					`
                });
				this.container.innerHTML = htmlStr;
            }
}
basket.init();

// TOTAL через метод массива reduce