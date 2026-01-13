const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
export default function accountReducer(state = initialState, action) {
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
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}
export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: 500,
  };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}
