const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Artwork = require("./Router/Artwork");
const  Auth = require("./Router/Auth");
const cors = require('cors')
const Reviews = require("./Router/Reviewrouter");
const Cart = require("./Router/Cart");
const PayPal = require("./Router/Paypal"); 
const Competition = require("./Router/Competition"); 
const Participate = require("./Router/Participants"); 
const CompReview = require("./Router/CompReview"); 
const ContactQuery = require("./Router/Contactus");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
const dbUrl = process.env.ATLASDB_URL

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log(" MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });


app.use(cors(
  {
    origin: 'artify-art-sale-platform-sfu4.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true  
  }
))

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));





const store = MongoStore.create({
mongoUrl : dbUrl,
crypto :{
  secret: "mysupersecretcode",
},
touchAfter : 24 * 3600,
});


app.use(session({
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure : process.env.NODE_ENV === "production",
    sameSite : "none",
    maxAge: 1000 * 60 * 60 * 24 
  }
}));




app.use("/contact",ContactQuery);
app.use("/auth",Auth)
app.use("/artwork",Artwork)
app.use("/review",Reviews)
app.use("/cart",Cart);
app.use("/competition",Competition)
app.use("/participate",Participate)
app.use("/CompReview",CompReview);
app.use("/payment",PayPal)

// -------------------- SERVER --------------------
app.listen(8080, () => {
  console.log("🚀 Server running on port");
});
