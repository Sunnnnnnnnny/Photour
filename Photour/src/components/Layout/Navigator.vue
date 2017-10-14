<template>
  <div class="nav-wrapper">
    <div class="container">
      <div class="left-wrapper">
        <img src="../../assets/logo.png" width="30">
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
          <el-button type="text">注册</el-button>
          <el-button type="text">登录</el-button>
          <el-button type="text">帮助</el-button>

        </div>
      </div>

      <slot>

      </slot>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import {Input, Button} from 'element-ui'

  //  Vue.use(Input)

  export default {
    name: 'navigator',
    components: {
      elInput: Input,
      elButton: Button,
    },
    data() {
      return {
        input2: ''
      }
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    }
  }
</script>

<style scoped src="./Navigator.css"></style>
