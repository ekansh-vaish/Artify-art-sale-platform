const Cart = require("../Model/Cart");
const ExpressError = require("../Utils/ExpressError");

module.exports.PostIndex =  async (req, res) => {
  const { artworkId } = req.body;
  const userId = req.userId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    cart.items.push({ artwork: artworkId });
    await cart.save();

    res.status(200).json({ message: "Artwork added to cart!" });
  
}


module.exports.getItem =  async (req, res) => {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.artwork");
    res.status(200).json({ data: cart?.items || [] });
  
}

module.exports.TrashItem = async (req, res,next) => {
  const userId = req.userId;
  const artworkId = req.params.artworkId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
  next(new ExpressError(404,"Failed"))
    }

    cart.items = cart.items.filter(item => item.artwork.toString() !== artworkId);
    await cart.save();

    res.status(200).json({ message: "Item removed successfully", cart });
   
}