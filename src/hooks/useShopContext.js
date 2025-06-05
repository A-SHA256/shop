import { useContext } from "react";
import ShopContext from "../contexts/ShopContext.js";

const useShopContext = () => {
    const context = useContext(ShopContext);
    return context;
}

export default useShopContext;