<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="loginData.id"
      class="mb-3"
      type="id"
      :label="'id'"
      :error="!!loginData.emailErrors.length"
      :error-messages="loginData.emailErrors"
    />

    <va-input
      v-model="loginData.password"
      class="mb-3"
      type="password"
      :label="'password'"
      :error="!!loginData.passwordErrors.length"
      :error-messages="loginData.passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="loginData.keepLoggedIn"
        class="mb-0"
        :label="$t('auth.keep_logged_in')"
      />
      <router-link class="ml-1 link" :to="{ name: 'recover-password' }">
        {{ $t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button class="my-0" @click="onsubmit">Login</va-button>
    </div>
  </form>
  <div class="cards">
    <div class="flex xs12">
      <div class="cards-container row d-flex wrap align--start">
        <va-card>
          <va-card-title>데이터 확인용</va-card-title>
          <va-card-content>{{ loginData }}</va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

import LoginData from './LoginInf'
import loginSvc from './LoginSvc'

// import axios from '../../../plugins/axios/axios'

export default defineComponent({
  name: 'Login',
  setup() {
    const loginData = reactive<LoginData>({
      id: '',
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    }) as LoginData

    const { testfunction } = loginSvc()

    const formReady = computed(() => {
      return !loginData.emailErrors.length && !loginData.passwordErrors.length
    })

    const onsubmit = () => {
      console.log('test')
      testfunction(loginData)
    }
    return {
      loginData,
      formReady,
      onsubmit,
    }
  },
})
</script>
