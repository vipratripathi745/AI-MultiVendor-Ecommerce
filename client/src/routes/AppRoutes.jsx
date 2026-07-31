import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductDetails from "../pages/Product/ProductDetails";
import Cart from "../pages/Cart/Cart";

import Dashboard from "../pages/Seller/Dashboard";
import AddProduct from "../pages/Seller/AddProduct";
import MyProducts from "../pages/Seller/MyProducts";
import EditProduct from "../pages/Seller/EditProduct";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* Public */}

        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        <Route
          path="products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Seller */}

        <Route
          path="seller/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="seller/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="seller/products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="seller/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;