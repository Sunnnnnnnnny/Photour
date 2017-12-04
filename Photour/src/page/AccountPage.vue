<template>
  <div v-if="this.user" class="body-wrapper">
    <layout>
      <div class="container">
        <account-info :user="this.user"></account-info>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import AccountInfo from '../components/Account/AccountInfo.vue'
  import {Message} from 'element-ui'
  import {router, store} from '../main'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'account-page',
    components: {
      Layout,
      AccountInfo
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
