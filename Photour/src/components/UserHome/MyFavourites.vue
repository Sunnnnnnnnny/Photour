<template>

  <div>

    <!--<div class="warning" v-if="favourites.length===0">-->
      <!--<p>暂时没有喜欢的照片，去广场看看</p>-->
    <!--</div>-->

    <photo-wall :photos="favourites"></photo-wall>
  </div>

</template>

<script>
  import PhotoWall from '../../components/PhotoWall/PhotoWall'
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'my-favourites',
    components: {
      PhotoWall
    },
    data() {
      return {}
    },
    props: ['favourites'],
    computed: {
//      ...mapState('photos', {
//        favourites: state => state.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./MyFavourites.css"></style>
