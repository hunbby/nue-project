<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="loginData.userId"
      class="mb-3"
      type="id"
      :label="'id'"
      :error="!!loginData.emailErrors.length"
      :error-messages="loginData.emailErrors"
    />

    <va-input
      v-model="loginData.userPw"
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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export interface LoginForm {
  userId: string
  userPw: string
  keepLoggedIn: boolean
  emailErrors: string[]
  passwordErrors: string[]
}

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()

    const loginData = reactive<LoginForm>({
      userId: '',
      userPw: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    }) as LoginForm

    const formReady = computed(() => {
      return !loginData.emailErrors.length && !loginData.passwordErrors.length
    })

    const loggedIn = computed(() => {
      console.log('authModule state 값 : ', store.state.authModule.status.loggedIn)
      return store.state.authModule.status.loggedIn
    })

    const onsubmit = () => {
      if (loginData.userId.length == 0) {
        let text = 'Id를 입력하세요'
        loginData.emailErrors.push(text)
      }
      if (loginData.userPw.length == 0) {
        let text = 'Pw를 입력하세요'
        loginData.passwordErrors.push(text)
      }
      if (!formReady.value) {
        return
      }
      // AuthService.login(loginData)
      store.dispatch('authModule/login', loginData).then(
        () => {
          console.log('auth 모듈 로그인 호출 되었습니다.')
          router.push({ name: 'markup' })
        },
        (error) => {
          console.log(error)
        }
      )
    }

    return {
      loginData,
      formReady,
      loggedIn,
      onsubmit,
    }
  },
  created() {
    // 컴포넌트가 생성될 떄 실행
    console.log(import.meta.env.VITE_APP_BASE_API)
    console.log('date 접근 ', this.loggedIn)
    // 로그인 되어있는데 로그아웃을 하지 않고 로그인 화면으로 넘어가려고 했을 경우 이동
    if (this.loggedIn) {
      this.$router.push({ name: 'markup' })
    }
  },
})
</script>
