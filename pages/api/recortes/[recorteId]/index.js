import { deleteRecorte } from "../../../../server/controllers/recortes";
export default async function handler(req, res) {
    if (req.method === "DELETE") { 
        const { recorteId } = req.query;
        
        return deleteRecorte(parseInt(recorteId), res);
    } else {
        res.status(405).json({ message: "Método não permitido." });
    }
}