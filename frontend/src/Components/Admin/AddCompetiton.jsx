import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCompetition.css'; // custom styles

function AddCompetition() {
const [formData, setFormData] = useState({
title: '',
description: '',
theme: '',
prize: '',
deadline: '',
});
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
setLoading(true);
const res = await axios.post('https://artify-art-sale-platform.onrender.com/competition/create', formData, {
withCredentials: true,
headers: { "Content-Type": "application/json" }
});

alert(res.data.message || "🎉 Competition Created Successfully!");
navigate("/competitionlist"); 
} catch (error) {
console.error('Error:', error);
alert('❌ Competition Creation Failed!');
} finally {
setLoading(false);
}
};

return (
<div className="competition-container">
<Card className="p-4 shadow-lg m-4 glass-card">
<h4 className="text-center mb-4 animate-title">🏆 Create New Competition</h4>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3">
<Form.Label>Title :</Form.Label>
<Form.Control
type="text"
name="title"
value={formData.title}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Description :</Form.Label>
<Form.Control
as="textarea"
rows={3}
name="description"
value={formData.description}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Theme :</Form.Label>
<Form.Control
type="text"
name="theme"
value={formData.theme}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Prize :</Form.Label>
<Form.Control
type="text"
name="prize"
value={formData.prize}
onChange={handleChange}
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Deadline :</Form.Label>
<Form.Control
type="datetime-local"
name="deadline"
value={formData.deadline}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<div className="text-center mt-4">
<Button type="submit" variant="dark" disabled={loading} className="btn-animate">
{loading ? <Spinner animation="border" size="sm" /> : "🚀 Submit"}
</Button>
</div>
</Form>
</Card>
</div>
);
}

export default AddCompetition;
