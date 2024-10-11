import Image from "next/image";
import SignUpLink from "../components/login/signUp";
import { login } from "../Service/auth/actions";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // console.log(searchParams.error);
  return (
    <div className="container max-w-sm mx-auto flex items-center justify-center h-screen ">
      <form className="max-w-md min-w-[370px] h-fit border rounded-lg p-5 shadow-xl flex flex-col items-start justify-center gap-7 bg-white">
        <p className="self-center font-semibold text-2xl text-primary">Login</p>
        <div className="w-full">
          <label htmlFor="email" className="text-gray-400">
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
          <label htmlFor="password" className="text-gray-400">
            Password
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
        {searchParams.error && (
          <div className="border-red-500 bg-red-50 w-full p-3 rounded-md border text-red-500">
            <p>{searchParams.error}</p>
          </div>
        )}

        <button formAction={login} className="border w-full p-3 text-base font-medium rounded-md bg-primary text-white">
          Sign in
        </button>

        <SignUpLink />
      </form>
    </div>
  );
}
