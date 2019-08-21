import React from "react";
import { formBody, unescapeHtml } from "../../helpers/";
export default class Delivery extends React.Component {
  // static propTypes = {
  // 	name: React.PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      deliveryTypes: [],
      currentDelivery: props.data.delivery,
      deliveryDescr: "",
      address: props.data.address,
      validation: false
    };
  }
  componentDidMount() {
    const params = {
      action: "getDelivery",
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
        this.setState({ ...this.state, deliveryTypes: data.result });
      });
  }
  handleChangeCheckbox = (event, id, description) => {
    this.setState((prevState, props) => {
      return { ...prevState, currentDelivery: id, deliveryDescr: description };
    });
  };

  handleAdressChenge = event => {
    const value = event.target.value;
    this.setState((prevState, props) => {
      return { ...prevState, address: value };
    });
  };
  isValidated = () => {
    const { currentDelivery, address, deliveryDescr } = this.state;
    if (!currentDelivery || currentDelivery.length == 0) {
      this.setState((prevState, props) => {
        return { ...prevState, validation: true };
      });
      return false;
    }
    this.props.addToRedecer(currentDelivery, address, deliveryDescr);
    return true;
  };
  render() {
    return (
      <div className="checkout-wrapper">
        <h2>Выберите способ доставки:</h2>
        <div className="checkout-form__input-wrapper">
          <div className="checkout-form__input-name">Ваш адрес*</div>
          <div className="checkout-form__input checkout-form__input-address">
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleAdressChenge}
            />
          </div>
        </div>
        <div className="delivery-types">
          <ul className="delivery-types-list">
            {this.state.deliveryTypes.map(item => {
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
                        this.state.currentDelivery == item.id ? true : false
                      }
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
        </div>
        {!this.state.validation ? null : (
          <div className="validation-error">Выберите метод доставки</div>
        )}
      </div>
    );
  }
}
