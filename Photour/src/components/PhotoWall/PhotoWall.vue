<template>
  <div class="photo-wall-wrapper">
    <el-row :gutter="15">
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
      <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
        <photo></photo>
      </div></el-col>
    </el-row>



  </div>

</template>

<script>
  import Photo from './PhotoWrapper'
  import {Row, Col} from 'element-ui'

  export default {
    name: 'photoWall',
    components: {
      Photo,
      elRow: Row,
      elCol: Col,
    },
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style scoped src="./PhotoWall.css"></style>
