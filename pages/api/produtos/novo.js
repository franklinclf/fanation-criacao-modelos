import { novoProduto } from "@/server/controllers/produtos";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const produtoData = req.body;

        return novoProduto(produtoData, res)
    } else {
        res.status(405).json({ message: "Método não permitido." });
    }
}