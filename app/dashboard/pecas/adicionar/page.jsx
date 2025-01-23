"use client";
import DashboardPage from "@/app/components/DashboardPage";
import RecorteForm from "@/app/components/RecorteForm";

export default function AdicionarRecortePage() {
	const defaultData = {
		id: null,
		user: null,
		nome: "",
		ativo: false,
		tipoProduto: "",
		tipoRecorte: "",
		posicaoRecorte: "",
		ordemExibicao: "",
		tecido: "",
		cor: "",
		SKU: "",
		chave: "_____",
		urlImagem: "",
		imagem: null
	};

	return (
		<DashboardPage>
			<RecorteForm defaultData={defaultData}/>
		</DashboardPage>
	);
}
