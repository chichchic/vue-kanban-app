<template>
  <button
    :class="classes"
    :disabled="disabled"
    type="button"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "KbnButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const cls = this.type === "text" ? "-text" : "";
      return [`kbn-button${cls}`];
    },
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.kbn-button {
  padding: 0.6em 1.3em;
}
.kbn-button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
