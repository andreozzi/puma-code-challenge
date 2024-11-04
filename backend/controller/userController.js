const axios = require('axios');
const userRepository = require('../repository/userRepository');

function listUsers(req, res) {
    try {
        const users = userRepository.getUsers();
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addUser(req, res) {
    console.log('Requisição recebida:', req.body);
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ error: "Campo obrigatório, por favor preencha o campo usuario!" });
    }

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { login, name, avatar_url, html_url } = response.data;

        const user = {username: login, nome: name, avatar: avatar_url, url: html_url}
        userRepository.addUser(user);
        console.log(`O usuario ${user.username} foi adicionado a lista`)
        res.status(201).json(user);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: "Usuário não encontrado no GitHub." });
        } else {
            res.status(500).json({ error: "Erro ao adicionar usuário." });
        }
    }
}


function removeUser(req, res) {
    const { username } = req.params;

    try {
        userRepository.removeUser(username);
        res.json({ message: "Usuário removido dos favoritos." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


function toggleStar(req, res) {
    const { username } = req.params;

    try {
        userRepository.toggleStar(username);
        res.json({ message: "Estrela alternada com sucesso." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listUsers,
    addUser,
    removeUser,
    toggleStar
};
