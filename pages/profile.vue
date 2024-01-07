<template>
  <!-- закрыть!!!!! -->
  <form :onsubmit="(e: SubmitEvent) => { e.preventDefault(); }">
    <div class="userData" v-if="userBuf">
      <div class="text-field">
        <input class="text-input" :disabled="!editable" required type="text" id="username" name="username"
          placeholder="username" autocomplete="off" v-model="userBuf.username">
        <label for="username">Username</label>

      </div>
      <div class="text-field">
        <input class="text-input" :disabled="!editable" required type="text" id="firstName" name="firstName"
          placeholder="firstName" autocomplete="off" v-model="userBuf.firstName">
        <label for="firstName">First Name</label>

      </div>
      <div class="text-field">
        <input class="text-input" :disabled="!editable" required type="text" id="lastName" name="lastName"
          placeholder="lastName" autocomplete="off" v-model="userBuf.lastName">
        <label for="lastName">Last Name</label>

      </div>
      <div class="text-field">
        <input class="text-input" :disabled="!editable" required type="date" name="birthday" id="birthday"
          v-model="userBuf.birthdate" placeholder="Birthday" autocomplete="off">
        <label for="lastName">Birthday</label>

      </div>

      <div class="text-field">
        <select v-model="userBuf.city" id="City" :disabled="!editable" required name="City" class="selectCity">
          <option value="Moscow">Moscow</option>
          <option value="Saint-Pt">Saint-Pt</option>
          <option value="Sochi">Sochi</option>
        </select>
        <label for="City">City</label>
      </div>
    </div>
    <button type="submit" v-if="editable">Save</button>
    <button @click="unlog()" v-if="editable">Exit</button>
  </form>
</template>
<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const { userData } = userStore
const route = useRoute()
const userBuf = ref({} as User)
const editable = ref(false)
const userFetch = async () => {
  editable.value = false
  if (Number(route.query.id) == userData.id || !route.query.id) {
    editable.value = true;
    userBuf.value = userData
  }
  else {
    let token
    if (process.client) {
      token = localStorage.getItem('token')
    }
    if (!token) { auth.value = false; navigateTo('/login'); return }
    clearNuxtData()
    const { data } = await useFetch(`/api/user?id=${route.query.id}`, {
      headers: {
        "Authorization": token,
      }
    })
    if (data.value) {
      userBuf.value = data.value
    } else {
      showError(createError({
        statusCode: 404,
        statusMessage: 'User Not Found',
        data: {
          myCustomField: true
        }
      }))
    }

  }
}
userFetch()
watch(() => route.fullPath, async () => {
  userFetch()
})



const unlog = async () => {
  if (process.client) {
    localStorage.removeItem('token')
  }
  auth.value = false;
  navigateTo('/login');

}
definePageMeta({
  middleware: ["auth"]
})
</script>
<style scoped lang="scss">
form {
  margin-top: 5vw;
}

.userData {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;
  width: 70vw;
  margin: 0 auto;

  .selectCity {
    border: 0;
    border-bottom: 1px solid black;
    outline: none;
    width: 100%;
    padding-bottom: 8px;
    color: black;
  }

}

button {
  margin: 30px auto;
}
</style>