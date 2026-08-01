import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Users from "../pages/Admin/Users";
import ProductDetails from "../pages/Product/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import MyOrders from "../pages/Orders/MyOrders";
import OrderDetails from "../pages/Orders/OrderDetails";
import Products from "../pages/Admin/Products";
import Dashboard from "../pages/Seller/Dashboard";
import AddProduct from "../pages/Seller/AddProduct";
import MyProducts from "../pages/Seller/MyProducts";
import EditProduct from "../pages/Seller/EditProduct";
import Orders from "../pages/Admin/Orders";
import AdminDashboard from "../pages/Admin/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Analytics from "../pages/Admin/Analytics";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* ================= Public Routes ================= */}

        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        <Route
          path="products/:id"
          element={<ProductDetails />}
        />

        {/* ================= Customer Routes ================= */}

        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= Seller Routes ================= */}

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

        {/* ================= Admin Routes ================= */}

        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/products"
          element={
            <ProtectedRoute role="admin">
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/orders"
          element={
            <ProtectedRoute role="admin">
              <Orders />
            </ProtectedRoute>
          }
        />   

        <Route
          path="admin/analytics"
          element={
            <ProtectedRoute role="admin">
              <Analytics />
            </ProtectedRoute>
          }
        />     

        <Route
          path="*"
          element={<NotFound />}
        />       

      </Route>
    </Routes>
  );
}

export default AppRoutes;