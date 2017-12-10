<template>

  <div class="following-wrapper">
    <el-row :gutter="25">
      <user-icon v-for="item in followings" :users="item"></user-icon>
    </el-row>
  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'
  import UserIcon from '../../components/Util/UserIcon'
  import {Row} from 'element-ui'

  export default {
    name: 'my-following',
    components: {
      UserIcon,
      elRow: Row
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
