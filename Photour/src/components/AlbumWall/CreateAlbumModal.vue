<template>
  <modal
    name="create-album-modal"
    :clickToClose="true"
    :height="420">
    <div class="create-album-wrapper">
      <div-header header="新建相册"></div-header>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="相册名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述" prop="description">
          <el-input type="textarea" :rows="4" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="相册权限" prop="permission">
          <el-radio-group v-model="ruleForm.permission">
            <el-radio label="公开">公开</el-radio>
            <el-radio label="私密">私密</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--</el-form-item>-->
        <div class="button-wrapper">
          <button @click="submitForm('ruleForm')">
            确  定
          </button>
        </div>
      </el-form>

    </div>

  </modal>

</template>

<script>
  import {Input, Message, Form, FormItem, RadioGroup, Radio} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {router} from '../../main'
  import DivHeader from '../Util/DivHeader'

  export default {
    name: 'create-album-modal',
    components: {
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elRadio: Radio,
      elRadioGroup: RadioGroup,
      DivHeader,
      Message
    },
    data() {
      return {
        textarea: '',
        ruleForm: {
          author_id: this.$route.params.userId,
          name: '',
          description: '',
          permission: '公开'
        },
        rules: {
          name: [
            {required: true, message: '请输入相册名称', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入相册描述', trigger: 'blur'},
          ],
          permission: [
            {required: true}
          ]
        }
      };

    },
    computed: {},
    methods: {
      ...mapActions('albums', [
        'createAlbum'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            this.createAlbum({
              albumInfo: this.ruleForm,
              onSuccess: (success) => {
                this.$modal.hide('create-album-modal');
                Message({
                  message: success,
                  type: 'success'
                });
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error('请按照正确格式填写！')
            return false;
          }
        });
      },
    }
  }

</script>

<style scoped src="./CreateAlbumModal.css"></style>
