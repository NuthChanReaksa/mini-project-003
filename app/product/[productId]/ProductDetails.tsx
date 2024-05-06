'use client';
import React, {useCallback, useEffect, useState} from 'react';
import { Rating } from "@mui/material";
import SetColor from "@/components/products/SetColor";
import SetQuantity from '@/components/products/SetQuantity';
import Button from "@/components/Button";
import ProductImage from "@/components/products/ProductImage";
import {useCart} from "@/hooks/useCart";
import {MdCheckCircle} from "react-icons/md";
import {useRouter} from "next/navigation";

interface ProductDetailsProps {
    product: any; // Consider using a more specific type for better type safety
}

export type CartProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: SelectedImgType;
    quantity: number;
    price: number;
}

export type SelectedImgType = {
    color: string;
    colorCode: string;
    image: string; // Assuming this is a string representing the image URL
}

const HorizontalLine = () => {
    return (
        <hr className={"w-[30% my-2"} /> // Fixed the missing closing quote
    );
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    // const {cartTotalQty} = useCart();
    const {handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: product.images[0], // Assuming product.images[0] is the correct structure
        quantity: 1,
        price: product.price,
    });

    const router = useRouter();

    console.log(cartProducts);
    useEffect(() => {
        setIsProductInCart(false);
        if(cartProducts){
            const exitingIndex = cartProducts.findIndex((item) => item.id === product.id);
            if(exitingIndex > -1){
                setIsProductInCart(true);
            }
        }

    }, [cartProducts, product.id]);

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prev) => ({
            ...prev,
            selectedImg: value,
        }));
    }, [setCartProduct]); // Added setCardProduct to the dependency array

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity >= 99) {
            return; // Prevent quantity from exceeding 99
        }
        setCartProduct((prev) => {
            return {
                ...prev,
                quantity: prev.quantity + 1, // Correctly increment quantity
            };
        });
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity <= 1) {
            return; // Prevent quantity from going below 1
        }
        setCartProduct((prev) => {
            return {
                ...prev,
                quantity: prev.quantity - 1, // Correctly decrement quantity
            };
        });
    }, [cartProduct]);


    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-12"}>
            <ProductImage
                cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}
            />
            <div className={"flex flex-col gap-1 text-slate-500 text-sm"}>
                <h2 className={"text-3xl font-medium text-slate-700"}>{product.name}</h2>
                <div className={"flex items-center gap-2"}>
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <HorizontalLine />
                <div className={"text-justify"}>{product.description}</div>
                <HorizontalLine />
                <div>
                    <span className={"font-semibold"}>CATEGORY:</span>{product.category}
                </div>
                <div>
                    <span className={"font-semibold"}>BRAND:</span>{product.brand}
                </div>
                <div className={product.inStock? 'text-teal-400' : "text-rose-400"}>{product.inStock? " In Stock" : "Out Of Stock"}</div>
                <HorizontalLine />

                {isProductInCart ? ( <>
                    <p className={"mb-2 text-slate-500 flex items-center gap-1"}>
                        <MdCheckCircle className={"text-teal-400"} size={20}/>
                        <span>Product added to cart</span>
                    </p>
                        <div className={"max-w-[300px]"}>
                            <Button
                                    label={"View Cart"}
                                    outline
                                onClick={() => {
                                    router.push("/cart");
                                }}

                            />
                        </div>
                </>
                ) : (
                    <>
                    <SetColor
                        cardProduct={cartProduct}
                        images={product.images}
                        handleColorSelect={handleColorSelect}
                    />
                    <HorizontalLine />
                    <SetQuantity
                        cartProduct={cartProduct}
                        handleQtyIncrease={handleQtyIncrease}
                        handleQtyDecrease={handleQtyDecrease}

                        cartCounter/>
                    <HorizontalLine />
                    <div className={"max-w-[300px]"}>
                        <Button
                            label={"Add to Cart"}
                            onClick={() =>  handleAddProductToCart(cartProduct)}/>
                    </div>
                </>)
                }
            </div>
        </div>
    );
};

export default ProductDetails;