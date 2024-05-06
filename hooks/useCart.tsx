import {createContext, useCallback, useContext, useEffect, useState} from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {toast} from "react-hot-toast";


// Corrected the type of cartProducts to CartProductType[] | null
type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null; // Corrected here
    handleAddProductToCart: (product: CartProductType) => void;
    handRemoveProductFormatCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;

};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    console.log('qty', cartTotalQty);
    console.log('amount', cartTotalAmount);
    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CartProductType[] = JSON.parse(cartItems);
        setCartProducts(cProducts);
    }, []);

    useEffect(() => {

        const getTotals = () => {
            if (cartProducts){
           const {total, qty} = cartProducts?.reduce(
                (acc, item) => {
                const itemTotal = item.price * item.quantity;
                acc.total += itemTotal
                acc.qty += item.quantity;
                return acc;
                },{
                    total: 0,
                    qty: 0,
                });
                   setCartTotalQty(qty);
                   setCartTotalAmount(total);
            }
        }
        getTotals();
    }, [cartProducts]);

    // add product to cart
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
            toast.success("Product added to cart");
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    // Remove item from cart
    const handRemoveProductFormatCart = useCallback((
        product: CartProductType
    )=>{
        if(cartProducts) {
            const filteredProducts = cartProducts.filter((item)=>{
                    return item.id !== product.id
            })
            setCartProducts(filteredProducts)
            toast.success("Product removed");
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }
    },[cartProducts])
    //  handle Cart quantity increase
    const handleCartQtyIncrease = useCallback((
            product: CartProductType
        )=> {
        let updatedCart;
            if (product.quantity === 99){
                return toast.error("Oop! Maximum reached");
            }
            if (cartProducts){
                updatedCart = [...cartProducts]
                const exitingIndex = cartProducts.findIndex((item) => item.id === product.id);
                if (exitingIndex > -1){
                    updatedCart[exitingIndex].quantity = ++updatedCart[exitingIndex].quantity
                }
                setCartProducts(updatedCart)
                localStorage.setItem('eShopCartItem', JSON.stringify(updatedCart))
            }
        },
        [cartProducts])
    // handle qty decrease
    const handleCartQtyDecrease = useCallback((
            product: CartProductType
        )=> {
            let updatedCart;
            if (product.quantity === 1){
                return toast.error("Oop! Maximum reached");
            }
            if (cartProducts){
                updatedCart = [...cartProducts]
                const exitingIndex = cartProducts.findIndex((item) => item.id === product.id);
                if (exitingIndex > -1){
                    updatedCart[exitingIndex].quantity = --updatedCart[exitingIndex].quantity
                }
                setCartProducts(updatedCart)
                localStorage.setItem('eShopCartItem', JSON.stringify(updatedCart))
            }
        },
        [cartProducts])
    // handle clear cart
        const handleClearCart = useCallback(()=>{
            setCartProducts(null)
            setCartTotalQty(0)
            localStorage.setItem("eShopCartItems",JSON.stringify(null));

        },[cartProducts])

    const value = {
        cartTotalAmount,
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handRemoveProductFormatCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,


    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};
