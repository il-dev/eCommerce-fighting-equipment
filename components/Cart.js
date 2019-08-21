import React from "react";
import Link from "next/link";
import "isomorphic-unfetch";
import { mapProductsAndAmount } from "../helpers/";
import { prefixForSources } from "../constants";
import { connect } from "react-redux";
import {
  setCart,
  getCart,
  deleteItemCart,
  updateCart,
  addToCart,
  closeCart
} from "../actions/cart";
import { getItemFromStorage } from "../actions/storage";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: this.props.goods || [],
      amount: mapProductsAndAmount(props.goods) || {},
      outOfLimit: {}
    };
  }
  componentDidMount() {
    const uuid = this.props.getItemFromStorage("uuid");
    if (!uuid) return false;
    this.props.getCart();
  }
  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.goods != state.goods) {
      update.goods = props.goods;
      update.amount = mapProductsAndAmount(props.goods);
    }
    if (mapProductsAndAmount(props.goods) != state.amount) {
      update.amount = mapProductsAndAmount(props.goods);
    }
    if (Object.keys(update).length > 0) return update;
    return null;
  }
  handleAmountChange = (event, goods_id) => {
    const value = event.target.value;
    const { inStock } = this.props;
    if (value > inStock[goods_id]) {
      this.setState({
        ...this.state,
        outOfLimit: { ...this.state.outOfLimit, [goods_id]: true }
      });
      return;
    }
    this.props.updateCart(goods_id, value);
  };
  incrementAmount = (event, goods_id) => {
    const value = this.state.amount[goods_id];
    const { inStock } = this.props;
    if (+value + 1 > inStock[goods_id]) {
      this.setState({
        ...this.state,
        outOfLimit: { ...this.state.outOfLimit, [goods_id]: true }
      });
      return;
    }
    this.props.updateCart(goods_id, +value + 1);
  };
  decrementAmount = (event, goods_id) => {
    const value = this.state.amount[goods_id];
    if (value - 1 != 0) this.props.updateCart(goods_id, value - 1);
  };
  getProductsInCart = () => {
    let sum = 0;
    let goodsCount = 0;
    let result = {};
    let discountSum = 0;
    const { inStock } = this.props;
    result.goods = this.state.goods.map(item => {
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
              ? "cart-main-item cart-main-item-out-of-stock"
              : "cart-main-item"
          }
          key={goods_id}
        >
          <div className="cart-main-item__img">
            <img src={`${prefixForSources}${photo}`} alt="" />
          </div>
          <div className="cart-main-item__info">
            <div
              className="cart-main-item__name"
              onClick={this.handleGoToCheckout}
            >
              <Link
                href={{ pathname: `/Product`, query: { id: link_article } }}
                as={`${link_article}`}
              >
                <a
                  href={link_article}
                  dangerouslySetInnerHTML={{ __html: name }}
                />
              </Link>
            </div>
            <div className="cart-main-item__size">
              <div>Цвет: {color}</div>
              {size ? (
                <div>
                  <span>Размер: </span>
                  <span dangerouslySetInnerHTML={{ __html: size }} />
                </div>
              ) : (
                "Один размер"
              )}
            </div>
            <div className="cart-main-item__price">
              <div className="cart-main-items__show-on-mobile">Цена</div>
              {price} <span>грн</span>
            </div>
            <div className="cart-main-item__amount">
              <div className="cart-main-items__show-on-mobile">Количество</div>
              <button
                type="button"
                className="amount__down"
                onClick={event => {
                  this.decrementAmount(event, goods_id);
                }}
              >
                -
              </button>
              <span className="cart-main-item__amount_value">
                <input
                  type="text"
                  className="cart-main-item__input"
                  value={this.state.amount[goods_id]}
                  onChange={event => {
                    this.handleAmountChange(event, goods_id);
                  }}
                />
                шт.
              </span>
              <button
                type="button"
                className="amount__up"
                onClick={event => {
                  this.incrementAmount(event, goods_id);
                }}
              >
                +
              </button>
              <div
                className={
                  this.state.outOfLimit[goods_id] ? "out-limit" : "in-limit"
                }
              >
                В наличии {inStock[goods_id]} шт.
              </div>
            </div>
            <div className="cart-main-item__sum-mobile">
              <div className="cart-main-items__show-on-mobile">Сумма:</div>
              {price * amount} <span>грн</span>
            </div>
          </div>
          <div className="cart-main-item__sum">
            <div className="cart-main-item__sum-nubmer">
              {price * amount} <span>грн</span>
            </div>
          </div>
          <div
            className="cart-main-item__close"
            onClick={() => {
              this.handleDeleteItem(goods_id);
            }}
          >
            <span className="close" />
          </div>
          <div className="main-cart-out">Нет в наличии</div>
        </div>
      );
    });
    result.sum = sum;
    result.goodsCount = goodsCount;
    result.discountSum = discountSum;
    return result;
  };
  handleDeleteItem = id => {
    this.props.deleteItemCart(id);
  };
  handleGoToCheckout = () => {
    this.props.closeCart();
  };
  render() {
    let sum = 0;
    let goodsCount = 0;
    let discountSum = 0;
    let goods = {};
    if (this.state.goods && this.state.goods.length > 0) {
      const data = this.getProductsInCart();
      goodsCount = data.goodsCount;
      sum = data.sum;
      goods = data.goods;
      discountSum = data.discountSum;
    }
    return (
      <div>
        <h2 className="cart-title">Корзина</h2>
        <div className="cart-main-items">
          {Object.keys(goods).length == 0 ? null : goods}
        </div>
        <div className="cart-actions">
          <div className="cart-continue-shop__wrapper">
            <div className="cart-actions__sum">
              Ваша скидка: {discountSum} <span>грн</span>
            </div>
            <div className="tac">
              <button
                className="cart-continue-shop"
                onClick={this.props.closeModal}
              >
                ПРОДОЛЖИТЬ ПОКУПКИ
              </button>
            </div>
          </div>
          <div className="cart-actions-sum__wrapper">
            <div className="cart-actions__sum">
              Итого: {sum} <span>грн</span>
            </div>
            <div onClick={this.handleGoToCheckout}>
              <Link href={{ pathname: "/Checkout" }} as="/checkout/">
                <button className="cart-checkout">ОФОРМИТЬ ЗАКАЗ</button>
              </Link>
            </div>
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
  {
    setCart,
    addToCart,
    getCart,
    deleteItemCart,
    updateCart,
    closeCart,
    getItemFromStorage
  }
)(Cart);
