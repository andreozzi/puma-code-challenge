const axios = require('axios');
const userRepository = require('../repository/userRepository');
const userController = require('../controller/userController');

jest.mock('axios');
jest.mock('../repository/userRepository');

describe('User Controller', () => {
    describe('listUsers', () => {
        it('deve retornar a lista de usuários', () => {
            const req = {};
            const res = {
                json: jest.fn()
            };

            const users = [{ username: 'user1' }, { username: 'user2' }];
            userRepository.getUsers.mockReturnValue(users);

            userController.listUsers(req, res);

            expect(res.json).toHaveBeenCalledWith(users);
        });

        it('deve retornar um erro 500 em caso de falha', () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            userRepository.getUsers.mockImplementation(() => {
                throw new Error('Erro ao buscar usuários');
            });

            userController.listUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar usuários' });
        });
    });

    describe('addUser', () => {
        it('deve adicionar um usuário com sucesso', async () => {
            const req = {
                body: {},
                params: { username: 'andreozzi' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockUserData = { login: 'andreozzi', name: 'andreozzi', avatar_url: 'https://avatars.githubusercontent.com/u/109042789?v=4', html_url: 'https://api.github.com/users/andreozzi' };
            axios.get.mockResolvedValue({ data: mockUserData });

            await userController.addUser(req, res);

            expect(userRepository.addUser).toHaveBeenCalledWith({
                username: 'andreozzi',
                nome: 'andreozzi',
                avatar: 'https://avatars.githubusercontent.com/u/109042789?v=4',
                url: 'https://api.github.com/users/andreozzi'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                username: 'andreozzi',
                nome: 'andreozzi',
                avatar: 'https://avatars.githubusercontent.com/u/109042789?v=4',
                url: 'https://api.github.com/users/andreozzi'
            });
        });

        it('deve retornar erro 400 se o campo username não for fornecido', async () => {
            const req = {
                body: {},
                params: { username: '' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await userController.addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Campo obrigatório, por favor preencha o campo usuario!" });
        });

        it('deve retornar erro 404 se o usuário não for encontrado no GitHub', async () => {
            const req = {
                body: {},
                params: { username: 'dfdfadfdgad' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            axios.get.mockRejectedValue({ response: { status: 404 } });

            await userController.addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado no GitHub." });
        });

        it('deve retornar erro 500 em caso de falha ao adicionar usuário', async () => {
            const req = {
                body: {},
                params: { username: 'octocat' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            axios.get.mockRejectedValue(new Error('Erro ao acessar API'));

            await userController.addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao adicionar usuário." });
        });
    });

    describe('removeUser', () => {
        it('deve remover um usuário com sucesso', () => {
            const req = {
                params: { username: 'user1' }
            };
            const res = {
                json: jest.fn()
            };

            userController.removeUser(req, res);

            expect(userRepository.removeUser).toHaveBeenCalledWith('user1');
            expect(res.json).toHaveBeenCalledWith({ message: "Usuário removido dos favoritos." });
        });

        it('deve retornar erro 500 em caso de falha', () => {
            const req = {
                params: { username: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            userRepository.removeUser.mockImplementation(() => {
                throw new Error('Erro ao remover usuário');
            });

            userController.removeUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao remover usuário' });
        });
    });

    describe('toggleStar', () => {
        it('deve alternar a estrela de um usuário com sucesso', () => {
            const req = {
                params: { username: 'user1' }
            };
            const res = {
                json: jest.fn()
            };

            userController.toggleStar(req, res);

            expect(userRepository.toggleStar).toHaveBeenCalledWith('user1');
            expect(res.json).toHaveBeenCalledWith({ message: "Estrela alternada com sucesso." });
        });

        it('deve retornar erro 500 em caso de falha', () => {
            const req = {
                params: { username: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            userRepository.toggleStar.mockImplementation(() => {
                throw new Error('Erro ao alternar estrela');
            });

            userController.toggleStar(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao alternar estrela' });
        });
    });
});
