'use client';
import React from 'react';
import {CartProductType} from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
    cartCounter: boolean,
    cartProduct: CartProductType,
    handleQtyIncrease: () => void,
    handleQtyDecrease: () => void,

}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQuantityProps> = ({
                                                     cartCounter,
                                                     cartProduct,
                                                     handleQtyIncrease,
                                                     handleQtyDecrease,

                                                 }) => {
    return (
        <div className={"flex gap-8 items-center"}>
            {cartCounter ? (
                <div className={"font-semibold"}></div>
            ) : null}
            <div className={"flex gap-4 items-center text-base"}>
                <button onClick={handleQtyDecrease} className={btnStyles} aria-label="Decrease quantity">-</button>
                {cartProduct && <div>{cartProduct.quantity}</div>} {/* Check if cardProduct is defined */}
                <button onClick={handleQtyIncrease} className={btnStyles} aria-label="Increase quantity">+</button>
            </div>
        </div>
    );
};


export default SetQuantity;