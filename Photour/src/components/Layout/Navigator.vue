<template>
  <div class="nav-wrapper">
    <div class="container">
      <div class="left-wrapper">
        <img src="../../assets/img/logo.png" width="30">
      </div>

      <div class="right-wrapper">
        <div class="input-wrapper">
          <el-input class="search-input"
                    placeholder="搜索图片、作者"
                    icon="search"
                    v-model="input2"
                    :on-icon-click="handleIconClick">
          </el-input>
        </div>

        <div class="button-wrapper">
          <el-button type="text">首页</el-button>
          <el-button type="text" @click="signUp">注册</el-button>
          <el-button type="text" @click="signIn">登录</el-button>
        </div>
      </div>

      <slot></slot>
    </div>

    <sign-in></sign-in>

  </div>
</template>


<script>
  import Vue from 'vue'
  import {Input, Button} from 'element-ui'
  import AuthModal from '../AuthModal/AuthModal'

  import {mapMutations} from 'vuex'
  import { store } from '../../main'

  //  Vue.use(Input)

  export default {
    name: 'navigator',
    components: {
      elInput: Input,
      elButton: Button,
      SignIn: AuthModal
    },
    data() {
      return {
        input2: ''
      }
    },
    methods: {
      ...mapMutations([
        'goSignIn',
        'goSignUp',
      ]),
      handleIconClick(ev) {
        console.log(ev);
      },
      signIn() {
        this.$modal.show('sign-in');
        store.commit('goSignIn');
      },
      signUp() {
        this.$modal.show('sign-in');
        store.commit('goSignUp');
      }
    }
  }
</script>

<style scoped src="./Navigator.css"></style>
