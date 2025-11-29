import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateArt from '../UpdateArt/UpdateArt';
import Review from '../Reviews/Review';
import ViewReview from '../Reviews/ViewReview';
import Slider from '../Main/Slider';

function ViewArt() {
const { id } = useParams();
const [Artist, setArtist] = useState();
const [show, setShow] = useState(false);
const navigate = useNavigate();

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const User = JSON.parse(localStorage.getItem("User"));
async function ArtWork() {
try {
const response = await axios.get(`http://localhost:8080/artwork/getart/${id}`, {
withCredentials: true
});

setArtist(response.data.data);
} catch (error) {
console.log(error);
if (error.response?.status === 403) {
alert("आपके पास इस कला को देखने की अनुमति नहीं है");
navigate("/explore");
}
}
}

async function DeleteAart(selectedId) {
try {
await axios.delete(`http://localhost:8080/artwork/deleteart/${selectedId}`, {
withCredentials: true
});
alert("Artwork deleted successfully!");
navigate("/explore");
} catch (error) {
console.log(error);
}
}

useEffect(() => {
ArtWork();
}, [id]);

return (
<div className="container my-5">
{Artist && (
<div className="container my-5">
<div className="d-flex flex-wrap justify-content-center gap-4">

<div className="text-center" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
<img
src={Artist.image.url}
alt={Artist.title}
className="img-fluid rounded shadow"
style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
/>
<h2 className="mt-4 text-success fw-bold">🎨 {Artist.title}</h2>
<p className="fst-italic text-muted m-4 p-3 border rounded" style={{ minHeight: "150px", backgroundColor: "#f8f9fa" }}>
{Artist.description}
</p>
<ul className="list-unstyled">
<li className='m-2'><strong>📁 Category:{Artist.category}</strong></li>
<li className='m-2'><strong>💰 Price:₹{Artist.price}</strong></li>
<li className='m-2'><strong>📅 Created:{new Date(Artist.createdAt).toLocaleDateString()}</strong> </li>
</ul>

<div className="d-flex flex-wrap justify-content-center gap-2 mt-4">

{User && User.id === Artist.artist._id && (
<>
<Button variant="outline-danger" onClick={() => {
if (window.confirm("Are you sure you want to delete this artwork?")) {
DeleteAart(Artist._id);
}
}}>
🗑️ Delete
</Button>
<Button variant="outline-primary" onClick={handleShow}>
✏️ Update
</Button>
</>
)}

<Button variant="secondary" onClick={() => navigate("/explore")}>
🔙 Back to Gallery
</Button>
</div>
</div>

<div className="bg-light p-4 rounded" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
<h4 className="text-center text-primary mb-4">📝 Reviews</h4>
<Review />
<ViewReview />
  

</div>
</div>

</div>
)}

<Slider/>
{Artist && (
<Modal show={show} onHide={handleClose} centered>
<Modal.Header closeButton className="bg-light">
<Modal.Title className="fw-bold text-primary">Update Artwork</Modal.Title>
</Modal.Header>
<Modal.Body className="px-4 py-3">
<UpdateArt selectedId={Artist._id} onUpdate={() => {
ArtWork();
handleClose();
}} />
</Modal.Body>
<Modal.Footer className="d-flex justify-content-end">
<Button variant="secondary" onClick={handleClose}>Close</Button>
</Modal.Footer>
</Modal>
)}
</div>
);
}

export default ViewArt;
