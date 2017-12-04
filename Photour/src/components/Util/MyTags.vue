<template>
  <div class="tags-wrapper">

    <div v-if="canBeEdited">
      <el-tag
        :key="tag"
        v-for="tag in tags"
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
      <el-tag v-for="tag in tags">{{tag}}</el-tag>
    </div>
  </div>

</template>

<script>
  import DivHeader from './DivHeader'
  import {Button, Input, Tag, Message} from 'element-ui'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'tags',
    components: {
      DivHeader,
      elButton: Button,
      elInput: Input,
      elTag: Tag,
      Message
    },
    data() {
      return {
        tags: this.dynamicTags,
//        dynamicTags: this.currentPhoto.tags,
        inputVisible: false,
        inputValue: ''
      }
    },
    props: ['canBeEdited', 'dynamicTags'],
    computed: {
      ...mapState('photos', {
        currentPhoto: state => state.currentPhoto
      })
    },
    methods: {
      ...mapActions('auth', [
        'editUserTags'
      ]),
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.handleEditTags()
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
          this.tags.push(inputValue);
          this.handleEditTags()
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      handleEditTags() {
        this.editUserTags({
          tags: this.tags.join(' '),
          onSuccess: () => {
            Message({
              message: '修改成功！',
              type: 'success'
            });
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      }
    }
  }
</script>

<style scoped src="./MyTags.css"></style>
