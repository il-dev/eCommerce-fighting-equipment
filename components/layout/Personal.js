import React from "react";
import InlineSVG from "svg-inline-react";
import Modal from "react-modal";
import Link from "next/link";
import InputMask from "react-input-mask";
import RegisterModal from "../../components/RegisterModal";
import RemindPasswordModal from "../../components/RemindPasswordModal";
import { connect } from "react-redux";
import { getUserInfo, loginUser, loginError, logOut } from "../../actions/user";
import { validatePhone } from "../../helpers";

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");

class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      hover: false,
      register: false,
      authorized: props.auth,
      modalIsOpen: false,
      remindPasswordModalOpen: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.auth != state.authorized) return { authorized: props.auth };
    return null;
  }
  handleMouseEnter = e => {
    this.setState((prevState, props) => {
      return { ...prevState, hover: true };
    });
  };
  handleMouseLeave = e => {
    this.setState((prevState, props) => {
      return { ...prevState, hover: false };
    });
  };
  handleLogout = () => {
    this.props.logOut();
    try {
      localStorage.removeItem("uuid");
      localStorage.removeItem("auth");
    } catch (error) {
      console.log(error);
    }
    this.setState((prevState, props) => {
      return { ...prevState, phone: "", password: "" };
    });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };
  onPhoneChange = event => {
    const { value } = event.target;
    this.setState((prevState, props) => {
      return { ...prevState, phone: value };
    });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  openRemindPasswordModal = () => {
    this.setState({ remindPasswordModalOpen: true });
  };
  closeRemindPasswordModal = () => {
    this.setState({ remindPasswordModalOpen: false });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, register: false });
  };

  handleEnter = () => {
    const { phone, password } = this.state;
    if (!validatePhone(phone)) {
      this.props.loginError();
      return false;
    }
    this.props.loginUser(phone, password);
  };
  render() {
    const {
      hover,
      authorized,
      register,
      modalIsOpen,
      remindPasswordModalOpen,
      password,
      phone
    } = this.state;
    return (
      <div
        className="ht-persona__button"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleMouseEnter}
      >
        <div className={hover ? "ht-profile active" : "ht-profile"}>
          <span className="ht-wish__img">
            <InlineSVG
              src={`<svg id="l1" data-name="l1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32"><defs><style>.cls-1{fill:#bb9835;}</style></defs><title>Личный кабинет</title><path class="cls-1" d="M22.17,20.85V17.24A7.05,7.05,0,0,0,24.49,12v-.08h0V7.09a7,7,0,0,0-14.07,0h0v4.84A7.1,7.1,0,0,0,13,17.37h0V20.6h0c0,2.32-13,3.73-13,11.28H35.2c0-7.32-12.67-8.9-13-11Z"></path></svg>`}
            />
          </span>
          <span className="ht-wish__text">Личный кабинет</span>
          <span className="ht-profile__arrow">
            <InlineSVG
              src={`<svg id="l1" data-name="l1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#b89d65;}</style></defs><path class="cls-1" d="M30.09,8.58a1,1,0,0,0-1.44,0L16,21.26,3.32,8.58A1,1,0,0,0,1.89,10L15.26,23.39a1,1,0,0,0,.72.3,1,1,0,0,0,.72-.3L30.07,10A1,1,0,0,0,30.09,8.58Z"></path></svg>`}
            />
          </span>
          {hover && authorized && !modalIsOpen ? (
            <div className="ht-profile-dropdown__auth">
              <Link href={{ pathname: `/User` }} as={`/user/`}>
                <button className="profile-dropdown__enter">в кабинет</button>
              </Link>
              <button
                className="profile-dropdown__register"
                onClick={this.handleLogout}
              >
                выход
              </button>
            </div>
          ) : null}
          {hover &&
          !register &&
          !authorized &&
          !modalIsOpen &&
          !remindPasswordModalOpen ? (
            <div className="ht-profile-dropdown__login">
              <form action="" className="login-form">
                <InputMask
                  mask="+38\0999999999"
                  maskChar={null}
                  placeholder="Ваш телефон"
                  value={phone}
                  onChange={this.onPhoneChange}
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Ваш пароль"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </form>
              <button
                className="profile-dropdown__enter"
                onClick={this.handleEnter}
              >
                вход
              </button>
              <button
                className="profile-dropdown__register"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    register: true,
                    modalIsOpen: true
                  });
                }}
              >
                регистрация
              </button>
              <button
                className="profile-dropdown__enter"
                onClick={this.openRemindPasswordModal}
              >
                забыли пароль?
              </button>
            </div>
          ) : null}
          {hover && register && !authorized && !modalIsOpen ? (
            <div className="profile-dropdown-register">
              <form action="" className="register">
                <div className="register__title">Добро пожаловать</div>
                <input type="email" name="email" placeholder="Эл. почта" />
                <input type="password" name="password" placeholder="Пароль" />
                <div className="register-social">
                  <span>
                    войти <br /> через
                  </span>
                  <a href="#" className="register-social__link">
                    <InlineSVG
                      src={`<svg id="fb" data-name="fb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#b89d65;}</style></defs><title>fb</title><path class="cls-1" d="M27,0H5A5,5,0,0,0,0,5H0V27a5,5,0,0,0,5,5H27a5,5,0,0,0,5-5h0V5a5,5,0,0,0-5-5ZM19.43,16H17.19v8H13.86V16H12.28V13.18h1.58V11.35c0-.07,0-.15,0-.24A3.12,3.12,0,0,1,17,8h2.71v2.74H17.85a.68.68,0,0,0-.68.68.6.6,0,0,0,0,.1h0v1.66h2.53Z"/></svg>`}
                    />
                  </a>
                  <a href="#" className="register-social__link">
                    <InlineSVG
                      src={`<svg id="google" data-name="google" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#b89d65;}</style></defs><title>google</title><path class="cls-1" d="M12.75,8.77c-1.27,0-2.12,1.24-1.9,2.91a3.09,3.09,0,0,0,2.7,2.87c1.27,0,2-1,1.78-2.71S14,8.81,12.75,8.77Z"/><path class="cls-1" d="M13.29,18c-1.89,0-3.5,1.2-3.5,2.61s1.37,2.64,3.26,2.64c2.66,0,3.59-1.12,3.59-2.56a2.19,2.19,0,0,0-.06-.51c-.21-.82-1-1.26-2.07-2A4.09,4.09,0,0,0,13.29,18Z"/><path class="cls-1" d="M27,0H5A5,5,0,0,0,0,5V27a5,5,0,0,0,5,5H27a5,5,0,0,0,5-5V5A5,5,0,0,0,27,0ZM17.22,11.77a3.21,3.21,0,0,1-1.39,2.52c-.8.62-.95.88-.95,1.41s1,1.13,1.39,1.45c1.52,1.15,1.83,1.85,1.83,3.3,0,1.78-1.92,3.55-5,3.55C10.32,24,8,22.89,8,21.11s1.92-3.7,4.66-3.7h.86a1.65,1.65,0,0,1-.68-1.23,2,2,0,0,1,.25-.92h-.46A3.39,3.39,0,0,1,9.07,11.7c0-1.94,2-3.71,4.39-3.71h4.72L17.12,9.11H15.88A3,3,0,0,1,17.22,11.77ZM24,11.48H21.82v2.18H20.73V11.48H18.56V10.39h2.17V8.22h1.09V10.4H24Z"/></svg>`}
                    />
                  </a>
                  <a href="#" className="register-social__link">
                    <InlineSVG
                      src={`<svg id="VK" data-name="VK" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#b89d65;}</style></defs><title>VK</title><path class="cls-1" d="M27,0H5A5,5,0,0,0,0,5V27a5,5,0,0,0,5,5H27a5,5,0,0,0,5-5V5A5,5,0,0,0,27,0Zm1,23.85a2,2,0,0,1-.81.19H23.72a2.41,2.41,0,0,1-1.18-.36,4.62,4.62,0,0,1-1.12-1l-1.2-1.33a2.88,2.88,0,0,0-.66-.56.71.71,0,0,0-1,.2l0,0a2.33,2.33,0,0,0-.36.92,5.58,5.58,0,0,0-.1,1,1.68,1.68,0,0,1-.06.39.63.63,0,0,1-.34.41,1.23,1.23,0,0,1-.59.15H15.85a8.06,8.06,0,0,1-4.26-1.18,10.27,10.27,0,0,1-2.77-2.43,29.51,29.51,0,0,1-2.75-4.08,51.77,51.77,0,0,1-2.45-4.85A1.74,1.74,0,0,1,3.49,11a.4.4,0,0,1,.27-.43,1.62,1.62,0,0,1,.61-.12H7.78a1.09,1.09,0,0,1,1,.68c.31.71.62,1.41,1,2.1A17.86,17.86,0,0,0,11.5,16a2.85,2.85,0,0,0,.63.64,1.2,1.2,0,0,0,.29.15.46.46,0,0,0,.56-.2,2,2,0,0,0,.25-.74,11.2,11.2,0,0,0,.11-2.19,12.11,12.11,0,0,0-.08-1.23,3.29,3.29,0,0,0-.2-.78A1.2,1.2,0,0,0,12.2,11l-.32-.07c-.1,0-.14-.07-.08-.16a1.72,1.72,0,0,1,.27-.34A1.66,1.66,0,0,1,13,10a8.24,8.24,0,0,1,.91-.12h2.45A4.53,4.53,0,0,1,17.4,10a1,1,0,0,1,.71.79,6,6,0,0,1,0,1.4v3.25a2,2,0,0,0,.15.83,1.52,1.52,0,0,0,.24.35.36.36,0,0,0,.45.08,2.09,2.09,0,0,0,.67-.54,13.94,13.94,0,0,0,1.47-2.11,20.77,20.77,0,0,0,1.44-3,1.79,1.79,0,0,1,.12-.25.72.72,0,0,1,.67-.36h3.92a2.52,2.52,0,0,1,.82.07.52.52,0,0,1,.45.58v0a1.76,1.76,0,0,1-.09.42,6,6,0,0,1-.63,1.3,27.22,27.22,0,0,1-1.67,2.37c-.42.56-.85,1.11-1.27,1.68a3.8,3.8,0,0,0-.33.57.88.88,0,0,0,.11,1,7.3,7.3,0,0,0,.55.61c.58.58,1.18,1.14,1.76,1.72a8.45,8.45,0,0,1,1.15,1.42,3.79,3.79,0,0,1,.35.68.7.7,0,0,1-.34.93Z"/></svg>`}
                    />
                  </a>
                  <a href="#" className="register-social__link">
                    <InlineSVG
                      src={`<svg id="Youtube" data-name="Youtube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#b89d65;}</style></defs><title>Youtube</title><path class="cls-1" d="M14.91,21.18a1.15,1.15,0,0,1-.25.22.46.46,0,0,1-.23.08.2.2,0,0,1-.17-.06.35.35,0,0,1,0-.21V18.1h-.81v3.39a.87.87,0,0,0,.14.54.5.5,0,0,0,.42.18,1,1,0,0,0,.47-.13,1.74,1.74,0,0,0,.47-.37v.45h.81V18.1H15Z"/><polygon class="cls-1" points="10.26 17.46 11.2 17.46 11.2 22.15 12.11 22.15 12.11 17.46 13.06 17.46 13.06 16.66 10.26 16.66 10.26 17.46"/><path class="cls-1" d="M15.86,13.56a.41.41,0,0,0,.29-.1.37.37,0,0,0,.11-.28V10.75a.29.29,0,0,0-.11-.24.45.45,0,0,0-.29-.09.4.4,0,0,0-.27.09.3.3,0,0,0-.1.24v2.43a.39.39,0,0,0,.1.28A.36.36,0,0,0,15.86,13.56Z"/><path class="cls-1" d="M17.87,18a.8.8,0,0,0-.37.1,1.3,1.3,0,0,0-.35.28V16.66h-.82v5.49h.82v-.31a1,1,0,0,0,.35.27.94.94,0,0,0,.42.09.67.67,0,0,0,.55-.23,1,1,0,0,0,.19-.66V19.07a1.21,1.21,0,0,0-.2-.76A.7.7,0,0,0,17.87,18Zm0,3.15a.44.44,0,0,1-.07.28.26.26,0,0,1-.22.09.45.45,0,0,1-.2,0,.68.68,0,0,1-.19-.14V18.86a.61.61,0,0,1,.17-.12.42.42,0,0,1,.17,0,.31.31,0,0,1,.25.11.48.48,0,0,1,.08.31Z"/><path class="cls-1" d="M27,0H5A5,5,0,0,0,0,5V27a5,5,0,0,0,5,5H27a5,5,0,0,0,5-5V5A5,5,0,0,0,27,0ZM17.93,9.76h.91v3.42a.37.37,0,0,0,.06.23.22.22,0,0,0,.19.07.53.53,0,0,0,.25-.09,1.27,1.27,0,0,0,.28-.24V9.76h.91v4.46h-.91v-.49a1.91,1.91,0,0,1-.52.42,1.16,1.16,0,0,1-.53.14.57.57,0,0,1-.48-.2.93.93,0,0,1-.16-.6Zm-3.38,1a1,1,0,0,1,.37-.82,1.5,1.5,0,0,1,1-.31,1.34,1.34,0,0,1,.93.32,1.07,1.07,0,0,1,.36.83v2.3a1.16,1.16,0,0,1-.35.9,1.39,1.39,0,0,1-1,.33,1.34,1.34,0,0,1-1-.34,1.18,1.18,0,0,1-.36-.9ZM12.06,8.18l.67,2.42h.06l.64-2.42h1l-1.19,3.54v2.51h-1v-2.4L11,8.18ZM24,20.9a2.92,2.92,0,0,1-2.92,2.92H10.92A2.92,2.92,0,0,1,8,20.9V18.55a2.92,2.92,0,0,1,2.92-2.92H21.08A2.93,2.93,0,0,1,24,18.55Z"/><path class="cls-1" d="M20.31,18a1.22,1.22,0,0,0-.89.33,1.14,1.14,0,0,0-.34.86V21a1.29,1.29,0,0,0,.31.92,1.11,1.11,0,0,0,.86.33,1.21,1.21,0,0,0,.91-.31,1.3,1.3,0,0,0,.31-.94v-.2h-.83V21a.88.88,0,0,1-.08.46.33.33,0,0,1-.28.11.3.3,0,0,1-.27-.12.9.9,0,0,1-.08-.45v-.76h1.55v-1a1.21,1.21,0,0,0-.3-.88A1.13,1.13,0,0,0,20.31,18Zm.32,1.59h-.72v-.41a.6.6,0,0,1,.08-.36.32.32,0,0,1,.28-.11.31.31,0,0,1,.27.11.6.6,0,0,1,.08.36Z"/></svg>`}
                    />
                  </a>
                </div>
                <div className="register-button">
                  <button type="button">Зарегестрироваться</button>
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({ ...this.state, register: false });
                    }}
                  >
                    Войти в свой аккаунт
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          overlayClassName="react-modal-overlay"
          contentLabel="Зарегестрироваться"
        >
          <div className="cart-main-close">
            <span className="close" onClick={this.closeModal} />
          </div>
          <RegisterModal />
        </Modal>
        <Modal
          isOpen={this.state.remindPasswordModalOpen}
          style={customStyles}
          overlayClassName="react-modal-overlay"
          contentLabel="Восстановить пароль"
        >
          <div className="cart-main-close">
            <span className="close" onClick={this.closeRemindPasswordModal} />
          </div>
          <RemindPasswordModal closeModal={this.closeRemindPasswordModal} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state.cart, auth: state.auth.auth };
};
export default connect(
  mapStateToProps,
  { logOut, getUserInfo, loginUser, loginError }
)(Personal);
