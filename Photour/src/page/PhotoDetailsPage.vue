<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">

        <div v-if="this.user && this.user.type === 'admin'">
          <admin-welcome :admin="this.user"></admin-welcome>
        </div>

        <div v-else>
          <photo-details v-if="this.currentPhoto" :currentPhoto="this.currentPhoto">
          </photo-details>
        </div>
      </div>
    </layout>
  </div>
</template>
-
<script>
  import Layout from '../components/Layout/Layout'
  import PhotoDetails from '../components/PhotoDetails/PhotoDetails'
  import AdminWelcome from '../components/Admin/AdminWelcome'
  import {router, store} from '../main'
  import {mapMutations, mapState, mapActions} from 'vuex'

  export default {
    name: 'photo-details-page',
    components: {
      Layout,
      PhotoDetails,
      AdminWelcome
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
      store.dispatch('auth/refreshUser', {
        onSuccess: () => {
        }
      })
      next(true)
    }
  }
</script>

<style scoped src="./PhotoDetailsPage.css"></style>




