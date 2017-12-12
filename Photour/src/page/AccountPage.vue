<template>
  <div v-if="this.user" class="body-wrapper">
    <layout>
      <div class="container">
        <div v-if="this.user && this.user.type === 'admin'">
          <admin-welcome :admin="this.user"></admin-welcome>
        </div>

        <account-info v-else :user="this.user"></account-info>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import AccountInfo from '../components/Account/AccountInfo.vue'
  import AdminWelcome from '../components/Admin/AdminWelcome'
  import {Message} from 'element-ui'
  import {router, store} from '../main'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'account-page',
    components: {
      Layout,
      AccountInfo,
      AdminWelcome
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    methods: {},
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
