import { prisma } from "@/prisma/client";
import { findUserByUsername } from "./users";
import { deleteFile } from "@/firebase";

export async function novoRecorte(recorteData, res) {
	const usuario = await findUserByUsername(recorteData.user);
	const tipoProduto = await findTipoProduto(recorteData.tipoProduto, res);
	const tipo = await findTipoRecorte(recorteData.tipoRecorte, res);
	const posicao = await findPosicao(recorteData.posicaoRecorte, res);
	const material = await findMaterial(recorteData.tecido, res);
	const cor = await findCor(recorteData.cor, res);
	const ordemExibicao = await getOrdemExibicao(
		recorteData.ordemExibicao,
		res,
	);

	await prisma.Recorte.create({
		data: {
			nome: recorteData.nome,
			SKU: recorteData.SKU,
			chave: recorteData.chave,
			usuarioId: usuario.id,
			tipoProdutoId: tipoProduto.id,
			tipoId: tipo.id,
			posicaoId: posicao.id,
			materialId: material.id,
			corId: cor.id,
			ordemExibicaoId: ordemExibicao.id,
			urlImagem: recorteData.urlImagem,
			ativo: recorteData.ativo,
		},
	}).catch((error) => {
		return res.status(500).json({ success: false, message: error });
	});

	return res.status(201).json({ success: true, recorte: novoRecorte });
}

export async function existsBySKU(sku, res) {
	const recorte = await prisma.recorte.findUnique({
		where: {
			SKU: sku,
		},
	});
	const exists = recorte ? true : false;
	
	return res.status(200).json(exists);
}

export async function getRecortesByUser(username, res) {

	const usuario = await findUserByUsername(username, res)
	

	const recortes = await prisma.Recorte.findMany({
		where: {
			usuarioId: usuario.id
		},
		include: {
			tipoProduto: true,
			tipo: true,
			ordemExibicao: true,
			material: true,
			cor: true,
			posicao: true 
		},
		orderBy: {
			nome: 'asc'
		}
	});

	return recortes;
}

export async function getRecorteById(id, res) {
	const recorte = await prisma.Recorte.findUnique({
		where: { id: id },
		include: {
			tipoProduto: true,
			tipo: true,
			ordemExibicao: true,
			material: true,
			cor: true,
			posicao: true 
		}
	});

	if (!recorte) {
		return res
			.status(404)
			.json({ success: false, message: "Recorte não encontrado." });
	}

	return res.status(200).json(recorte);
}

export async function getRecortesByList(username, ids, res) {
	const usuario = await findUserByUsername(username, res);
	
	const recortes = await prisma.Recorte.findMany({
		where: {
			usuarioId: usuario.id,
			id: {
				in: ids,
			},
		},
		include: {
			ordemExibicao: true,
			tipoProduto: true,
		}
	});

	const recortesArray = Object.keys(recortes).map((key) => recortes[key]);
	
	return recortesArray;
}

export async function deleteRecorte(id, res) {
	const recorte = await prisma.Recorte.findUnique({
		where: { id: id },
	});

	if (!recorte) {
		return res
			.status(404)
			.json({ success: false, message: "Recorte not found" });
	}

	await prisma.Recorte.delete({
		where: { id: recorte.id },
	});

	const deletedFile = await deleteFile(recorte.urlImagem);

	return res.status(200).json({ success: true });
}

export async function getRecorteSpecs() {
	const tiposRecorte = await prisma.TipoRecorte.findMany().then((data) =>
		data.map((item) => item.value),
	);
	const tiposProduto = await prisma.TipoProduto.findMany().then((data) =>
		data.map((item) => item.value),
	);
	const posicoes = await prisma.PosicaoRecorte.findMany().then((data) =>
		data.map((item) => item.value),
	);
	const cores = await prisma.CorRecorte.findMany().then((data) =>
		data.map((item) => item.value),
	);
	const materiais = await prisma.MaterialRecorte.findMany().then((data) =>
		data.map((item) => item.value),
	);
	const ordens = await prisma.OrdemExibicao.findMany().then((data) =>
		data.map((item) => item.value),
	);

	return { tiposRecorte, tiposProduto, posicoes, cores, materiais, ordens };
}

async function getOrdemExibicao(value, res) {
	value = parseInt(value);
	const ordemExibicao = await prisma.OrdemExibicao.findUnique({
		where: { value },
	});
	if (!ordemExibicao) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid ordemExibicao value" });
	}
	return ordemExibicao;
}

async function findTipoRecorte(value, res) {
	const tipoRecorte = await prisma.TipoRecorte.findUnique({
		where: { value },
	});
	if (!tipoRecorte) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid tipoRecorte value" });
	}
	return tipoRecorte;
}

async function findPosicao(value, res) {
	const posicao = await prisma.PosicaoRecorte.findUnique({
		where: { value },
	});
	if (!posicao) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid posicao value" });
	}
	return posicao;
}

async function findTipoProduto(value, res) {
	const tipoProduto = await prisma.TipoProduto.findUnique({
		where: { value },
	});
	if (!tipoProduto) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid tipoProduto value" });
	}
	return tipoProduto;
}

async function findMaterial(value, res) {
	const material = await prisma.MaterialRecorte.findUnique({
		where: { value },
	});
	if (!material) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid material value" });
	}
	return material;
}

async function findCor(value, res) {
	const cor = await prisma.CorRecorte.findUnique({
		where: { value },
	});
	if (!cor) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid cor value" });
	}
	return cor;
}
