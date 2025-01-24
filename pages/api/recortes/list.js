import { logout } from "@/server/controllers/auth";
import { getRecortesByList } from "@/server/controllers/recortes";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { user } = req.query;
        let ids = req.query.ids || req.query['ids[]'];

        if (Array.isArray(ids)) {
            ids = ids.map(id => parseInt(id, 10));
        } else if (ids) {
            ids = [parseInt(ids, 10)];
        }

        return getRecortesByList(user, ids, res);
    } else {
        res.status(405).json({ message: "Método não permitido." });
    }
}