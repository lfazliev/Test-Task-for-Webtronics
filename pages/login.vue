<template>
  <section>
    <form class="inputContainer" :onsubmit="(e: any) => { e.preventDefault(); login() }">


      <div class="text-field">
        <input class="text-input" type="text" id="name" name="name" placeholder="Ivan" autocomplete="off">
        <label for="name">Username</label>
        <!-- <span class="str" v-show="errorsInput.name">{{ errorsInput.name }}</span> -->
      </div>


      <div class="text-field">
        <input class="text-input" :type="(!show) ? 'password' : 'text'" id="name" name="name" placeholder="Ivan"
          autocomplete="off" v-model="password">
        <label for="name">Password</label>
        <!-- <span class="str" v-show="errorsInput.name">{{ errorsInput.name }}</span> -->
        <div :class="(!show) ? 'unshow' : ''" v-if="password" @click="show = !show" />
      </div>
      <button type="submit">enter</button>
    </form>
  </section>
</template>

<script setup lang="ts">
const userStore = useUserStore()
// const { authFetch, registration, restorePass } = userStore
const { auth } = storeToRefs(userStore)
const password = ref('')
const show = ref(false)
const login = () => {
  console.log(1);
}



const route = useRoute()
if (auth.value) {
  await navigateTo('/profile')
}
watch(() => auth.value, async () => {
  if (auth.value) {
    if (route.query.to) {
      await navigateTo(route.query.to as string)
      return
    }
    await navigateTo('/profile')
  }
})

</script>
<style scoped lang="scss">
.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  transform: translate(0, -50%);
  width: 40%;
  margin: 20% auto;

  button {
    cursor: pointer;
    font-size: 1.2rem;
    border-bottom: 1px solid black;
    padding: 0 0 5px;
    margin: 20px;
    text-transform: uppercase;
  }

  .text-field {
    width: 100%;
    position: relative;
    margin-top: 30px;

    input {

      color: black;
      border-bottom: black 1px solid;
      padding-bottom: 8px;
      margin-top: 0px;
    }

    >div {
      position: absolute;
      right: 0;
      bottom: 4px;
      padding: 7px;
      border: 1px solid black;
      border-radius: 3px;
      cursor: pointer;
    }

    .unshow {
      background-color: black;
    }

    input {
      width: 100%;
    }

    span {
      color: rgb(162, 75, 75);
    }

    label {
      color: #7D7D7D;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      pointer-events: none;
      transform-origin: 0 0;
      transition: color .15s ease-in-out, transform .15s ease-in-out;

    }

    .text-input::-moz-placeholder {
      color: transparent;
    }

    .text-input::placeholder {
      color: transparent;
    }

    .text-input:focus~label,
    .text-input:not(:placeholder-shown)~label {
      color: black;
      transform: scale(.85) translateY(-1.75rem) translateX(.15rem);
    }
  }
}
</style>