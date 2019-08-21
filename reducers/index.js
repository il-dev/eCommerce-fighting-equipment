import { combineReducers } from "redux";
import catalogReducer from "./catalogReducer";
import filterReducer from "./filterReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import authReducer from "./authReducer";
import favoritesReducer from "./favoritesReducer";
import mobileDrawer from "./mobileDrawer";
import advReducer from "./advReducer";
import { reducer as notifications } from "react-notification-system-redux";

export default combineReducers({
  catalog: catalogReducer,
  filter: filterReducer,
  cart: cartReducer,
  auth: authReducer,
  checkout: checkoutReducer,
  favorites: favoritesReducer,
  mobileDrawer: mobileDrawer,
  adv: advReducer,
  notifications
});
