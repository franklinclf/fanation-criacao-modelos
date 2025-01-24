import {
	getProdutoById,
	deleteProduto,
} from "../../../../server/controllers/produtos";

export default async function handler(req, res) {
	if (req.method === "DELETE") {
		const { produtoId } = req.query;

		return deleteProduto(parseInt(produtoId), res);
	}

	if (req.method === "GET") {
		const { produtoId } = req.query;
		return getProdutoById(parseInt(produtoId), res);
	} else {
		res.status(405).json({ message: "Método não permitido." });
	}
}
