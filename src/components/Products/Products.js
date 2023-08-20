import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const result = await axios.get("http://localhost:3006/products");

      console.log(result.data);
      setData(result.data);
    };
    fetchProductsData();
  }, []);

  return (
    <div className="product-grid">
      {data.map((item) => (
        <div key={item.id} className="product-cell">
          <img
            className="product-image"
            src={item.image_url}
            alt={`Product ${item.id}`}
          />
          <h4 className="product-details">{item.name}</h4>
          <p>{item.category}</p>
          <p> ${item.price} 3.5g</p>
          <button>add to cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
