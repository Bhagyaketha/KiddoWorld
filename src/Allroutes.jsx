import React from 'react'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ShopByInterest from './pages/ShopByInterest'
import GiftFinder from './pages/GiftFinder'
import Deals from './pages/Deals'
import { Route, Routes } from 'react-router-dom'
import ShopByAge from './pages/ShopByAge'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Toys from './pages/Toys'
import Clothing from './pages/Clothing'
import SearchBar from './pages/SearchBar'
import MyOrders from './pages/MyOrders'
import GiftDetails from './pages/GiftDetails'
import Books from './pages/Books'
import SchoolSupplies from './pages/SchoolSupplies'
import Sports from './pages/Sports'
import ArtsCrafts from './pages/ArtsCrafts'
import Checkout from './pages/Checkout'
import EditProfile from './pages/EditProfile'
import Trending from './pages/Trending'
import Footer from './components/Footer'
import AIStoryMaker from './pages/AIStoryMaker'
import HelpSupport from './pages/HelpSupport'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'





const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/Home' element={<Home/>}></Route>
            <Route path='/Shop' element={<Shop/>}></Route>
            <Route path='/ShopByAge' element={<ShopByAge/>}></Route>
            <Route path='/Toys' element={<Toys />}></Route>
            <Route path='/Clothing' element={<Clothing/>}></Route>
            <Route path='/Books' element={<Books/>}></Route>
            <Route path='/Schoolsupplies' element={<SchoolSupplies/>}></Route>
            <Route path='/Artscrafts' element={<ArtsCrafts/>}></Route>
            <Route path='/Sports' element={<Sports/>}></Route>
            <Route path='/ShopByInterest' element={<ShopByInterest/>}></Route>
            <Route path='/GiftFinder' element={<GiftFinder/>}></Route>
            <Route path="/GiftFinder/:id" element={<GiftDetails />}/>
            <Route path='/Deals' element={<Deals/>}></Route>
             <Route path='/AIStoryMaker' element={<AIStoryMaker/>}></Route>
            <Route path='/Cart' element={<Cart/>}></Route>
            <Route path='/Wishlist' element={<Wishlist/>}></Route>
            <Route path='/Profile' element={<Profile/>}></Route>
            <Route path='/Login' element={<Login/>}></Route>
            <Route path='/Register' element={<Register/>}></Route>
            <Route path='/SearchBar' element={<SearchBar/>}></Route>
            <Route path='/MyOrders' element={<MyOrders/>}></Route>
            <Route path='/GiftDetails' element={<GiftDetails/>}></Route>
            <Route path='/Checkout' element={<Checkout/>}></Route>
            <Route path='/EditProfile' element={<EditProfile/>}></Route>
            <Route path='/Trending' element={<Trending/>}></Route>
            <Route path='/HelpSupport' element={<HelpSupport/>}></Route>
            <Route path='/Footer' element={<Footer/>}></Route>
            <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
            <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>

 

        </Routes>
    </div>
  )
}

export default Allroutes