<template>
  <div class="form-wrapper">
    <el-form :model="ruleForm" :rules="phoneRule" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="ruleForm.email" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="confirm-button-wrapper">
          <el-button type="text" @click="handleEditUserInfo('ruleForm')">确认修改</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {Message, Button, Input, Form, FormItem, RadioGroup, Radio} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'edit-user-modal',
    components: {
      Message,
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elRadioGroup: RadioGroup,
      elRadio: Radio,
    },
    data() {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'))
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      };
      return {
        ruleForm: {
          username: this.userToEdit.username,
          gender: this.userToEdit.gender,
          phone: this.userToEdit.phone === null ? '' : this.userToEdit.phone,
          email: this.userToEdit.email,
        },
        phoneRule: {
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
        },
      };
    },
    props: ['userToEdit'],
    computed: {},
    methods: {
      ...mapActions('admin', [
        'deleteUser'
      ]),
      closeBox() {
        this.$modal.hide('edit-user-modal')
      },
      handleEditUser() {
//        this.deleteUser({
//          onSuccess: (success) => {
//            this.$modal.hide('edit-user-modal');
//            Message({
//              message: success,
//              type: 'success'
//            });
//          },
//          onError: (error) => {
//            Message.error(error)
//          }
//        })
      }
    }
  }

</script>

<style scoped src="./UserInfoForm.css"></style>
