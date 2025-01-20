"use client";
import Main from "../components/Main";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await auth.login(loginState, passwordState);

    if (response.success) {
      router.push("/dashboard");
    } else {
      alert(response)
      
      setError(true);
      setErrorMessage(response.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Main>
        <div className="flex h-screen w-full justify-center bg-light sm:h-[calc(100vh-4rem)]">
          <div className="mt-36 flex w-5/6 flex-col items-center gap-1 sm:w-1/2 md:w-1/3 xl:w-1/4">
            <Image
              className="h-auto w-[152]"
              src="/fanation-full-logo-mixed.svg"
              alt="Logo da Fanation"
              width={0}
              height={0}
              priority={true}
            />
            <div className="pt-2 text-2xl font-bold text-light-purple sm:text-xl sm:font-normal">
              Bem-vindo ao Fanation
            </div>
            <div className="text-dark-grey">
              Acesse a sua conta para iniciar
            </div>
            <form className="flex w-full flex-col pt-2" onSubmit={handleLogin}>
              <label htmlFor="userName" className="text-sm text-dark-grey">
                Inserir usuário
              </label>
              <input
                value={loginState}
                onChange={(e) => setLoginState(e.target.value)}
                type="text"
                id="userName"
                placeholder="Digite seu nome de usuário"
                className="mt-1 w-full rounded-lg p-3 text-sm outline outline-1 outline-light-grey focus:outline-grey"
                required
              />

              <label
                htmlFor="userPassword"
                className="mt-3 text-sm text-dark-grey"
              >
                Inserir senha
              </label>
              <input
                value={passwordState}
                onChange={(e) => setPasswordState(e.target.value)}
                type="password"
                id="userPassword"
                placeholder="Digite sua senha"
                className="mt-1 w-full rounded-lg p-3 text-sm outline outline-1 outline-light-grey focus:outline-grey"
                required
              />

              <input
                type="submit"
                value="Acessar"
                className="mt-4 cursor-pointer rounded-lg bg-dark p-3 text-sm text-white hover:bg-dark-grey focus:outline-light-purple active:bg-dark-purple"
                disabled={loading}
              ></input>
              {error && (
                <div className="mt-2 text-sm text-red text-center">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </Main>
    </>
  );
}
