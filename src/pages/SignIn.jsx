import React from "react";
// import Logo from "../assert/images/logo.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doSignIn } from "redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const SignIn = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = form => {
    const action = doSignIn(form);
    dispatch(action)
      .then(({ payload }) => {
        if (payload.error_code === 0) navigate("/");
        else toast.error("Invalid email or password");
      })
      .catch(error => {
        toast.error("Failed to login");
      });
  };

  const rules = {
    emailRule: {
      required: "Email is required!",
      validate: val => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
          return "Email is not a valid";
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
  };

  return (
    <div className="w-full min-h-screen p-5 md:p-20 flex items-center justify-center bg-light-blue">
      <div className="auth">
        {/* <img className="mx-auto w-16" src={Logo} alt="Logo" /> */}
        <div className="text-gray-700 text-2xl font-medium text-center mt-16">Login to Your Account</div>
        <div className="box px-5 py-8 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input type="text" className="text-input-form py-3 px-4 auth__input" placeholder="Email" {...register("email", rules.emailRule)} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              <input
                type="password"
                className="text-input-form py-3 px-4 auth__input mt-4"
                placeholder="Password"
                {...register("password", rules.passwordRule)}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {/* <div className="text-gray-600 text-xs sm:text-sm mt-4 flex">
              <div className="flex items-center mr-auto">
                <input id="remember-me" type="checkbox" value="" className="checkbox-input mr-2" />
                <label htmlFor="remember-me" className="cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <Link to="#">Forgot Password?</Link>
            </div> */}
            <div className="mt-5 xl:mt-8 xl:text-left">
              <button type="submit" className="btn btn-primary xl:mr-3">
                Login
              </button>
              <Link className="btn a-btn btn-secondary xl:mr-3 mt-2" to="/sign_up">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
