'use client';
import React from 'react';
import Heading from "@/components/Heading";
import moment from "moment";
import {Rating} from "@mui/material";
import Avatar from "@/components/Avatar";
import {products} from "@/utils/products";

interface ListRatingProps {
    product: any; // Consider using a more specific type for better type safety
}

const ListRating: React.FC<ListRatingProps> = () => {

    return (
        <div>
            <Heading title={"Product Review"} />
            <div className={"text-sm mt-2"}>
                {products.map((product) => {
                    return product.reviews && product.reviews.map((review: any) => {
                        return (
                            <div key={review.id} className={"mx-w-300px"}>
                                <div className={"flex gap-2 items-center"}>
                                    <Avatar src={review?.user.image} />
                                    <div>Avatar</div>
                                    <div className={"font-semibold"}>{review?.user.name}</div>
                                    <div className={"font-light"}>{moment(review.createdDate).fromNow()}</div>
                                </div>
                                <div className={"mt-2"}>
                                    <Rating value={review.rating} readOnly />
                                    <div className={"ml-2"} >{review.comment}</div>
                                    <hr className={"mt-4 mb-4"} />
                                </div>
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default ListRating;
