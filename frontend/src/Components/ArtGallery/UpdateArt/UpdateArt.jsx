import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function UpdateArt({ selectedId }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('price', formData.price);
    if (image) form.append('image', image);

    try {
       await axios.put(`http://localhost:8080/artwork/updateart/${selectedId}`, form, {
        withCredentials: true
      });
      alert('Artwork Updated Successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Upload Failed!');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: '42rem', borderRadius: '15px' }}>
        <h4 className="text-center mb-4 text-primary fw-bold">🖌️ Update Your Artwork</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">🎨 Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter artwork title"
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">📝 Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your artwork"
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">📁 Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Painting, Sculpture"
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">💰 Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Set your price"
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">🖼️ Upload New Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              className="rounded-3"
              required
            />
          </Form.Group>

          <div className="text-center mt-4">
            <Button type="submit" variant="success" className="px-4 py-2 rounded-pill">
              ✅ Update Artwork
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateArt;
