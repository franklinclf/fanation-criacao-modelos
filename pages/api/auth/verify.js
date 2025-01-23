import { verify } from "@/server/controllers/auth";

export default async function handler(req, res) {
	if (req.method === "GET") {
		return verify(req, res);
	} else {
		return res.status(405).json({ message: "Método não permitido." });
	}
}
