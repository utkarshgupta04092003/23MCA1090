import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { categories } from "../data";

const ProductList = () => {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    category: "",
    topN: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
  });

  useEffect(() => {
    let data = JSON.stringify({
      companyName: "xyz",
      clientID: "5f34c088-c7fb-420d-ba41-52ae57719ff1",
      clientSecret: "TlhVRLEdSziqUxxH",
      ownerName: "abcde",
      ownerEmail: "abcde.axy@ac.in",
      rollNo: "25",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://20.244.56.144/test/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.company ||
      !formData.category ||
      !formData.topN ||
      !formData.minPrice ||
      !formData.maxPrice ||
      !formData.availability
    ) {
      alert("Please fill in all fields before getting products.");
      return;
    }

    if (token != null) {
      setLoading(true);
      try {
        let config = {
          method: "GET",
          maxBodyLength: Infinity,
          url: `http://20.244.56.144/test/companies/${formData.company}/categories/${formData.category}/products?top=${formData.topN}&minPrice=${formData.minPrice}&maxPrice=${formData.maxPrice}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.request(config);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    } else {
      alert("Token is not available");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Top Products</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-white font-bold mb-2"
            >
              Company
            </label>
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="">Select Company</option>
              <option value="AMZ">AMZ</option>
              <option value="FLP">FLP</option>
              <option value="SNP">SNP</option>
              <option value="MYN">MYN</option>
              <option value="AZO">AZO</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-white font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="topN" className="block text-white font-bold mb-2">
              Top N Products
            </label>
            <input
              type="number"
              id="topN"
              name="topN"
              value={formData.topN}
              onChange={handleChange}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="minPrice"
              className="block text-white font-bold mb-2"
            >
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxPrice"
              className="block text-white font-bold mb-2"
            >
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="availability"
              className="block text-white font-bold mb-2"
            >
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="">All</option>
              <option value="yes">Available</option>
              <option value="no">Not Available</option>
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSubmit}
            >
              Get Products
            </button>
          </div>
        </div>
      </form>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div>
          {products.map((product, index) => (
            <Link
              to={{
                pathname: `/product/${index}`,
                state: { product },
              }}
              key={product.productName + index}
            >
              <div
                key={product.productName + index}
                className="bg-gray-800 border border-gray-700 p-4 my-4 rounded-lg"
              >
                <h2 className="text-xl font-bold text-white">
                  {product.productName}
                </h2>
                <p className="text-white">Price: ${product.price}</p>
                <p className="text-white">Rating: {product.rating}</p>
                <p className="text-white">Discount: {product.discount}%</p>
                <p className="text-white">
                  Availability:{" "}
                  {product.availability === "yes"
                    ? "Available"
                    : "Not Available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
