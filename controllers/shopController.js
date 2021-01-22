// const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: "Product Details",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).redirect("/error");
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        products,
        docTitle: "Index",
        path: "/",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getCart = async (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        cartProducts: products,
        docTitle: "Your Cart",
        path: "/cart",
      });
    })
    .catch((err) => {
      res.redirect("/error");
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/error");
    });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    res.render("shop/orders", {
      orders,
      docTitle: "Your Orders",
      path: "/orders",
    });
  });
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder().then((result) => {
    res.redirect("/orders");
  });
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     docTitle: "Checkout",
//     path: "/checkout",
//   });
// };

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteCartItem(productId)
    .then((result) => {
      return res.redirect("/cart");
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
