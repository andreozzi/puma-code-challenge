<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <UserCard
        v-for="user in users"
        :key="user.username"
        :user="user"
        @remove="handleRemove(user.username)"
        @toggleStar="handleToggleStar(user.username)"
      />
    </div>
  </template>
  
  <script>
  import UserCard from './UserCard.vue';
  
  export default {
    components: { UserCard },
    props: {
      users: { type: Array, required: true },
    },
    methods: {
      handleRemove(username) {
        this.$emit('remove', username);
      },
      handleToggleStar(username) {
        this.$emit('toggleStar', username);
      },
    },
  };
  </script>