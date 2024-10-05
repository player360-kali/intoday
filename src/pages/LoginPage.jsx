import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useServer from "../api/server";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const server = useServer();
  const { saveToken } = useAuth()

  const login = async (inp) => {
    try {
      setLoading(true)
      const response = await server.post("/auth/login", {
        email: inp.email,
        password: inp.password,
      });
      saveToken(response.data.token)
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center">
      <div className="w-[40%] h-auto border border-solid rounded-[16px] m-auto p-[20px]">
        <div className="w-[100%] h-[100%] flex flex-col">
          <h2 className="text-[30px] font-semibold">Login to your account</h2>
          <h4 className="text-[20px] my-[20px] font-medium">
            If you want to enter your account you should enter your email and password
          </h4>
          <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit(loading === true ? null : login)}>
            <div className="text-[#000]">
              <label className="text-[16px] font-bold" htmlFor="email">Email:</label>
              <br />
              <input
                id="email"
                type="email"
                className="w-[100%] h-auto py-[6px] px-[14px] rounded-[6px]"
                {...register("email", {
                  required: "Please, fill your email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  },
                })}
              />
              <p className="w-[100%] h-[26px] text-[red]">{errors.email?.message}</p>
            </div>
            <div className="text-black">
              <label className="text-[16px] font-bold" htmlFor="password">Password:</label>
              <br />
              <input
                autoComplete="new-password"
                id="password"
                type={show ? "text" : "password"}
                className="w-[100%] h-auto py-[6px] px-[14px] rounded-[6px]"
                {...register("password", {
                  minLength: 6,
                  required: "Your password should be more than 6 characters",
                })}
              />
              {show ? (
                <FaRegEye className="relative mt-[-26px] left-[95%] cursor-pointer text-[#000]" fill="#000" onClick={() => setShow(false)} />
              ) : (
                <FaRegEyeSlash className="relative mt-[-26px] left-[95%] cursor-pointer text-[#000]" fill="#000" onClick={() => setShow(true)} />
              )}
              <p className="w-[100%] h-[26px] text-[red] mt-[8px]">{errors.password?.message}</p>
            </div>
            <div className="w-[100%] h-auto mt-[20px]">
              <button className="w-[100%] h-auto text-center py-[16px] px-[16px] bg-[#4c0bcd] rounded-[6px] font-bold hover:opacity-90 active:scale-[0.98] active:opacity-[.95]">
                {loading === true ? ("Loading...") : ("Login")}
              </button>
            </div>
            <div className="text-[18px] mt-[20px] font-semibold text-[#4c0bcd]">
              <Link className="hover:text-[#4c0bcd90]" to={"/create-account"}>
                {"If you haven't an account?"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
