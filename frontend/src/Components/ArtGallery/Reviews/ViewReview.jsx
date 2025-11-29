import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./Review"
import { useParams } from 'react-router-dom';
function ViewReview()

{
const [review,setReview] = useState([]);
const {id} = useParams();
const [error,setError] = useState();
const User = JSON.parse(localStorage.getItem("User"));
async function Reviews() {
try{
const res = await axios.get(`https://artify-art-sale-platform.onrender.com/review/getReviews/${id}`,
{
withCredentials : true 
}
)
{
setReview(res.data.response);   
}
}
catch(err)
{
console.log(err);

}
}

async function DeleteReview(itemid) {
try{
const response = await axios.delete(`https://artify-art-sale-platform.onrender.com/review/deleteReview/${itemid}`,
{
withCredentials: true 
}
);
console.log(response);
Reviews();
}
catch(err)
{
console.log(err);
setError(err)
}
}

useEffect(()=>
{
Reviews();
},[])
return (
    
<div className='mt-5'>
<h4>Ratings & Reviews</h4>
{review  ? ( review.map((item) =>
<div key={item._id} className='main'>

<h4>Username :{item.user.name}({new Date(item.createdAt).toLocaleString()})</h4>
<p>Review :{item.comment} </p>
<p>Rating :{item.rating}</p>
{User && User.id === item.user._id && (
    
    
<button className='mt-2 active bg-danger' onClick={() => DeleteReview(item._id)}>Delete Review</button>

)}
<hr />
</div>
)) : <p>{error } No Review Found</p>}

</div>
)}

export default ViewReview
