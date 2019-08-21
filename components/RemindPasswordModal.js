import React from "react";
import { validateEmail, validatePhone, formBody } from "../helpers/";

export default class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      validateValueError: false,
      valueDoesNotExist: false,
      openHiddenPart: false,
      openMainPart: true,
      openValidateCode: false,
      openFinalPart: false,
      openOneTimeCodeInvalid: false,
      password: "",
      repeatPassword: "",
      passwordValid: true,
      validateCode: "",
      uuid: ""
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };
  valueValidate = value => {
    if (validateEmail(value)) {
      return { value: { email: value }, result: true };
    }
    if (validatePhone(value)) {
      return { value: { phone: value }, result: true };
    }
    return { result: false };
  };
  handleSubmitRemind = () => {
    const { value } = this.state;
    const validatedValues = this.valueValidate(value);
    if (!validatedValues.result) {
      this.setState({ ...this.state, validateValueError: true });
    } else {
      let params = {
        action: "sendCode",
        responce_type: "json",
        site: 1
      };
      params = Object.assign(params, validatedValues.value);
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
            this.setState({
              ...this.state,
              openMainPart: false,
              openOneTimeCodeInvalid: false,
              openValidateCode: true,
              validateCode: ""
            });
          } else if (data.status == "failure") {
            this.setState({
              ...this.state,
              valueDoesNotExist: true
            });
          }
        });
    }
  };
  handleSubmitCode = () => {
    const { value, validateCode } = this.state;
    const validatedValues = this.valueValidate(value);
    let params = {
      action: "verificationCode",
      responce_type: "json",
      site: 1,
      code: validateCode
    };
    params = Object.assign(params, validatedValues.value);
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
        if (data.status == "success") {
          this.setState({
            ...this.state,
            openMainPart: false,
            openValidateCode: false,
            openHiddenPart: true,
            uuid: data.result.uuid
          });
        } else if (data.status == "failure") {
          this.setState({
            ...this.state,
            openMainPart: false,
            openValidateCode: false,
            openHiddenPart: false,
            openOneTimeCodeInvalid: true
          });
        }
      });
  };
  validatePasswords = () => {
    const { password, repeatPassword } = this.state;
    if (
      password.length < 5 ||
      repeatPassword.length < 5 ||
      password !== repeatPassword
    ) {
      this.setState({ ...this.state, passwordValid: false });
      return false;
    } else {
      this.setState({ ...this.state, passwordValid: true });
      return true;
    }
  };
  changePass = () => {
    const { uuid, password } = this.state;
    if (this.validatePasswords()) {
      const params = {
        action: "setNewPassword",
        responce_type: "json",
        site: 1,
        uuid: uuid,
        password: password
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
            this.setState({
              ...this.state,
              openMainPart: false,
              openValidateCode: false,
              openHiddenPart: false,
              openFinalPart: true
            });
            //close modal
            setTimeout(() => {
              this.props.closeModal();
            }, 3000);
          }
        });
    }
  };
  returnTostart = () => {
    this.setState({
      ...this.state,
      openMainPart: true,
      openValidateCode: false,
      openHiddenPart: false,
      openFinalPart: false,
      openOneTimeCodeInvalid: false
    });
  };
  render() {
    const {
      value,
      validateValueError,
      openHiddenPart,
      password,
      repeatPassword,
      passwordValid,
      openValidateCode,
      openOneTimeCodeInvalid,
      validateCode,
      openMainPart,
      openFinalPart,
      valueDoesNotExist
    } = this.state;
    return (
      <div>
        <div className="register-modal-wrapper">
          <h3>Восстановление пароля</h3>
          <div className={openMainPart ? null : "hide"}>
            <div className="register-modal-input">
              Ваш email или телефон*:
              <input
                type="text"
                name="value"
                value={value}
                autoComplete="off"
                onChange={this.handleInputChange}
              />
            </div>
            {validateValueError ? (
              <div className="validation-error">
                Введите кореектный email или телефон
              </div>
            ) : null}
            {valueDoesNotExist ? (
              <div className="validation-error">
                Ввведенный email или телефон не связан ни с одним аккаунтом!
              </div>
            ) : null}
            <div className="register-modal-button">
              <button
                className="register-modal__button"
                onClick={this.handleSubmitRemind}
              >
                Восстановить
              </button>
            </div>
          </div>
          <div className={openValidateCode ? null : "hide"}>
            <div className="register-modal-input">
              Введите код:
              <input
                type="text"
                name="validateCode"
                autoComplete="off"
                value={validateCode}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="register-modal-button">
              <button
                className="register-modal__button"
                onClick={this.handleSubmitCode}
              >
                Отправить
              </button>
            </div>
          </div>
          <div className={openOneTimeCodeInvalid ? null : "hide"}>
            <div className="register-modal-input">
              <h3 className="register-modal_code-invalid">Ошибка</h3>
              <p className="register-modal_p-invalid">Введен не верный код.</p>
            </div>
            <div className="register-modal-button">
              <button
                className="register-modal__button"
                onClick={this.handleSubmitRemind}
              >
                Отправить еще раз
              </button>
            </div>
            <div className="register-modal-button">
              <button
                className="register-modal__button register-modal__button-return"
                onClick={this.returnTostart}
              >
                В начало
              </button>
            </div>
          </div>
          <div className={openFinalPart ? null : "hide"}>
            <div className="register-modal-input">
              <h3>Поздравляем!</h3>
              <p className="remind-password__final">
                Ваш пароль успешно изменен
              </p>
            </div>
          </div>
          <div className={openHiddenPart ? null : "hide"}>
            <div className="register-modal-input">
              Ваш новый пароль*:
              <input
                type="password"
                name="password"
                autoComplete="off"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="register-modal-input">
              Пароль еще раз*:
              <input
                type="password"
                name="repeatPassword"
                autoComplete="off"
                value={repeatPassword}
                onChange={this.handleInputChange}
              />
            </div>
            {!passwordValid ? (
              <div className="validation-error">
                Пароли должны совпадать и быть более 5 символов
              </div>
            ) : null}
            <div className="register-modal-button">
              <button
                className="register-modal__button"
                onClick={this.changePass}
              >
                Изменить пароль
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
