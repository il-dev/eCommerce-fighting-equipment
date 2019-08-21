import React from "react";
import StepZilla from "react-stepzilla";
import Layout from "../components/layout/Layout";
import PersonalInfo from "../components/checkout/PersonalInfo";
import Delivery from "../components/checkout/Delivery";
import CartCheckout from "../components/checkout/CartCheckout";
import Check from "../components/checkout/Check";
import Congrats from "../components/checkout/Congrats";
import Pay from "../components/checkout/Pay";
import { connect } from "react-redux";
import {
  addPersonalInfo,
  addPersonalAddress,
  addPayInfo,
  getUserInfo,
  loginUser
} from "../actions/user";
import { setOrderDoneAndGetLiqPay } from "../actions/cart";
import RegisterModal from "../components/RegisterModal";
import EnterModal from "../components/EnterModal";
import Modal from "react-modal";
import OrderWithoutAuth from "../components/checkout/OrderWithoutAuth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: "300px",
    transform: "translate(-50%, -50%)",
    zIndex: "9999999"
  }
};
Modal.setAppElement("#__next");
class Checkout extends React.Component {
  static async getInitialProps({ req }) {
    const payment = await fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=getPayment&responce_type=json&site=1`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    });
    const paymentJson = await payment.json();
    const delivery = await fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=getDelivery&responce_type=json&site=1`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    });
    const deliveryJson = await delivery.json();

    return {
      initialCheckoutData: {
        payment: paymentJson.result,
        delivery: deliveryJson.result
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      userData: props.checkout,
      registerModalIsOpen: false,
      enterModalIsOpen: false
    };
  }
  componentDidMount() {
    this.props.getUserInfo();
  }

  static getDerivedStateFromProps(props, state) {
    const {
      fio,
      phone,
      email,
      delivery,
      address,
      payment,
      deliveryDescr,
      paymentDescr,
      error
    } = props.checkout;
    if (error !== state.userData.error)
      return {
        userData: {
          fio,
          phone,
          email,
          delivery,
          address,
          payment,
          deliveryDescr,
          paymentDescr,
          error
        },
        registerModalIsOpen: false,
        enterModalIsOpen: false
      };
    if (props.checkout != state.userData)
      return {
        userData: {
          fio,
          phone,
          email,
          delivery,
          address,
          payment,
          deliveryDescr,
          paymentDescr,
          error
        }
      };
    return null;
  }
  openModal = type => {
    if (type == "register") {
      this.setState({ registerModalIsOpen: true });
    } else {
      this.setState({ enterModalIsOpen: true });
    }
  };

  closeModal = () => {
    this.setState({ registerModalIsOpen: false, enterModalIsOpen: false });
  };
  render() {
    const {
      fio,
      phone,
      email,
      delivery,
      deliveryDescr,
      paymentDescr,
      address,
      payment,
      error
    } = this.state.userData;
    let goodsCount = 0;
    if (this.props.cart && this.props.cart.goods) {
      goodsCount = this.props.cart.goods.length;
    }
    const steps = [
      {
        name: "Личная информация",
        component: (
          <PersonalInfo
            addToRedecer={this.props.addPersonalInfo}
            data={{ fio, phone, email }}
            error={error}
          />
        )
      },
      {
        name: "Доставка",
        component: (
          <Delivery
            addToRedecer={this.props.addPersonalAddress}
            data={{ delivery, address }}
          />
        )
      },
      {
        name: "Оплата",
        component: (
          <Pay addToRedecer={this.props.addPayInfo} data={{ payment }} />
        )
      },
      {
        name: "Подтверждение",
        component: (
          <Check
            goods={this.props.cart.goods}
            inStock={this.props.cart.inStock}
            reserved={this.props.cart.reserved}
            data={{
              fio,
              phone,
              email,
              delivery,
              deliveryDescr,
              paymentDescr,
              address,
              payment
            }}
            setOrderDoneAndGetLiqPay={this.props.setOrderDoneAndGetLiqPay}
          />
        )
      },
      {
        name: "Заказ подтвержден",
        component: <Congrats />
      }
    ];
    return (
      <Layout>
        <div className="content container checkout-page">
          <main className="checkout">
            {!error && goodsCount > 0 ? (
              <div className="step-progress">
                <StepZilla
                  steps={steps}
                  nextTextOnFinalActionStep="ОФОРМИТЬ ЗАКАЗ"
                  nextButtonText="Продолжить"
                  backButtonText="Назад"
                  nextButtonCls="pull-right"
                  backButtonCls="pull-left"
                  prevBtnOnLastStep={false}
                />
              </div>
            ) : null}
            {error && goodsCount > 0 ? (
              <div className="checkout-register">
                <OrderWithoutAuth
                  delivery={this.props.initialCheckoutData.delivery}
                  payment={this.props.initialCheckoutData.payment}
                  goods={this.props.cart.goods}
                />
                <h2>
                  Вы можете войти в свой профиль, создать новый или оформить
                  заказ без регистрации.
                </h2>
                <div className="checkout-actions">
                  <div>
                    <button
                      className="checkout-actions__button"
                      onClick={() => {
                        this.openModal("register");
                      }}
                    >
                      СОЗДАТЬ ПРОФИЛЬ
                    </button>
                  </div>
                  <div>
                    <button
                      className="checkout-actions__button"
                      onClick={() => {
                        this.openModal("enter");
                      }}
                    >
                      ВОЙТИ В ПРОФИЛЬ
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {goodsCount == 0 ? (
              <p className="cart-empty-text">Добавьте товары в корзину</p>
            ) : null}
          </main>
          <aside className="checkout-aside">
            <CartCheckout />
          </aside>
        </div>
        <Modal
          isOpen={this.state.registerModalIsOpen}
          style={customStyles}
          contentLabel="Зарегестрироваться"
        >
          <div className="cart-main-close">
            <span className="close" onClick={this.closeModal} />
          </div>
          <RegisterModal closeModal={this.closeModal} />
        </Modal>
        <Modal
          isOpen={this.state.enterModalIsOpen}
          style={customStyles}
          contentLabel="Войти"
        >
          <div className="cart-main-close">
            <span className="close" onClick={this.closeModal} />
          </div>
          <EnterModal
            closeModal={this.closeModal}
            loginUser={this.props.loginUser}
          />
        </Modal>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    checkout: state.checkout,
    cart: state.cart
  };
};
export default connect(
  mapStateToProps,
  {
    addPersonalInfo,
    getUserInfo,
    addPersonalAddress,
    addPayInfo,
    loginUser,
    setOrderDoneAndGetLiqPay
  }
)(Checkout);
