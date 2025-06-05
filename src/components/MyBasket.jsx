import { useEffect} from "react";
import useShopContext from "../hooks/useShopContext";
import { useNavigate } from "react-router-dom";

const MyBasket = () => {
  const { bProducts } = useShopContext();
  const { totalPrice, setTotalPrice } = useShopContext();

  const getSum = (total, add) => {
    return total + add;
  };
  
  const navigate = useNavigate();
  const navHandler = () => {
    navigate('/payment');
  }

  useEffect(() => {
    const total = bProducts
      .map((bProduct) => bProduct.price * bProduct.count)
      .reduce(getSum, 0);
    setTotalPrice(total.toFixed(2));
  }, [bProducts, setTotalPrice]);

  return (
    <div className="p-6 space-y-6">
      {bProducts.length > 0 &&
        bProducts.map((bProduct) => (
          <div
            key={bProduct.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-lg p-4 shadow-sm"
          >
            <img
              src={bProduct.thumbnail}
              alt={bProduct.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {bProduct.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {bProduct.description}
              </p>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="text-green-600 font-medium">
                  -{bProduct.discountPercentage}%
                </span>
                <span className="text-gray-800 font-bold">
                  ${bProduct.price.toFixed(2)}
                </span>
                <span className="text-gray-800 font-bold">
                  × {bProduct.count}
                </span>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-between items-center pt-4 border-t mt-6">
        <span className="text-lg font-semibold text-gray-800">Total:</span>
        <span className="text-xl font-bold text-blue-700">${totalPrice}</span>
      </div>

      <button
        onClick={navHandler}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
      >
        Go to payment
      </button>
    </div>

  );
};

export default MyBasket;
