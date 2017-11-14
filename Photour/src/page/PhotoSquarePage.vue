<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <welcome></welcome>
        <photo-upload></photo-upload>

        <div class="content-wrapper">
          <el-tabs>
            <el-tab-pane>
              <span slot="label">
                <img src="../assets/img/album.png" width="20"/>
                照片广场
              </span>
              <photo-wall :photos="photos" style="padding-top: 0"></photo-wall>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">
                <img src="../assets/img/events.png" width="20"/>
                关注动态
              </span>


            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </layout>
  </div>
</template>

<script>
  import Layout from '../components/Layout/Layout'
  import Welcome from '../components/Welcome/Welcome'
  import PhotoUpload from '../components/PhotoUpload/PhotoUpload'
  import PhotoWall from '../components/PhotoWall/PhotoWall'
  import {mapState, mapActions} from 'vuex'
  import {store} from '../main'
  import {Tabs, TabPane} from 'element-ui'

  export default {
    name: 'photo-square-page',
    components: {
      Layout,
      Welcome,
      PhotoUpload,
      PhotoWall,
      elTabs: Tabs,
      elTabPane: TabPane
    },
    data() {
      return {
        msg: '你的图片旅行',
      }
    },
    computed: {
      // TODO
      ...mapState({
        photos: state => state.photos.photos
      })
    },
    methods: {
      // TODO
      ...mapActions('', [
        'fetchPhotos'
      ]),
      ...mapActions('auth', [
        'refreshUser'
      ])
    },
    created() {
      this.refreshUser({
          onSuccess: () => {
            this.fetchPhotos()
          }
        }
      )
    },
    beforeRouteEnter(to, from, next) {
      console.log('before');
//      store.dispatch('fetchPhotos')
      next(true)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./PhotoSquarePage.css"></style>
