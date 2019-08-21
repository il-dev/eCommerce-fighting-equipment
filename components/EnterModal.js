import React from "react";
import InputMask from "react-input-mask";

export default class EnterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      registerFormErrors: { phone: true, password: true }
    };
  }
  onPhoneChange = event => {
    const { value } = event.target;
    this.setState((prevState, props) => {
      return { ...prevState, phone: value };
    });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleEnter = () => {
    const { phone, password } = this.state;
    if (phone.length == 13 && password.length > 4) {
      this.props.loginUser(phone, password);
    }
  };
  render() {
    const { phone, password } = this.state;
    const {
      phone: phoneError,
      password: passwordError
    } = this.state.registerFormErrors;
    return (
      <div>
        <div className="register-modal-wrapper">
          <h3>Введите номер телефона и пароль</h3>
          <div className="register-modal-input">
            Ваш телефон*:
            <InputMask
              mask="+38\0999999999"
              maskChar={null}
              value={phone}
              onChange={this.onPhoneChange}
            />
          </div>
          {phoneError == "error" ? (
            <div className="validation-error">
              Введите правильный номер телефона
            </div>
          ) : null}
          <div className="register-modal-input">
            Ваш пароль*:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          {passwordError == "error" ? (
            <div className="validation-error">
              Пароль должен быть не менее 5 символов
            </div>
          ) : null}
        </div>
        <div className="register-modal-button">
          <button className="register-modal__button" onClick={this.handleEnter}>
            Войти
          </button>
        </div>
      </div>
    );
  }
}
