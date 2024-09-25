"use client";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "@/app/features/api";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "user";
}

const RegisterForm = () => {
  const form = useForm<FormData>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const [registerUser, { isError, isLoading, isSuccess }] =
    useRegisterUserMutation();
  const [isSucces, setIsSucces] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      // Set role to "user" if not already set
      const userData = {
        ...data,
        role: "user"  // Ensure role is set to "user"
      };
      const response = await registerUser(userData).unwrap();

      if (response.error) {
        console.error("Error:", response.error);
      } else {
        console.log("Success:", response);
        setIsSucces(true);
        router.push(
          `/verify-email?email=${encodeURIComponent(data.email)}`
        );
      }
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <div className="w-[50%] mx-auto mt-[2%] border">
      <div className="text-center">
        <h1 className="text-3xl text-[#25324B] font-extrabold m-2 mb-5">
          Sign up today!
        </h1>
        <button
          className="flex gap-1 items-center mx-auto pl-11 text-lg text-center border w-[300px] py-1 text-[#4640DE]"
          onClick={() => signIn("google", { callbackUrl: "/components/Landingpage" })}
        >
          <img src="/Icongoogleicon.svg" alt="" /> Sign in with Google
        </button>
        <p className="font-light mt-2">or sign up with email</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="forms mt-5 text-start ml-[26%]">
            <label htmlFor="fullName">Full Name</label>
            <input
              className="w-[300px] border block p-1 rounded-lg mt-[5px]"
              placeholder="Enter your full name"
              type="text"
              id="fullName"
              {...register("name", { required: "* Full name is required" })}
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>

          <div className="forms mt-5 text-start ml-[26%]">
            <label htmlFor="email">Your E-mail</label>
            <input
              className="w-[300px] border block p-1 rounded-lg mt-[5px]"
              placeholder="Enter Email address"
              type="email"
              id="email"
              {...register("email", {
                required: "* Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "* Enter a valid email address",
                },
              })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>

          <div className="forms mt-5 text-start ml-[26%]">
            <label htmlFor="password">Password</label>
            <input
              className="w-[300px] border block p-1 rounded-lg mt-[5px]"
              placeholder="Enter password"
              type="password"
              id="password"
              {...register("password", { required: "* Password is required" })}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>

          <div className="forms mt-5 text-start ml-[26%]">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-[300px] border block p-1 rounded-lg mt-[5px]"
              placeholder="Enter password"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "* Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "* Passwords do not match",
              })}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>

          <button
            className="text-white bg-[#4640DE] w-[290px] h-9 mt-5 text-center rounded-2xl"
            type="submit"
            disabled={isLoading}
          >
            Continue
          </button>
          {isError && <p className="text-red-500">Error submitting the form</p>}
          {isSuccess && <p>Registration successful!</p>}
          <p className="mt-1">
            Already have an account?{" "}
            <Link className="text-[#4640DE]" href="/signin">
              Login
            </Link>
          </p>
          <p className="ml-[26%] mt-2 w-[300px] text-center">
            By clicking &apos;Continue&apos;, you acknowledge that you have read and
            accept the Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
