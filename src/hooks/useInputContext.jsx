import { useContext } from "react";
import { InputDataContext } from "../Context/InputDataContext";

const useInputContext = () => {
    const context = useContext(InputDataContext);
    return context;
}

export default useInputContext
