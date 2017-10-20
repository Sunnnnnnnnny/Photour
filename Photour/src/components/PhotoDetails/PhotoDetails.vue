<template>
  <div class="photo-details-wrapper">
    <div class="photo-wrapper">
      <!--:style="{ backgroundImage: 'url(' + temp + ')' }"-->
      <img :src=photoUrl />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'photo-details',
    components: {},
    data() {
      return {
//        photoUrl: ''
      }
    },
//    props: ['photoUrl'],
    computed: {
      ...mapState ({
        photoUrl: state => state.photoDetails.photoUrl
      })
    },
    methods: {},
  }
</script>

<style scoped src="./PhotoDetails.css"></style>

