const router = require("express").Router();
const Cart = require("../models/Cart");


//add item to cart
router.route("/add").post(async (req, res) => {
  try {
    const userID = req.body.userID;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productImage = req.body.productImage;
    const itemID = req.body.itemID;

    //create instance
    const newCart = new Cart({
      userID,
      productName,
      productPrice,
      productImage,
      itemID,
    });

    //save
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    console.log(error);
  }
});

//get all carts
router.route("/get").get((req, res) => {
  Cart.find()
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete all carts
router.route("/delete").delete(async (req, res) => {
  try {
    await Cart.deleteMany();
    res.json({
      message: "All carts deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

//delete an user's cart
router.route("/delete/:id").delete(async (req, res) => {
  try {
    let userID = req.params.id;

    await Cart.deleteMany({ userID: userID });
    res.json({ message: "Cart deleted" });
  } catch (error) {
    console.log(error);
  }
});

//delete an item from cart
router.route("/delete/item/:id").delete(async (req, res) => {
  try {
    let ID = req.params.id;

    await Cart.findByIdAndDelete(ID);
    res.json({ message: "Item deleted" });
    console.log("Item deleted");
  } catch (error) {
    console.log(error);
  }
});

//get an user's cart
router.route("/get/:id").get(async (req, res) => {
  try {
    let userID = req.params.id;

    let cart = await Cart.find({ userID: userID });
    console.log(cart);

    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
