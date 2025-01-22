"use client";
import DashboardPage from "@/app/components/DashboardPage";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";

export default function AdicionarRecortePage() {
  const router = useRouter();
  const { userData } = useAuth();
  const [imagemState, setImagemState] = useState(null);
  const [recorteState, setRecorteState] = useState({
    SKU: "",
    createdAt: null,
    nome: "",
    tipoRecorte: "default",
    tipoProduto: "default",
    posicao: "default",
    ordemExibicao: 0,
    material: "default",
    cor: "default",
    chave: "",
    ativo: false,
    dirty: true
  });

  return (
    <DashboardPage>
      <form>
      <div
        className={`${
          recorteState.dirty ? "translate-y-0" : "-translate-y-full"
        } flex items-center justify-between bg-light-grey py-5 pe-28 ps-20 text-sm shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_4px_0px_rgba(0,0,0,0.15)] transition-transform duration-300`}
      >
        <div className="flex select-none items-center gap-4">
          <MdInfoOutline size="23" />
          Alterações não salvas
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-dark px-3 py-3.5 text-xs text-dark hover:bg-dark hover:text-white"
            onClick={() => {
              router.back();
            }}
          >
            Descartar
          </button>
          <input type="submit" value="Salvar"
            className="rounded-lg bg-dark px-3 py-3.5 text-xs text-white hover:opacity-85 hover:cursor-pointer"
            onClick={() => {
              dirty.current = false;
            }}
          />
        </div>
      </div>
      <div className="flex w-full select-none flex-col items-center justify-end overflow-y-auto px-10 py-7 align-middle">
        <div className="mb-5 flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
          <div>
            <p className="text-wrap text-2xl text-dark">
              {recorteState.nome.length > 0 ? (
                <span className="text-wrap break-all">{recorteState.nome}</span>
              ) : (
                <span className="text-grey">Novo Recorte</span>
              )}
            </p>
          </div>
          <div>
            <label
              className="inline-flex cursor-pointer items-center"
              title={
                recorteState.ativo ? "Desativar Recorte" : "Ativar Recorte"
              }
            >
              <input
                checked={recorteState.ativo}
                onChange={() =>
                  setRecorteState({
                    ...recorteState,
                    ativo: !recorteState.ativo,
                  })
                }
                type="checkbox"
                className="peer sr-only"
              />
              <div className="peer relative h-[26] w-[40] rounded-full border-2 border-grey after:absolute after:start-[5px] after:top-[5px] after:h-3 after:w-3 after:rounded-full after:border-2 after:border-grey after:transition-all after:content-[''] peer-checked:border-dark-purple peer-checked:after:translate-x-full peer-checked:after:border-dark-purple peer-focus:outline-none peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-3 rounded-[20] border border-grey p-5 lg:w-1/2">
            <p className="text-sm font-semibold">Especificações</p>
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="w-full">
                <label className="text-sm">Nome do Modelo</label>
                <input
                  required
                  maxLength="50"
                  placeholder="Escolha um nome para seu recorte"
                  value={recorteState.nome}
                  onChange={(e) =>
                    setRecorteState({ ...recorteState, nome: e.target.value })
                  }
                  type="text"
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="text-sm">Tipo de Produto</label>
                <select
                  required
                  value={recorteState.tipoProduto}
                  onChange={(e) =>
                    setRecorteState({
                      ...recorteState,
                      tipoProduto: e.target.value,
                    })
                  }
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                >
                  <option disabled value="default">
                    Selecione um modelo
                  </option>
                  {userData?.tiposProduto.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="text-sm">Tipo de Recorte</label>
                <select
                  required
                  value={recorteState.tipoRecorte}
                  onChange={(e) =>
                    setRecorteState({
                      ...recorteState,
                      tipoRecorte: e.target.value,
                    })
                  }
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                >
                  <option disabled value="default">
                    Selecione um tipo
                  </option>
                  {userData?.tiposRecorte.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="text-sm">Posição da Imagem</label>
                <select
                  required
                  value={recorteState.posicao}
                  onChange={(e) =>
                    setRecorteState({
                      ...recorteState,
                      posicao: e.target.value,
                    })
                  }
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                >
                  <option disabled value="default">
                    Selecione uma posição
                  </option>
                  {userData?.posicoes.map((posicao) => (
                    <option key={posicao} value={posicao}>
                      {posicao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="text-sm">Ordem de Exibição</label>
                <input
                  required
                  value={recorteState.ordemExibicao}
                  onChange={(e) =>
                    setRecorteState({
                      ...recorteState,
                      ordemExibicao: e.target.value,
                    })
                  }
                  type="number"
                  min="0"
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="text-sm">Tecido</label>
                <select
                  required
                  value={recorteState.material}
                  onChange={(e) =>
                    setRecorteState({
                      ...recorteState,
                      material: e.target.value,
                    })
                  }
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                >
                  <option value="default" disabled>
                    Selecione um tecido
                  </option>
                  {userData?.materiais.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="text-sm">Cor do Tecido</label>
                <select
                  required
                  value={recorteState.cor}
                  onChange={(e) =>
                    setRecorteState({ ...recorteState, cor: e.target.value })
                  }
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                >
                  <option value="default" disabled>
                    Selecione uma cor
                  </option>
                  {userData?.cores.map((cor) => (
                    <option key={cor} value={cor}>
                      {cor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 p-5 lg:w-1/2">
            <p className="text-sm font-semibold">Metadados</p>
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="w-full">
                <label className="text-sm">SKU</label>
                <input
                  required
                  value={recorteState.SKU}
                  onChange={(e) =>
                    setRecorteState({ ...recorteState, SKU: e.target.value })
                  }
                  type="text"
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="w-full">
                <label className="text-sm">Chave Gerada</label>
                <input
                  disabled
                  required
                  onChange={(e) =>
                    setRecorteState({
                      ...recorteState,
                      chave: e.target.value,
                    })
                  }
                  value={`${recorteState.tipoProduto === "default" ? "" : recorteState.tipoProduto.toLocaleLowerCase()}_${recorteState.tipoRecorte === "default" ? "" : recorteState.tipoRecorte}_${recorteState.posicao === "default" ? "" : recorteState.posicao}_${recorteState.material === "default" ? "" : recorteState.material.toLocaleLowerCase()}_${recorteState.cor === "default" ? "" : recorteState.cor.toLocaleLowerCase().replace(" ", "-")}`}
                  type="text"
                  className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-col gap-3 rounded-[20] border border-grey p-5">
          <p className="text-sm font-semibold">Mídia</p>
          <div className="flex w-full flex-col items-start justify-start gap-3 lg:flex-row">
            {imagemState && (
              <div className="relative w-full md:w-72">
                <Image
                  className="w-full rounded-lg border border-grey object-cover"
                  src={URL.createObjectURL(imagemState)}
                  width={0}
                  height={0}
                  alt="Imagem"
                />
                <div
                  onClick={() => setImagemState(null)}
                  className="absolute end-0 top-0 p-3"
                >
                  <IoIosClose
                    size="25"
                    title="Remover Imagem"
                    className="text-grey hover:cursor-pointer hover:text-dark-grey active:text-dark-purple"
                  />
                </div>
              </div>
            )}
            <div className="group flex w-full items-center justify-center lg:w-72">
              <label
                htmlFor="dropzone-file"
                className="bg-gray-50 group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-grey px-10 text-center hover:bg-light-grey group-hover:border-dark-grey"
              >
                <div className="group flex flex-col items-center justify-center pb-6 pt-5 group-hover:text-dark-grey">
                  <Image
                    className="m-3 w-[30]"
                    src="/upload.svg"
                    width={0}
                    height={0}
                    alt="Upload"
                  />
                  <p className="group mb-2 text-sm font-semibold text-disabled group-hover:text-dark-grey">
                    Carregar Arquivo
                  </p>
                  <p className="group text-xs text-disabled group-hover:text-dark-grey">
                    Escolha um arquivo ou arraste e solte aqui
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files[0]) setImagemState(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      </form>
    </DashboardPage>
  );
}
