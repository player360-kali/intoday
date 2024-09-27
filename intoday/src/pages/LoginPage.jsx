import { useState } from "react"
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [show, setShow] = useState(false)

  const login = async (inp) => {
    console.log(inp);
  }
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center">
      <div className="w-[40%] h-[60%] border border-solid rounded-[16px] m-auto p-[20px]">
        <div className="w-[100%] h-[100%] flex flex-col">
          <h2 className="text-[20px] font-semibold">Login to your account</h2>
          <h4 className="text-[16px] font-medium">If you want to inter your account you should inter your email and password</h4>
          <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit(login)}>
            <div>
              <labe htmlFor="email">Email:</labe>
              <br />
              <input id="email" type="email" />
            </div>
            <div>
              <labe htmlFor="password">Password</labe>
              <br />
              <input id="password" type={show ? "text" : "password"} />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage