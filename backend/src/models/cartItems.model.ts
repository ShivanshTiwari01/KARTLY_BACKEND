import mongoose from 'mongoose';
import Cart from './cart.model';
import Product from './product.model';

const cartItemsSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Cart,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CartItems = mongoose.model('CartItems', cartItemsSchema);

export default CartItems;
