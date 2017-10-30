<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <user-home></user-home>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import UserHome from '../components/UserHome/UserHome'
  import {router, store} from '../main'
  import {mapMutations} from 'vuex'

  export default {
    name: 'user-home-page',
    components: {
      Layout,
      UserHome
    },
    data() {
      return {}
    },
    computed: {},
    methods: {},
    beforeRouteEnter(to, from, next) {
      console.log('before');
      store.dispatch('fetchFavourites');
      next(true);
    }
  }
</script>

<style scoped></style>
