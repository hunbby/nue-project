<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="id"
      class="mb-3"
      type="id"
      :label="'id'"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-3"
      type="password"
      :label="'password'"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')" />
      <router-link class="ml-1 link" :to="{ name: 'recover-password' }">
        {{ $t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button class="my-0" @click="onsubmit">Login</va-button>
    </div>
  </form>
</template>

<script>
import axios from '../../../plugins/axios/axios'

export default {
  name: 'Login',
  data() {
    return {
      id: '',
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    }
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit() {
      let data = {
        userId: this.id,
        userPw: this.password,
      }
      axios.post('/api/cms/signin', data).then((res) => {
        console.log(res)
      })
      axios.get('/api/cms/hello', data).then((res) => {
        console.log(res)
      })
      this.emailErrors = this.email ? [] : ['Id is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      this.$router.push({ name: 'markup' })
    },
  },
}
</script>
