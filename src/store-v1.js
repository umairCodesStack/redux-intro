import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loanPurpose: action.payload.purpose,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
      };
    default:
      return state;
  }
}
function customerReducer(state = initialCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: new Date().toISOString(),
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
//Action creater
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: 500,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId },
  };
}
function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

//store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a Car"));
console.log(store.getState());
