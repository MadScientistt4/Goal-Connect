import { X } from "lucide-react";

function Cart({ items, setCart, onClose }) {
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)));
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePayNow = () => {
        console.log("Processing payment for:", items);
        alert("Payment processed successfully!");
        setCart([]);
        onClose();
    };

    return (
        <div className="fixed right-0 top-[64px] h-[calc(100vh-64px)] w-64 bg-white shadow-lg p-4 overflow-y-auto flex flex-col z-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto">
                {items.map((item) => (
                    <div key={item.id} className="mb-4 border-b pb-2">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">
                            ₹{item.price.toFixed(2)} x {item.quantity}
                        </p>
                        <div className="flex items-center mt-2">
                            <button
                                className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                                -
                            </button>
                            <span className="mx-2 text-gray-800">{item.quantity}</span>
                            <button
                                className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                            <button
                                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <strong className="text-gray-800">Total: ₹{total.toFixed(2)}</strong>
            </div>
            <button
                className={`mt-4 w-full py-2 rounded text-white ${
                    items.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={handlePayNow}
                disabled={items.length === 0}
            >
                Pay Now
            </button>
        </div>
    );
}

export default Cart;
