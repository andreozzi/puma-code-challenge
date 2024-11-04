<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-8">
    <h1 class="text-2xl font-bold mb-4">Favoritos do GitHub</h1>
    
    
    <div class="flex mb-6">
      <input 
        v-model="username" 
        type="text" 
        placeholder="Digite o username do GitHub" 
        class="p-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button 
        @click="addUser" 
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600">
        Adicionar
      </button>
    </div>

    
    <button 
      @click="toggleOrder"
      class="mb-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-900">
      {{ isAlphabetical ? "Ordem Aleatória" : "Ordem Alfabética" }}
    </button>

    
    <UserList 
      :users="displayedUsers" 
      @remove="removeUser" 
      @toggleStar="toggleStar"
    />
  </div>
</template>

<script>
import UserList from './components/UserList.vue';
import axios from './utils/axios';

export default {
  components: { UserList },
  data() {
    return {
      username: '', 
      users: [], 
      isAlphabetical: false, 
    };
  },
  computed: {
    displayedUsers() {
      
      return this.isAlphabetical 
        ? [...this.users].sort((a, b) => a.nome.localeCompare(b.nome)) 
        : this.users;
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/favoriteUser');
        this.users = response.data.users; 
      } catch (error) {
        alert('Erro ao buscar usuários');
      }
    },
    async addUser() {
      if (!this.username) return alert("Você precisa inserir um usuário!");

      try {
        const response = await axios.post(`/favoriteUser/${this.username}`, { username: this.username });
        this.users.push(response.data);
        this.username = '';
      } catch (error) {
        if (error.response && error.response.data) {
      alert(error.response.data.error || 'Erro ao adicionar usuário');
    } else {
      alert('Erro ao adicionar usuário. Verifique o console para mais detalhes.');
      console.error(error); 
    }
      }
    },
    async removeUser(username) {
      try {
        await axios.delete(`/favoriteUser/${username}`);
        this.users = this.users.filter(user => user.username !== username);
      } catch (error) {
        alert('Erro ao remover usuário');
      }
    },
    async toggleStar(username) {
      try {
        await axios.patch(`/favoriteUser/${username}/toggle-star`);
        this.users = this.users.map(user => {
          if (user.username === username) user.starred = !user.starred;
          else user.starred = false;
          return user;
        });
      } catch (error) {
        alert('Erro ao alternar estrela');
      }
    },
    toggleOrder() {
      this.isAlphabetical = !this.isAlphabetical;
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>