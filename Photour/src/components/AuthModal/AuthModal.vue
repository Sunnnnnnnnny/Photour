<template>
  <modal
    name="sign-in"
    :height="550"
    :width="800"
    :clickToClose="false">
    <div class="sign-in-box-wrapper">
      <div class="left-wrapper">
        <el-button
          type="primary"
          icon="close"
          @click="closeBox"></el-button>

        <sign-in-form v-if="isSignIn"></sign-in-form>
        <sign-up-form v-else></sign-up-form>

      </div>
      <div class="img-wrapper">
        <!--<img src="../../assets/p2.png">-->


        <el-carousel
          height="550px"
          arrow="never"
          :interval="3000">
          <el-carousel-item v-for="item in photos" :key="item">
            <img :src="item" width="100%">
          </el-carousel-item>
        </el-carousel>

      </div>
    </div>
  </modal>
</template>


<script>
  import {Button, Carousel, CarouselItem} from 'element-ui'
  import SignInForm from './SignInForm.vue';
  import SignUpForm from './SignUpForm.vue';

  import {mapState} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'auth-modal',
    components: {
      elButton: Button,
      elCarousel: Carousel,
      elCarouselItem: CarouselItem,
      SignInForm,
      SignUpForm,
    },
    data() {
      return {
        activeName: 'first',
//        isSignIn: true,
        photos: [
          require('../../assets/img/p1.png'),
          require('../../assets/img/p2.png'),
          require('../../assets/img/p4.png'),
          require('../../assets/img/p3.png'),
          require('../../assets/img/p5.png')
        ],
      }
    },
    computed: {
      ...mapState('auth', {
        isSignIn: state => state.isSignIn
      })
    },
    methods: {
      closeBox() {
        this.$modal.hide('sign-in');
      },
    },
//    beforeRouteEnter (to, from, next) {
//      console.log('before')
//      store.dispatch('fetchTodos').then(next(true))
//      next(true)
//    }
  }
</script>

<style scoped src="./AuthModal.css"></style>

