import { useState } from "react";
import { createProduct } from "../../services/productService";

function ProductForm() {
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

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("image", image);

    try {
      const token = localStorage.getItem("token");

      const response = await createProduct(data, token);

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg space-y-5"
    >
      <input
        name="name"
        placeholder="Product Name"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="category"
          placeholder="Category"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="brand"
          placeholder="Brand"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-48 rounded-lg"
        />
      )}

      <button
        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
      >
        Upload Product
      </button>
    </form>
  );
}

export default ProductForm;