<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <search-result v-if="searchResult"></search-result>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/Layout/Layout'
  import SearchResult from '../components/SearchResult/SearchResult'
  import {router, store} from '../main'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'search-result-page',
    components: {
      Layout,
      SearchResult
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
      ...mapState('search', {
        searchResult: state => state.searchResults
      })
    },
    methods: {},
    beforeRouteEnter(to, from, next) {
      store.dispatch('auth/refreshUser', {
        onSuccess: () => {

        }
      })
      next(true)
    }
  }
</script>

<style scoped></style>
