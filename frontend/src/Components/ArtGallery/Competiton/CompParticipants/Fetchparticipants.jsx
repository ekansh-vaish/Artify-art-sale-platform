import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CompReview from '../../Reviews/CompReview';

function Fetchparticipants({ competitionId }) {
const [FetchedData, setFetchedData] = useState([]);
const [Artist,setArtist] = useState([]);
const User = JSON.parse(localStorage.getItem("User"));
async function FetchData() {
try {
const result = await axios.get(
`https://artify-art-sale-platform.onrender.com/participate/getparticipants/${competitionId}`,
{ withCredentials: true }
);
setFetchedData(result.data.response);
setArtist(result.data.response)


} catch (err) {
console.log("❌ Error fetching participants:", err);
}
}


async function TrashArt(itemId) {
const confirmDelete = window.confirm("Are you sure you want to leave this competition?");
if (!confirmDelete) return;

try {
await axios.delete(
`https://artify-art-sale-platform.onrender.com/participate/deleteparticipants/${itemId}`,
{ withCredentials: true }
);
FetchData(); 
} catch (error) {
console.log("❌ Error leaving competition:", error);
}
}

useEffect(() => {
if (competitionId) {
FetchData();
}
}, [competitionId]); 

return (
<Container className="mt-4 mb-5 w-100">

<Row className="g-4">
{FetchedData.map((item) => (
    
<Col key={item._id} xs={12} sm={6} md={4} lg={3}>
<Card className="shadow-lg border-0 h-100 w-100">
<Card.Img
variant="top"
src={item.image.url}
style={{ height: "200px", objectFit: "cover" }}
/>
<Card.Body>
<Card.Title className="fw-bold">{item.title}</Card.Title>
<Card.Subtitle className="mb-2 text-muted">{item.theme}</Card.Subtitle>
<Card.Text style={{ minHeight: "60px" }}>
{item.description}
</Card.Text>
<div className="d-flex align-items-center mt-3">
<img
src={item.artist.image.url}
alt={item.artist.name}
style={{
width: "40px",
height: "40px",
borderRadius: "50%",
objectFit: "cover",
marginRight: "10px"
}}
/>
<span className="text-muted">Artist: {item.artist.name}</span>
</div>
</Card.Body>
<Card.Footer className="bg-white border-0 text-center">
{User.id === item.artist._id &&    
<Button
variant="outline-danger"
size="sm"
onClick={() => TrashArt(item._id)}
>
Leave Competition
</Button>
}
</Card.Footer>

<CompReview selectedId={item._id} ArtistId ={item.artist._id} />
</Card>
</Col>
))}
</Row>
</Container>
);
}

export default Fetchparticipants;
