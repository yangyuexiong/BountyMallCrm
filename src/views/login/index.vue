<template>
  <div id="login-container" class="flex-col justify-center">
    <div class="w-400">
      <h1>登录到</h1>
      <h1 class="pb-30">TDesign Starter</h1>
      <t-form :data="form" :rules="rules" label-width="0" @submit="login">
        <t-form-item name="username">
          <t-input v-model="form.username" type="text" placeholder="请输入账号">
            <template #prefix-icon>
              <t-icon name="user" />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          >
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
          </t-input>
        </t-form-item>

        <t-button block type="submit">登录</t-button>
      </t-form>
    </div>

    <footer class="copyright">
      Copyright @ 2021-2022 {{ name }}. All Rights Reserved
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { validateRequired } from "@comp/validate";
import pgk from "../../../package.json";
const name = pgk.name;
const router = useRouter();
const form = ref({
  username: "",
  password: ""
});

const rules = {
  username: [validateRequired("请输入用户名")],
  password: [validateRequired("请输入密码")]
};

const login = ({ validateResult }) => {
  if (validateResult === true) {
    router.push("/home");
  }
};
</script>

<style lang="scss" scoped>
#login-container {
  height: 100%;
  padding: 50px;
  background: url(@/assets/login-bg.png);
  background-size: cover;
  background-position: 100% center;
  h1 {
    margin: 0;
  }
  .copyright {
    margin-top: 100px;
  }
}
</style>
