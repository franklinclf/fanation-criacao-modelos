import { prisma } from "@/prisma/client";
import { findUserByUsername } from "./users";
import { getRecortesByList } from "./recortes";

export async function novoProduto(produto, user, res) {
	const usuarioExistente = await findUserByUsername(user.username, res);

	const recortes = await getRecortesByList(
		usuarioExistente.username,
		produto.recortes,
	);

	if (!recortes) {
		return res
			.status(404)
			.json({ success: false, message: "Recortes não encontrados." });
	}

	const recortesIds = recortes.map((recorte) => ({ id: recorte.id }));

	const novoProduto = await prisma.Produto.create({
		data: {
			nome: produto.nome,
			usuario: {
				connect: { username: user.username },
			},
			recortes: {
				connect: recortesIds,
			},
		},
	});

	return res.status(201).json({ success: true, novoProduto });
}

export async function getProdutosByUser(username, res) {
	const usuario = await findUserByUsername(username, res);

	const produtos = await prisma.Produto.findMany({
		where: {
			usuarioId: usuario.id,
		},
		orderBy: {
			nome: 'asc'
		}
	});

	console.log(produtos);
	

	return produtos;
}

export async function getProdutoById(id, res) {
	const produto = await prisma.Produto.findUnique({
		where: { id: id },
		include: {
			recortes: true
		},
	});

	if (!produto) {
		return res
			.status(404)
			.json({ success: false, message: "Produto não encontrado." });
	}

	return produto;
}

export async function deleteProduto(id, res) {
	const produto = await getProdutoById(id, res);
	console.log(produto);
	
	await prisma.Produto.delete({
		where: {
			id: produto.id,
		},
	});

	return res.status(200).json({ success: true, message: "Produto deletado." });
}