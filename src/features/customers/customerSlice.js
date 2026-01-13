const initialCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
export default function customerReducer(state = initialCustomer, action) {
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
//Action creater

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId },
  };
}
export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
