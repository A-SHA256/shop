import useShopContext from "../hooks/useShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { bProducts } = useShopContext();

    const navigate = useNavigate();
    const navHandler = () => {
        navigate('/basket');
    }

    return (
        <div className="relative w-fit" onClick={navHandler}>
            {/* Cart Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13L5.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
            </svg>

            {/* Badge */}
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                {bProducts.length}
            </div>
        </div>
    );
}

export default Cart;