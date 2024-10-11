import { signUp } from "../../Service/auth/actions";
import SignInLink from "./component/singInPageLink";

export default function SignUpPage() {
  return (
    <div className="container max-w-sm mx-auto flex items-center justify-center h-screen ">
      <form className="max-w-md min-w-[400px] h-fit border rounded-md p-5 shadow-xl flex flex-col items-start justify-center gap-7 bg-white">
        <div className="w-full">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password:</label>
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
