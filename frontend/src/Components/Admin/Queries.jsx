import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Queries() {
  const [query, setQuery] = useState([]);

  async function ContactQuery() {
    try {
      const response = await axios.get("http://localhost:8080/contact/getqueries");
      console.log(response);
      setQuery(response.data.response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ContactQuery();
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "bold", color: "#343a40" }}>
        📩 Contact Queries (Admin Panel)
      </h2>

      <Row className="justify-content-center">
        {query.map((item, index) => (
          <Col md={4} sm={6} xs={12} key={index} style={{ marginBottom: "20px" }}>
            <Card 
              style={{ 
                width: '100%', 
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", 
                borderRadius: "10px", 
                border: "none" 
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontWeight: "600", color: "#007bff" }}>
                  👤 {item.Username}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  📧 {item.Email}
                </Card.Subtitle>
                <Card.Text style={{ marginTop: "10px", fontWeight: "500" }}>
                  📝 Subject: {item.subject}
                </Card.Text>
                <Card.Text style={{ color: "#495057" }}>
                  💬 {item.Message}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Queries;
