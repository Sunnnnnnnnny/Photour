<template>
  <div class="nav-wrapper">
    <div class="container">
      <div class="left-wrapper">
        <img src="../../assets/logo.png" width="30">
      </div>

      <div class="right-wrapper">
        <el-input class="search-input"
          placeholder="请选择日期"
          icon="search"
          v-model="input2"
          :on-icon-click="handleIconClick">
        </el-input>
      </div>

      <slot>

      </slot>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import { Input } from 'element-ui'

//  Vue.use(Input)

  export default {
    name: 'navigator',
    components: {
      elInput: Input,
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

<style scoped>
  @import "./Navigator.css";
</style>
