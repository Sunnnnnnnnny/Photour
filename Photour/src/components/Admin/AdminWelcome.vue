<template>
  <div class="admin-welcome-wrapper">

    <h1>Hello, {{this.admin.username}}</h1>

    <button @click="goToUserAdmin">管理用户</button>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {router} from '../../main'

  export default {
    name: 'admin-welcome',
    components: {},
    props: ['admin'],
    data() {
      return {}
    },
    methods: {
      goToUserAdmin() {
        router.push({name: 'UserAdminPage'})
      }
    }
  }
</script>

<style scoped src="./AdminWelcome.css"></style>
