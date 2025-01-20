import { signup } from "@/server/controllers/users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    
    return signup(username, password, res);
  } else {
    res.status(405).json({ message: "Método não permitido." });
  }
}
