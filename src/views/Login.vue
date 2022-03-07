<template>
  <div class="login">
    <h1>
      Login
    </h1>
    <div class="login_dialog">
      <div class="field-item">
        <label for="username">Username</label>
        <input v-model="usernameInput" name="username" />
      </div>
      <div class="field-item">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          ref="passwordInput"
        />
      </div>
      <div class="field-item">
        <label style="font-weight:normal">
          <input type="checkbox" @click="toggleShowPassword" /> Show Password
        </label>
      </div>
      <button
        type="button"
        class="btn-success field-item"
        :disabled="isLoading"
        @click="handleClickLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      usernameInput: "",
      password: ""
    };
  },
  watch: {
    username: {
      handler(newState) {
        if (newState) {
          window.location.replace(this.$route.query.redirect || "/products");
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("user", ["login"]),
    handleClickLogin() {
      this.login({
        username: this.usernameInput,
        password: this.password
      });
    },
    toggleShowPassword() {
      const passwordElement = this.$refs.passwordInput;
      if (passwordElement.type === "password") {
        passwordElement.type = "text";
      } else {
        passwordElement.type = "password";
      }
    }
  },
  computed: {
    ...mapState("user", ["isLoading", "username"])
  }
};
</script>
<style scoped>
.login_dialog {
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
}
</style>
