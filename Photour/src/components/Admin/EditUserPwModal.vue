<template>
  <modal
    name="edit-user-pw-modal"
    :clickToClose="true"
    :height="300">
    <div class="edit-user-pw-wrapper">

      <el-button
        type="primary"
        icon="close"
        @click="closeBox"></el-button>

      <div class="form-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="新密码" prop="newPw">
            <el-input type="password" v-model="ruleForm.newPw" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPw">
            <el-input type="password" v-model="ruleForm.confirmPw" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="confirm-button-wrapper">
              <el-button type="text" @click="handleEditPw('ruleForm')">确认修改</el-button>
            </div>
          </el-form-item>
        </el-form>

      </div>

    </div>

  </modal>

</template>

<script>
  import {Message, Button, Input, Form, FormItem} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'edit-user-pw-modal',
    components: {
      Message,
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
    },
    data() {
      let validateNewPw = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'))
        } else {
          callback()
        }
      };
      let validateConfirmPw = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPw) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          newPw: '',
          confirmPw: ''
        },
        rules: {
          newPw: [
            {required: true, validator: validateNewPw, trigger: 'blur'}
          ],
          confirmPw: [
            {required: true, validator: validateConfirmPw, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState('admin', {
        userToEdit: state => state.userToEdit
      })
    },
    methods: {
      ...mapActions('admin', [
        'editUserPw'
      ]),
      closeBox() {
        this.ruleForm.newPw = ''
        this.ruleForm.confirmPw = ''
        this.$modal.hide('edit-user-pw-modal')
      },
      handleEditPw(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            this.editUserPw({
              pwInfo: this.ruleForm,
              onSuccess: () => {
                Message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.closeBox()
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error("请正确填写信息！")
          }
        })
      },
    }
  }

</script>

<style scoped src="./EditUserPwModal.css"></style>
