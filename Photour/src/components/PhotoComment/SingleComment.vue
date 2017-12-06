<template>

  <div class="single-comment-wrapper">
    <div class="top-wrapper">
      <div class="user">
        <img src="../../assets/img/user.png" width="20"/>
        <span>tiann</span>
      </div>

      <div class="time">
        <span>{{this.comment.create_at}}</span>
      </div>
    </div>

    <div class="content-wrapper">
      {{this.comment.content}}
    </div>

  </div>


</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store, router} from '../../main'

  export default {
    name: 'single-comment',
    components: {},
    data() {
      return {
        photoUrl: 'https://images.unsplash.com/photo-1498248193836-88f8c8d70a3f?w=2091'
      }
    },
    props: ['comment'],
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./SingleComment.css"></style>
