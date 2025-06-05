import axios from "axios";

const getProducts = async () => {
    try {
        const url = import.meta.env.VITE_API_URL;
        console.log(url);
        const res = await axios.get(url);
        if (res.status !== 200) {
            throw new Error(`${res.status} has been occurred`);
        }
        return res.data.products;
    } catch (error) {
        console.log(error);
        return null
    }
}

export default getProducts;