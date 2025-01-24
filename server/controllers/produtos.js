import { prisma } from "@/prisma/client";
import { findUserByUsername } from "./users";
import { getRecortesByList } from "./recortes";

export async function novoProduto(produtoData, res) {
    const user = await findUserByUsername(produtoData.user, res);
    
    const recortes = await getRecortesByList(produtoData.recortes, user.id, res);
    
    const produto = await prisma.Produto.create({
        data: {
            nome: produtoData.nome,
            descricao: produtoData.descricao,
            recortes: {
                connect: produtoData.recortes.map(recorte => ({ id: recorte.id }))
            }
        }
    });

    return res.status(201).json({ success: true, produto });
}