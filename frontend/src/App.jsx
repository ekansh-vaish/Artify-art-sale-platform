import './App.css'
import AddArt from './Components/ArtGallery/AddArt/AddArt';
import ArtistDetails from './Components/ArtGallery/ArtistDetails/ArtistDetails';
import ArtistArts from './Components/ArtGallery/ArtistDetails/ArtistArts';

import Home from './Components/ArtGallery/Home/Home';
import Login from './Components/Authentication/Login'
import Signup from './Components/Authentication/Signup'
import Navbar1 from './Components/Navbar.jsx/Navbar'
import ViewArt from './Components/ArtGallery/Home/ViewArt';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Footer from './Components/ArtGallery/Footer/Footer';
import MyArt from './Components/ArtGallery/MyArt/MyArt';
import Cart from './Components/ArtGallery/Cart/Cart';
import Notfound from './Components/ArtGallery/NotFound/Notfound';
import PaymentSuccess from './Components/ArtGallery/Cart/PaymentSuccess';
import AddCompetition from './Components/Admin/AddCompetiton';
import CompetitionList from './Components/ArtGallery/Competiton/CompetitionList';
import Comp from './Components/ArtGallery/Competiton/CompParticipants/Comp';
import TopArt from './Components/ArtGallery/Main/TopArt';
import ContactUs from './Components/ArtGallery/ContactUs/ContactUs';
import Queries from './Components/Admin/Queries';
function App() {

return (
<>

<BrowserRouter>
<Navbar1/>
<Routes>
<Route path="/home" element={<TopArt/>} />
<Route path="/explore" element={<Home/>} />
<Route path="/art/:id" element={<ViewArt/>} />
<Route path="/addproduct" element={<AddArt/>} />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<Signup/>} />
<Route path="/myart" element={<MyArt/>} />
<Route path="/artistdetails" element={<ArtistDetails/>} />
<Route path="/artistart/:id" element={<ArtistArts />} />
<Route path="/cart" element={<Cart/>} />
<Route path="/cart/:id" element={<Cart/>} />
<Route path="/success" element={<PaymentSuccess/>} />
<Route path="/addcompetition" element={<AddCompetition/>} />
<Route path="/competitions" element={<AddCompetition/>} />
<Route path="/competitionlist" element={<CompetitionList/>} />
<Route path="/comp/:id" element={<Comp/>} />
<Route path="/contactus" element={<ContactUs/>} />
<Route path="/contactquery" element={<Queries/>} />
<Route path="*" element={<Notfound/>} />

</Routes>
<Footer/>
</BrowserRouter>
</>
)
}

export default App
