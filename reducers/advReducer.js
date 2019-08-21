export default (state = { adv: [] }, action) => {
  switch (action.type) {
    case "INITIAL_DATA":
      return { ...state, adv: action.payload.vringe };
    default:
      return state;
  }
};
