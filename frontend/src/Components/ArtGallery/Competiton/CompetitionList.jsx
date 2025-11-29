import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CompetitionList() {
const [competitions, setCompetitions] = useState([]);
const [timers, setTimers] = useState({});
const [Artreview, setArtReview] = useState([]);
const [CompArt1, setCompArt1] = useState(null);

const User = JSON.parse(localStorage.getItem("User"));
const navigate = useNavigate();
const role = User?.role === "admin";

async function fetchCompetition() {
try {
const response = await axios.get("http://localhost:8080/competition/getdetail", { withCredentials: true });
setCompetitions(response.data.response);
} catch (error) {
console.log(error);
}
}

async function DestroyCompetition(itemid) {
try {
await axios.delete(`http://localhost:8080/competition/deleteevent/${itemid}`, { withCredentials: true });
fetchCompetition();
} catch (error) {
console.log(error);
}
}

async function getReviews() {
try {
const response = await axios.get("http://localhost:8080/CompReview/getReview");
setArtReview(response.data.response);
} catch (error) {
console.log(error);
}
}

function getWinner() {
const reviewCount = {};
const winnerData = {};

Artreview.forEach((item) => {
const art = item.CompArt;
if (!art?._id) return;

reviewCount[art._id] = (reviewCount[art._id] || 0) + 1;

winnerData[art._id] = {
title: art.title,
image: art.image,
};
});

let winnerId = null;
let maxReviews = 0;

for (const id in reviewCount) {
if (reviewCount[id] > maxReviews) {
maxReviews = reviewCount[id];
winnerId = id;
}
}

if (winnerId) {
setCompArt1(winnerData[winnerId]);
}
}

useEffect(() => {
getWinner();
}, [Artreview]);

// Countdown Timer
useEffect(() => {
const interval = setInterval(() => {
const newTimers = {};
competitions.forEach((comp) => {
const now = Date.now();
const end = new Date(comp.deadline).getTime();
const diff = end - now;

if (diff <= 0) {
newTimers[comp._id] = "Expired";
} else {
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
const mins = Math.floor((diff / (1000 * 60)) % 60);
const secs = Math.floor((diff / 1000) % 60);
newTimers[comp._id] = `${days}d ${hours}h ${mins}m ${secs}s`;
}
});
setTimers(newTimers);
}, 1000);

return () => clearInterval(interval);
}, [competitions]);

useEffect(() => {
fetchCompetition();
getReviews();
}, []);

return (
<div className="container py-5">
<div className="text-center mb-5">
<h1 className="fw-bold display-5" style={{ color: "#0047AB" }}>
⭐ Live Competitions
</h1>
<p className="text-secondary fs-5">
Compete and showcase your talent — Win exciting prizes! 🎨🏆
</p>
</div>

{competitions.length === 0 ? (
<p className="text-center fs-4 text-muted">No Competition Right Now!</p>
) : (
<Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
{competitions.map((comp) => (
<Col key={comp._id} className="d-flex justify-content-center">
<Card
className="shadow-lg border-0 rounded-4"
style={{
width: "100%",
maxWidth: "430px",
minHeight: "420px",
background: "#ffffff",
}}
>
<Card.Body className="p-4">
<Card.Title className="fw-bold fs-4" style={{ color: "#0047AB" }}>
{comp.title}
</Card.Title>

{timers[comp._id] === "Expired" && CompArt1 && (
<div
className="p-2 mb-3 rounded-3"
style={{
background: "#FFD700",
fontWeight: "bold",
border: "2px solid #FFB300",
}}
>
<img
src={CompArt1.image.url}
alt="Winner Art"
height="80"
width="80"
style={{
borderRadius: "50%",
objectFit: "cover",
border: "3px solid white",
}}
/>
<div className="mt-2">🏆 Winner: {CompArt1.title}</div>
</div>
)}

<Card.Subtitle className="text-muted mb-2">
🎨 Theme: <strong>{comp.theme}</strong>
</Card.Subtitle>

<Card.Text className="text-secondary" style={{ minHeight: "60px" }}>
{comp.description}
</Card.Text>

<p className="text-danger fw-bold fs-5 mb-1">
🪙 Prize: {comp.prize}
</p>

<p className="fw-semibold">
⏱ Ends: {new Date(comp.deadline).toLocaleString()}
</p>

<Badge
style={{
padding: "10px 12px",
fontSize: "15px",
borderRadius: "10px",
}}
bg={timers[comp._id] === "Expired" ? "danger" : "success"}
>
{timers[comp._id] === "Expired"
? "⛔ Competition Ended"
: `⏳ ${timers[comp._id]}`}
</Badge>
</Card.Body>

<Card.Footer className="bg-white border-0 d-flex justify-content-between p-3">
{role && (
<Button
variant="outline-danger"
size="sm"
onClick={() => DestroyCompetition(comp._id)}
className="fw-semibold"
>
🗑 Delete
</Button>
)}

{timers[comp._id] !== "Expired" && (
<Button
variant="primary"
size="sm"
onClick={() => navigate(`/comp/${comp._id}`)}
className="fw-bold px-3"
style={{ background: "#0047AB" }}
>
Visit →
</Button>
)}
</Card.Footer>
</Card>
</Col>
))}
</Row>
)}
</div>
);
}

export default CompetitionList;
