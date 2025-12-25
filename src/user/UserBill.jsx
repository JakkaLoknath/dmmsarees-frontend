import { useLocation, useNavigate } from "react-router-dom";

export default function UserBill() {
    const location = useLocation();
    const navigate = useNavigate();

    const cartItems = location.state?.cartItems;

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
    );

    return (
        <div className="ub-outer">
            <div className="ub-inner">
                <h3>Bill Summary</h3>
                <div className="ub-table">
                    <table className="ub-table">
                        <tr>
                            <th>Saree Name</th>
                            <th>Price (₹)</th>
                            <th>Quantity</th>
                            <th>Amount (₹)</th>
                        </tr>

                        {cartItems.map(item => (
                            <tr key={item.cartId}>
                                <td>{item.sareeName}</td>
                                <td>{item.price}</td>
                                <td>{item.cartQuantity}</td>
                                <td>{item.price * item.cartQuantity}</td>
                            </tr>
                        ))}

                        <tr>
                            <th colSpan="3">Total</th>
                            <th>₹{totalAmount}</th>
                        </tr>
                    </table>
                </div>
                <div className="ub-btn">
                    <button onClick={() => {
                        navigate("/uc");
                    }
                    }>Back to Cart</button>
                </div>
            </div>

        </div>
    );
}
