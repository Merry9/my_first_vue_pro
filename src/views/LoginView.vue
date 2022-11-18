<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="70px" class="demo-ruleForm">
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="loginBtn">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)" class="loginBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
export default defineComponent({
  setup() {
    const data = reactive(new LoginData())
    const rules = {
      username: [
        { required: true, message: 'Please input username', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
    }
    // 登录
    const ruleFormRef = ref<FormInstance>();
    const submitForm = (formEl: FormInstance | undefined) => {
      if(!formEl){
        return;
      }
      formEl.validate(valid=>{
        if(valid){
          console.log('submit');
        }else{
          console.log('error');
          return false; 
        }
      })
      console.log(formEl);
    }
    return { ...toRefs(data), rules, ruleFormRef, submitForm }
  }
})
</script>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bp.png");
  padding: 1px;
  text-align: center;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: white;
    padding: 30px;
    border-radius: 30px;
  }

  .loginBtn {
    width: 48%;
  }

  h2 {
    margin-bottom: 25px;
  }
}
</style>
