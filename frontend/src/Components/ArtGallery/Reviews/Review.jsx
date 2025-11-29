import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Review() {
const [comment, setComment] = useState('');
const [rating, setRating] = useState(5);
const {id} = useParams();
async function submitReview(e) {
e.preventDefault();
try {
await axios.post(`http://localhost:8080/review/postreview/${id}`, {
comment,
rating:Number(rating),
createdAt : new Date()
}, {
withCredentials: true
});
alert("Review submitted successfully!");
setComment('');
setRating(5);
} catch (error) {
console.log(error);
alert("Review submission failed");
}
}
  return (
    <div>
      
{/* ✅ Review Form */}
<div className="mt-5 text-start">
<h5 className="fw-bold text-primary">📝 Post a Review</h5>
<Form onSubmit={submitReview}>
<Form.Group className="mb-3" controlId="reviewComment">
  <Form.Label>Comment</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3" controlId="reviewRating">
  <Form.Label>Rating</Form.Label>
  <Form.Select value={rating} onChange={(e) => setRating(e.target.value)} required>
    {[5, 4, 3, 2, 1].map((r) => (
      <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
    ))}
  </Form.Select>
</Form.Group>

<Button variant="success" type="submit">Submit Review</Button>
</Form>
</div>
    </div>
  )
}

export default Review
