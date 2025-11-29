import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [Userdata, setUserdata] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function ChangeInp(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserdata(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function Login(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://artify-art-sale-platform.onrender.com/auth/login",
        Userdata,
        { withCredentials: true }
      );

      localStorage.setItem("User", JSON.stringify(res.data.payload));

      alert("Login Successfully");
      navigate("/home");

      setUserdata({
        email: "",
        password: ""
      });

      setError("");

    } catch (err) {
      console.log(err);
      setError("Incorrect Email or Password");
    }
  }


  return (
    <div className="d-flex justify-content-center mt-5">

      <Card
        className="shadow-lg p-4"
        style={{
          width: '30rem',
          borderRadius: '20px',
          background: "linear-gradient(135deg, #ffffff, #f1f1f1)"
        }}
      >

        <h3 className="text-center mb-4 fw-bold">
          🎨 Artify Login
        </h3>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="text-center py-2">
            {error}
          </Alert>
        )}

        <Form onSubmit={Login}>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-semibold">Email address :</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={Userdata.email}
              onChange={ChangeInp}
              required
              style={{
                border: "2px solid #343a40",
                fontSize: "15px"
              }}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-semibold">Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={Userdata.password}
              onChange={ChangeInp}
              required
              style={{
                border: "2px solid #343a40",
                fontSize: "15px"
              }}
            />
          </Form.Group>

          {/* Register Link */}
          <p className="mt-2">
            Not Registered?
            <a href="/signup" className="fw-bold text-primary ms-1">Create Account</a>
          </p>

          {/* Button */}
          <div className="text-center mt-4">
            <Button
              type="submit"
              variant="dark"
              className="px-5 py-2 fw-semibold"
              style={{ borderRadius: "10px" }}
            >
              Login
            </Button>
          </div>

        </Form>

      </Card>

    </div>
  );
}

export default Login;
