import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
const [form, setForm] = useState({
Username: "",
Email: "",
Subject: "",
Message: "",
});

const [status, setStatus] = useState("");
const navigate = useNavigate();
const User = JSON.parse(localStorage.getItem("User"));
const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
 await axios.post("https://artify-art-sale-platform.onrender.com/contact/addquery", form, {
withCredentials: true,
});
setStatus("✅ Thank you! Your message has been sent.");
setForm({ Username: "", Email: "", Subject: "", Message: "" });
};

return (
<div className="container my-5">
<div className="row justify-content-center">
<div className="col-md-8">
<div
className="card border-0 shadow-lg"
style={{ borderRadius: "15px", overflow: "hidden" , }}
>
{/* Header */}
<div
className="card-header text-white text-center"
style={{
background: "linear-gradient(90deg, #c85630ff, #5e9186ff)",
padding: "25px",
}}
>
<h2 style={{ fontWeight: "700", }}>Contact Us</h2>
<p className="mb-0">We’d love to hear from you 💬</p>
</div>

{/* Body */}
<div className="card-body p-4">
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label className="form-label fw-bold">Full Name</label>
<input
type="text"
name="Username"
className="form-control form-control-lg"
placeholder="👤 Enter your name"
value={form.Username}
onChange={handleChange}
required
style={{ borderRadius: "10px" }}
/>
</div>

<div className="mb-3">
<label className="form-label fw-bold">Email Address</label>
<input
type="email"
name="Email"
className="form-control form-control-lg"
placeholder="📧 Enter your email"
value={form.Email}
onChange={handleChange}
required
style={{ borderRadius: "10px" }}
/>
</div>

<div className="mb-3">
<label className="form-label fw-bold">Subject</label>
<input
type="text"
name="Subject"
className="form-control form-control-lg"
placeholder="📝 Enter subject..."
value={form.Subject}
onChange={handleChange}
required
style={{ borderRadius: "10px" }}
/>
</div>

<div className="mb-3">
<label className="form-label fw-bold">Message</label>
<textarea
name="Message"
className="form-control form-control-lg"
rows="4"
placeholder="💬 Write your message..."
value={form.Message}
onChange={handleChange}
required
style={{ borderRadius: "10px" }}
></textarea>
</div>

<div className="d-grid">
<button
type="submit"
className="btn btn-lg text-white"
style={{
background: "linear-gradient(90deg, #007bff, #00c6ff)",
borderRadius: "10px",
fontWeight: "600",
transition: "0.3s",
}}
>
🚀 Send Message
</button>
</div>
</form>

{/* Success Message */}
{status && (
<div className="alert alert-success mt-4 text-center fw-bold">
{status}
</div>
)}

{/* Check Queries Button */}
<div className="text-center mt-3">
{User.role === "admin" &&   
<button
className="btn btn-outline-dark px-4 py-2"
style={{ borderRadius: "10px", fontWeight: "500" }}
onClick={() => navigate("/contactquery")}
>
📂 Check Queries
</button>
}
</div>
</div>

{/* Footer */}
<div
className="card-footer text-center text-muted"
style={{ backgroundColor: "#f8f9fa", fontSize: "15px" }}
>
📧 support@artify.com | 📞 +91 6395208277
</div>
</div>
</div>
</div>
</div>
);
}
