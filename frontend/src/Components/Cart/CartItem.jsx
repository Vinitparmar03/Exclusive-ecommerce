import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ImCross } from "react-icons/im";
import "./CartItem.css";

const CartItem = ({
  increamentHandler,
  decreamentHandler,
  removeHandler,
  cartItem,
}) => {
  const { productId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <div className="product">
        <div className="image-warpper">
          <img src={`${cartItem.photo}`} alt="" />
          <button className="delete" onClick={() => removeHandler(productId)}>
            <ImCross />
          </button>
        </div>
        <p>{name}</p>
      </div>

      <p className="price">₹{price}</p>

      <div className="quantity">
        <p>{quantity}</p>
        <div>
          <button onClick={() => increamentHandler(cartItem)}>
            <IoIosArrowUp />
          </button>
          <button onClick={() => decreamentHandler(cartItem)}>
            <IoIosArrowDown />
          </button>
        </div>
      </div>

      {/* <p className="subtotal grid-item">₹1000</p> */}
    </div>
  );
};

export default CartItem;
