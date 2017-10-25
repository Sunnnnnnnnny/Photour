<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <account-info></account-info>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import AccountInfo from '../components/Account/AccountInfo.vue'
  import {router, store} from '../main'
  import {mapMutations} from 'vuex'

  export default {
    name: 'account-page',
    components: {
      Layout,
      AccountInfo
    },
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
  //    beforeRouteEnter(to, from, next) {
  //      console.log("!!!!!!!!!!!" + to.params.photoId)
  //    },

</script>

<style scoped src="./AccountPage.css"></style>
