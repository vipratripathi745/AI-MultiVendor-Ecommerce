import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBox,
  FaFileAlt,
  FaRupeeSign,
  FaLayerGroup,
  FaTag,
  FaImage,
} from "react-icons/fa";

import { createProduct } from "../../services/productService";

function ProductForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("image", image);

      const response = await createProduct(data);

      toast.success(response.message);

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
      });

      setImage(null);
      setPreview("");

      navigate("/seller/products");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Product Name */}

      <div>

        <label className="font-semibold flex items-center gap-2 mb-2">
          <FaBox />
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Apple iPhone 16 Pro"
          className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
          required
        />

      </div>

      {/* Description */}

      <div>

        <label className="font-semibold flex items-center gap-2 mb-2">
          <FaFileAlt />
          Description
        </label>

        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write product description..."
          className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
          required
        />

      </div>

      {/* Price & Stock */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold flex items-center gap-2 mb-2">
            <FaRupeeSign />
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="99999"
            className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

        </div>

        <div>

          <label className="font-semibold flex items-center gap-2 mb-2">
            <FaLayerGroup />
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="100"
            className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

        </div>

      </div>

      {/* Category & Brand */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold mb-2 block">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Electronics"
            className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

        </div>

        <div>

          <label className="font-semibold flex items-center gap-2 mb-2">
            <FaTag />
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Apple"
            className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

        </div>

      </div>

      {/* Image */}

      <div>

        <label className="font-semibold flex items-center gap-2 mb-3">
          <FaImage />
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border rounded-xl p-3"
        />

      </div>

      {preview && (

        <div className="flex justify-center">

          <img
            src={preview}
            alt="Preview"
            className="w-72 h-72 rounded-2xl object-cover shadow-lg border"
          />

        </div>

      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold transition"
      >
        {loading
          ? "Uploading Product..."
          : "Upload Product"}
      </button>

    </form>
  );
}

export default ProductForm;