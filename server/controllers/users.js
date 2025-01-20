import { prisma } from "@/prisma/client";
import {hashPassword} from "../utils/bcrypt";

export async function signup(username, password, res) {
    if(!username || !password) {
        return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
    }

    const user = await findUserByUsername(username);

    if(user) {
        return res.status(400).json({ success: false, message: 'Usuário já existe.' });
    }

    const encodedPassword = await hashPassword(password);

    const newUser = await createUser(username, encodedPassword);

    return res.status(200).json({ success: true, message: 'Usuário criado com sucesso.', user: { username: newUser.username }});
}

export async function getUsers(res) {
    const users = await prisma.usuarios.findMany({
        select: {
            username: true
        }
    });

    return res.status(200).json({ success: true, users: users });
}

export async function getUser(username, res) {
    const user = await findUserByUsername(username);

    if(!user) {
        return res.status(400).json({ success: false, message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ success: true, user: { username: user.username } });
}

export async function findUserByUsername(username) {
    const user = await prisma.Usuario.findUnique({
        where: {
            username: username
        }
    });

    if(!user) {
        return null;
    }

    return user;
}

export async function createUser(username, password) {
    const user = prisma.Usuario.create({
        data: {
            username: username,
            password: password
        }
    });

    return user;
}

export async function deleteUser(username, res) {
    const user = await getUser(username, res);

    await prisma.Usuario.delete({
        where: {
            username: username
        }
    });

    return res.status(200).json({ success: true, message: 'Usuário deletado com sucesso.' });
}