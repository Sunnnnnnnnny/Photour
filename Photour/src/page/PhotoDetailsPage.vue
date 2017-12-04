<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <photo-details v-if="this.currentPhoto" :currentPhoto="this.currentPhoto">

        </photo-details>
      </div>
    </layout>
  </div>
</template>

<script>
  import Layout from '../components/Layout/Layout'
  import PhotoDetails from '../components/PhotoDetails/PhotoDetails'
  import {router, store} from '../main'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'photo-details-page',
    components: {
      Layout,
      PhotoDetails,
    },
    data() {
      return {}
    },
    created() {
      console.log('create', this.currentPhoto)
      this.savePhotoUrl({
        photoUrl: this.$route.params.photoId
      })
    },
    computed: {
      ...mapState('photos', {
        currentPhoto: state => state.currentPhoto
      })
    },
    methods: {
      ...mapMutations('photoDetails', [
        'savePhotoUrl'
      ]),
      beforeRouteEnter(to, from, next) {
        store.dispatch('auth/refreshUser', {
          onSuccess: () => {
          }
        })
        next(true)
      }
    }
  }
</script>

<style scoped src="./PhotoDetailsPage.css"></style>




