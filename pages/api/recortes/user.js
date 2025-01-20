import { getRecortesByUser } from "@/server/controllers/recortes";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { user } = req.user;
    return getRecortesByUser(res);
  } else {
    res.status(405).json({ message: "Método não permitido." });
  }
}
