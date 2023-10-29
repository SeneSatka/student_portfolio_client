import { useRoute, useRouter } from 'vue-router'
import { ref, computed, inject } from 'vue'

export default () => {
  const route = useRoute()
  const router = useRouter()

  return {
    route,
    router,
    ref,
    inject,
    computed
  }
}
