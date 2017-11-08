<template>
  <modal
    name="create-album-modal"
    :clickToClose="true"
    :height="360">
    <div class="create-album-wrapper">
      <div-header header="新建相册"></div-header>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="相册名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述" prop="description">
          <el-input type="textarea" :rows="4" v-model="ruleForm.description"></el-input>
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
  import {Input, Message, Form, FormItem} from 'element-ui'
  import {mapState} from 'vuex'
  import {router} from '../../main'
  import DivHeader from '../Util/DivHeader'

  export default {
    name: 'create-album-modal',
    components: {
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      DivHeader
    },
    data() {
      return {
        textarea: '',
        ruleForm: {
          name: '',
          description: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入相册名称', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入相册描述', trigger: 'blur'},
          ]
        }
      };

    },
    computed: {},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }

</script>

<style scoped src="./CreateAlbumModal.css"></style>
