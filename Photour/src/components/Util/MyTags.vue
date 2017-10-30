<template>
  <div class="tags-wrapper">

    <div v-if="canBeEdited">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
    </div>

    <div v-else>
      <el-tag v-for="tag in dynamicTags">{{tag}}</el-tag>
    </div>
  </div>

</template>

<script>
  import DivHeader from './DivHeader'
  import {Button, Input, Tag} from 'element-ui'

  export default {
    name: 'tags',
    components: {
      DivHeader,
      elButton: Button,
      elInput: Input,
      elTag: Tag
    },
    data() {
      return {
        dynamicTags: ['风景', '人文', '小清新', '高端摄影', '123321', '二次元'],
        inputVisible: false,
        inputValue: ''
      }
    },
    props: ['canBeEdited'],
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped src="./MyTags.css"></style>
