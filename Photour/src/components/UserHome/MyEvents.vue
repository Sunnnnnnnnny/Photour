<template>

  <div class="events-wrapper">
    <single-event v-for="item in 5"></single-event>

  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'
  import SingleEvent from '../../components/Events/SingleEvent'

  export default {
    name: 'my-events',
    components: {
      SingleEvent
    },
    data() {
      return {}
    },
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./MyEvents.css"></style>
