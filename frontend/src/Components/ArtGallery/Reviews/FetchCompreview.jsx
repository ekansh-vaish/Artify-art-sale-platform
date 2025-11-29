import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function FetchCompreview({ ReviewFetch,refetchSignal }) {
const [reviews, setReviews] = useState([]);
const [loading, setLoading] = useState(true);
const [error,setError] = useState(null);

const fetchReviews = async () => {
try {
const res = await axios.get(
`https://artify-art-sale-platform.onrender.com/CompReview/getArtreview/${ReviewFetch}`,
{ withCredentials: true }
);
// console.log(res);

setReviews(res.data.response);
} catch (err) {
console.error("Error fetching reviews:", err);
setError(
err.response?.data?.message ||
"Failed to load reviews. Please try again later."
);
} finally {
setLoading(false);
}
};



useEffect(() => {
fetchReviews();
}, [ReviewFetch,refetchSignal]);


if (loading) return <p>Loading reviews...</p>;
if (error) return <p className="text-danger fw-bold">{error}</p>;
if (!reviews.length) return <p>No reviews yet.</p>;

return (

<div className="mt-4 h-100  mx-5 mt-3 flex-column">
<div className="d-flex flex-wrap gap-3">
{!reviews ? (<p>No review found</p>) :  reviews.map((item) => (
<div
key={item._id}
className="border rounded p-3 shadow-sm"
style={{
width: "280px",
backgroundColor: "#fff",
transition: "transform 0.2s",
}}
onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
<p className="mb-2 fst-italic text-dark">
“{item.comment}”
</p>

<p className="mb-2">
{[...Array(item.rating)].map((_, i) => (
<FaStar key={i} color="gold" style={{ marginRight: "4px" }} />
))}
</p>

<div className="d-flex align-items-center mt-2">
<img
src={item.user.image.url}
alt={item.user?.name}
style={{
width: "50px",
height: "50px",
borderRadius: "50%",
objectFit: "cover",
marginRight: "10px",
border: "2px solid #ddd",
}}
/>
<p className="text-muted mb-0">
<small><strong>{item.user?.name}</strong></small>
</p>
</div>
</div>
))}
</div>
</div>
);
}

export default FetchCompreview;
