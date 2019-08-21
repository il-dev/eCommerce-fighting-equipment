import React from "react";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import BrandSlider from "../components/BrandSlider";
import { formBody } from "../helpers";
import Link from "next/link";

export default class Delivery extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id };
  }
  constructor(props) {
    super(props);
    this.state = { order: "", loading: true };
  }
  componentDidMount() {
    this.fetchOrderData();
  }
  fetchOrderData = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    try {
      const uuid = localStorage.getItem("uuid");
      const params = {
        action: "getOrder",
        responce_type: "json",
        site: 1,
        uuid: uuid,
        order_id: this.props.id
      };
      fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: formBody(params),
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      })
        .then(r => r.json())
        .then(data => {
          if (data.result == "empty") {
            this.setState({
              ...this.state,
              order: "",
              loading: false
            });
          } else {
            this.setState({
              ...this.state,
              order: data.result.order[this.props.id],
              loading: false
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log("props", this.props);
    console.log("state", this.state);
    const {
      payment_description,
      status,
      id,
      payment,
      status_id,
      loading
    } = this.state.order;
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
              <h1>Проверка заказа № {id}:</h1>
              <div className="checkout-done">
                <div className={loading ? "spinner" : "hide-spinner"}>
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
                <p className="checkout-done-text">
                  Статус: {status} <br /> Способ оплаты: {payment_description}
                </p>
              </div>
              <div
                className={
                  payment == "VISA/MasterCard" && status_id == 33
                    ? "checkout-done-refresh-status"
                    : "checkout-done-refresh-status hide"
                }
              >
                <p>
                  Если Вы оплатили картой, а статус заказа не изменился, то
                  попробуйте обновить статус заказа.
                </p>
                <button
                  className="product-options__buy"
                  onClick={this.fetchOrderData}
                >
                  Обновить статус заказа
                </button>
                <p>
                  Если Вы хотите оплатить заказ после неудачной оплаты, то это
                  можно сделать на старнице истории заказов
                </p>
                <Link href={{ pathname: `/UserHistory` }} as={`/user/history/`}>
                  <button className="product-options__buy">
                    Перейти в историю заказов
                  </button>
                </Link>
              </div>
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
