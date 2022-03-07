<template>
  <nav id="nav">
    <p class="logo"><router-link to="/"><img src="@/assets/images/jualanku_logo_sm.png" />Jualanku</router-link></p>
    <ul class="nav-links">
      <li class="links cart">
        <MenuItem :icon="require('@/assets/images/shopping-cart.svg')" />
        <div class="cart-badge">{{ totalCart }}</div>
      </li>
      <li class="links">
        <MenuItem
          :icon="
            isLoggedIn
              ? require('@/assets/images/user.svg')
              : require('@/assets/images/log-in.svg')
          "
        >
          <ul class="profile-menu" v-if="isLoggedIn">
            <li class="profile-greeting">Hi, {{ username }}</li>
            <li>
              <a @click="handleLogout">Logout</a>
            </li>
          </ul>
          <ul class="profile-menu" v-else>
            <li>
              <router-link to="/login">Login</router-link>
            </li>
          </ul>
        </MenuItem>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import MenuItem from "./MenuItem";

export default {
  components: {
    MenuItem
  },
  methods: {
    ...mapActions("user", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.go("/login");
    }
  },
  computed: {
    ...mapState("user", ["username"]),
    ...mapGetters("user", ["isLoggedIn"]),
    ...mapGetters("cart", ["totalCart"])
  }
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  justify-content: space-between;
  top: 0;
  background-color: #e31e52;
  border-bottom: 1px solid grey;
  z-index: 1;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}
.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
.logo a {
  font-size: 20px;
  color: white !important;
  margin-left: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.logo img {
  margin-right: 8px;
}
.profile-menu {
  width: 180px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0;
  z-index: 2;
}
.profile-menu li:hover,
.profile-menu li:active {
  background-color: #e2e2e2;
}
.profile-menu li {
  width: 100%;
  text-align: left;
  box-sizing: border-box;
}
.profile-menu li a,
.profile-menu li.profile-greeting {
  width: 100%;
  display: inline-block;
  padding: 8px 16px;
}
.profile-menu li:not(:first-child) {
  border-top: 1px solid #e2e2e2;
}
.cart {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: -5px;
  right: 7px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #1ee3af;
}
</style>
