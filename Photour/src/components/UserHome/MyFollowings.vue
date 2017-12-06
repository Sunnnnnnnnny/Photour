<template>

  <div class="following-wrapper">
    <user-icon v-for="item in followings" :currentFollow="item"></user-icon>
  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'
  import UserIcon from '../../components/Util/UserIcon'

  export default {
    name: 'my-following',
    components: {
      UserIcon
    },
    data() {
      return {}
    },
    props: ['followings'],
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./MyFollowings.css"></style>
