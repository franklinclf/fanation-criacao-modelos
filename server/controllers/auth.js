'use server'
import { generateToken, verifyToken } from '../utils/jwt';
import { comparePassword } from '../utils/bcrypt';
import { findUserByUsername } from './users';
import { serialize } from 'cookie';
import cookie from 'cookie';

export async function login(username, password, res) {
    if(!username || !password) {
        return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
    }
    
    const user = await findUserByUsername(username);

    if(!user) {
        return res.status(400).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if(!passwordMatch) {
        return res.status(400).json({ success: false, message: 'Senha incorreta.' });
    }

    const token = await generateToken({ username: user.username });

    res.setHeader('Set-Cookie', serialize('token', token, {
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/'
    }));

    return res.status(200).json({ success: true, user: { username: user.username }});
}

export async function logout(res) {
    return res.setHeader('Set-Cookie', serialize('token', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      })).json({ success: true });
}

export async function verify(req, res) {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({ success: false, message: 'Não autenticado.' });
    }

    const {username} = await verifyToken(token);
    

    if(!username) {
        return res.status(401).json({ success: false, message: 'Não autenticado.' });
    }
    
    const user = await findUserByUsername(username);

    return res.status(200).json({ success: true, user: { username: user.username } });
}