<template>
  <div v-if="this.users" class="user-admin-wrapper">

    <el-row :gutter="25">
      <single-user-admin v-for="item in users" :users="item"></single-user-admin>
    </el-row>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {Row} from 'element-ui'
  import SingleUserAdmin from './SingleUserAdmin'

  export default {
    name: 'user-admin',
    components: {
      elRow: Row,
      SingleUserAdmin
    },
    data() {
      return {}
    },
    props: ['users'],
    methods: {}
  }
</script>

<style scoped src="./UserAdmin.css"></style>
