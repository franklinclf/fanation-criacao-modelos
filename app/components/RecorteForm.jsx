"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import { set, useForm } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect, useRouter } from "next/navigation";
import { uploadFile } from "@/firebase";
import axios from "axios";

export default function RecorteForm({ defaultData }) {
	const { userData, user } = useAuth();
	const router = useRouter();
	const [imagemState, setImagemState] = useState(null);
	const [draggingOver, setDraggingOver] = useState(false);

	const schema = yup.object().shape({
		nome: yup.string().required("obrigatório").max(50),
		tipoProduto: yup.string().required("obrigatório"),
		tipoRecorte: yup.string().required("obrigatório"),
		posicaoRecorte: yup.string().required("obrigatório"),
		ordemExibicao: yup.string().required("obrigatório"),
		tecido: yup.string().required("obrigatório"),
		cor: yup.string().required("obrigatório"),
		SKU: yup
			.string()
			.required("obrigatório")
			.test("SKU", "SKU já existe", async (value) => {
				return await axios
					.get(`/api/recortes/existsBySKU?SKU=${value}`)
					.then((response) => {
						return !response.data;
					});
			}),
		imagem: yup.mixed().required("obrigatório"),
	});

	const {
		register,
		reset,
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { isDirty, errors },
	} = useForm({
		defaultValues: defaultData,
		resolver: yupResolver(schema),
	});

	async function onSubmitForm() {
		const imagem = getValues("imagem");
		await uploadFile(imagem, getValues("chave")).then((url) => {
			setValue(
				"urlImagem",
				url,
			);
			setValue("user", user.username);
			createNewRecorte(getValues());
		});
	}

	const createNewRecorte = async (recorteData) => {
		await axios
			.post("/api/recortes/novo", recorteData)
			.then((response) => {
				if (response.data.success) {
					router.push("/dashboard/recortes");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImagemState(file);
			setValue("imagem", file, { shouldDirty: true });
		} else {
			setImagemState(null);
			setValue("imagem", null, { shouldDirty: true });
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles) {
			const newFile = droppedFiles[0];
			setImagemState(newFile);
			setValue("imagem", newFile, { shouldDirty: true });
			setDraggingOver(false);
		}
	};

	useEffect(() => {
		const chave =
			`${watch("tipoProduto")}_${watch("tipoRecorte")}_${watch("tecido")}_${watch("cor")}`
				.toLocaleLowerCase()
				.replace(" ", "-");
		setValue("chave", chave, { shouldDirty: false });
	}, [
		watch("tipoProduto"),
		watch("tipoRecorte"),
		watch("tecido"),
		watch("cor"),
	]);

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} onDrop={(e) => handleDrop(e)} onDragOver={(e) => {e.preventDefault(); setDraggingOver(true);}} onDragLeave={(e) => {e.preventDefault(); setDraggingOver(false)}}>
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
				{/*Header*/}
				<div className="mb-5 flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
					{/*Nome*/}
					<div>
						<p className="text-wrap text-2xl text-dark">
							{watch("nome").length > 0 ? (
								<span className="text-wrap break-all">
									{watch("nome")}
								</span>
							) : (
								<span className="text-grey">Novo Recorte</span>
							)}
						</p>
					</div>

					{/*Ativo*/}
					<label
						className="inline-flex cursor-pointer items-center"
						title={
							getValues("ativo")
								? "Desativar Recorte"
								: "Ativar Recorte"
						}
					>
						<input
							{...register("ativo")}
							type="checkbox"
							className="peer sr-only"
						/>
						<div className="peer relative h-[26] w-[40] rounded-full border-2 border-grey after:absolute after:start-[5px] after:top-[5px] after:h-3 after:w-3 after:rounded-full after:border-2 after:border-grey after:transition-all after:content-[''] peer-checked:border-dark-purple peer-checked:after:translate-x-full peer-checked:after:border-dark-purple peer-focus:outline-none peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
					</label>
				</div>
				{/*Especificações e Metadados*/}
				<div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
					{/*Especificações*/}
					<div className="flex w-full flex-col gap-3 rounded-[20] border border-grey p-5 lg:w-1/2">
						<p className="text-sm font-semibold">Especificações</p>
						{/*Nome do Modelo*/}
						<div className="flex flex-col gap-3 xl:flex-row">
							<div className="w-full">
								<label className="text-sm">
									Nome do Modelo{" "}
									<span className="text-red opacity-50">
										{errors?.nome?.message}
									</span>
								</label>
								<input
									{...register("nome", {
										maxLength: 50,
										placeholder:
											"Escolha um nome para seu recorte",
									})}
									type="text"
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								/>
							</div>
						</div>
						{/*Tipo de Produto e Recorte*/}
						<div className="flex flex-col gap-3 xl:flex-row">
							<div className="w-full xl:w-1/2">
								<label className="text-sm">
									Tipo de Produto{" "}
									<span className="text-red opacity-50">
										{errors?.tipoProduto?.message}
									</span>
								</label>
								<select
									{...register("tipoProduto", {})}
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								>
									<option disabled value="">
										Selecione um modelo
									</option>
									{userData?.specs.tiposProduto.map(
										(tipo) => (
											<option key={tipo} value={tipo}>
												{tipo}
											</option>
										),
									)}
								</select>
							</div>
							<div className="w-full xl:w-1/2">
								<label className="text-sm">
									Tipo de Recorte{" "}
									<span className="text-red opacity-50">
										{errors?.tipoRecorte?.message}
									</span>
								</label>
								<select
									{...register("tipoRecorte", {})}
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								>
									<option disabled value="">
										Selecione um tipo
									</option>
									{userData?.specs.tiposRecorte.map(
										(tipo) => (
											<option key={tipo} value={tipo}>
												{tipo}
											</option>
										),
									)}
								</select>
							</div>
						</div>
						{/*Posição do Recorte e Ordem de Exibição*/}
						<div className="flex flex-col gap-3 xl:flex-row">
							<div className="w-full xl:w-1/2">
								<label className="text-sm">
									Posição da Imagem{" "}
									<span className="text-red opacity-50">
										{errors?.posicaoRecorte?.message}
									</span>
								</label>
								<select
									{...register("posicaoRecorte", {})}
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								>
									<option disabled value="">
										Selecione uma posição
									</option>
									{userData?.specs.posicoes.map((posicao) => (
										<option key={posicao} value={posicao}>
											{posicao}
										</option>
									))}
								</select>
							</div>
							<div className="w-full xl:w-1/2">
								<label className="text-sm">
									Ordem de Exibição{" "}
									<span className="text-red opacity-50">
										{errors?.ordemExibicao?.message}
									</span>
								</label>
								<select
									{...register("ordemExibicao", {})}
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								>
									<option disabled value="">
										Selecione a ordem de exibição
									</option>
									{userData?.specs.ordens.map((ordem) => (
										<option key={ordem} value={ordem}>
											{ordem}
										</option>
									))}
								</select>
							</div>
						</div>

						{/*Tecido e Cor*/}
						<div className="flex flex-col gap-3 xl:flex-row">
							<div className="w-full xl:w-1/2">
								<label className="text-sm">
									Tecido{" "}
									<span className="text-red opacity-50">
										{errors?.tecido?.message}
									</span>
								</label>
								<select
									{...register("tecido", {})}
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								>
									<option value="" disabled>
										Selecione um tecido
									</option>
									{userData?.specs.materiais.map((tecido) => (
										<option key={tecido} value={tecido}>
											{tecido}
										</option>
									))}
								</select>
							</div>

							<div className="w-full xl:w-1/2">
								<label className="text-sm">
									Cor do Tecido{" "}
									<span className="text-red opacity-50">
										{errors?.cor?.message}
									</span>
								</label>
								<select
									{...register("cor", {})}
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								>
									<option value="" disabled>
										Selecione uma cor
									</option>
									{userData?.specs.cores.map((cor) => (
										<option key={cor} value={cor}>
											{cor}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					{/*Metadados*/}
					<div className="flex w-full flex-col gap-3 p-5 lg:w-1/2">
						<p className="text-sm font-semibold">Metadados</p>
						<div className="flex flex-col gap-3 xl:flex-row">
							<div className="w-full">
								<label className="text-sm">
									SKU{" "}
									<span className="text-red opacity-50">
										{errors?.SKU?.message}
									</span>
								</label>
								<input
									{...register("SKU", {
										placeholder:
											"Dê um código único ao produto.",
									})}
									type="text"
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-3 xl:flex-row">
							<div className="w-full">
								<label className="text-sm">Chave Gerada</label>
								<input
									value={watch("chave")}
									type="text"
									className="h-[48] w-full rounded-lg border border-light-grey px-2 py-3 focus:outline-none active:outline-none sm:text-sm"
									readOnly
								/>
							</div>
						</div>
					</div>
				</div>

				{/*Upload de Imagem*/}
				<div className="mt-5 flex w-full flex-col gap-3 rounded-[20] border border-grey p-5">
					<p className="text-sm font-semibold">
						Mídia{" "}
						<span className="text-red opacity-50">
							{errors?.imagem?.message}
						</span>
					</p>
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
									onClick={() => {
										setValue("imagem", null);
										setImagemState(null);
									}}
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
								className={`${draggingOver ? 'bg-grey border-dark-grey ' : '' }bg-gray-50 group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-grey px-10 text-center hover:bg-light-grey group-hover:border-dark-grey`}
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
										Escolha um arquivo ou arraste e solte
										aqui
									</p>
								</div>
								<input
									{...register("imagem", {
										required: "obrigatório",
									})}
									id="dropzone-file"
									accept="image/*"
									type="file"
									className="hidden"
									onChange={(e) => handleImageChange(e)}
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
