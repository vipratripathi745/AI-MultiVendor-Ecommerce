import Sidebar from "../../components/Seller/Sidebar";
import ProductForm from "../../components/Seller/ProductForm";

function AddProduct() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Product
        </h1>

        <ProductForm />

      </div>

    </div>
  );
}

export default AddProduct;