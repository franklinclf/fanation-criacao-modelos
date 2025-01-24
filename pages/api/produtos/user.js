import { getProdutosByUser } from "@/server/controllers/produtos";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { user } = req.query;

		return getProdutosByUser(user, res);
	} else {
		res.status(405).json({ message: "Método não permitido." });
	}
}
