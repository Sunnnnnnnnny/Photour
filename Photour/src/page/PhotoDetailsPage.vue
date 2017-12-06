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
  import {mapMutations, mapState, mapActions} from 'vuex'

  export default {
    name: 'photo-details-page',
    components: {
      Layout,
      PhotoDetails,
    },
    data() {
      let photoUrl = this.$route.params.photoId
      return {}
    },
    created() {
      this.fetchPhotoByUrl({
        photoInfo: {
          photoUrl: this.$route.params.photoId
        }
      })
      this.savePhotoUrl({
        photoUrl: this.$route.params.photoId
      })
    },
    computed: {
      ...mapState('photos', {
        currentPhoto: state => state.currentPhoto
      }),
      ...mapState('auth', {
        user: state => state.user
      })
    },
    methods: {
      ...mapMutations('photoDetails', [
        'savePhotoUrl'
      ]),
      ...mapActions('photos', [
        'fetchPhotoByUrl'
      ]),
    },
    beforeRouteEnter(to, from, next) {
      console.log('before')
      store.dispatch('auth/refreshUser', {
        onSuccess: () => {
          console.log('success')
        }
      })
      next(true)
    }
  }
</script>

<style scoped src="./PhotoDetailsPage.css"></style>




