'use client';
import React, {useState} from 'react';
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/Button";
import Link from 'next/link';
import {AiOutlineGoogle} from "react-icons/ai";
import axios from "axios";
import {toast} from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",

        }
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        axios
            .post("/api/auth/register", data)
            .then(()=> {
                toast.success("Account created successfully");
                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false
                }).then((callback) => {
                    if (callback?.ok){
                        router.push("/cart");
                        router.refresh();
                        toast.success("Logged in successfully");
                    }
                    if (callback?.error){
                        toast.error(callback.error);
                    }
                });
            })
            .catch(()=> toast.error("Something went wrong"))
            .finally(()=> setIsLoading(false));
    };

    return (
       <>
        <Heading title={"Sign up for CSTAD-Ecommerce"}/>
           <Button
                outline
                label={"Sign up with Google"}
                icon={AiOutlineGoogle}
                onClick={() => console.log("Google")}
           />
           <hr className={"bg-slate-300 w-full h-px"}/>
           {/*Input name*/}
           <Input
                id={"name"}
                label={"Name"}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
           {/*Input email*/}
           <Input
               id={"email"}
               label={"Email"}
               disabled={isLoading}
               register={register}
               errors={errors}
               required
           />
           {/*Input password*/}
           <Input
               id={"password"}
               label={"Password"}
               disabled={isLoading}
               register={register}
               errors={errors}
               required
               type={"password"}
           />
       {/*    button   */}
           <Button label = {isLoading ? "Loading" : "Sign up" } onClick={handleSubmit(onSubmit)} />
            <p className={"text-sm"}>Already have an account?
           <Link className={"underline"} href={'/login'}>
                Log in
           </Link> </p>
       </>
    );
};

export default RegisterForm;