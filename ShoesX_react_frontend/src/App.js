import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Login } from './components/Admin/Login/login';
import { Signup } from './components/Admin/Login/signup';
import { ForgotPassword } from './components/Admin/Login/forgotPassword';
import { ChangePassword } from './components/Admin/Login/changePassword';
import { Admin } from './components/Admin/Admin';
import { Dashboard } from './components/Admin/Dashboard/dashboard';
import Product from './components/Admin/Product/Product';
import AddProduct from './components/Admin/Product/AddProduct';
import ViewProduct from './components/Admin/Product/ViewProduct';
import EditProduct from './components/Admin/Product/EditProduct';
import { Category } from './components/Admin/Product/Category/Category';
import { AddCategory } from './components/Admin/Product/Category/Add/AddCategory';
import { Size } from './components/Admin/Product/Sizes/size';
import Role from './components/Admin/Role/Role';
import AddRole from './components/Admin/Role/AddRole';
import EditRole from './components/Admin/Role/EditRole';
import Order from './components/Admin/Order/Order';
import Profile from './components/Admin/Profile/Profile';
// import PaymentPage from './components/Admin/Payment/Payment';
import { Brand } from './components/Admin/Product/Brand/Brand';
import { AddBrand } from './components/Admin/Product/Brand/Add/AddBrand';
import UserPage from './components/Admin/User/UserPage';
import { Color } from './components/Admin/Product/Color/Color';
import { AddColor } from './components/Admin/Product/Color/AddColor';
import { AddSize } from './components/Admin/Product/Sizes/AddSize';
import ProtectedRoute from './components/ProtectedRoute';
import { EditCategory } from './components/Admin/Product/Category/Edit/EditCategory';
import { EditBrand } from './components/Admin/Product/Brand/Edit/EditBrand';
import { EditColor } from './components/Admin/Product/Color/EditColor';
import { EditSize } from './components/Admin/Product/Sizes/EditSize';
import ViewOrder from './components/Admin/Order/ViewOrder';
import { ProductVariant } from './components/Admin/Product/ProductVariant';
import { Variants } from './components/Admin/Product/Variants';
import EditVariant from './components/Admin/Product/EditProductVariant';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserDetails } from './components/Admin/User/UserDetails';
import { ViewBiding } from './components/Admin/Biding/ViewBiding';
import { ResetPassword } from './components/Admin/Login/resetPassword';
import { jwtDecode } from 'jwt-decode';


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to="/login" />
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/' || location.pathname === '/forgot-password' || location.pathname.startsWith('/reset-password');

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem('token');
        setIsAuth(false);
        if (!authPage) {
          navigate('/login', { replace: true });
        }
      } else {
        setIsAuth(true);
        if (authPage && location.pathname !== '/') {
          navigate('/', { replace: true });
        }
      }
    } else {
      setIsAuth(false);
      if (!authPage) {
        navigate('/login', { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={<PrivateRoute isAuth={isAuth} element={<Admin />} />}>
        <Route index element={<Dashboard />} />
        <Route path="product" element={<Product />} />
        <Route path="product/add-product" element={<AddProduct />} />
        <Route path="product/view-product" element={<ViewProduct />} />
        <Route path="product/edit-product" element={<EditProduct />} />
        <Route path="product/addVariant" element={<ProductVariant />} />
        <Route path="product/editVariant" element={<EditVariant />} />
        <Route path="product/variant" element={<Variants />} />
        <Route path="product/viewBiding" element={<ViewBiding />} />
        <Route path="product/category" element={<Category />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="edit-category" element={<EditCategory />} />

        <Route path="product/size" element={<Size />} />
        <Route path="add-size" element={<AddSize />} />
        <Route path="edit-size" element={<EditSize />} />


        <Route path="product/brand" element={<Brand />} />
        <Route path="add-brand" element={<AddBrand />} />
        <Route path="edit-brand" element={<EditBrand />} />


        <Route path="role" element={<Role />} />
        <Route path="role/add-role" element={<AddRole />} />
        <Route path="role/edit-role" element={<EditRole />} />

        <Route path="color" element={<Color />} />
        <Route path="add-color" element={<AddColor />} />
        <Route path="edit-color" element={<EditColor />} />

        {/* <Route path="order" element={<Order />} /> */}
        {/* <Route path="order/view-order" element={<ViewOrder />} /> */}


        <Route path="profile" element={<Profile />} />
        <Route path="change-password" element={<ChangePassword />} />

        {/* <Route path="payment" element={<PaymentPage />} /> */}

        {/* <Route path="user" element={<UserPage />} /> */}
        {/* <Route path='user/user-details' element={<UserDetails />}></Route> */}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;