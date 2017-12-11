<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">

        <div v-if="this.user && this.user.type === 'admin'">
          <admin-welcome :admin="this.user"></admin-welcome>
        </div>

        <div v-else>
          <welcome></welcome>

          <!--<p v-if="this.user && this.user.type === 'user'">我是用户</p>-->
          <!--<p v-if="this.user && this.user.type === 'admin'">我是管理员</p>-->

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
                <my-events :events="events"></my-events>
              </el-tab-pane>
            </el-tabs>
          </div>
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
  import MyEvents from '../components/UserHome/MyEvents'
  import AdminWelcome from '../components/Admin/AdminWelcome'
  import {mapState, mapActions} from 'vuex'
  import {store} from '../main'
  import {Tabs, TabPane, Message} from 'element-ui'

  export default {
    name: 'photo-square-page',
    components: {
      Layout,
      Welcome,
      PhotoUpload,
      PhotoWall,
      MyEvents,
      AdminWelcome,
      Message,
      elTabs: Tabs,
      elTabPane: TabPane
    },
    data() {
      return {
        msg: '你的图片旅行',
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
      ...mapState('photos', {
        photos: state => state.photos.photos
      }),
      ...mapState('event', {
        events: state => state.events
      })
    },
    methods: {
      ...mapActions('photos', [
        'fetchPhotos'
      ]),
      ...mapActions('auth', [
        'refreshUser'
      ])
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('auth/refreshUser', {
        onSuccess: () => {
          store.dispatch('photos/fetchPhotos')
          store.dispatch('event/fetchAllEvents')
        },
        onError: (error) => {
          Message.error(error)
          store.dispatch('photos/fetchPhotos')
          store.dispatch('event/fetchAllEvents')
        }
      })
      next(true)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./PhotoSquarePage.css"></style>
