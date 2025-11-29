import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function BillingAddress({ onFormStatusChange }) {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    City: "",
    PinCode: "",
    BillingAddress: ""
  });

  function FormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // VALIDATION FIX
  useEffect(() => {
    const isFilled = Object.values(formData).every(val => val.trim() !== "");
    onFormStatusChange(isFilled);
  }, [formData]); // ✔ ONLY formData dependency

  return (
    <div className='w-100'>
      <Form>

        <Form.Group className="mb-3">
          <Form.Label>Name :</Form.Label>
          <Form.Control type="text" name='Name' placeholder="Enter Name" value={formData.Name} onChange={FormChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number :</Form.Label>
          <Form.Control type="number" name='Phone' placeholder="Phone Number" value={formData.Phone} onChange={FormChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City :</Form.Label>
          <Form.Control type="text" name='City' placeholder="City" value={formData.City} onChange={FormChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pin Code :</Form.Label>
          <Form.Control type="number" name='PinCode' placeholder="Pin Code" value={formData.PinCode} onChange={FormChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Billing Address :</Form.Label>
          <Form.Control as="textarea" rows={3} name='BillingAddress' placeholder="Billing Address" value={formData.BillingAddress} onChange={FormChange} />
        </Form.Group>

      </Form>
    </div>
  );
}

export default BillingAddress;
