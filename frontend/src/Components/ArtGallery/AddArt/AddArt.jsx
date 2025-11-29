import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BannerImage from "../../../assets/sciors.avif";
import './AddArt.css';

function AddArt() {
const [formData, setFormData] = useState({
title: '',
description: '',
category: '',
price: '',
});
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const navigate = useNavigate();

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleFileChange = (e) => {
const file = e.target.files[0];
setImage(file);
if (file) {
setPreview(URL.createObjectURL(file));
}
};

const handleSubmit = async (e) => {
e.preventDefault();
const form = new FormData();
form.append('title', formData.title);
form.append('description', formData.description);
form.append('category', formData.category);
form.append('price', formData.price);
form.append('image', image);

try {
await axios.post('http://localhost:8080/artwork/sendart', form, {
withCredentials: true,
});
alert('🎉 Artwork Uploaded Successfully!');
navigate("/explore");
} catch (error) {
console.error('Error:', error);
alert('❌ Upload Failed!');
}
};

return (
<div className="add-art-container">
<div className="d-flex justify-content-center fade-in">
<Card className="p-4 shadow-lg m-4 glass-card">
<h4 className="text-center mb-4 animate-title">🧑‍🎨 Upload Your Artwork</h4>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3 text-center">
<Form.Label className="d-block mb-2">Upload Image :</Form.Label>
<div
className="upload-box mx-auto"
onClick={() => document.getElementById('hiddenFileInput').click()}
>
{preview ? (
<Image src={preview} roundedCircle height="150" width="150" className="shadow-lg" />
) : (
<div className="upload-placeholder">
<span>📷 Click to Upload</span>
</div>
)}
</div>
<Form.Control
type="file"
id="hiddenFileInput"
onChange={handleFileChange}
style={{ display: 'none' }}
accept="image/*"
required
/>
</Form.Group>

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
type="text"
name="description"
value={formData.description}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Category :</Form.Label>
<Form.Control
type="text"
name="category"
value={formData.category}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Price (₹) :</Form.Label>
<Form.Control
type="number"
name="price"
value={formData.price}
onChange={handleChange}
required
className="input-animate"
/>
</Form.Group>

<div className="text-center mt-4">
<Button type="submit" variant="dark" className="btn-animate">
🚀 Submit
</Button>
</div>
</Form>
</Card>
</div>

<div className="d-flex h-50 bg-gradient text-center rounded-5 w-100 slide-up">
<div className="image-box">
<img src={BannerImage} alt="Artwork Banner" className="banner-img" />
</div>
<div className="p-4">
<h1 className="animate-title">Add Your Art</h1>
<p className="fade-in-delay">
Showcase your creativity to the world 🌍. Upload your masterpiece and let customers
explore your imagination. Every artwork tells a story — make yours unforgettable.
</p>
</div>
</div>
</div>
);
}

export default AddArt;
