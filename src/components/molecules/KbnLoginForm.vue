<template>
  <form novalidate>
    <div class="form-item">
      <label for="email">이메일 주소</label>
      <input
        type="text"
        id="email"
        v-model="email"
        autocomplete="off"
        placeholder="ex) kanban@domain.com"
        @focus="resetError"
      />
      <ul class="validation-errors">
        <li v-if="!validation.email.format">이메일 주소 형식에 어긋납니다.</li>
        <li v-if="!validation.email.required">
          이메일 주소가 입력되지 않았습니다.
        </li>
      </ul>
    </div>
    <div class="form-item">
      <label for="password">패스워드</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="ex) xxxxxxxx"
        @focus="resetError"
      />
      <ul class="validation-errors">
        <li v-if="!validation.password.required">
          패스워드가 입력되지 않았습니다.
        </li>
      </ul>
    </div>
    <div class="form-actions">
      <kbn-button :disabled="disableLoginAction" @click="handleClick">
        로그인
      </kbn-button>
      <p v-if="progress" class="login-progress">로그인 중...</p>
      <p v-if="error" class="login-error">{{ error }}</p>
    </div>
  </form>
</template>
<script>
import KbnButton from "../atoms/KbnButton.vue";
const REGEX_EMAIL =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const required = (val) => !!val.trim();
export default {
  name: "KbnLoginForm",
  components: { KbnButton },
  props: {
    onlogin: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    email: "",
    password: "",
    progress: false,
    error: "",
  }),
  computed: {
    validation() {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email),
        },
        password: {
          required: required(this.password),
        },
      };
    },
    valid() {
      const validation = this.validation;
      const fields = Object.keys(validation);
      let valid = true;
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        valid = Object.keys(validation[field]).every(
          (key) => validation[field][key]
        );
        if (!valid) {
          break;
        }
      }
      return valid;
    },
    disableLoginAction() {
      return !this.valid || this.progress;
    },
  },
  methods: {
    resetError() {
      this.error = "";
    },
    async handleClick() {
      if (this.disableLoginAction) {
        return;
      }
      this.progress = true;
      this.error = "";
      try {
        await this.onlogin({
          email: this.email,
          password: this.password,
        });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.progress = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
label {
  display: block;
}
input {
  width: 100%;
  padding: 0.5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0.25em 0;
  li {
    font-size: 0.5em;
  }
}
.validation-errors {
  height: 32px;
}
.form-actions p {
  font-size: 0.5em;
}
</style>
