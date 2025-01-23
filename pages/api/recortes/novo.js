import { novoRecorte } from "@/server/controllers/recortes";

export default async function handler(req, res) {
    if(req.method === "POST"){
        const recorteData = req.body;
        
        return novoRecorte(recorteData, res)
    }
    else {
        res.status(405).json({message: "Método não permitido."});
    }
}