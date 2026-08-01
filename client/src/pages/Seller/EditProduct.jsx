import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaFileAlt,
  FaLayerGroup,
  FaRupeeSign,
  FaTag,
  FaImage,
} from "react-icons/fa";

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

    try {
      setSaving(true);

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
      <div className="text-center py-24 text-3xl font-bold">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-3">
              Update your product information.
            </p>

          </div>

          <Link
            to="/seller/products"
            className="mt-5 md:mt-0 inline-flex items-center gap-2 bg-white border shadow px-6 py-3 rounded-xl hover:bg-gray-50 transition"
          >
            <FaArrowLeft />
            Back
          </Link>

        </div>

        {/* Form Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-6 flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-2xl">
              <FaBoxOpen className="text-3xl" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Product Details
              </h2>

              <p className="text-green-100">
                Update all required fields.
              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-8"
          >

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaBoxOpen />
                Product Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />

            </div>

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaFileAlt />
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />

            </div>

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
                  className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-600 outline-none"
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
                  className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-semibold">
                  Category
                </label>

                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-5 py-3 mt-2 focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2">
                  <FaTag />
                  Brand
                </label>

                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-5 py-3 mt-2 focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />

              </div>

            </div>

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

            <button
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold transition"
            >
              {saving
                ? "Updating Product..."
                : "Update Product"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditProduct;