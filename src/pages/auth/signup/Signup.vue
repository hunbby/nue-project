<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="signUpData.userId"
      class="mb-3"
      type="id"
      :label="'id'"
      :error="!!signUpData.emailErrors.length"
      :error-messages="signUpData.emailErrors"
    />

    <va-input
      v-model="signUpData.userPw"
      class="mb-3"
      type="password"
      :label="'password'"
      :error="!!signUpData.passwordErrors.length"
      :error-messages="signUpData.passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <div class="mb-0"></div>
      <router-link class="ml-1 link" :to="{ name: 'recover-password' }">
        {{ $t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button class="my-0" @click="onsubmit">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export interface SignUpForm {
  userId: string
  userPw: string
  emailErrors: string[]
  passwordErrors: string[]
}

export default defineComponent({
  name: 'Signup',
  setup() {
    const store = useStore()
    const router = useRouter()

    const signUpData = reactive<SignUpForm>({
      userId: '',
      userPw: '',
      emailErrors: [],
      passwordErrors: [],
    }) as SignUpForm

    const formReady = computed(() => {
      return !(signUpData.emailErrors.length || signUpData.passwordErrors.length)
    })

    const onsubmit = () => {
      // 에러 메세지 초기화
      signUpData.emailErrors = []
      signUpData.passwordErrors = []

      if (signUpData.userId.length == 0) {
        let text = 'Id를 입력하세요'
        signUpData.emailErrors.push(text)
      }
      if (signUpData.userPw.length == 0) {
        let text = 'Pw를 입력하세요'
        signUpData.passwordErrors.push(text)
      }
      if (!formReady.value) {
        return
      }

      store.dispatch('authModule/register', signUpData).then(
        (res) => {
          if (res.resltCd == '0000') {
            console.log('auth 모듈 로그인 호출 되었습니다.')
            router.push({ name: 'login' })
          } else if (res.resltCd == '0900') {
            let text = res.data.msg
            signUpData.emailErrors.push(text)
          } else {
            alert(res.data.msg)
          }
        },
        (error) => {
          console.log(error)
          return false
        }
      )
    }

    return {
      signUpData,
      formReady,
      onsubmit,
    }
  },
})
</script>

<style lang="scss"></style>
