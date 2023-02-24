<template>
<div class="flex h-screen items-center justify-center bg-black">
    <div class="box-shadow rounded-md bg-gray-800 border-4 border-gray-800 p-12 shadow-xl w-6/12 h-2.5/6">
        <h1 class="block w-full text-white text-center mb-6">Register</h1>
    <form class="p-4" @submit.prevent ="userRegister">
        <div class="relative z-0 w-full mb-6 group">
      <input v-model="userCredentials.email" type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input v-model ="userCredentials.password" type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>
     <div class="relative z-0 w-full mb-6 group">
      <input type="" name="confirm_floating_password" id="confirm_floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label for="confirm_floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
    </div>
    <button
							@click="sendPost"
							type="submit"
							class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							Create an account
						</button>
						<p class="text-sm p-4 font-light text-gray-500 dark:text-gray-400">
							Already have an account?
							<a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
						</p>

    </form>
</div>
</div>
</template>
<script lang="ts" setup>
import { authStore } from '@/stores/auth/authStore';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const useAuthStore = authStore()
const router = useRouter()
const userCredentials = reactive({
  email: '',
  password: '',
})

const userRegister = async () => {
  try {
  await useAuthStore.register({
    email: userCredentials.email,
    password: userCredentials.password,

  })
  router.push({ path: '/' })
} catch(err) {
  console.error(err)
}
  
  
}
</script>