import useShopContext from "../hooks/useShopContext";

const Product = ({ product }) => {
    const { setBProducts, bProducts } = useShopContext();
    const addProductToBasket = () => {
        setBProducts(prev => {
            const isExist = prev.find(bProduct => bProduct.id === product.id);
            if(!isExist){
                return [...prev, {... product, count: 1}]
            } else {
                return prev.map(bProduct =>
                    bProduct.id === product.id
                      ? { ...bProduct, count: (bProduct.count || 0) + 1 }
                      : bProduct
                  );
            }
        });
        console.log(bProducts)
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                {product.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-medium">
                    -{product.discountPercentage}%
                </span>
                <span className="text-gray-800 font-bold">
                    ${product.price.toFixed(2)}
                </span>
                </div>
                <button
                onClick={addProductToBasket}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200"
                >
                Add to Basket
                </button>
            </div>
            </div>
    );
}
export default Product;