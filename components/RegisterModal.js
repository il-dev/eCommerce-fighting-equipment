import React from "react";
import InputMask from "react-input-mask";
import { validateRegistration, formBody } from "../helpers/";

export default class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      passwordRepeat: "",
      fio: "",
      address: "",
      email: "",
      registerFormErrors: {
        phone: true,
        password: true,
        passwordRepeat: true,
        fio: true,
        address: true,
        email: true
      }
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
  handleSubmitRegister = () => {
    const { phone, password, passwordRepeat, fio, address, email } = this.state;
    const errors = validateRegistration({
      phone,
      password,
      passwordRepeat,
      fio,
      address,
      email
    });
    const formIsValid = Object.keys(errors).some(key => {
      return errors[key] == "error";
    });
    if (formIsValid) {
      this.setState({ ...this.state, registerFormErrors: { ...errors } });
    } else {
      const params = {
        action: "register",
        responce_type: "json",
        site: 1,
        phone: phone,
        password: password,
        fio: fio,
        email: email,
        address: address
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
          if (data.status == "success") {
            try {
              localStorage.setItem("uuid", data.result.uuid);
              localStorage.setItem("auth", "true");
            } catch (error) {
              console.log(error);
            }

            this.setState({ ...this.state, authorized: true }); //нужно все сделать в редаксе
            this.props.closeModal();
          }
        });
    }
  };
  render() {
    const { phone, password, passwordRepeat, fio, address, email } = this.state;
    const {
      phone: phoneError,
      password: passwordError,
      passwordRepeat: passwordRepeatError,
      fio: fioError,
      address: addressError,
      email: emailError
    } = this.state.registerFormErrors;
    return (
      <div>
        <div className="register-modal-wrapper">
          <h3>Создание профиля</h3>
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
            Ваш email*:
            <input
              type="email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          {emailError == "error" ? (
            <div className="validation-error">Введите правильный email</div>
          ) : null}
          <div className="register-modal-input">
            Ваш пароль*:
            <input
              type="password"
              autoComplete="off"
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
          <div className="register-modal-input">
            Пароль еще раз*:
            <input
              type="password"
              autoComplete="off"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={this.handleInputChange}
            />
          </div>
          {passwordRepeatError == "error" ? (
            <div className="validation-error">Пароли не совпадают</div>
          ) : null}
          <div className="register-modal-input">
            ФИО*:
            <input
              type="text"
              autoComplete="off"
              name="fio"
              value={fio}
              onChange={this.handleInputChange}
            />
          </div>
          {fioError == "error" ? (
            <div className="validation-error">Введите Ваше ФИО</div>
          ) : null}
          <div className="register-modal-input">
            Адрес:
            <input
              type="text"
              autoComplete="off"
              name="address"
              value={address}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="register-modal-button">
          <button
            className="register-modal__button"
            onClick={this.handleSubmitRegister}
          >
            Создать профиль
          </button>
        </div>
      </div>
    );
  }
}
