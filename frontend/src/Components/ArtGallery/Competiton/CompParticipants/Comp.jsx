import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import ParticipateForm from './ParticipateForm';
import Fetchparticipants from './Fetchparticipants';

function Comp() {
const { id } = useParams();
const [FetchData, setFetchData] = useState(null);
const [show, setShow] = useState(false);
const [deadline, setDeadline] = useState(null);
const [countdown, setCountdown] = useState("");

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// 🔥 Fetch Competition Details
async function FetchComp() {
try {
const res = await axios.get(
`http://localhost:8080/competition/getdetail/${id}`,
{ withCredentials: true }
);

setFetchData(res.data.response);

const dl = res.data.response.deadline;
setDeadline(dl);

} catch (error) {
console.error("❌ Error fetching competition:", error);
}
}

useEffect(() => {
FetchComp();
}, [id]);

// 🔥 LIVE TIMER LOGIC
useEffect(() => {
if (!deadline) return;

const interval = setInterval(() => {
const now = Date.now();
const end = new Date(deadline).getTime();
const diff = end - now;

if (diff <= 0) {
setCountdown("⛔ Competition Ended");
clearInterval(interval);
return;
}

const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
const mins = Math.floor((diff / (1000 * 60)) % 60);
const secs = Math.floor((diff / 1000) % 60);

setCountdown(`${days}d : ${hours}h : ${mins}m : ${secs}s`);
}, 1000);

return () => clearInterval(interval);
}, [deadline]);

if (!FetchData) {
return <p className="text-center mt-4">Loading competition...</p>;
}

return (
<div className="container mt-4">

<h1 className="fw-bold">{FetchData.title}</h1>
<h3 className="text-muted">{FetchData.theme}</h3>
<h4 className="text-danger">{FetchData.prize}</h4>
<p>{FetchData.description}</p>

<h5>Deadline: {new Date(FetchData.deadline).toLocaleString()}</h5>

<h3 className="text-danger fw-bold mt-2">
⏳ Time Left: {countdown}
</h3>
{countdown !== "⛔ Competition Ended" ?( 
<Button variant="dark" className="mt-3" onClick={handleShow}>
Join Competition
</Button>
) : (<h4 className='text-danger mt-3'>Competiton Ended</h4> )}
<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
<Modal.Header closeButton>
<Modal.Title>Participate In Competition</Modal.Title>
</Modal.Header>
<Modal.Body>
<ParticipateForm competitionId={FetchData._id} />
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Cancel
</Button>
</Modal.Footer>
</Modal>
{countdown !== "⛔ Competition Ended" ? (
<div className="mt-5">
<Fetchparticipants competitionId={FetchData._id} />
</div>
)  : <h4 className='text-danger'>----------------</h4>
}
</div>
);
}

export default Comp;
