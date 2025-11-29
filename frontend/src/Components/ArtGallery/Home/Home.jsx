import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ArtistDetails from '../ArtistDetails/ArtistDetails';
import Image from "../../../assets/sudio.png"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Home.css"
function Home() {
const [Arts, setArts] = useState();
const [show, setShow] = useState(false);
const [selectedId, setSelectedId] = useState();
const navigate = useNavigate();
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

async function ArtWork() {
try {
const response = await axios.get("https://artify-art-sale-platform.onrender.com/artwork/getart", {
withCredentials: true
});
setArts(response.data.data);
} catch (error) {
if(error.response && error.response.status === 401)
{
alert("Your Session expired.Please Login Again!");
window.location.href = "/login";  
}
else{
console.log(error);

}}
}

useEffect(() => {
ArtWork();
}, []);

return (
<div className="rubina">
  <div className='hero'>
 <div className="hero-banner">
        <h1>🎨 Art Make Your Day</h1>
        <p>
          Discover creativity that inspires. Artify brings together artists and audiences 
          to celebrate imagination and talent.
        </p>
        <br />
        <button onClick={() => navigate("/addproduct")}>Add your Art</button>
        </div>
        <div>
         <img src={Image} height={"500px"} alt="" /> 
        </div>
      </div>


<div className=" row justify-content-center">
{Arts && Arts.map((item) => (
<div className="col-md-6 col-lg-4 mb-5" key={item._id}>
<Card className="shadow-sm h-100 rounded-4 clickable-card" onClick={() => navigate(`/art/${item._id}`)}  >
<Card.Img
variant="top"
src={item.image.url}
style={{ height: '300px', objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
/>
<Card.Body className="text-center">
<Card.Title className="fw-bold text-primary">{item.title}</Card.Title>
</Card.Body>
<ListGroup className="list-group-flush" style={{backgroundColor:"wheat"}}>
<ListGroup.Item><strong>📁 Category:</strong> {item.category}</ListGroup.Item>
<ListGroup.Item><strong>💰 Price:</strong> ₹{item.price}</ListGroup.Item>
<ListGroup.Item><strong>📅 Created:</strong> {new Date(item.createdAt).toLocaleDateString()}</ListGroup.Item>
</ListGroup>
<Card.Body className="d-flex justify-content-around">
<Button
variant="outline-primary"
onClick={(e) => {
 e.stopPropagation(); 
setSelectedId(item._id);
handleShow();
}}
>
👤 View Artist
</Button>

<Button
variant="outline-danger"
onClick={async (e) => {
  e.stopPropagation();
  try {
  const response=  await axios.post("https://artify-art-sale-platform.onrender.com/cart/additem", {
      artworkId: item._id
    }, {
      withCredentials: true
    });
    console.log(response);
    
    alert("✅ Added to cart!");
     navigate("/cart")
} catch (err) {
    if (err.response?.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    } else {
      console.error(err);
      alert("❌ Failed to add to cart.");
    }
  }
}}
>
🛒 Add To Cart
</Button>

</Card.Body>
</Card>

</div>
))}
</div>

<Modal show={show} onHide={handleClose} centered>
<Modal.Header closeButton>
<Modal.Title className="text-primary">👤 Artist Details</Modal.Title>
</Modal.Header>
<Modal.Body>
<ArtistDetails id={selectedId} />
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>Close</Button>
</Modal.Footer>
</Modal>
</div>
);
}

export default Home;
