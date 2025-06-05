import { useState } from "react";
import ShopContext from "../contexts/ShopContext";

const ShopProvider = ({ children }) => {
    const [productName, setProductName] = useState("");
    const [products, setProducts] = useState([]);
    const [bProducts, setBProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const clearBasket = () => {
        setBProducts([]);
    }

    return (
        <ShopContext.Provider value={{productName, setProductName, products, setProducts, bProducts, setBProducts, totalPrice, setTotalPrice, clearBasket}}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopProvider;