
let favoriteUsers = [];

function listUsers() {
    return favoriteUsers.sort((a, b) => a.nome.localeCompare(b.nome));
}
function getUsers() {
    return favoriteUsers;
}

function addUser(user) {
    if (favoriteUsers.length >= 5) {
        throw new Error("A lista de favoritos já possui o número máximo de 5 usuários.");
    }

    if (favoriteUsers.find(u => u.username === user.username)) {
        throw new Error("Usuário já está na lista de favoritos.");
    }

    favoriteUsers.push({ ...user, starred: false });
}

function removeUser(username) {
    favoriteUsers = favoriteUsers.filter(user => user.username !== username);
}

function toggleStar(username) {
    favoriteUsers = favoriteUsers.map(user => {
        if (user.username === username) {
            user.starred = !user.starred;
        } else {
            user.starred = false;
        }
        return user;
    });
}

module.exports = {
    getUsers,
    listUsers,
    addUser,
    removeUser,
    toggleStar
};
