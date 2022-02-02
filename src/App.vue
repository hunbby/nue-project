<template>
  <router-view/>
</template>

<script>
import NavBar from './components/navbar/Navbar.vue'
import { ref, provide } from 'vue'

export default {
  name: 'App',
  setup() {
    const toast = ref('')
  },
  components: {
    NavBar
  },
}
</script>
