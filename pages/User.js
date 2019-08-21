import React from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import BrandSlider from "../components/BrandSlider";
import { connect } from "react-redux";
import Modal from "react-modal";
import SetNewPasswordModal from "../components/modals/SetNewPasswordModal";

Modal.setAppElement("#__next");
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }
  closeModal = () => {
    this.setState({ ...this.state, modalIsOpen: false });
  };
  openModal = () => {
    this.setState({ ...this.state, modalIsOpen: true });
  };
  render() {
    const { fio, phone, address, email, discount, bonus, auth } = this.props;
    return (
      <Layout>
        <div>
          <section className="category-brands container">
            <BrandSlider />
          </section>
          <div className="content container">
            <aside className="sidebar-left">
              <AsideNav />
            </aside>
            <main className="static-page">
              <h1>Личный кабинет</h1>
              {auth ? (
                <div>
                  <div className="user-info-and-discount">
                    <div className="user-info-discount">
                      Скидка: {discount}%
                    </div>
                    <div className="user-info-bonus">Бонусы: {bonus} грн</div>
                  </div>
                  <div>
                    <h3>Персональная информация</h3>
                    <div className="user-info-item">
                      <div className="user-info-item-option">ФИО:</div>
                      <div>{fio}</div>
                    </div>
                    <div className="user-info-item">
                      <div className="user-info-item-option">Телефон:</div>
                      <div>{phone}</div>
                    </div>
                    <div className="user-info-item">
                      <div className="user-info-item-option">E-mail:</div>
                      <div>{email}</div>
                    </div>
                    <div className="user-info-item">
                      <div className="user-info-item-option">Адрес:</div>
                      <div>{address}</div>
                    </div>
                  </div>
                  <div className="user-info-footer">
                    <div className="user-info-edit-password">
                      <button
                        className="user-info-button"
                        onClick={this.openModal}
                      >
                        ИЗМЕНИТЬ ПАРОЛЬ
                      </button>
                    </div>
                    <div className="user-info-history">
                      <Link
                        href={{ pathname: `/UserHistory` }}
                        as={`/user/history/`}
                      >
                        <button className="user-info-button">
                          ИСТОРИЯ ПОКУПОК
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Для доступа в личный кабинет необходимо авторизироваться</p>
              )}
            </main>
            <aside className="sidebar-right">
              <AsideRight />
            </aside>
          </div>
        </div>
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
          <SetNewPasswordModal closeModal={this.closeModal} />
        </Modal>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return { ...state.checkout, auth: state.auth.auth };
};

export default connect(mapStateToProps)(User);
