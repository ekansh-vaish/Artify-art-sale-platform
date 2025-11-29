import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';
import "./MyArt.css";   // custom CSS import
import { Navigate, useNavigate } from 'react-router-dom';

function MyArt() {
const [Art, setArts] = useState([]);
const [reviewMap, setReviewMap] = useState({});
const [Artist, setArtist] = useState(null);
const User = JSON.parse(localStorage.getItem("User"));
const navigate = useNavigate();
async function MineArt() {
try {
const response = await axios.get("http://localhost:8080/artwork/myart", {
withCredentials: true
});
console.log(response);

const arts = response.data.data;
setArts(arts);

if (arts.length > 0 && arts[0].artist) {
setArtist(arts[0].artist);
}

arts.forEach(item => {
ArtReview(item._id);
});
} catch (err) {
console.log("Error fetching artworks:", err);
}
}

async function ArtReview(artworkId) {
try {
const response = await axios.get(`http://localhost:8080/review/getReviews/${artworkId}`, {
withCredentials: true
});
setReviewMap(prev => ({ ...prev, [artworkId]: response.data.response }));
} catch (err) {
console.log("Error fetching reviews for", artworkId, err);
}
}

useEffect(() => {
MineArt();
}, []);

return (
<Container className="mt-5 mb-3">
<h3 className="text-center mb-4 section-title">🎨 Artworks by This Artist</h3>

{Art.length === 0 ? (<div><h1 className='bg-danger text-center'>NO Art Found! </h1><button style={{height:"50px", width:"200px", borderRadius:"20px", backgroundColor:"green", color:"wheat" }} onClick={() => navigate("/addproduct")}><b>Add Your Art</b></button></div>) : (
    <>
{Artist && (
<div className="artist-box shadow-lg rounded-4 mb-5 p-4 text-center">
<img 
src={Artist.image.url} 
alt={Artist.name}  height={"400px"}
className="artist-photo mb-3"
/>
<h2 className="artist-name">{Artist.name}</h2>
<p className="artist-bio text-">Welcome to {Artist.name}'s gallery</p>
</div>
)}

{/* ✅ Artworks Grid */}
<Row xs={1} sm={2} md={3} lg={3} className="g-4">
{Art.map((item) =>(
<Col key={item._id}>
<Card className="art-card shadow-lg h-100 rounded-4">
<Card.Img
variant="top"
src={item.image.url}
className="art-image"
/>
<Card.Body>
<Card.Title className="fw-bold text-primary">Title: {item.title}</Card.Title>
<Card.Text className="text-muted">{item.description}</Card.Text>
<Card.Subtitle className="fw-semibold text-success">💰 Price: ₹{item.price}</Card.Subtitle>

{/* Reviews Section */}
{reviewMap[item._id] && reviewMap[item._id].length > 0 ? (
<div className="mt-3 reviews-box">
<h6 className="text-muted">User Reviews:</h6>
{reviewMap[item._id].map((rev) => (
<div key={rev._id} className="review-item">
<strong className="review-user">{rev.user.name}</strong>
<p className="review-comment">{rev.comment}</p>
<small className="text-warning">⭐ {rev.rating}/5</small>
{User && User.id === rev.user._id && (
<button
className="btn btn-sm btn-danger mt-2"
onClick={async () => {
await axios.delete(`http://localhost:8080/review/deleteReview/${rev._id}`, {
withCredentials: true
});
ArtReview(item._id); // Refresh reviews
}}
>
Delete Review
</button>
)}
</div>
))}
</div>
) : (
<p className="no-reviews"><b>No Reviews Found</b></p>
)}
</Card.Body>
</Card>
</Col>
))}
</Row>
</>
)}
</Container>
);
}

export default MyArt;
