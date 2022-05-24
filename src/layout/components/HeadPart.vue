<template>
  <div class="header justify-end">
    <div class="logo align-center">
      <span>CRM</span>
      <div class="ml-10 fs-22 cursor" @click="toggleCollapse">
        <t-icon
          :name="`${
            collapsed
              ? 'format-vertical-align-left'
              : 'format-vertical-align-right'
          }`"
        ></t-icon>
      </div>
    </div>

    <t-dropdown class="flex-center" @click="command">
      <div class="pr-20">
        <t-avatar
          :size="40"
          src="https://avatars.githubusercontent.com/u/26624465?v=4"
        ></t-avatar>
      </div>
      <template #dropdown>
        <t-dropdown-menu>
          <t-dropdown-item value="resetPwd">重置密码</t-dropdown-item>
          <t-dropdown-item value="logout">退出</t-dropdown-item>
        </t-dropdown-menu>
      </template>
    </t-dropdown>

    <t-dialog
      v-model="resetPwdVisible"
      title="重置密码"
      width="400px"
      @close="close"
    >
      <common-form
        dialog
        ref="resetPwdForm"
        :rules="resetPwdRules"
        :data="resetPwdForm"
        :field-list="resetPwdFieldList"
        label-width="6em"
        confirm-text="确定"
        reset-text="取消"
        @search="resetPwd"
        @reset="resetPwdVisible = false"
      />
    </t-dialog>
  </div>
</template>
<script>
import { validateRequired } from "@comp/validate";
import { resetPwd } from "@/api/user";
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const commonProps = {
      type: "password",
      showPassword: true
    };
    const validatePwd = (rule, value, callback) => {
      if (value !== this.resetPwdForm.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      resetPwdVisible: false,
      resetPwdForm: {
        old_password: "",
        new_password: "",
        raw_password: ""
      },
      resetPwdRules: {
        old_password: [validateRequired("请输入旧密码")],
        new_password: [validateRequired("请输入新密码")],
        raw_password: [
          validateRequired("请再次输入密码"),
          { validator: validatePwd, trigger: "blur" }
        ]
      },
      resetPwdFieldList: [
        {
          value: "old_password",
          label: "旧密码",
          component: "t-input",
          extraProps: {
            ...commonProps
          }
        },
        {
          value: "new_password",
          label: "新密码",
          component: "t-input",
          extraProps: {
            ...commonProps
          }
        },
        {
          value: "raw_password",
          label: "确认密码",
          component: "t-input",
          extraProps: {
            ...commonProps
          }
        }
      ]
    };
  },
  methods: {
    toggleCollapse() {
      this.$emit("update:collapsed", !this.collapsed);
    },
    command({ value: command }) {
      switch (command) {
        case "logout":
          this.$store.dispatch("user/logout");
          break;
        case "resetPwd":
          this.resetPwdVisible = true;
          break;
      }
    },
    close() {
      this.$refs.resetPwdForm.reset();
    },
    async resetPwd() {
      await resetPwd({
        ...this.resetPwdForm,
        user_id: this.$store.getters.info.id
      });
      this.close();
      this.resetPwdVisible = false;
      this.$message.success("重置密码成功");
    }
  }
};
</script>
<style lang="scss">
.header {
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #333;
  overflow: hidden;
  // background: #24292f;
  border-bottom: 1px solid #f3f3f3;
  .logo {
    // width: 146px;
    height: 28px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 20px;
    background-size: 100% 100%;
  }
}
</style>
