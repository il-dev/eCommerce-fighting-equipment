import {
  ADD_PERSONAL_INFO,
  FETCH_USER_INFO_SUCCESS,
  ADD_PERSONAL_ADDRESS,
  ADD_PAY_INFO,
  FETCH_USER_INFO_ERROR,
  SET_ORDER,
  GET_LIQPAY,
  START,
  GET_LIQPAY_HISTORY,
  SUCCESS
} from "../constants";

const defaultState = {
  fio: "",
  phone: "",
  address: "",
  email: "",
  comment: "",
  delivery: "",
  deliveryDescr: "",
  payment: "",
  paymentDescr: "",
  goods: [],
  error: false,
  liqPay: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PERSONAL_INFO:
      return {
        ...state,
        fio: action.payload.fio,
        phone: action.payload.phone,
        email: action.payload.email
      };
    case ADD_PAY_INFO:
      return {
        ...state,
        payment: action.payload.id,
        paymentDescr: action.payload.description
      };
    case ADD_PERSONAL_ADDRESS:
      return {
        ...state,
        delivery: action.payload.currentDelivery,
        address: action.payload.address,
        deliveryDescr: action.payload.description
      };
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        fio: action.payload.fio,
        phone: action.payload.phone,
        email: action.payload.email,
        address: action.payload.address,
        discount: action.payload.discount,
        bonus: action.payload.bonus,
        error: false
      };
    case FETCH_USER_INFO_ERROR:
      return {
        ...state,
        fio: "",
        phone: "",
        email: "",
        address: "",
        error: true
      };
    case SET_ORDER + SUCCESS:
      return {
        ...state,
        orderId: action.payload.orderId,
        sum: action.payload.sum
      };
    case GET_LIQPAY + SUCCESS:
      return {
        ...state,
        liqPay: { ...action.payload, liqPayLoading: false }
      };
    case GET_LIQPAY + START:
      return {
        ...state,
        liqPay: { ...state.liqPay, liqPayLoading: true }
      };
    case GET_LIQPAY_HISTORY + SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
