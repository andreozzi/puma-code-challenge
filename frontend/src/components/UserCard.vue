<template>
    <div class="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <img 
        :src="user.avatar" 
        :alt="user.nome" 
        class="w-20 h-20 rounded-full mb-2"
      />
      <h2 class="text-lg font-semibold">{{ user.nome }}</h2>
      <p class="text-gray-600">@{{ user.username }}</p>
  
      <a 
        :href="user.url" 
        target="_blank" 
        class="text-blue-500 underline mt-2"
      >
        Ver Perfil
      </a>
  
      <div class="flex space-x-2 mt-4">
        
        <button 
          @click="$emit('toggleStar')"
          class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          {{ user.starred ? '★' : '☆' }}
        </button>
  
        
        <button 
          @click="$emit('remove')"
          class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Excluir
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: { type: Object, required: true },
    },
  };
  </script>