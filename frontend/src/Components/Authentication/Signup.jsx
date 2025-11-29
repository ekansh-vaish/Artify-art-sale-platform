import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {

const [Userdata, setUserdata] = useState({
name: "",
email: "",
Phone: "",
password: "",
image: null
});

const [preview, setPreview] = useState(null);
const navigate = useNavigate();


function ChangeInp(e) {
const name = e.target.name;
const value = e.target.value;

setUserdata(prev => ({
...prev,
[name]: value
}));
}


function handleFileChange(e) {
const file = e.target.files[0];

if (!file) return;

setUserdata(prev => ({
...prev,
image: file
}));

setPreview(URL.createObjectURL(file));
}


async function Register(e) {
e.preventDefault();

const formData = new FormData();
formData.append("name", Userdata.name);
formData.append("email", Userdata.email);
formData.append("Phone", Userdata.Phone);
formData.append("password", Userdata.password);
formData.append("image", Userdata.image);

try {
await axios.post("http://localhost:8080/auth/signup", formData, {
withCredentials: true
});

alert("User Registered Successfully");
navigate("/login");

// Reset
setUserdata({
name: "",
email: "",
Phone: "",
password: "",
image: null
});
setPreview(null);

} catch (err) {
console.log(err);
alert("Registration failed");
}
}



return (
<div className="d-flex justify-content-center mt-5">

<Card className="p-4 shadow-lg m-3" style={{ width: '40rem', borderRadius: '15px' }}>

<h4 className="text-center mb-4">🧑 Create Your Profile</h4>

<Form onSubmit={Register}>

{/* IMAGE UPLOAD (no controlId here because id is required) */}
<Form.Group className="mb-3">
<Form.Label>Profile Image :</Form.Label>

<div
className="upload-box mx-auto d-flex justify-content-center align-items-center"
style={{
height: "140px",
width: "140px",
borderRadius: "50%",
border: "2px dashed #343a40",
cursor: "pointer"
}}
onClick={() => document.getElementById("hiddenFormImage").click()}
>
{preview ? (
<Image
src={preview}
roundedCircle
height="120"
width="120"
className="shadow-lg"
/>
) : (
<div className="upload-placeholder text-center" style={{ fontSize: "14px" }}>
📷 Click to Upload
</div>
)}
</div>

<Form.Control
id="hiddenFormImage"
type="file"
name="image"
onChange={handleFileChange}
style={{ display: "none" }}
accept="image/*"
required
/>
</Form.Group>



{/* USERNAME */}
<Form.Group className="mb-3" controlId="formUsername">
<Form.Label>UserName :</Form.Label>
<Form.Control
type="text"
placeholder="Enter Your Name >>"
name="name"
value={Userdata.name}
onChange={ChangeInp}
required
style={{ border: "2px solid #343a40" }}
/>
</Form.Group>

{/* EMAIL */}
<Form.Group className="mb-3" controlId="formEmail">
<Form.Label>Email address :</Form.Label>
<Form.Control
type="email"
placeholder="name@example.com"
name="email"
value={Userdata.email}
onChange={ChangeInp}
required
style={{ border: "2px solid #343a40" }}
/>
</Form.Group>

{/* PHONE */}
<Form.Group className="mb-3" controlId="formPhone">
<Form.Label>Phone :</Form.Label>
<Form.Control
type="number"
placeholder="Enter your Phone Number.."
name="Phone"
value={Userdata.Phone}
onChange={ChangeInp}
required
style={{ border: "2px solid #343a40" }}
/>
</Form.Group>

{/* PASSWORD */}
<Form.Group className="mb-3" controlId="formPassword">
<Form.Label>Password :</Form.Label>
<Form.Control
type="password"
placeholder="Enter a secure password"
name="password"
value={Userdata.password}
onChange={ChangeInp}
required
style={{ border: "2px solid #343a40" }}
/>
<Form.Text muted>
Your password must be 8–20 characters long and contain letters & numbers.
</Form.Text>
</Form.Group>


<div className="text-center mt-4">
<Button type="submit" variant="dark">Register</Button>
</div>

</Form>

</Card>

</div>
);
}

export default Signup;
