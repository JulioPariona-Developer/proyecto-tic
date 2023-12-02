const Service = require("../../api/services/index.service");
const Repository = require("../../models/repositories/index.repository");
const sendEmail = require("../../utils/sendEmail.utils");
const { template } = require("../../utils/template.utils");

const service = new Service();
const repo = new Repository();

const renderProducts = async (req, res, next) => {
  template.set("ejs");
  const { query: { maxPrice, searchName }, params: { category } } = req;
  try {
    const { value, getProducts, message } = await service.stock.getAllProductStock(maxPrice, searchName, category);
    const allProducts = await repo.product.get({});
    const categories = [];
    allProducts.forEach(product => !categories.includes(product.category) && categories.push(product.category));
    res.render(`ejs/index`, template.render("Tienda Online", { renderProducts: { value, getProducts, message, categories } }));
  } catch (error) { next(error); }
}

const renderProduct = async (req, res, next) => {
  template.set("ejs");
  const { idProd: idStock } = req.params;
  try {
    const productStockFound = await repo.stock.get({ id: idStock });
    const inStock = await service.stock.getProductStock(idStock, req.user._id);
    const product = { ...productStockFound, stock: inStock }
    res.render(`ejs/index`, template.render("Detalles del producto", { renderProduct: { product, inStock } }));
  } catch (error) { next(error); }
}

const renderCart =  async (req, res, next) => {
  template.set("ejs");
  const { body: { idStock }, query: { myOrder } } = req;
  let voucher;
  try {
    if(myOrder) voucher = await service.cart.getVoucher(myOrder, req.user);
    if(idStock) await service.cart.removeOneProductFromCart(idStock, req.user._id);
    const cartFound = await service.cart.getProductInCart(req.user._id);
    res.render(
      `ejs/index`, 
      template.render("Mi Carrito", { renderCart: { products: cartFound.items, _id: cartFound._id, voucher } })
    );
  } catch (error) { next(error); }
}

const addToCart =  async (req, res, next) => {
  const { idStock, qty } = req.body;
  try {
    await service.cart.addToCart(idStock, req.user._id, qty);
    res.redirect("/cart");
  } catch (error) { next(error); }
}

const buyCart =  async (req, res, next) => {
  const { idCart } = req.params;
  try {
    const order = await service.cart.generatingOrder(idCart, req.user);
    const voucher = await service.cart.getVoucher(order._id, req.user);
    await sendEmail({ voucher }, `Thank You For Your Order! ${req.user.firstname} ${req.user.lastname}`);
    res.redirect(`/cart?myOrder=${order._id}`);
  } catch (error) { next(error); }
}

module.exports = { renderProducts, renderProduct, renderCart, addToCart, buyCart };