import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import image1 from "../../assets/logo.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function Navbar1() {
const navigate = useNavigate();
const User = JSON.parse(localStorage.getItem("User"));

async function Logout() {
try {
await axios.post(
"http://localhost:8080/auth/logout",
{},
{ withCredentials: true }
);
localStorage.clear("User");
navigate("/login");
} catch (error) {
console.log(error);
}
}

return (
<>
{["sm"].map((expand) => (
<Navbar
key={expand}
expand={expand}
className="bg-body-tertiary mb-3"
style={{ height: "80px" }}
>
<Container fluid>

{/* FIXED LOGO */}
<Navbar.Brand href="/home" className="d-flex align-items-center">
<img
src={image1}
alt=""
style={{
height: "65px",
width: "auto",
objectFit: "contain",
}}
/>
</Navbar.Brand>

<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

<Navbar.Offcanvas
id={`offcanvasNavbar-expand-${expand}`}
aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
placement="end"
>
<Offcanvas.Header closeButton>
<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
<b>Artify</b>
<p className="m-0 small">“Talent ko Mauka, Kala ko Manch”</p>
</Offcanvas.Title>
</Offcanvas.Header>

<Offcanvas.Body>
<Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">

<Nav.Link href="/explore"><b>Explore</b></Nav.Link>
<Nav.Link href="/addproduct"><b>Add Your Art</b></Nav.Link>
<Nav.Link href="/myart"><b>My Art</b></Nav.Link>
<Nav.Link href="/competitionlist"><b>Competition</b></Nav.Link>
<Nav.Link href="/contactus"><b>Contact Us</b></Nav.Link>
{User?.role === "admin" && (
<Nav.Link href="/addcompetition"><b>Add Competition</b></Nav.Link>
)}

<Nav.Link href="/cart"><b>🛒 Cart</b></Nav.Link>

{User &&  (

 <>
 <img src={`${User.image.url}`} alt="userImage" height={"50px"} style={{borderRadius:"50%"}}  />   

<Button
onClick={Logout}
variant="dark"
className="ms-2"
>
Logout
</Button>
</>
)}

</Nav>
</Offcanvas.Body>
</Navbar.Offcanvas>

</Container>
</Navbar>
))}
</>
);
}

export default Navbar1;
