import Link from "next/link";
import "../../main.min.css";
import Head from "next/head";
import Header from "./Header.js";
import { connect } from "react-redux";
import Modal from "react-modal";
import Cart from "../../components/Cart";
import { openCart, closeCart } from "../../actions/cart";
import { openMobileMenu, openMobilCategory } from "../../actions/mobile";
import { getItemFromStorage } from "../../actions/storage";
import { getUserInfo } from "../../actions/user";
import Notif from "../Notif";
import MobileDrawer from "./MobileDrawer";
import Router from "next/router";
import * as gtag from "../../lib/gtag";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.82)",
    zIndex: "9999999",
    overflow: "auto"
  },
  content: {
    width: "100%",
    maxWidth: "760px",
    marginTop: "50px",
    marginBottom: "20px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999999"
  }
};

Modal.setAppElement("#__next");
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.modalIsOpen != state.modalIsOpen)
      return { modalIsOpen: !state.modalIsOpen };
    return null;
  }
  openModal = () => {
    this.props.openCart();
  };

  closeModal = () => {
    this.props.closeCart();
  };
  componentDidMount() {
    const uuid = this.props.getItemFromStorage("uuid");
    if (!uuid || this._isMounted) return false;
    this.props.getUserInfo();
  }
  render() {
    const defaultTitle =
      "Интернет-магазин товаров для бокса и единоборств в Украине! Купите одежду, экипировку, инвентарь в магазине EVERLAST-original Украина.";
    const defaultDescription =
      "Продажа одежды, экипировки, инвентаря и аксессуаров для единоборств от прямого поставщика по лучшей цене! Товары для бокса, MMA, единоборств в интернет-магазине EVERLAST-original с доставкой по всей Украине!";
    const {
      children,
      title = defaultTitle,
      description = defaultDescription
    } = this.props;
    return (
      <div className="main-wrapper" id="page-wrap">
        <MobileDrawer />
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <Header
          openMobileMenu={this.props.openMobileMenu}
          openMobilCategory={this.props.openMobilCategory}
        />
        {children}
        <footer className="footer">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="footer__logo">
                <Link href={{ pathname: "/" }} as="/">
                  <a>
                    <img src="/static/img/logo.svg" alt="" />
                  </a>
                </Link>
              </div>
              <div className="footer__text">
                &copy; 2008-{new Date().getFullYear()}. Магазин Everlast в Киеве
                - одежда и аксессуары для бокса, ММА. Спортивная одежда и
                экипировка.
              </div>
            </div>
          </div>
        </footer>
        <Notif />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="react-modal-content"
          overlayClassName="react-modal-overlay"
          contentLabel="Корзина"
        >
          <div className="cart-main-close">
            <span className="close" onClick={this.closeModal} />
          </div>
          <Cart closeModal={this.closeModal} />
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
  {
    openCart,
    closeCart,
    openMobileMenu,
    getUserInfo,
    openMobilCategory,
    getItemFromStorage
  }
)(Layout);
