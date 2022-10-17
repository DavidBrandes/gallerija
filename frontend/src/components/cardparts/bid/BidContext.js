import { createContext } from "react";

const BidContext = createContext({
  message: "",
  setMessage: () => {},
  inAction: false,
  setInAction: () => {},
  value: 0,
  setValue: () => {},
});

export default BidContext;
