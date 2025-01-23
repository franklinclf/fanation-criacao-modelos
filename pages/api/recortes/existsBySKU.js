import { existsBySKU } from "@/server/controllers/recortes";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { SKU } = req.query;
        return existsBySKU(SKU, res);
    } else {
        res.status(405).json({ message: "Método não permitido." });
    }
}
