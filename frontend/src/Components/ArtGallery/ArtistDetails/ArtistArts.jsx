import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col, Container } from 'react-bootstrap';
import "./ArtistArt.css";   // custom CSS

function ArtistArt() {
const { id } = useParams(); 
const [Art, setArt] = useState([]);
const [Artist, setArtist] = useState(null);
const navigate = useNavigate();

async function fetchArt() {
try {
const response = await axios.get("https://artify-art-sale-platform.onrender.com/artwork/getart", {
withCredentials: true
});

const filtered = response.data.data.filter(item => item.artist._id === id);
setArt(filtered);

if (filtered.length > 0) {
setArtist(filtered[0].artist); // ✅ artist info from first artwork
}
} catch (err) {
console.log("Error fetching artist's art:", err);
}
}

useEffect(() => {
fetchArt();    
}, []);

return (
<Container className="mt-5 mb-3">
<h3 className="text-center mb-4 section-title">🎨 Artworks by This Artist</h3>

{Artist && (
<div className="artist-box shadow-lg rounded-4 mb-5 p-4 text-center">
<img 
src={Artist.image.url} 
alt={Artist.name} 
className="artist-photo mb-3"
/>
<h2 className="artist-name">{Artist.name}</h2>
<p className="artist-bio text-muted">Explore {Artist.name}'s creative gallery</p>
</div>
)}

<Row xs={1} sm={2} md={3} lg={3} className="g-4">
{Art.map((item) => (
<Col key={item._id}>
<Card 
className="art-card shadow-lg h-100 rounded-4"
onClick={() => navigate(`/art/${item._id}`)} // ✅ fixed
style={{ cursor: "pointer" }}
>
<Card.Img
variant="top"
src={item.image.url}
className="art-image"
/>
<Card.Body>
<Card.Title className="fw-bold text-primary">{item.title}</Card.Title>
<Card.Text className="text-muted">{item.description}</Card.Text>
<Card.Subtitle className="fw-semibold text-success">💰 Price: ₹{item.price}</Card.Subtitle>
</Card.Body>
</Card>
</Col>
))}
</Row>
</Container>
);
}

export default ArtistArt;
