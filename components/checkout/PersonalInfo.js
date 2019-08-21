import React from 'react';
import InputMask from 'react-input-mask';

export default class PersonalInfo extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		const { fio, email, phone } = props.data;
		this.state = { fio, email, phone, cachedData: { fio, email, phone }, validation: { fio: true, email: true, phone: true } };
	}
	static getDerivedStateFromProps(nextProps, state) {
		const { fio, email, phone } = state.cachedData;
		if (nextProps.data.fio != fio || nextProps.data.email != email || nextProps.data.phone != phone)
			return { ...state, ...nextProps.data, cachedData: nextProps.data };
		return null;
	}
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

	isValidated = () => {
		const { fio, email, phone } = this.state;
		let validation = { fio: true, email: true, phone: true };

		if (this.state.fio.length < 5) validation.fio = false;
		if (!this.validateEmail(email)) validation.email = false;
		if (!this.validatePhone(phone)) validation.phone = false;
		this.setState((prevState, props) => {
			return { ...prevState, validation: validation };
		});
		if (this.checkForErrors(validation)) {
			return false;
		} else {
			this.props.addToRedecer({ fio, email, phone });
			return true;
		}
	};
	validateEmail = email => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};
	validatePhone = phone => {
		return phone.match(/^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/) != null;
	};
	checkForErrors = errors => {
		let result = '';
		for (let key in errors) {
			if (errors[key] == false) result = true;
		}
		return result;
	};
	render() {
		const { error } = this.props;
		return (
			<div className="checkout-wrapper">
				<h2>Здравствуйте</h2>
				<p>Вы можете выбрать сохраненные контактные данные или ввести новые. </p>
				<div className="checkout-form-personal">
					<div className="checkout-form__input-wrapper">
						<div className="checkout-form__input-name">ФИО*</div>
						<div className="checkout-form__input">
							<input type="text" name="fio" onChange={this.handleInputChange} value={this.state.fio} />
						</div>
						<div className="checkout-form__input-descr">На это имя будут оформлены все документы</div>
					</div>
					{this.state.validation.fio ? null : <div className="validation-error">Введите корректные данные</div>}
					<div className="checkout-form__input-wrapper">
						<div className="checkout-form__input-name">Email*</div>
						<div className="checkout-form__input">
							<input type="email" name="email" onChange={this.handleInputChange} value={this.state.email} />
						</div>
						<div className="checkout-form__input-descr">На этот почтовый ящик пришлем подробности заказа</div>
					</div>
					{this.state.validation.email ? null : <div className="validation-error">Введите корректный email</div>}
					<div className="checkout-form__input-wrapper">
						<div className="checkout-form__input-name">Телефон*</div>
						<div className="checkout-form__input">
							<InputMask mask="+38\0999999999" maskChar={null} value={this.state.phone} onChange={this.onPhoneChange} />
						</div>
						<div className="checkout-form__input-descr">Контактный телефон только на случай вопросов по вашему заказу</div>
					</div>
					{this.state.validation.phone ? null : <div className="validation-error">Введите корректный телефон</div>}
				</div>
			</div>
		);
	}
}
