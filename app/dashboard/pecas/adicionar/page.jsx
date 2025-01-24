"use client";
import DashboardPage from "@/app/components/DashboardPage";
import RecorteForm from "@/app/components/RecorteForm";

export default function AdicionarRecortePage() {
	const defaultData = {
		id: null,
		user: null,
		nome: "",
		ativo: true,
		tipoProduto: "",
		tipoRecorte: "",
		posicaoRecorte: "",
		ordemExibicao: "",
		tecido: "",
		cor: "",
		SKU: "",
		chave: "___",
		urlImagem: "",
		imagem: null
	};
	return (
		<DashboardPage>
			<RecorteForm defaultData={defaultData}/>
		</DashboardPage>
	);
}
