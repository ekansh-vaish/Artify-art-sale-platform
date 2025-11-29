import React, {  useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import FetchCompreview from "./FetchCompreview";

function CompReview({ selectedId,ArtistId }) {
const [review, setReview] = useState({
comment: "",
rating: 0,
});
const User = JSON.parse(localStorage.getItem("User"));
const UserId = User.id;
const [DupliArt,setDupliArt] = useState([]);
const [refetchSignal, setRefetchSignal] = useState(0); 
const handleChange = (e) => {
const name = e.target.name;
const value = e.target.value;
setReview({ ...review, [name]: value });
};

async function FetchData() {
try {
 await axios.get(
`http://localhost:8080/participate/getparticipants/${selectedId}`,
{ withCredentials: true }
);


} catch (err) {
console.log("❌ Error fetching participants:", err);
}
}


async function PostReview(e) {
e.preventDefault();
 await axios.post(
`http://localhost:8080/CompReview/postReview/${selectedId}`,
review,
{ withCredentials: true }
);
setReview({ comment: "", rating: 0 }); 

setRefetchSignal((prev) => prev + 1);
fetchReviews();
}

const fetchReviews = async () => {
try {
const res = await axios.get(
`http://localhost:8080/CompReview/getArtreview/${selectedId}`,
{ withCredentials: true }
);


const result = res.data.response.some((item) => item.user._id === UserId && item.CompArt._id === selectedId)
setDupliArt(result);

} catch (err) {
console.error("Error fetching reviews:", err);
} 
};



useEffect(() =>
{
FetchData();    
fetchReviews();
},[])




return (
    
<div className="p-3 border rounded">

<h4 className="mb-3">Competition Review</h4>
{ArtistId !== UserId && !DupliArt   &&

<Form onSubmit={PostReview}>
<Form.Group className="mb-3" controlId="reviewText">
<Form.Label>Your Review</Form.Label>
<Form.Control
as="textarea"
rows={3}
name="comment"
placeholder="Write your feedback..."
value={review.comment}
onChange={handleChange}
required
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Rating</Form.Label>
<div className="d-flex">
{[...Array(5)].map((star, index) => {
const ratingValue = index + 1;
return (
<FaStar
key={index}
size={30}
style={{ cursor: "pointer", marginRight: "8px" }}
color={ratingValue <= review.rating ? "gold" : "lightgray"}
onClick={() =>
setReview({ ...review, rating: ratingValue })
}
/>
);
})}
</div>

</Form.Group>

  <Button variant="primary" type="submit">
    Submit Review
  </Button>


</Form>
}
<FetchCompreview ReviewFetch={selectedId} refetchSignal={refetchSignal} />

</div>

);
}

export default CompReview;
