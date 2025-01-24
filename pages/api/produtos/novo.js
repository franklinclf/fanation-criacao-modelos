import { novoProduto } from "@/server/controllers/produtos";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {produto, user} = req.body;

        return novoProduto(produto, user, res)
    } else {
        res.status(405).json({ message: "Método não permitido." });
    }
}