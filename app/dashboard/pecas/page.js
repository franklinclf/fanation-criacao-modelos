"use client";
import Image from "next/image";
import DashboardPage from "../../components/DashboardPage";
import { useState } from "react";
import {TiPlus} from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function DashboardPecasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [numTodos, setNumTodos] = useState(0);
  const [numAtivos, setNumAtivos] = useState(0);
  const [numExpirado, setNumExpirado] = useState(0);
  const [pesquisaTextual, setPesquisaTextual] = useState("");
  const router = useRouter();

  return (
    <DashboardPage>
      <div className="flex w-full flex-col items-center justify-end overflow-y-auto px-10 py-7 align-middle">
        <div className="mb-5 flex w-full items-center gap-3 flex-row justify-between">
          <p className="text-2xl text-dark">Peças gerais</p>
          <button onClick={() => router.push("/dashboard/pecas/adicionar")} className="rounded-lg bg-dark px-4 py-3 text-sm text-white hover:opacity-85">
            <span className="hidden md:inline-block">
            Adicionar Peça
            </span>
            <span className="inline-block md:hidden">
            <TiPlus />
            </span>
          </button>
        </div>
        <div className="w-full rounded-[20] border border-grey p-5">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltroAtivo("Todos")}
                className={`${filtroAtivo == "Todos" ? "bg-dark text-white" : "text-disabled"} rounded-[10] px-3 py-2 text-sm hover:bg-dark hover:text-white`}
              >
                Todos ({numTodos})
              </button>
              <button
                onClick={() => setFiltroAtivo("Ativos")}
                className={`${filtroAtivo == "Ativos" ? "bg-dark text-white" : "text-disabled"} rounded-[10] px-3 py-2 text-sm hover:bg-dark hover:text-white`}
              >
                Ativos ({numAtivos})
              </button>
              <button
                onClick={() => setFiltroAtivo("Expirado")}
                className={`${filtroAtivo == "Expirado" ? "bg-dark text-white" : "text-disabled"} rounded-[10] px-3 py-2 text-sm hover:bg-dark hover:text-white`}
              >
                Expirado ({numExpirado})
              </button>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <input onChange={(e) => setPesquisaTextual(e.target.value)} value={pesquisaTextual} type="text" className="border border-grey active:outline-none focus:outline-none w-full h-[48] rounded-md py-3 ps-2 pe-12 shadow-sm sm:text-sm"/>

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                  <button
                    type="button"
                    className="text-white bg-dark rounded-lg p-4 hover:bg-dark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <Image
                className="w-[20]"
                src="/sort.svg"
                width={0}
                height={0}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
