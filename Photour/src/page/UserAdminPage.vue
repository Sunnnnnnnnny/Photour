<template>
  <div class="body-wrapper">
    <layout>
      <div v-if="this.user && this.user.type === 'admin'" class="container">
        <user-admin :users="this.allUsers"></user-admin>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import UserAdmin from '../components/Admin/UserAdmin'
  import {Message} from 'element-ui'
  import {router, store} from '../main'
  import {mapMutations, mapState, mapActions} from 'vuex'

  export default {
    name: 'user-admin-page',
    components: {
      Layout,
      UserAdmin
    },
    data() {
      return {}
    },
    created() {
      this.fetchAllUsers();
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
      ...mapState('admin', {
        allUsers: state => state.allUsers
      })
    },
    methods: {
      ...mapActions('admin', [
        'fetchAllUsers'
      ])
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('auth/refreshUser', {
        onSuccess: () => {

        },
        onError: (error) => {
          Message.error('请先登录！')
          router.push({name: 'PhotoSquarePage'})
        }
      })
      next(true)
    }
  }
</script>

<style scoped src="./AccountPage.css"></style>
