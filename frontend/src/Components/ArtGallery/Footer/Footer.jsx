import React from 'react';
import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { FaGoogle } from "react-icons/fa";
import image1 from "../../../assets/logo.png";

function Footer() {
  const footerLinkStyle = {
    color: "#ddd",
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  const footerLinkHover = {
    color: "#ff9800",
  };

  return (
    <footer style={{ backgroundColor: "#212529", color: "#f8f9fa", paddingTop: "40px", paddingBottom: "20px", fontWeight:"bolder"}}>
      <div className="container">
        <div className="row">

          {/* Left Section */}
          <div className="col-md-4 mb-3 text-center text-md-start">
            <h5 style={{ fontWeight: "bold", color: "#ff9800" }}>Artify</h5>
            <p style={{ fontStyle: "italic" }}>Arts and Paintings or Crafts Selling Platform</p>
            <img src={image1} alt="logo" height="100px" width="auto" style={{ borderRadius: "10px", marginTop: "10px", marginLeft:"40px" }} />
          </div>

          {/* Middle Section */}
          <div className="col-md-4 mb-3 text-center text-md-start">
            <h5 style={{ fontWeight: "bold", color: "#ff9800" }}>Quick Links</h5>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li><a href="/home" style={footerLinkStyle} onMouseOver={e => e.target.style.color = footerLinkHover.color} onMouseOut={e => e.target.style.color = footerLinkStyle.color}>Home</a></li>
              <li><a href="/explore" style={footerLinkStyle} onMouseOver={e => e.target.style.color = footerLinkHover.color} onMouseOut={e => e.target.style.color = footerLinkStyle.color}>Arts</a></li>
              <li><a href="/myart" style={footerLinkStyle} onMouseOver={e => e.target.style.color = footerLinkHover.color} onMouseOut={e => e.target.style.color = footerLinkStyle.color}>My Art</a></li>
              <li><a href="/competitionlist" style={footerLinkStyle} onMouseOver={e => e.target.style.color = footerLinkHover.color} onMouseOut={e => e.target.style.color = footerLinkStyle.color}>Competition List</a></li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 mb-3 text-center text-md-start">
            <h5 style={{ fontWeight: "bold", color: "#ff9800" }}>Contact</h5>
            <p>Email: <span style={{ color: "#ff9800" }}>support@Artify.com</span></p>
            <p>Phone: <span style={{ color: "#ff9800" }}>+91 6395208277</span></p>
            <div className="d-flex gap-3 mt-2 justify-content-center justify-content-md-start">
              <a href="https://www.facebook.com/ekansh.vaish.1/" target="_blank" rel="noopener noreferrer">
                <TiSocialFacebook size={30} color="#3b5998" />
              </a>
              <a href="https://www.instagram.com/ekansh_vaish_?igsh=MWU4Y25mbzVpeXBmeQ==" target="_blank" rel="noopener noreferrer">
                <TiSocialInstagram size={30} color="#E1306C" />
              </a>
              <a href="https://www.linkedin.com/in/ekansh-vaish-594832295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                <TiSocialLinkedin size={30} color="#0077B5" />
              </a>
              <a href="https://www.bing.com/search?q=ekansh%20vaish" target="_blank" rel="noopener noreferrer">
                <FaGoogle size={23} color="#DB4437" />
              </a>
            </div>
          </div>

        </div>
        <hr style={{ borderColor: "#f8f9fa" }} />
        <p className="text-center mb-0" style={{ fontSize: "14px",  color:"white" }}>© 2025 Artify.Arts Selling Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
