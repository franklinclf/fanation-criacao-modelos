import { prisma } from "@/prisma/client";

export async function getRecortesByUser(username, res) {
    const recortes = await prisma.recorte.findMany({
        where: {
            user: {
                username
            }
        }
    });

    return res.status(200).json({ success: true, recortes: recortes });
}