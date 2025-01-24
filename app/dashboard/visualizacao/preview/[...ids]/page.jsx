"use client";
import { use, useEffect, useState } from "react";
import DashboardPage from "@/app/components/DashboardPage";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { useForm } from "react-hook-form";
import { MdInfoOutline } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import OverlappedImages from "@/app/components/OverlappedImages";
import { redirect } from "next/navigation";

export default function DashboardPreviewPage({ params }) {
	const { ids } = use(params);
	const idsIntArray = ids.map((id) => parseInt(id, 10));
	const { user } = useAuth();
	const [recortes, setRecortes] = useState([]);
	const [images, setImages] = useState([]);

	const defaultData = {
		nome: "",
		descricao: "",
		recortes: idsIntArray,
	};

	const schema = yup.object().shape({
		nome: yup
			.string()
			.required("obrigatório")
			.max(50, "máximo de 50 caracteres"),
		descricao: yup.string().max(150, "máximo de 150 caracteres"),
		recortes: yup
			.array()
			.required("Selecione ao menos um recorte.")
			.of(yup.number())
			.min(1, "Selecione ao menos um recorte."),
	});
	const {
		register,
		reset,
		handleSubmit,
		getValues,
		setValue,
		watch,
		setFocus,
		formState: { isDirty, errors },
	} = useForm({
		defaultValues: defaultData,
		resolver: yupResolver(schema),
	});

	const handleToggleRecorte = (e, recorteId) => {
		const recortes = getValues("recortes");
		if (e.target.checked) {
			if (!recortes.includes(recorteId)) {
				setValue("recortes", [...recortes, recorteId], {
					shouldDirty: true,
				});
			}
		} else {
			setValue(
				"recortes",
				recortes.filter((id) => id !== recorteId),
				{ shouldDirty: true },
			);
		}
	};

	const onSubmitForm = async () => {
		console.log({ produto: getValues(), user });

		await axios
			.post("/api/produtos/novo", { produto: getValues(), user })
			.catch((error) => {
				console.error(error);
			})
			.then((response) => {
				let data = response.data;
				if (data.success) {
					redirect(`/dashboard/visualizacao/`);
				}
			});
	};

	useEffect(() => {
		if (user && ids) {
			axios
				.get("/api/recortes/list/", {
					params: {
						user: user.username,
						ids: idsIntArray,
					},
				})
				.then((response) => {
					setFocus("nome");
					let data = response.data;
					if (data.success) {
						const images = data.recortes.map((recorte) => ({
							id: recorte.id,
							url: recorte.urlImagem,
							ordem: recorte.ordemExibicao.value,
						}));

						setRecortes(data.recortes);
						setImages(images);
						register("recortes");
					}
				})
				.catch((error) => {
					console.error("Error fetching recortes:", error);
				});
		}
	}, [user]);

	return (
		<DashboardPage>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div
					className={`${isDirty ? "translate-y-0" : "-translate-y-full"} flex items-center justify-between bg-light-grey py-5 pe-28 ps-20 text-sm shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_4px_0px_rgba(0,0,0,0.15)] transition-transform duration-300`}
				>
					<div className="flex select-none items-center gap-4">
						<MdInfoOutline size="23" />
						Alterações não salvas
					</div>
					<div className="flex items-center gap-2">
						<div
							className="rounded-lg border hover:cursor-pointer border-dark px-3 py-3.5 text-xs text-dark hover:bg-dark hover:text-white"
							onClick={() => reset()}
						>
							Descartar
						</div>
						<input
							type="submit"
							value="Salvar"
							className="rounded-lg bg-dark px-3 py-3.5 text-xs text-white hover:cursor-pointer hover:opacity-85"
						/>
					</div>
				</div>
				<div className="flex w-full select-none flex-col items-center justify-end overflow-y-auto px-10 py-7 align-middle">
					<div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
						<div className=" flex w-full flex-col items-start justify-between gap-3">
							<div className="w-5/6">
								<div className="text-red opacity-50 text-xs">
									{errors?.nome?.message}
								</div>
								<textarea
									maxLength="50"
									className="text-2xl w-full border-none focus:border-none outline-none resize-none overflow-hidden max-h-20 pt-3 ps-3 align-middle"
									type="text"
									placeholder={`Modelo ${recortes[0]?.tipoProduto?.value || ""}`}
									{...register("nome")}
								></textarea>
							</div>
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-between gap-1 lg:flex-row">
						{/*Lista*/}
						<div className="flex flex-col w-full lg:min-h-96 lg:w-7/12">
							<p className="text-sm font-semibold p-2 text-dark-grey">
								ORDEM{" "}
								<span className="text-red text-xs opacity-50">
									{errors?.recortes?.message}
								</span>
							</p>
							<div className="flex-col h-full gap-3 rounded-[20] border border-grey pb-5 overflow-hidden">
								<table className="min-w-full text-sm table-fixed">
									<thead className="bg-light-grey first:rounded-[20] last:rounded-[20]">
										<tr>
											<th className="sticky inset-y-0 start-0 px-4 py-2"></th>
											<th className="text-center px-4 py-2 font-medium text-disabled">
												Key
											</th>
											<th className="text-center px-4 py-2 font-medium text-disabled">
												Ordem de Exibição
											</th>
										</tr>
									</thead>

									<tbody className="divide-y divide divide-grey">
										{recortes.map((recorte, index) => (
											<tr
												key={index}
												className="text-xs md:text-sm font-medium py-2"
											>
												<td className="flex items-center align-middle justify-center w-full h-full">
													<div className="inline-flex items-center p-2">
														<label className="flex items-center cursor-pointer relative">
															<input
																onChange={(e) =>
																	handleToggleRecorte(
																		e,
																		recorte.id,
																	)
																}
																defaultChecked
																type="checkbox"
																className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full bg-light-grey shadow hover:shadow-md border border-grey checked:bg-dark-purple checked:border-dark-purple"
																id="check-custom-style"
															/>
															<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	className="h-3.5 w-3.5"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																	stroke="currentColor"
																	strokeWidth="1"
																>
																	<path
																		fillRule="evenodd"
																		d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																		clipRule="evenodd"
																	></path>
																</svg>
															</span>
														</label>
													</div>
												</td>
												<td className="px-4 py-2">
													{recorte.chave}
												</td>
												<td className="px-4 py-2 text-center">
													{
														recorte.ordemExibicao
															.value
													}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						{/*Imagem*/}
						<div className="flex flex-col w-full min-h-96 lg:w-5/12">
							<p className="text-sm font-semibold text-dark-grey">
								IMAGEM
							</p>
							<div className="flex w-full flex-col p-4">
								{images && (
									<OverlappedImages
										images={images}
										selected={watch("recortes")}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</form>
		</DashboardPage>
	);
}
