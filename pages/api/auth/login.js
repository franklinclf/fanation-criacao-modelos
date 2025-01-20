import { login } from "../../../server/controllers/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    return login(username, password, res);
  } else {
    return res.status(405).json({ message: "Método não permitido." });
  }
}
