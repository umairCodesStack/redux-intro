const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
    case "account/convertCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertCurrency" });
    const date = new Date().toISOString().slice(0, 10);
    const url = `https://api.frankfurter.app/${date}?from=${currency}&to=USD`;
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates.USD;
    const convertedAmount = amount * rate;
    dispatch({
      type: "account/deposit",
      payload: convertedAmount,
    });
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
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
