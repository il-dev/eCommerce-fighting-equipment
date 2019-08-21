import React from "react";
import { formBody } from "../../helpers/";

export default class SetNewPasswordModal extends React.Component {
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
    const { password } = this.state;
    const uuid = localStorage.getItem("uuid");
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
  render() {
    const {
      password,
      repeatPassword,
      passwordValid,
      openMainPart,
      openFinalPart
    } = this.state;
    return (
      <div>
        <div className="register-modal-wrapper">
          <h3>Изменение пароля</h3>
          <div className={openMainPart ? null : "hide"}>
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
          <div className={openFinalPart ? null : "hide"}>
            <div className="register-modal-input">
              <h3>Поздравляем!</h3>
              <p className="remind-password__final">
                Ваш пароль успешно изменен
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
