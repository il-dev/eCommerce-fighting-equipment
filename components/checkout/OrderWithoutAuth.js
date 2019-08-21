import React, { Component } from "react";
import InputMask from "react-input-mask";
import { unescapeHtml, validateEmail, validatePhone } from "../../helpers";

export default class OrderWithoutAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fio: "",
      phone: "",
      email: "",
      address: "",
      comment: "",
      delivery: "",
      payment: "",
      success: false,
      html: "",
      loading: false,
      validation: {
        fio: true,
        phone: true,
        email: true,
        address: true,
        delivery: true,
        payment: true
      }
    };
  }

  render() {
    // console.log("STATE IN ORDERWITHOUTAUTH", this.state);
    return (
      <div
        className={
          this.state.loading
            ? "order-whithout-auth-wrapper loading"
            : "order-whithout-auth-wrapper"
        }
      >
        {this.state.success ? (
          <p className="order-whithout-auth-success">
            Поздравляем, Вам заказ оформлен. Менеджер свяжется с Вами в
            ближайшее время
          </p>
        ) : null}
        {!this.state.success ? (
          <div>
            <h1>Оформление заказа</h1>
            <form className="order-whithout-auth">
              <div className="checkout-form__input-wrapper">
                <div className="checkout-form__input-name">ФИО*</div>
                <div className="checkout-form__input">
                  <input
                    type="text"
                    name="fio"
                    onChange={this.handleInputChange}
                    value={this.state.fio}
                  />
                </div>
                <div className="checkout-form__input-descr">
                  На это имя будут оформлены все документы
                </div>
                {this.state.validation.fio ? null : (
                  <div className="validation-error">
                    Введите корректные данные
                  </div>
                )}
              </div>
              <div className="checkout-form__input-wrapper">
                <div className="checkout-form__input-name">Телефон*</div>
                <div className="checkout-form__input">
                  <InputMask
                    mask="+38\0999999999"
                    maskChar={null}
                    value={this.state.phone}
                    onChange={this.onPhoneChange}
                  />
                </div>
                <div className="checkout-form__input-descr">
                  Контактный телефон только на случай вопросов по вашему заказу
                </div>
                {this.state.validation.phone ? null : (
                  <div className="validation-error">
                    Введите корректный телефон
                  </div>
                )}
              </div>
              <div className="checkout-form__input-wrapper">
                <div className="checkout-form__input-name">Адрес*</div>
                <div className="checkout-form__input">
                  <input
                    type="text"
                    name="address"
                    onChange={this.handleInputChange}
                    value={this.state.address}
                  />
                </div>
                <div className="checkout-form__input-descr">
                  Введите адрес доставки
                </div>
                {this.state.validation.address ? null : (
                  <div className="validation-error">Введите адрес</div>
                )}
              </div>
              <div className="checkout-form__input-wrapper">
                <div className="checkout-form__input-name">Email*</div>
                <div className="checkout-form__input">
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </div>
                <div className="checkout-form__input-descr">
                  На этот почтовый ящик пришлем подробности заказа
                </div>
                {this.state.validation.email ? null : (
                  <div className="validation-error">
                    Введите корректный email
                  </div>
                )}
              </div>
              <div className="checkout-form__input-wrapper">
                <div className="checkout-form__input-name">Комментарий</div>
                <div className="checkout-form__input">
                  <input
                    type="text"
                    name="comment"
                    onChange={this.handleInputChange}
                    value={this.state.comment}
                  />
                </div>
                <div className="checkout-form__input-descr">
                  Ваш комментарий
                </div>
              </div>
              <div>
                <h3>Выберите способ доставки:</h3>
                {this.getDelivery()}
              </div>
              <div>
                <h3>Выберите способ оплаты:</h3>
                {this.getPayment()}
              </div>
              <div className="order-without-auth-button">
                <button
                  onClick={this.handleSubmitOrder}
                  className="products-buy__btn"
                >
                  ОФОРМИТЬ ЗАКАЗ
                </button>
              </div>
            </form>
          </div>
        ) : null}
        {this.state.payment == 9 && this.state.success ? (
          <div
            className="liqpay-button liqpay-button-whithout"
            dangerouslySetInnerHTML={{ __html: this.state.html }}
          />
        ) : null}
        <div className={this.state.loading ? "spinner" : "hide-spinner"}>
          <div className="lds-spinner">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }
  handleSubmitOrder = event => {
    event.preventDefault();
    if (!this.validate()) return false;
    this.setState({ ...this.state, loading: true });
    const {
      fio,
      phone,
      email,
      delivery,
      address,
      payment,
      comment
    } = this.state;
    const { goods } = this.props;
    const goodsToSend = goods.map(item => {
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
        if (data.status == "success" && payment == 9) {
          this.setState({ ...this.state, success: true });
          const { order_id, total_price } = data.result.order;
          this.getLiqPay(order_id, total_price);
        } else if (data.status == "success") {
          this.setState({ ...this.state, success: true, loading: false });
        }
      });
  };
  getLiqPay = (order_id, order_sum) => {
    const uuid = localStorage.getItem("uuid");
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=getLiqpay&responce_type=json&site=1&uuid=${uuid}&order_id=${order_id}&order_sum=${order_sum}&result_url="https://everlast-original.com.ua/checkout/order-done/"`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status == "success") {
          this.setState({
            ...this.state,
            html: data.result.html,
            loading: false
          });
        } else {
          //НОТИФИ ОШИБКА
          return false;
        }
      });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState((prevState, props) => {
      return { ...prevState, [name]: value };
    });
  };
  onPhoneChange = event => {
    const { value } = event.target;
    this.setState((prevState, props) => {
      return { ...prevState, phone: value };
    });
  };
  handleChangeCheckbox = (event, id) => {
    const { name } = event.target;
    this.setState((prevState, props) => {
      return { ...prevState, [name]: id };
    });
  };
  getDelivery = () => {
    const deliveryTypes = this.props.delivery;
    if (!deliveryTypes) return false;
    return (
      <div className="delivery-types">
        <ul className="delivery-types-list">
          {deliveryTypes.map(item => {
            return (
              <li className="delivery-types-li" key={item.id}>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    onChange={event => {
                      this.handleChangeCheckbox(event, item.id);
                    }}
                    checked={this.state.delivery == item.id ? true : false}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: unescapeHtml(item.description)
                    }}
                  />
                  {item.price != 0 ? (
                    <span>{` (${item.price} грн)`}</span>
                  ) : null}
                </label>
              </li>
            );
          })}
        </ul>
        {this.state.validation.delivery ? null : (
          <div className="validation-error">Выберите метод доставки</div>
        )}
      </div>
    );
  };
  getPayment = () => {
    const payTypes = this.props.payment;
    return (
      <div className="delivery-types">
        <ul className="delivery-types-list">
          {payTypes.map(item => {
            return (
              <li className="delivery-types-li" key={item.id}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    onChange={event => {
                      this.handleChangeCheckbox(event, item.id);
                    }}
                    checked={this.state.payment == item.id ? true : false}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: unescapeHtml(item.description)
                    }}
                  />
                </label>
              </li>
            );
          })}
        </ul>
        {this.state.validation.payment ? null : (
          <div className="validation-error">Выберите способ оплаты</div>
        )}
      </div>
    );
  };
  validate = () => {
    const { fio, phone, email, address, delivery, payment } = this.state;
    let validation = { fio: true, email: true, phone: true };
    if (fio.length < 5) {
      validation.fio = false;
    } else {
      validation.fio = true;
    }
    if (address.length < 5) {
      validation.address = false;
    } else {
      validation.address = true;
    }
    if (delivery == "") {
      validation.delivery = false;
    } else {
      validation.delivery = true;
    }
    if (payment == "") {
      validation.payment = false;
    } else {
      validation.payment = true;
    }
    if (!validateEmail(email)) {
      validation.email = false;
    } else {
      validation.email = true;
    }
    if (!validatePhone(phone)) {
      validation.phone = false;
    } else {
      validation.phone = true;
    }

    this.setState((prevState, props) => {
      return { ...prevState, validation: validation };
    });

    if (this.isErrors(validation)) {
      //have errors
      return false;
    } else {
      return true;
    }
  };
  isErrors = errors => {
    let result = false;
    for (let key in errors) {
      if (errors[key] == false) result = true;
    }
    return result;
  };
}
