<template>

  <div class="search-result-wrapper">

    <div class="key-wrapper">
      <h1>"{{this.searchInput}}" <span>  搜索结果</span></h1>
    </div>

    <button class="back-button" @click="goBack"><< 返回</button>
    <el-tabs>
      <el-tab-pane>
        <span slot="label">
          <img src="../../assets/img/album.png" width="20"/>
          照片
        </span>
        <photo-wall v-if="searchResult.photos.length !== 0" :photos="searchResult.photos"
                    style="padding-top: 0"></photo-wall>
        <p v-else class="empty-result">暂无搜索结果，换个关键词试试～</p>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <img src="../../assets/img/users.png" width="18"/>
          用户
        </span>
        <p v-if="searchResult.users.length === 0" class="empty-result">暂无搜索结果，换个关键词试试～</p>
        <el-row v-else :gutter="25">
          <user-icon v-for="item in searchResult.users"
                     :users="item"></user-icon>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <img src="../../assets/img/events.png" width="20"/>
          动态
        </span>
        <my-events v-if="searchResult.events.length !== 0" :events="searchResult.events"></my-events>
        <p v-else class="empty-result">暂无搜索结果，换个关键词试试～</p>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store, router} from '../../main'
  import {Tabs, TabPane, Message, Row} from 'element-ui'
  import PhotoWall from '../PhotoWall/PhotoWall'
  import UserIcon from '../Util/UserIcon'
  import MyEvents from '../UserHome/MyEvents'

  export default {
    name: 'search-result',
    components: {
      PhotoWall,
      UserIcon,
      MyEvents,
      Message,
      elTabs: Tabs,
      elTabPane: TabPane,
      elRow: Row
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
      ...mapState('search', {
        searchResult: state => state.searchResults,
        searchInput: state => state.searchInput
      })
    },
    methods: {
      goBack() {
        router.go(-1)
      }
    },
  }

</script>

<style scoped src="./SearchResult.css"></style>
