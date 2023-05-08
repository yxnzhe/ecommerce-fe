<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <!-- <router-link to="/" class="navbar-item"><strong>ZedStore</strong></router-link> -->
        <router-link to="/" class="navbar-item"><img src="@/assets/logo-white.png"></router-link>
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu" v-if="!user">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-light">Login</router-link>
              <router-link to="/register" class="button is-purple">Register</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="navbar-menu" id="navbar-menu" v-else>
        <div class="navbar-end">
            <router-link to="/beauty-and-health" class="navbar-item">Beauty & Health</router-link>
            <router-link to="/food-and-beverage" class="navbar-item">Food & Beverage</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-light">Logout</router-link>
              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </nav>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-right">Powered by <a href="https://github.com/yxnzhe">YanZhe</a> © 2023</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
		user() {
			return this.$store.state.currentUser;
		}
	}
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
@import './assets/style/style.scss';
</style>
