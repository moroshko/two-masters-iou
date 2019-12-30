import { useContext } from "react";
import { AppContext } from "./App";

function useApp() {
  return useContext(AppContext);
}

export default useApp;
