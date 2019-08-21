import React from "react";
import Rating from "react-rating";
import InlineSVG from "svg-inline-react";
import { connect } from "react-redux";
import { validateEmail } from "../helpers/";
class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      review: "",
      rating: 5,
      auth: props.auth,
      sendReviewDone: false,
      errors: {
        emailError: false,
        nameError: false,
        reviewError: false
      }
    };
  }
  ratingChange = value => {
    this.setState({
      rating: value
    });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  validateForm = () => {
    const { name, email, review } = this.state;
    let updateErrorsState = {};
    if (name.length < 2) {
      updateErrorsState.nameError = true;
    }
    if (review.length < 5) {
      updateErrorsState.reviewError = true;
    }
    if (!validateEmail(email)) {
      updateErrorsState.emailError = true;
    }
    if (Object.keys(updateErrorsState).length > 0) {
      this.setState({
        errors: { ...updateErrorsState }
      });
      return false;
    }
    return true;
  };
  sednReviewOnServer = () => {
    if (!this.validateForm()) return false;
    const { productId } = this.props;
    const { name, email, review, rating } = this.state;
    const reviewToSend = {
      name: name,
      email: email,
      review: review
    };
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=setReview&responce_type=json&site=1&article_id=${productId}&review=${review}&fio=${name}&email=${email}`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        this.setState({ ...this.state, sendReviewDone: true });
        setTimeout(() => {
          this.props.closeModal();
        }, 3000);
      });

    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=setRating&responce_type=json&site=1&goods_id=${productId}&rating=${rating}`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {});
  };
  componentDidMount() {
    if (this.state.auth) {
      const { fio, email } = this.props.checkout;
      this.setState({
        name: fio,
        email: email
      });
    }
  }
  render() {
    const { name, email, review, rating } = this.state;
    const { nameError, emailError, reviewError } = this.state.errors;
    const emptyStar = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M-1-1h582v402H-1z"/>
  <g>
    <path fill="#b89d65" d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246L12 15.252l-3.612 2.625 1.379-4.246-3.612-2.625h4.465L12 6.76zm0-6.472L9.167 9.006H0l7.416 5.389-2.833 8.718L12 17.725l7.416 5.388-2.833-8.718L24 9.006h-9.167L12 .288z"/>
  </g>
</svg>`;
    const fullStar = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M-1-1h582v402H-1z"/>
  <g>
    <path fill="#b89d65" d="M6.155 11.006h4.465-4.465zM12 .288L9.167 9.006H0l7.416 5.389-2.833 8.718L12 17.725l7.416 5.388-2.833-8.718L24 9.006h-9.167L12 .288z"/>
    <path d="M9.326 11.944c.035 0 .07 0 .106.036h.071l.106.035" stroke-opacity="null" stroke-width="null" stroke="null" fill="none"/>
  </g>
</svg>`;
    return (
      <div className="register-modal-wrapper">
        <h3> Оставить отзыв </h3>
        <div className={this.state.sendReviewDone ? "hide" : null}>
          <div className="register-modal-input">
            Ваше имя *:
            <input
              type="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
          {nameError ? (
            <div className="validation-error"> Введите правильное имя </div>
          ) : null}
          <div className="register-modal-input">
            Ваш email (не публикуется)* :
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          {emailError ? (
            <div className="validation-error"> Введите правильный email </div>
          ) : null}
          <div className="register-modal-input">
            Отзыв * :
            <textarea
              className="review-textarea"
              rows="5"
              name="review"
              value={review}
              onChange={this.handleInputChange}
            />
          </div>
          {reviewError ? (
            <div className="validation-error"> Заполните поле отзыв </div>
          ) : null}
          <p className="rating-text"> Оцените товар : </p>
          <div className="rating-wrapper">
            <Rating
              start={0}
              stop={5}
              initialRating={rating}
              onChange={this.ratingChange}
              emptySymbol={<InlineSVG src={emptyStar} />}
              fullSymbol={<InlineSVG src={fullStar} />}
            />
          </div>
          <div className="raview-button__wrapper">
            <button className="raview-button" onClick={this.sednReviewOnServer}>
              ОТПРАВИТЬ
            </button>
          </div>
        </div>
        <div className={this.state.sendReviewDone ? null : "hide"}>
          <h3>Поздравляем!</h3>
          <p className="text-al-cen">Ваш отзыв скоро будет опубликован</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    checkout: state.checkout,
    auth: state.cart.auth
  };
};
export default connect(mapStateToProps)(AddReview);
