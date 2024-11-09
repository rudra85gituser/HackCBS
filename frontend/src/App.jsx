
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
//appbar  , login , logout
import AppBar from './pages/Appbar.jsx';  // Import AppBar component
import LoginButton from './pages/Login.jsx';
import LogoutButton from './pages/Logout.jsx';
//Home page for login and logout
import Home from "./pages/HomeOptions.jsx"
import Hero from "./pages/Hero.jsx";
//Trade section
import SellerForm from "./part1/Seller.jsx";
import ModelData from "./part1/ModelData.jsx";
import ProductLists from "./part1/ProductLists.jsx";
import VendorForm from "./part1/Vendor.jsx";
import VendorList from "./part1/VendorList.jsx";
//Charity here
import SellerOLXForm from "./part2/Seller.jsx";
import BuyerOLXForm from "./part2/Buyer.jsx";
import ProductList from "./part2/ProductList.jsx";



function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <>
        <AppBar />
        <div>
          <Routes>
           
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Hero />}/>
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />

            <Route path="/login" element={<LoginButton />} />
            <Route path="/logout" element={<LogoutButton />} />

            <Route path="/part1/Seller" element={<SellerForm />} />
            <Route path="/part1/ModelData" element={<ModelData />} />
            <Route path="/part1/ProductLists" element={<ProductLists />} />
            <Route path="/part1/Vendor" element={<VendorForm />} />
            <Route path="/part1/VendorList" element={<VendorList />} />

            <Route path="/part2/Seller" element={<SellerOLXForm />} />
            <Route path="/part2/Buyer" element={<BuyerOLXForm />} />
            <Route path="/part2/ProductList" element={<ProductList />} />


          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
