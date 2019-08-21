import React from "react";
import InlineSVG from "svg-inline-react";
import { connect } from "react-redux";
import { getCart, deleteItemCart, openCart } from "../../actions/cart";
import { getItemFromStorage } from "../../actions/storage";
import { prefixForSources } from "../../constants";
import Link from "next/link";

class HeaderCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, goods: props.goods || [] };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.goods != state.goods) return { goods: props.goods };
    return null;
  }
  componentDidMount() {
    const uuid = this.props.getItemFromStorage("uuid");
    if (!uuid) return false;
    this.props.getCart();
  }
  handleOpenCart = event => {
    this.props.openCart();
  };
  getProductsInCart = () => {
    let sum = 0;
    let goodsCount = 0;
    let result = {};
    const { inStock } = this.props;
    result.goods = (
      <div
        className={
          this.state.hover
            ? "cart-dropdown show-cart-dropdown-items fadeIn"
            : "cart-dropdown fadeIn"
        }
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="cart-dropdown__arrow" />
        <Link href={{ pathname: "/Checkout" }} as="/checkout/">
          <button type="button" className="cart-dropdown__button">
            ОФОРМИТЬ ЗАКАЗ
          </button>
        </Link>
        <div className="header-cart-devider">или</div>
        <button
          type="button"
          className="cart-dropdown__button cart-dropdown-go-cart"
          onClick={this.handleOpenCart}
        >
          ПЕРЕЙТИ В КОРЗИНУ
        </button>
        <div className="header-cart-items-wrapper">
          {this.state.goods.map(item => {
            const {
              link_article,
              goods_id,
              price,
              name,
              amount,
              size,
              color
            } = item;
            const photo = item.photo.thumb;
            if (inStock[goods_id] && inStock[goods_id] >= amount) {
              sum += price * amount;
              goodsCount += +amount;
            }

            return (
              <div
                className={
                  inStock[goods_id] == 0
                    ? "header-cart-item item-out-of-stock"
                    : "header-cart-item"
                }
                key={goods_id}
              >
                <div className="header-cart-item__img">
                  <img src={`${prefixForSources}${photo}`} alt="" />
                </div>
                <div className="header-cart-item__info">
                  <Link
                    href={{ pathname: `/Product`, query: { id: link_article } }}
                    as={`${link_article}`}
                  >
                    <a
                      href={link_article}
                      className="header-cart-item__link"
                      dangerouslySetInnerHTML={{ __html: name }}
                    />
                  </Link>
                  {color != null ? <div>Цвет: {color}</div> : null}
                  {size != null ? (
                    <div>
                      <span>Размер:</span>
                      <span dangerouslySetInnerHTML={{ __html: size }} />
                    </div>
                  ) : null}
                  <div className="header-cart-item__sum">{`${amount} x ${price} грн`}</div>
                </div>
                <div className="cart-dropdown-item-delete">
                  <span
                    className="close"
                    onClick={() => this.handleDeleteItem(goods_id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
    result.sum = sum;
    result.goodsCount = goodsCount;
    return result;
  };
  handleDeleteItem = id => {
    this.props.deleteItemCart(id);
  };
  handleMouseEnter = event => {
    this.setState({ ...this.state, hover: true });
  };
  handleMouseLeave = event => {
    this.setState({ ...this.state, hover: false });
  };
  render() {
    let sum = 0;
    let goodsCount = 0;
    let goods = {};
    if (this.state.goods && this.state.goods.length > 0) {
      const data = this.getProductsInCart();
      goodsCount = data.goodsCount;
      sum = data.sum;
      goods = data.goods;
    }

    return (
      <div className="cart-wrapper">
        <button
          className="cart__link"
          onMouseEnter={this.handleMouseEnter}
          onTouchStart={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="cart-text">
            <p className="cart-text__cart">корзина</p>
            <p className="cart-text__sum">на сумму</p>
            <span className="cart__sum">{sum}</span>
            <span className="cart__uah">грн</span>
          </div>
          <div className="cart-img">
            <span className="cart-img__label">{goodsCount}</span>
            <InlineSVG
              src={`<svg id="Cart" data-name="Cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 388"><defs><style>.cls-5{fill:#fff;}</style></defs><title>Корзина</title><path class="cls-5" d="M421.33,310a39,39,0,1,1-27.58,11.42A39,39,0,0,1,421.33,310Zm16.27,22.73A23,23,0,1,0,444.33,349a23,23,0,0,0-6.73-16.27Z"></path><path class="cls-5" d="M191.67,300.12A8,8,0,1,1,178,291.88l11.73-19.32a8,8,0,0,1,6.82-3.83v-.07H439.4a8,8,0,0,1,0,16H201Z"></path><path class="cls-5" d="M177.2,160.67a8,8,0,1,1,0-16H481.88l6.52-34.78a8,8,0,0,1,15.68,2.92l-7.62,40.67a8,8,0,0,1-8,7.2H177.2Z"></path><path class="cls-5" d="M496.25,103.33a8,8,0,0,1,0,16H159.13a8,8,0,0,1,0-16Z"></path><path class="cls-5" d="M165.58,243.33a8,8,0,0,1,0-16H466.4l6.52-34.78a8,8,0,0,1,15.7,2.93L481,236.15a8,8,0,0,1-8,7.2H165.58Z"></path><path class="cls-5" d="M67.72,0a8,8,0,0,1,0,16H8A8,8,0,0,1,8,0Z"></path><path class="cls-5" d="M172.93,232.18a8,8,0,0,1-14.68,6.32L60.37,11.15a8,8,0,0,1,14.68-6.3Z"></path><path class="cls-5" d="M480.77,186a8,8,0,1,1,0,15.93H195.3a8,8,0,0,1-7.3-4.78h0l-18.1-41.32a8,8,0,0,1,14.63-6.37l16,36.55Z"></path><path class="cls-5" d="M33.4,46.15a8,8,0,1,1-14.63,6.37L.68,11.18A8,8,0,1,1,15.32,4.82Z"></path><path class="cls-5" d="M166.45,108.15a8,8,0,0,1-14.63,6.37L133.73,73.18A8,8,0,0,1,141.05,62H504a8,8,0,0,1,0,16H153.25Z"></path><path class="cls-5" d="M45.6,41.33a8,8,0,0,1,0,16H26.08a8,8,0,1,1,0-16Z"></path><path class="cls-5" d="M152.67,310a39,39,0,1,1-27.58,11.42A39,39,0,0,1,152.67,310Zm16.27,22.73A23,23,0,1,0,175.67,349a23,23,0,0,0-6.73-16.27Z"></path></svg>`}
            />
          </div>
        </button>
        {this.state.goods && this.state.goods.length > 0 ? (
          goods
        ) : (
          <div
            className={
              this.state.hover
                ? "cart-dropdown show-cart-dropdown"
                : "cart-dropdown"
            }
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <div className="cart-dropdown__arrow" />
            <div className="cart-dropdown__img">
              <InlineSVG
                src={`<svg id="Cart" data-name="Cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 388"><defs><style>.cls-6{fill:#b89d65;}</style></defs><title>Корзина</title><path class="cls-6" d="M421.33,310a39,39,0,1,1-27.58,11.42A39,39,0,0,1,421.33,310Zm16.27,22.73A23,23,0,1,0,444.33,349a23,23,0,0,0-6.73-16.27Z"></path><path class="cls-6" d="M191.67,300.12A8,8,0,1,1,178,291.88l11.73-19.32a8,8,0,0,1,6.82-3.83v-.07H439.4a8,8,0,0,1,0,16H201Z"></path><path class="cls-6" d="M177.2,160.67a8,8,0,1,1,0-16H481.88l6.52-34.78a8,8,0,0,1,15.68,2.92l-7.62,40.67a8,8,0,0,1-8,7.2H177.2Z"></path><path class="cls-6" d="M496.25,103.33a8,8,0,0,1,0,16H159.13a8,8,0,0,1,0-16Z"></path><path class="cls-6" d="M165.58,243.33a8,8,0,0,1,0-16H466.4l6.52-34.78a8,8,0,0,1,15.7,2.93L481,236.15a8,8,0,0,1-8,7.2H165.58Z"></path><path class="cls-6" d="M67.72,0a8,8,0,0,1,0,16H8A8,8,0,0,1,8,0Z"></path><path class="cls-6" d="M172.93,232.18a8,8,0,0,1-14.68,6.32L60.37,11.15a8,8,0,0,1,14.68-6.3Z"></path><path class="cls-6" d="M480.77,186a8,8,0,1,1,0,15.93H195.3a8,8,0,0,1-7.3-4.78h0l-18.1-41.32a8,8,0,0,1,14.63-6.37l16,36.55Z"></path><path class="cls-6" d="M33.4,46.15a8,8,0,1,1-14.63,6.37L.68,11.18A8,8,0,1,1,15.32,4.82Z"></path><path class="cls-6" d="M166.45,108.15a8,8,0,0,1-14.63,6.37L133.73,73.18A8,8,0,0,1,141.05,62H504a8,8,0,0,1,0,16H153.25Z"></path><path class="cls-6" d="M45.6,41.33a8,8,0,0,1,0,16H26.08a8,8,0,1,1,0-16Z"></path><path class="cls-6" d="M152.67,310a39,39,0,1,1-27.58,11.42A39,39,0,0,1,152.67,310Zm16.27,22.73A23,23,0,1,0,175.67,349a23,23,0,0,0-6.73-16.27Z"></path></svg>`}
              />
            </div>
            <div className="cart-dropdown__text">
              Покупайте и получайте
              <br />
              скидки и подарки
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.cart;
};
export default connect(
  mapStateToProps,
  { getCart, deleteItemCart, openCart, getItemFromStorage }
)(HeaderCart);
