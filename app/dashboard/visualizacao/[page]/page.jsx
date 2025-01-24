"use client";
import Image from "next/image";
import DashboardPage from "../../../Components/DashboardPage";
import { use, useEffect, useMemo, useState } from "react";
import { TiPlus } from "react-icons/ti";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, redirect } from "next/navigation";

export default function DashboardVisualizacaoPage({ params }) {
	const router = useRouter();
	const { fetchData } = useAuth();
	const { user, userData } = useAuth();
	const { page } = use(params);
	const [errorMessage, setErrorMessage] = useState("");
	const [totalPages, setTotalPages] = useState(0);
	const [numTodos, setNumTodos] = useState(0);
	const [filtroAtivo, setFiltroAtivo] = useState("Todos");
	const [filteredProdutos, setFilteredProdutos] = useState([]);
	const [pesquisaTextual, setPesquisaTextual] = useState("");
	const [showFilterOptions, setShowFilterOptions] = useState(false);
	const [sortByTitulo, setSortByTitulo] = useState({
		sort: true,
		ascending: true,
	});
	const [sortByTipo, setSortByTipo] = useState({
		sort: false,
		ascending: true,
	});

	function handleSorting(type) {
		if (type === "titulo") {
			setSortByTitulo({ sort: true, ascending: !sortByTitulo.ascending });
			setSortByTipo({ sort: false, ascending: true });
		} else if (type === "ordem") {
			setSortByTipo({ sort: true, ascending: !sortByTipo.ascending });
			setSortByTitulo({ sort: false, ascending: true });
		}
	}

	async function handleDelete(produto) {
		if (!confirm("Tem certeza que deseja excluir este produto?")) {
			return;
		}

		await axios
			.delete(`/api/produtos/${produto}`)
			.then((res) => {
				console.log(res.data);

				if (res.data.success) {
					fetchData();
				} else {
					setErrorMessage("Erro ao excluir produto.");
				}
			})
			.catch((err) => {
				console.log(err);
				setErrorMessage("Erro ao excluir produto.");
			});
	}

	useEffect(() => {
		if (userData && userData.produtos) {
			if (!parseInt(page)) redirect("/dashboard/visualizacao/1");
			if (page < 0) redirect("/dashboard/visualizacao/1");

			let produtos = [...userData.produtos];

			if (produtos.length === 0) {
				setErrorMessage("Nenhum produto encontrado.");
			}

			setNumTodos(produtos.length);

			if (pesquisaTextual) {
				const pesquisaTextualPlain = pesquisaTextual.toLowerCase();
				produtos = produtos.filter(
					(recorte) =>
						recorte.nome
							.toLowerCase()
							.includes(pesquisaTextualPlain) ||
						recorte.descricao
							.toLowerCase()
							.includes(pesquisaTextualPlain),
				);
			}

			if (sortByTitulo.sort) {
				produtos = produtos.sort((a, b) => {
					if (sortByTitulo.ascending) {
						return a.nome.localeCompare(b.nome);
					} else {
						return b.nome.localeCompare(a.nome);
					}
				});
			}

			if (page) {
				produtos = produtos.slice((page - 1) * 10, page * 10);
			}

			setFilteredProdutos(produtos);
		}
	}, [
		userData,
		pesquisaTextual,
		filtroAtivo,
		showFilterOptions,
		page,
		sortByTitulo,
	]);

	return (
		<DashboardPage>
			<div className="flex w-full flex-col items-center justify-end overflow-y-auto px-2 sm:px-10 py-7 align-middle">
				<div className="mb-5 flex w-full items-center gap-3 flex-row justify-between">
					<p className="text-2xl text-dark">
						Produtos{" "}
						<span className="text-red text-sm">
							{errorMessage.length > 0 && errorMessage}
						</span>
					</p>
					<button
						onClick={() => router.push("/dashboard/pecas")}
						className="rounded-lg bg-dark px-4 py-3 text-sm text-white hover:opacity-85"
					>
						<span className="hidden md:inline-block">
							Adicionar Produto
						</span>
						<span className="inline-block md:hidden">
							<TiPlus />
						</span>
					</button>
				</div>
				<div className="w-full rounded-[20] border border-grey pb-5">
					<div className="flex m-5 mb-10 flex-col md:flex-row gap-3 items-center justify-between">
						<div className="flex items-center gap-3">
							<button
								onClick={() => setFiltroAtivo("Todos")}
								className={`${filtroAtivo == "Todos" ? "bg-dark text-white" : "text-disabled"} rounded-[10] px-3 py-2 text-sm hover:bg-dark hover:text-white`}
							>
								Todos ({numTodos})
							</button>
						</div>

						<div className="flex items-center gap-5">
							<div className="flex items-center gap-5">
								<div className="relative">
									<input
										onChange={(e) =>
											setPesquisaTextual(e.target.value)
										}
										value={pesquisaTextual}
										type="text"
										className="border border-grey active:outline-none focus:outline-none w-full h-[48] rounded-md py-3 ps-2 pe-12 shadow-sm sm:text-sm"
									/>

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
								<div
									onClick={() =>
										setShowFilterOptions(!showFilterOptions)
									}
									className="hover:bg-light-grey hover:cursor-pointer rounded-lg p-3 relative"
								>
									<div className="absolute">
										{showFilterOptions && (
											<div className="absolute w-52 bg-light shadow-lg top-10 -right-8 p-3 rounded-lg bo">
												<span className="text-disabled">
													Ordenar por:
												</span>
												<div className="hover:bg-light-grey rounded-lg py-2 ps-3">
													Título
												</div>
												<div className="hover:bg-light-grey rounded-lg py-2 ps-3">
													Tipo de Produto
												</div>
											</div>
										)}
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
					<div className="w-full">
						<div className="overflow-x-auto">
							<table className="min-w-full text-[12px] md:text-sm table-fixed select-none">
								<thead className="bg-light-grey">
									<tr>
										<th
											onClick={() =>
												handleSorting("titulo")
											}
											className="text-left px-4 py-2 font-light text-disabled lg:w-2/5 hover:bg-grey cursor-pointer active:text-dark-purple break-all"
										>
											Título
											{sortByTitulo.ascending ? "⏶" : "⏷"}
										</th>
										<th className="text-left px-4 py-2 font-light text-disabled">
											Descricao
										</th>
										<th className="text-start px-4 py-2 font-light text-disabled">
											Ações
										</th>
									</tr>
								</thead>

								<tbody className="divide-y divide divide-grey">
									{filteredProdutos.map((produto, index) => (
										<tr
											key={index}
											className="text-[10px] md:text-sm font-medium py-2 hover:cursor-pointer hover:bg-light-grey"
										>
											<td className="px-4 py-3 text-[8px] sm:text-[10px] md:text-xs break-all">
												{produto.nome}
											</td>
											<td className="px-4 py-3">
												{produto.descricao}
											</td>
											<td>
												<span className="inline-flex overflow-hidden justify-center align-middle items-center shadow-sm">
													<button
														onClick={(e) =>
															e.stopPropagation()
														}
														className="inline-block p-2 text-disabled hover:text-dark focus:relative"
														title="Editar Recorte"
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
																d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
															/>
														</svg>
													</button>

													<button
														onClick={(e) => {
															e.stopPropagation();
															handleDelete(
																produto.id,
															);
														}}
														className="inline-block p-2 text-disabled hover:text-red focus:relative"
														title="Excluir Recorte"
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
																d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
															/>
														</svg>
													</button>
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<ol className="flex justify-center gap-1 text-xs font-medium">
				<li>
					<a
						className={`${page == 1 ? "hidden" : "inline-flex"} cursor-pointer hover:bg-dark hover:text-white size-8 items-center justify-center rounded border border-grey text-disabled`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-3"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</li>
				{[...Array(totalPages)].map((_, index) => (
					<li
						key={index}
						onClick={() => {
							page != index + 1 &&
								router.push(`/dashboard/pecas/${index + 1}`);
						}}
					>
						<a
							className={`${page == index + 1 ? "bg-dark text-white" : ""} inline-flex cursor-pointer hover:bg-dark hover:text-white size-8 items-center justify-center rounded border border-grey text-disabled`}
						>
							{index + 1}
						</a>
					</li>
				))}

				<li>
					<a
						onClick={() => {
							page < totalPages &&
								router.push(`/dashboard/pecas/${page + 1}`);
						}}
						className={`${page == totalPages ? "hidden" : "inline-flex"} cursor-pointer hover:bg-dark hover:text-white size-8 items-center justify-center rounded border border-grey text-disabled`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-3"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</li>
			</ol>
		</DashboardPage>
	);
}
