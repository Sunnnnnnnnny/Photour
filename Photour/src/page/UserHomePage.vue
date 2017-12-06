<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <user-home v-if="this.user" :user=this.user></user-home>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import UserHome from '../components/UserHome/UserHome'
  import {router, store} from '../main'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'user-home-page',
    components: {
      Layout,
      UserHome
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
    },
    methods: {},
    beforeRouteEnter(to, from, next) {
      store.dispatch('auth/refreshUser', {
        onSuccess: () => {

        }
      })
      next(true)
    }
  }
</script>

<style scoped></style>
