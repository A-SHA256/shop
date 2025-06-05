import { useState } from "react";
import useShopContext from "../hooks/useShopContext";
import Cart from "./Cart";

const Form = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const { setProductName } = useShopContext();

  const submitHandler = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError("Insert a product name");
      return;
    }
    setProductName(value);
    setValue("");
    setError("");
  };

  return (
    <>
      <Cart />
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col items-center gap-4 w-full max-w-md mx-auto p-4"
      >
        <input
          type="text"
          placeholder="search a product"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Search
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
      );
};

export default Form;
