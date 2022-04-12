<template>
  <section>
    <div v-if="error" class="error">
      <p class="display">
        예기치 못한 오류가 발생했습니다. 애플리케이션 개발자에게 다음 정보와
        함께 문의하세요
      </p>
      <p class="message">오류 메세지: {{ error.message }}</p>
      <p class="info">오류 정보: {{ info }}</p>
      <p class="stack">오류 상세 정보: {{ error.stack }}</p>
    </div>
    <template v-else>
      <slot />
    </template>
  </section>
</template>
<script>
export default {
  name: "ErrorBoundary",
  data() {
    return {
      error: null,
      info: null,
    };
  },
  errorCaptured(err, vm, info) {
    this.error = err;
    this.info = info;
  },
};
</script>
<style lang="scss" scoped>
.error {
  color: red;
  text-align: left;
}
</style>
