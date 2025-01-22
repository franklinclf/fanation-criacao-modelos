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

export async function getRecorteSpecs() {
    const tiposRecorte = await prisma.TipoRecorte.findMany().then(data => data.map(item => item.tipo));
    const tiposProduto = await prisma.TipoProduto.findMany().then(data => data.map(item => item.tipo));
    const posicoes = await prisma.PosicaoRecorte.findMany().then(data => data.map(item => item.posicao));
    const cores = await prisma.CorRecorte.findMany().then(data => data.map(item => item.cor));
    const materiais = await prisma.MaterialRecorte.findMany().then(data => data.map(item => item.material));
    
    return { tiposRecorte, tiposProduto, posicoes, cores, materiais };
}