<template>

  <div class="fans-wrapper">
    <user-icon v-for="item in this.fans" :currentFollow="item"></user-icon>
  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'
  import UserIcon from '../../components/Util/UserIcon'

  export default {
    name: 'my-fans',
    components: {
      UserIcon
    },
    data() {
      return {}
    },
    props: ['fans'],
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./MyFans.css"></style>
