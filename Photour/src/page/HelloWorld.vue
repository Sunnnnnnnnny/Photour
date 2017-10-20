<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <welcome></welcome>
        <photo-wall :photos="photos"></photo-wall>
      </div>
    </layout>
  </div>
</template>

<script>
  import Layout from '../components/Layout/Layout'
  import Welcome from '../components/Welcome/Welcome'
  import PhotoWall from '../components/PhotoWall/PhotoWall'
  import { mapState, mapActions } from 'vuex'
  import { store } from '../main'

  export default {
    name: 'HelloWorld',
    components: {
      Layout,
      Welcome,
      PhotoWall
    },
    data() {
      return {
        msg: '你的图片旅行'
      }
    },
    computed: {
      ...mapState ({
        photos: state => state.photos.photos
      })
    },
    methods: {
      ...mapActions ([
        'fetchPhotos'
      ]),
    },
    beforeRouteEnter (to, from, next) {
      console.log('before');
      store.dispatch('fetchPhotos')
      next(true)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
