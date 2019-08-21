import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrderDone } from "../../actions/cart";

class Congrats extends Component {
  constructor(props) {
    super(props);
    this.state = { html: "", url: "", data: "", signature: "", loading: false };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (prevState.signature != nextProps.checkout.liqPay.signature) {
      const { html, url, data, signature } = nextProps.checkout.liqPay;
      update.html = html;
      update.url = url;
      update.data = data;
      update.signature = signature;
    }

    if (prevState.loading != nextProps.checkout.liqPay.liqPayLoading) {
      update.loading = nextProps.checkout.liqPay.liqPayLoading;
    }
    if (Object.keys(update).length > 0) return update;
    return null;
  }
  componentDidMount = () => {
    const { html, url, data, signature } = this.props.checkout.liqPay;
    if (!html) return false;
    this.setState({ ...this.state, html, url, data, signature });
  };

  render() {
    const { html, loading, url, data, signature } = this.state;
    const { payment } = this.props.checkout;
    return (
      <div className="checkout-wrapper__overlay">
        <div
          className={
            loading
              ? "checkout-wrapper tac checkout-wrapper__loading"
              : "checkout-wrapper tac"
          }
        >
          <h2>Поздравляем!</h2>
          <p>Ваш заказ оформлен, ожидайте звонка менеджера.</p>
          {payment == 9 ? (
            <div className="liqpay-button">
              <form
                method="POST"
                action={url}
                acceptCharset="utf-8"
                // target="_blank"
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    checkout: state.checkout
  };
};
export default connect(
  mapStateToProps,
  {
    setOrderDone
  }
)(Congrats);
