import React from "react";
import { connect } from "react-redux";
import { getCart, deleteItemCart, openCart } from "../../actions/cart";
import { getItemFromStorage } from "../../actions/storage";
import { prefixForSources } from "../../constants";
import Link from "next/link";

class CartCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goods: props.goods || [] };
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
  getProductsInCart = () => {
    let sum = 0;
    let goodsCount = 0;
    let result = {};
    let discountSum = 0;
    const { inStock } = this.props;
    result.goods = (
      <div className="cart-checkout-wrapper">
        <div className="cart-checkout-items-wrapper">
          {this.state.goods.map(item => {
            const {
              link_article,
              goods_id,
              price,
              name,
              amount,
              size,
              color,
              base_price
            } = item;
            const photo = item.photo.thumb;
            if (inStock[goods_id] && inStock[goods_id] >= amount) {
              sum += price * amount;
              goodsCount += +amount;
              discountSum += (base_price - price) * amount;
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
                  <Link href={link_article}>
                    <a
                      href={link_article}
                      className="header-cart-item__link"
                      dangerouslySetInnerHTML={{ __html: name }}
                    />
                  </Link>
                  {color != null ? <div>Цвет: {color}</div> : null}
                  {size != null ? (
                    <div>
                      <span>Размер: </span>
                      <span dangerouslySetInnerHTML={{ __html: size }} />
                    </div>
                  ) : null}
                  <div className="header-cart-item__sum">{`${amount} x ${price} грн`}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
    result.sum = sum;
    result.goodsCount = goodsCount;
    result.discountSum = discountSum;
    return result;
  };
  render() {
    let sum = 0;
    let goodsCount = 0;
    let goods = {};
    let discountSum = 0;
    if (this.state.goods.length > 0) {
      const data = this.getProductsInCart();
      goodsCount = data.goodsCount;
      sum = data.sum;
      goods = data.goods;
      discountSum = data.discountSum;
    }

    return (
      <div className="checkout-cart-wrapper">
        <h3>Корзина</h3>
        {this.state.goods.length > 0 ? goods : null}
        <div className="checkout-cart-sum">
          <div>К оплате:</div>
          <div className="checkout-cart__sum">
            {sum} <span>грн</span>
          </div>
        </div>
        <div className="checkout-cart-sum">
          <div>Ваша скидка:</div>
          <div className="checkout-cart__sum">
            {discountSum} <span>грн</span>
          </div>
        </div>
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
)(CartCheckout);
