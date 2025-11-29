import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';

function ParticipateForm({ competitionId }) {
const [formData, setformData] = useState({
title: "",
description: "",
theme: "",
image: null
});
const [preview, setPreview] = useState(null);

function ChangeInp(e) {
const name = e.target.name;
const value = name === "image" ? e.target.files[0] : e.target.value;
setformData({ ...formData, [name]: value });

if (name === "image" && e.target.files[0]) {
setPreview(URL.createObjectURL(e.target.files[0]));
}
}

async function Formsubmit(e) {
e.preventDefault();

const Userform = new FormData();
Userform.append("title", formData.title);
Userform.append("theme", formData.theme);
Userform.append("description", formData.description);
Userform.append("image", formData.image);

try {
await axios.post(
`http://localhost:8080/participate/participate/${competitionId}`,
Userform,
{
withCredentials: true,
headers: { "Content-Type": "multipart/form-data" }
}
);
alert("🎉 Participation Submitted Successfully!");
setformData({
title: "",
description: "",
theme: "",
image: null
});
setPreview(null);
} catch (error) {
console.error("❌ Error:", error.response?.data || error.message);
alert("Submission Failed!");
}
}

return (
<div className="participate-container d-flex justify-content-center mt-5">
<Card className="p-4 shadow-lg m-3 glass-card">
<h4 className="text-center mb-4 animate-title">🎨 Participate in Competition</h4>

<Form onSubmit={Formsubmit}>
<Form.Group className="mb-4 text-center" >
<Form.Label className="d-block mb-2">Upload Artwork :</Form.Label>
<div
className="upload-box mx-auto"
onClick={() => document.getElementById('hiddenFileInput').click()}
>
{preview ? (
<Image src={preview} roundedCircle height="120" width="120" className="shadow-lg" />
) : (
<div className="upload-placeholder">📷 Click to Upload</div>
)}
</div>
<Form.Control
id="hiddenFileInput"
type="file"
onChange={ChangeInp}
name="image"
style={{ display: 'none' }}
accept="image/*"
required
/>
</Form.Group>

<Form.Group className="mb-3" >
<Form.Label>Title :</Form.Label>
<Form.Control
type="text"
placeholder="Enter the Title ..."
onChange={ChangeInp}
name="title"
value={formData.title}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3" >
<Form.Label>Theme :</Form.Label>
<Form.Control
type="text"
placeholder="Enter the Theme ..."
onChange={ChangeInp}
name="theme"
value={formData.theme}
required
className="input-animate"
/>
</Form.Group>

<Form.Group className="mb-3" >
<Form.Label>Description :</Form.Label>
<Form.Control
as="textarea"
rows={3}
onChange={ChangeInp}
name="description"
value={formData.description}
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
);
}

export default ParticipateForm;
