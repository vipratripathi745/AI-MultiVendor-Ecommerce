import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProduct,
  updateProduct,
} from "../../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);

      const product = response.product;

      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        brand: product.brand,
      });

      setPreview(product.image);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

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

    setSaving(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("brand", formData.brand);

      if (image) {
        data.append("image", image);
      }

      const response = await updateProduct(id, data);

      toast.success(response.message);

      navigate("/seller/products");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-5"
      >

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Description"
          className="w-full border rounded-lg p-3"
          required
        />

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded-lg p-3"
            required
          />

          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border rounded-lg p-3"
            required
          />

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded-lg p-3"
            required
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border rounded-lg p-3"
            required
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
            alt="Preview"
            className="w-52 h-52 object-cover rounded-lg border"
          />
        )}

        <button
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          {saving ? "Updating..." : "Update Product"}
        </button>

      </form>

    </div>
  );
}

export default EditProduct;