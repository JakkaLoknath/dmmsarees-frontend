import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./home/Home.jsx";
import HomeImage from "./home/HomeImage.jsx";
import "./home/home.css";

import VendorRegister from "./vendor/VendorRegister.jsx";
import VendorLogin from "./vendor/VendorLogin.jsx";
import VendorDB from "./vendor/VendorDB.jsx";
import VendorProductForm from "./vendor/VendorProductForm.jsx";
import VendorProductEdit from "./vendor/VendorProductEdit.jsx";
import VendorProfile from "./vendor/VendorProfile.jsx";
import VendorProductImage from "./vendor/VendorProductImage.jsx";
import "./vendor/vendor.css";

import Types from "./types/Types.jsx";
import "./types/types.css";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDB from "./admin/AdminDB.jsx";
import AdminDBUserDetails from "./admin/AdminDBUserDetails.jsx";
import AdminDBVendorDetails from "./admin/AdminDBVendorDetails.jsx";
import "./admin/admin.css";

import UserRegister from "./user/UserRegister.jsx";
import UserLogin from "./user/UserLogin.jsx";
import UserDB from "./user/UserDB.jsx";
import UserProfile from "./user/UserProfile.jsx";
import UserProductImage from "./user/UserProductImage.jsx";
import UserProductInfo from "./user/UserProductInfo.jsx";
import UserCartProduct from "./user/UserCartProduct.jsx";
import UserCart from "./user/UserCart.jsx";
import UserCartUpdate from "./user/UserCartUpdate.jsx";
import UserBill from "./user/UserBill.jsx";
import "./user/user.css";



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/home-image" element={<HomeImage/>}/>
        <Route path="/types" element={<Types/>}/>

        <Route path="/v-register" element={<VendorRegister/>}/>
        <Route path="/v-login" element={<VendorLogin/>}/>
        <Route path="/vdb" element={<VendorDB/>}/>
        <Route path="/vpf" element={<VendorProductForm/>}/>
        <Route path="/vpe" element={<VendorProductEdit/>}/>
        <Route path="/vp" element={<VendorProfile/>}/>
        <Route path="/vdb-product-image" element={<VendorProductImage/>}/>

        <Route path="/a-login" element={<AdminLogin/>}/>
        <Route path="/adb" element={<AdminDB/>}/>
        <Route path="/adb-ud" element={<AdminDBUserDetails/>}/>
        <Route path="/adb-vd" element={<AdminDBVendorDetails/>}/>

        <Route path="/u-register" element={<UserRegister/>}/>
        <Route path="/u-login" element={<UserLogin/>}/>
        <Route path="/udb" element={<UserDB/>}/>
        <Route path="/up" element={<UserProfile/>}/>
        <Route path="/udb-product-image" element={<UserProductImage/>}/>
        <Route path="/upi" element={<UserProductInfo/>}/>
        <Route path="/ucp" element={<UserCartProduct/>}/>
        <Route path="/uc" element={<UserCart/>}/>
        <Route path="/ucu" element={<UserCartUpdate/>}/>
        <Route path="/ub" element={<UserBill/>}/>
      </Routes>
    </Router>
  )
}

export default App