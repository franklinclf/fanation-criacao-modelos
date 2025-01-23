import { logout } from "@/server/controllers/auth";

export default async function handler(req, res) {
	if (req.method === "POST") {
		return logout(res);
	} else {
		return res.status(405).json({ message: "Método não permitido." });
	}
}
