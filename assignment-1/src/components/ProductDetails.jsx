import { useState } from "react";

const ProductDetails = () => {
  // since there is no API to get the specific product details
  const [product, setProduct] = useState({
    
      "productName": "Laptop 9",
      "price": 1742,
      "rating": 4.57,
      "discount": 39,
      "availability": "yes"
  
  })
  return (
    <div className="container mx-auto">
      <div className="bg-gray-800 border border-gray-700 p-4 my-4 rounded-lg">
      <h1 className="text-3xl font-bold text-white">Product Details: </h1>
        {/* Display product details */}
        <h2 className="text-xl font-bold text-white">{product.productName}</h2>
        <p className="text-white">Price: ${product.price}</p>
        <p className="text-white">Rating: {product.rating}</p>
        <p className="text-white">Discount: {product.discount}%</p>
        <p className="text-white">
          Availability: {product.availability === "yes" ? "Available" : "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
