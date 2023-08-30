import React from "react";
import { useSignIn } from "../../services/api/useSignIn";

const LoginPage = () => {
  const { mutateAsync, isLoading } = useSignIn();
  const signInAdmin = async () => {
    await mutateAsync({
      email: "nour.edaher.jouini@gmail.com",
      password: "taxecurity",
    });
  };
  return (
    <div className="flex w-full h-[100vh] items-center justify-center">
      <div className="flex flex-col">
        <input
          type="email"
          className="h-[50px] w-60 border-2 px-4 border-gray-400 outline-none rounded"
          placeholder="Email"
        />
        <input
          type="password"
          className="h-[50px] w-60 border-2 px-4 border-gray-400 outline-none rounded mt-4"
          placeholder="Password"
        />
        <button
          onClick={signInAdmin}
          type="submit"
          className="h-[50px] w-60 mt-4 border-none px-4 text-white  font-bold bg-gray-400 outline-none rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
