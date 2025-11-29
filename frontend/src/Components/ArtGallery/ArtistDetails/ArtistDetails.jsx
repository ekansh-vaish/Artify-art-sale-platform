import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function ArtistDetails({ id }) {
const [Artist, setArtist] = useState();
const navigate = useNavigate();

async function ArtWork() {
try {
const response = await axios.get(`https://artify-art-sale-platform.onrender.com/artwork/getart/${id}`, {
withCredentials: true
});
setArtist(response.data.data.artist);
} catch (error) {
console.log(error);
}
}

useEffect(() => {
ArtWork();
}, []);

return (
<div className="d-flex justify-content-center align-items-center">
{Artist && (
<Card className="shadow-lg border-0 rounded-4 text-center" style={{ width: '20rem' }} key={Artist._id}>
<Card.Img
variant="top"
src={Artist.image.url}
className="img-fluid rounded-top"
style={{ height: "250px", objectFit: "cover" }}
/>
<Card.Body>
<Card.Title className="fw-bold text-primary">{Artist.name}</Card.Title>
<Button 
variant="success" 
className="mt-3 w-100 fw-semibold rounded-pill"
onClick={() => navigate(`/artistart/${Artist._id}`)}
>
🎨 See Artwork
</Button>
</Card.Body>
</Card>
)}
</div>
);
}

export default ArtistDetails;
