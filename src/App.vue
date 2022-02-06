<template>
  <router-view />
</template>

<script>
import { provide, ref } from 'vue'

import NavBar from './components/navbar/Navbar.vue'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NavBar,
  },
  setup() {
    const toast = ref('')
  },
}
</script>
