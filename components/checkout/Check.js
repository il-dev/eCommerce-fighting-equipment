import React from "react";
import { unescapeHtml } from "../../helpers/";

export default class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: "", order_id: "", total_price: 0 };
  }
  isValidated = () => {
    const { fio, phone, email, delivery, address, payment } = this.props.data;
    const { comment } = this.state;
    const { goods } = this.props;
    const goodsToSend = goods
      .filter(filteritem => {
        if (this.props.inStock[filteritem.goods_id] >= filteritem.amount) {
          return true;
        }
        return false;
      })
      .map(item => {
        return { goods_id: item.goods_id, amount: item.amount };
      });
    const uuid = localStorage.getItem("uuid");
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=setOrder&responce_type=json&site=1&uuid=${uuid}&fio=${fio}&phone=${phone}&address=${address}&email=${email}&comment=${comment}&delivery=${delivery}&payment=${payment}&goods=${JSON.stringify(
        goodsToSend
      )}`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status == "success") {
          const { order_id, total_price } = data.result.order;
          this.props.setOrderDoneAndGetLiqPay(
            order_id,
            total_price,
            payment,
            goodsToSend
          );
          return true;
        } else {
          //НОТИФИ ОШИБКА
          return false;
        }
      });
  };
  handleCommentChenge = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const {
      fio,
      phone,
      deliveryDescr,
      paymentDescr,
      address
    } = this.props.data;
    return (
      <div className="checkout-wrapper checkout-check">
        <h2>Проверьте информацию о заказе:</h2>
        <div>ФИО: {fio}</div>
        <div>Тел.: {phone}</div>
        <div>Алрес: {address}</div>
        <div>
          Доставка:
          <span
            dangerouslySetInnerHTML={{ __html: unescapeHtml(deliveryDescr) }}
          />
        </div>
        <div>Оплата: {paymentDescr}</div>
        <div>
          <div className="checkout-form__input-wrapper">
            <div className="checkout-form__input-name">Комментарий</div>
            <div className="checkout-form__input checkout-form__input-comment">
              <textarea
                rows="10"
                cols="45"
                name="comment"
                onChange={this.handleCommentChenge}
                value={this.state.comment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
