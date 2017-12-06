<template>

  <div class="events-wrapper">
    <p v-if="this.events.length===0" class="empty-events">暂时没有动态哦～</p>
    <single-event v-else v-for="item in events"
                  :currentEvent="item"></single-event>
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
    props: ['events'],
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./MyEvents.css"></style>
