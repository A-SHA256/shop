import Title from "./Title";
import Form from "./Form";
import Loader from "./Loader";
import Product from "./Product";
import useShopContext from "../hooks/useShopContext";
import { useEffect, useState, useMemo } from "react";
import getProducts from "../apis/api.js";


const ProductList = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { productName, products, setProducts } = useShopContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        console.log(data.products);
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setError(error.message || "Error has been occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const name = productName.trim().toLowerCase();
    if (!name) return products;
    return products.filter(
      (product) =>
        product.title.includes(name) ||
        product.description.includes(name)
    );
  }, [productName, products]);

  if (error)
    return <div className="text-red-600 text-center py-6">{error}</div>;

  return (
    <>
      <Title title="ShopLift" />
      <Form />
      <div className="min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
          <Loader />
        </div>
        ) : (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
