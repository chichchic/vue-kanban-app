<template>
  <section class="login-view">
    <h1>Kanban App</h1>
    <KbnLoginForm :onlogin="handleLogin" />
  </section>
</template>
<script>
import KbnLoginForm from "@/components/molecules/KbnLoginForm.vue";
import { mapActions } from "vuex";
export default {
  name: "KbnLoginView",
  components: {
    KbnLoginForm,
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin(authInfo) {
      try {
        await this.login(authInfo);
        this.$router.push({ path: "/" });
      } catch (err) {
        return this.throwReject(err);
      }
    },
    throwReject(err) {
      return Promise.reject(err);
    },
  },
};
</script>
<style lang="scss" scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
