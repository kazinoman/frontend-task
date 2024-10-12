import { signUp } from "../../Service/auth/actions";
import SignInLink from "./component/singInPageLink";

export default function SignUpPage() {
  return (
    <div className="container max-w-sm mx-auto flex items-center justify-center h-screen ">
      <form className="max-w-lg min-w-[380px] h-fit border border-primary rounded-xl p-7 shadow-xl flex flex-col items-start justify-center gap-7 bg-white">
        <p className="self-center font-semibold text-2xl text-primary">Sign Up</p>

        <div className="w-full">
          <label htmlFor="email" className="text-gray-400 text-sm">
            Email
          </label>
          <input
            placeholder="test@me.com"
            id="email"
            name="email"
            type="email"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full"
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="text-gray-400 text-sm">
            Password:
          </label>
          <input
            placeholder="123456789"
            id="password"
            name="password"
            type="password"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
        </div>

        <button
          formAction={signUp}
          className="border w-full p-3 text-base font-medium rounded-md bg-[#633cff] text-white"
        >
          Sign Up
        </button>

        <SignInLink />
      </form>
    </div>
  );
}
