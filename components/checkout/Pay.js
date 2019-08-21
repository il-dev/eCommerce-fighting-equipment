import React from "react";
import { formBody, unescapeHtml } from "../../helpers/";
export default class Pay extends React.Component {
  // static propTypes = {
  // 	name: React.PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = { payTypes: [], currentPayType: null, validation: false };
  }
  componentDidMount() {
    const params = {
      action: "getPayment",
      responce_type: "json",
      site: 1
    };
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: formBody(params),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        this.setState({ ...this.state, payTypes: data.result });
      });
  }
  handleChangeCheckbox = (event, id, description) => {
    this.setState({ ...this.state, currentPayType: id }, () => {
      this.props.addToRedecer(this.state.currentPayType, description);
    });
  };
  static getDerivedStateFromProps(props, state) {
    const { payment } = props.data;
    if (!state.currentPayType) return { currentPayType: payment };
    return null;
  }
  isValidated = () => {
    const { currentPayType } = this.state;
    if (!currentPayType || currentPayType.length == 0) {
      this.setState((prevState, props) => {
        return { ...prevState, validation: true };
      });
      return false;
    }
    return true;
  };
  render() {
    return (
      <div className="checkout-wrapper">
        <h2>Выберите способ оплаты:</h2>
        <div className="delivery-types">
          <ul className="delivery-types-list">
            {this.state.payTypes.map(item => {
              return (
                <li className="delivery-types-li" key={item.id}>
                  <label>
                    <input
                      type="radio"
                      name="deliveryType"
                      onChange={event => {
                        this.handleChangeCheckbox(
                          event,
                          item.id,
                          unescapeHtml(item.description)
                        );
                      }}
                      checked={
                        this.state.currentPayType == item.id ? true : false
                      }
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
        </div>
        {!this.state.validation ? null : (
          <div className="validation-error">Выберите метод оплаты</div>
        )}
      </div>
    );
  }
}
