<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <photo-details>

        </photo-details>
      </div>
    </layout>
  </div>
</template>

<script>
  import Layout from '../components/Layout/Layout'
  import PhotoDetails from '../components/PhotoDetails/PhotoDetails'
  import {router, store} from '../main'
  import {mapMutations} from 'vuex'

  export default {
    name: 'photo-details-page',
    components: {
      Layout,
      PhotoDetails
    },
    data() {
      return {}
    },
    created() {
      this.savePhotoUrl({
        photoUrl: this.$route.params.photoId
      })
    },
    computed: {},
    methods: {
      ...mapMutations('photoDetails', [
        'savePhotoUrl'
      ])
    },
  }
</script>

<style scoped src="./PhotoDetailsPage.css"></style>




