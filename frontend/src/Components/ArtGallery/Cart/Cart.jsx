import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import BillingAddress from './BillingAddress';

function CartPage() {
const [items, setItems] = useState([]);
const [isFormFilled, setIsFormFilled] = useState(false);
const navigate = useNavigate();

async function GetItem() {
try {
const response = await axios.get("https://artify-art-sale-platform.onrender.com/cart/getitem", {
withCredentials: true
});
setItems(response.data.data);
} catch (error) {
console.log(error);
}
}

async function TrashItem(itemId) {
try {
await axios.delete(`https://artify-art-sale-platform.onrender.com/cart/deleteitem/${itemId}`, {
withCredentials: true
});
GetItem();
} catch (error) {
console.log(error);
}
}

async function handlePayment() {
try {
const totalPrice = items.reduce((sum, item) => sum + (item.artwork?.price || 0), 0);
const response = await axios.post(
'https://artify-art-sale-platform.onrender.com/payment/paypalpayment',
{ total: totalPrice },
{ withCredentials: true }
);

if (response.data.approvalUrl) {
window.location.href = response.data.approvalUrl;
} else {
alert("Payment initiation failed!");
}
} catch (error) {
alert("Something went wrong during payment.");
console.log(error);


}
}

useEffect(() => {
GetItem();
}, []);

const totalPrice = items.reduce((sum, item) => sum + (item.artwork?.price || 0), 0);

return (
<div className="container m-5">
<h2 className="text-center text-success mb-4">🛒 Your Cart Summary</h2>

<div className="row">

{/* Cart Items */}
<div className="col-md-7 mb-4">
<table className="table table-bordered table-hover" style={{ textAlign: "center" }}>
<thead className="table-success">
<tr>
<th>#</th>
<th>Image</th>
<th>Artwork Title</th>
<th>Price (₹)</th>
<th>Remove</th>
</tr>
</thead>
<tbody>
{items.map((item, index) => (
<tr key={item._id}>
<td>{index + 1}</td>
<td>
<img
src={item.artwork.image.url}
alt={item.artwork?.title}
style={{ width: '80px', borderRadius: '8px', cursor: "pointer" }}
onClick={() => navigate(`/art/${item.artwork._id}`)}
/>
</td>
<td>{item.artwork?.title}</td>
<td>₹{item.artwork?.price}</td>
<td>
<Button variant="danger" size="sm" onClick={() => TrashItem(item.artwork._id)}>
❌
</Button>
</td>
</tr>
))}
{items.length === 0 && (
<tr>
<td colSpan="5" className="text-center text-muted">
No items found
</td>
</tr>
)}
</tbody>
</table>

<div className="text-end fw-bold fs-5 mt-3">
Total Price: ₹{totalPrice}
</div>
</div>

{/* Billing Section */}
<div className="col-md-5">
<div className="p-4 border rounded shadow-sm bg-light">
<h5 className="text-primary mb-3">🧾 Billing Details</h5>

<BillingAddress onFormStatusChange={setIsFormFilled} />

<Button
variant="success"
className="mt-3 w-100"
onClick={handlePayment}
disabled={!isFormFilled || items.length === 0}
>
💳 Proceed to Payment
</Button>

{!isFormFilled && (
<p className="text-danger text-center mt-2">
Please fill all billing details to proceed.
</p>
)}

{items.length === 0 && (
<p className="text-warning text-center mt-2">
Add items to the cart before payment.
</p>
)}

</div>
</div>

</div>
</div>
);
}

export default CartPage;
