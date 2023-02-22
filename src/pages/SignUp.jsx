import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import authApi from "api/authApi";
import LoadingIcon from "components/common/LoadingIcon";

const SignUp = () => {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAgree = e => {
    setAgree(e.target.checked);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      if (agree || isSubmitting) {
        setIsSubmitting(true)
        const { confirmPassword, ...form } = data;
        const response = await authApi.signUp(form);
        if (response.error_code === 0) {
          toast.success(response.message);
          navigate("/sign_in");
        } else {
          toast.error(response.message);
        }
        setIsSubmitting(false);
      } else {
        toast.error('You do not agree to Privacy Policy');
      }
    } catch (error) {
      toast.error("Invalid input");
      setIsSubmitting(false);
    }
  };

  const rules = {
    nameRule: {
      required: "Name is required!",
      maxLength: 50,
      validate: val => {
        if (!/^[A-Za-z0-9]+$/i.test(val)) {
          return "Name is not a valid";
        }
      },
    },
    emailRule: {
      required: "Email is required!",
      validate: val => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
          return "Email is not a valid";
        }
      },
    },
    titleRule: {
      required: false,
      validate: val => {
        if (!/^[A-Za-z0-9]+$/i.test(val)) {
          return "Title is not a valid";
        }
      },
    },
    passwordRule: {
      required: "Password is required!",
      validate: val => {
        if (val.length <= 12) {
          return "Password must be at least 12 characters";
        } else if (val.length >= 50) {
          return "Password must be at maximum 50 characters";
        }
      },
    },
    confirmPasswordRule: {
      required: "Confirm Password is required!",
      validate: val => {
        if (watch("password") !== val) {
          return "Your password do no match";
        }
      },
    },
  };

  return (
    <div className="w-full min-h-screen p-5 md:p-20 flex items-center justify-center bg-light-blue">
      <div className="auth">
        {/* <img className="mx-auto w-16" src={} alt="Logo" /> */}
        <div className="text-gray-700 text-2xl font-medium text-center mt-16">Register New Account</div>
        <div className="box px-5 py-8 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input type="text" className="text-input-form py-3 px-4 auth__input" placeholder="Name" {...register("name", rules.nameRule)} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              <input type="text" className="text-input-form py-3 px-4 auth__input mt-4" placeholder="Email" {...register("email", rules.emailRule)} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              <input type="text" className="text-input-form py-3 px-4 auth__input mt-4" placeholder="Title" {...register("title", rules.titleRule)} />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              <input
                type="password"
                className="text-input-form py-3 px-4 auth__input mt-4"
                placeholder="Password"
                {...register("password", rules.passwordRule)}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <input
                type="password"
                className="text-input-form py-3 px-4 auth__input mt-4"
                placeholder="Password Confirmation"
                {...register("confirmPassword", rules.confirmPasswordRule)}
              />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm mt-4 flex">
              <div className="flex items-center mr-auto">
                <input id="remember-me" type="checkbox" value={agree} onChange={handleAgree} className="checkbox-input mr-2" />
                <label htmlFor="remember-me" className="cursor-pointer select-none">
                  I agree to the <a className="text-primary font-bold">Privacy Policy.</a>
                </label>
              </div>
            </div>
            <div className="mt-5 xl:mt-8 xl:text-left">
              <button type="submit" className={`btn ${agree ? "btn-primary" : "btn-secondary"} py-2 w-full xl:mr-3`}>
                {isSubmitting ? <LoadingIcon /> : "Register"}
              </button>
              <Link className="btn a-btn btn-secondary py-2 w-full xl:mr-3 mt-2" to="/sign_in">
                Login
              </Link>
            </div>
          </form>
        </div>
        <div className="text-gray-400 text-center xl:text-center mt-10">
          By signin up, you agree to our <br></br>
          <span className="underline">Terms and Conditions</span> & <span className="underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
