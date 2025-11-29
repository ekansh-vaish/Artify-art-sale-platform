import React from "react";
import "./TopArt.css";
import Slider from "./Slider";
import Icon from "../../../assets/image1.png";
import Icon2 from "../../../assets/yellow.png";
import { useNavigate } from "react-router-dom";

import White from "../../../assets/sciors.avif";
import White1 from "../../../assets/crafts.avif";
import White2 from "../../../assets/girlmage.avif";
import White3 from "../../../assets/signature.webp";

function TopArt() {
const navigate = useNavigate();

return (
<div>

{/* HERO SECTION */}
<div className="hero-section">

{/* Slide 1 */}
<div className="hero-slide">
<img src={White} alt="slide1" />
<div className="text-box">
<h1>Discover, Create & Showcase Your Art</h1>
<p>
Artify is a global community for artists to connect, share ideas, 
and display their creativity with the world. Build your identity 
and grow your audience.
</p>
<button onClick={() => navigate("/home")}>Explore Artworks</button>
</div>
</div>

{/* Slide 2 */}
<div className="hero-slide">
<img src={White2} alt="slide2" />
<div className="text-box">
<h1>Join the Creative Movement</h1>
<p>
Upload your creativity, get featured, and become a part of a 
growing global network of talented artists.
</p>
<button onClick={() => navigate("/home")}>Explore Artworks</button>
</div>
</div>

{/* Slide 3 */}
<div className="hero-slide">
<img src={White3} alt="slide3" />
<div className="text-box">
<h1>Showcase Your Talent</h1>
<p>
Whether you’re a beginner or a professional, Artify gives you 
the platform to shine and reach people everywhere.
</p>
<button onClick={() => navigate("/home")}>Explore Artworks</button>
</div>
</div>

{/* Slide 4 */}
<div className="hero-slide">
<img src={White1} alt="slide4" />
<div className="text-box">
<h1>Connect With The Art Community</h1>
<p>
Meet creators around the world, participate in events, and 
collaborate to grow your creative journey.
</p>
<button onClick={() => navigate("/home")}>Explore Artworks</button>
</div>
</div>

</div>

{/* PORTFOLIO SECTION */}
<div className="create">
<h1>Create Your Art Portfolio</h1>
<p>
Build your artist profile, upload artworks, participate in competitions, 
and showcase your creativity to a global audience.
</p>
<button onClick={() => navigate("/myart")}>Add Your Artwork</button>
</div>

{/* INFO BOXES SECTION */}
<div className="box">
<h1>Supporting The Creative Community</h1>

<div className="boxes">

<div className="box1">
<img src={Icon} alt="" height="50px" />
<h2>Support Artists</h2>
<p>
Artify empowers artists through collaboration, events and 
a community-driven support system.
</p>
</div>

<div className="box1">
<img src={Icon} alt="" height="50px" />
<h2>Social Impact</h2>
<p>
We promote impactful creativity through charity events, art 
workshops and educational programs.
</p>
</div>

<div className="box1">
<img src={Icon2} alt="" height="50px" />
<h2>Promote Art</h2>
<p>
Get discovered! Your art reaches global audiences through 
featured galleries and spotlight showcases.
</p>
</div>

<div className="box1">
<img src={Icon2} alt="" height="50px" />
<h2>Art Auctions</h2>
<p>
Sell your art with our transparent auction system and connect 
with genuine buyers worldwide.
</p>
</div>

</div>
</div>

<Slider />
<br />
</div>
);
}

export default TopArt;
