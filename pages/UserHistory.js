import React from "react";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import BrandSlider from "../components/BrandSlider";
import { connect } from "react-redux";
import { formatDate, mapOrderHistory } from "../helpers";
import { getItemFromStorage } from "../actions/storage";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], liqPay: {} };
  }
  componentDidMount() {
    let uuid = "";
    try {
      uuid = localStorage.getItem("uuid");
    } catch (error) {
      console.log(error);
    }
    let newState = { orders: [], liqPay: {} };
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=getCartHistory&responce_type=json&site=1&uuid=${uuid}`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status == "success" && data.result.data) {
          newState.orders = mapOrderHistory(data.result.data);
          newState.orders.forEach(item => {
            const { id, payment, status_id, total } = item;
            if (payment == "VISA/MasterCard" && status_id == 33) {
              fetch("https://everlast.scud.com.ua/api/", {
                method: "post",
                body: `action=getLiqpay&responce_type=json&site=1&uuid=${uuid}&order_id=${id}&order_sum=${total}&result_url="https://everlast-original.com.ua/checkout/order-done/${id}/"`,
                mode: "cors",
                headers: new Headers({
                  "Content-Type":
                    "application/x-www-form-urlencoded; charset=utf-8",
                  Accept:
                    "application/json, application/xml, text/plain, text/html, *.*"
                })
              })
                .then(r => r.json())
                .then(data => {
                  if (data.status == "success") {
                    newState.liqPay[id] = data.result;
                    this.setState((state, props) => {
                      return { ...newState };
                    });
                  } else {
                    this.setState((state, props) => {
                      return { ...newState };
                    });
                  }
                });
            }
          });
          this.setState((state, props) => {
            return { ...newState };
          });
        } else {
          //НОТИФИ ОШИБКА
        }
      });
  }

  getOrders = () => {
    let url = "";
    let signature = "";
    let data = "";
    const { orders } = this.state;

    if (orders.length == 0) return <p>У Вас еще не было покупок</p>;
    return orders.map(item => {
      const { id, date, payment, status, status_id, comment, total } = item;
      if (
        payment == "VISA/MasterCard" &&
        status_id == 33 &&
        this.state.liqPay[id]
      ) {
        url = this.state.liqPay[id].url;
        signature = this.state.liqPay[id].signature;
        data = this.state.liqPay[id].data;
      }
      return (
        <div key={id} className="order-history-one-order">
          <div className="order-history-tittle">{`Заказ №${id} (Дата: ${formatDate(
            date
          )} | Статус: ${status})`}</div>
          {Object.keys(item.goods).map(orderGoodsKey => {
            const { name, color, size, amount, price, discount } = item.goods[
              orderGoodsKey
            ];

            return (
              <div key={orderGoodsKey} className="order-history-order-one-item">
                <div className="order-history-orderItem">
                  <div className="order-history-item-option">Товар</div>
                  <div dangerouslySetInnerHTML={{ __html: name }} />
                </div>
                {size != null ? (
                  <div className="order-history-orderItem">
                    <div className="order-history-item-option">Размер</div>
                    <div>{size}</div>
                  </div>
                ) : null}
                <div className="order-history-orderItem">
                  <div className="order-history-item-option">Количество</div>
                  <div>{amount} шт.</div>
                </div>
                <div className="order-history-orderItem">
                  <div className="order-history-item-option">Скидка</div>
                  <div>{discount}%</div>
                </div>
                <div className="order-history-orderItem">
                  <div className="order-history-item-option">Цена</div>
                  <div>{price} грн.</div>
                </div>
              </div>
            );
          })}
          <div className="order-history-footer">
            <div className="order-history-order-total">Всего: {total} грн.</div>
            {payment == "VISA/MasterCard" && status_id == 33 ? (
              <div className="liqpay-button">
                <form
                  method="POST"
                  action={url}
                  acceptCharset="utf-8"
                  target="_blank"
                >
                  <input type="hidden" name="data" defaultValue={data} />
                  <input
                    type="hidden"
                    name="signature"
                    defaultValue={signature}
                  />
                  <input
                    type="submit"
                    name="button__liqpay"
                    value="Оплатить заказ"
                  />
                </form>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <Layout>
        <div>
          <section className="category-brands container">
            <BrandSlider />
          </section>
          <div className="content container">
            <aside className="sidebar-left">
              <AsideNav />
            </aside>
            <main className="static-page">
              <h1>История заказов</h1>
              {this.getOrders()}
            </main>
            <aside className="sidebar-right">
              <AsideRight />
            </aside>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return { ...state.checkout, auth: state.auth.auth };
};

export default connect(
  mapStateToProps,
  { getItemFromStorage }
)(User);
