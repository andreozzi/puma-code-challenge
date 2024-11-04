
const userRepository = require('../repository/userRepository');

describe('User Repository', () => {
    afterEach(() => {
        
        userRepository.removeUser('user1'); 
        userRepository.removeUser('user2'); 
        userRepository.removeUser('user3'); 
        userRepository.removeUser('user4'); 
        userRepository.removeUser('user5'); 
    });

    describe('listUsers', () => {
        it('deve retornar a lista de usuários ordenada pelo nome', () => {
            userRepository.addUser({ username: 'user3', nome: 'Charlie' });
            userRepository.addUser({ username: 'user1', nome: 'Alice' });
            userRepository.addUser({ username: 'user2', nome: 'Bob' });

            const users = userRepository.listUsers();

            expect(users).toEqual([
                { username: 'user1', nome: 'Alice', starred: false },
                { username: 'user2', nome: 'Bob', starred: false },
                { username: 'user3', nome: 'Charlie', starred: false }
            ]);
        });
    });

    describe('getUsers', () => {
        it('deve retornar todos os usuários', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });
            userRepository.addUser({ username: 'user2', nome: 'Bob' });

            const users = userRepository.getUsers();

            expect(users).toEqual([
                { username: 'user1', nome: 'Alice', starred: false },
                { username: 'user2', nome: 'Bob', starred: false }
            ]);
        });
    });

    describe('addUser', () => {
        it('deve adicionar um usuário com sucesso', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });

            const users = userRepository.getUsers();

            expect(users).toEqual([
                { username: 'user1', nome: 'Alice', starred: false }
            ]);
        });

        it('deve lançar um erro se tentar adicionar um usuário já existente', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });

            expect(() => {
                userRepository.addUser({ username: 'user1', nome: 'Alice' });
            }).toThrowError("Usuário já está na lista de favoritos.");
        });

        it('deve lançar um erro se o número máximo de usuários for atingido', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });
            userRepository.addUser({ username: 'user2', nome: 'Bob' });
            userRepository.addUser({ username: 'user3', nome: 'Charlie' });
            userRepository.addUser({ username: 'user4', nome: 'David' });
            userRepository.addUser({ username: 'user5', nome: 'Eve' });

            expect(() => {
                userRepository.addUser({ username: 'user6', nome: 'Frank' });
            }).toThrowError("A lista de favoritos já possui o número máximo de 5 usuários.");
        });
    });

    describe('removeUser', () => {
        it('deve remover um usuário com sucesso', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });
            userRepository.addUser({ username: 'user2', nome: 'Bob' });

            userRepository.removeUser('user1');

            const users = userRepository.getUsers();
            expect(users).toEqual([
                { username: 'user2', nome: 'Bob', starred: false }
            ]);
        });
    });

    describe('toggleStar', () => {
        it('deve alternar a estrela de um usuário', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });
            userRepository.addUser({ username: 'user2', nome: 'Bob' });

            userRepository.toggleStar('user1');

            const users = userRepository.getUsers();
            expect(users).toEqual([
                { username: 'user1', nome: 'Alice', starred: true },
                { username: 'user2', nome: 'Bob', starred: false }
            ]);
        });

        it('deve desmarcar a estrela de todos os outros usuários', () => {
            userRepository.addUser({ username: 'user1', nome: 'Alice' });
            userRepository.addUser({ username: 'user2', nome: 'Bob' });
            userRepository.toggleStar('user1');

            userRepository.toggleStar('user2');

            const users = userRepository.getUsers();
            expect(users).toEqual([
                { username: 'user1', nome: 'Alice', starred: false },
                { username: 'user2', nome: 'Bob', starred: true }
            ]);
        });
    });
});
