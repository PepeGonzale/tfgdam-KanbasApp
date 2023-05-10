<template>
  <div v-if="isLoading" class="h-screen">Loadings</div>
  <div v-else class="flex min-h-screen items-center justify-center bg-black">
    <div
      class="box-shadow rounded-md bg-gray-800 border-4 border-gray-800 p-12 shadow-xl w-6/12 h-2.2/6"
    >
      <h1 class="block w-full text-white text-center mb-6">
        <span v-if="formView === 'login'">Login</span>
        <span v-if="formView === 'register'">Register</span>
      </h1>

      <form class="p-4" @submit.prevent="loginOrRegister">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="dataUser.email"
            type="email"
            name="floating_email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email address</label
          >
        </div>
        <div
          class="relative z-0 w-full mb-6 group"
          v-if="formView === 'register'"
        >
          <input
            v-model="dataUser.username"
            type="text"
            name="username"
            id="username"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="username"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Username</label
          >
        </div>
        <div
          class="relative z-0 w-full mb-6 group"
          v-if="formView === 'register'"
        >
          <input
            v-model="dataUser.mobile"
            type="text"
            name="mobile"
            id="mobile"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="mobile"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Mobile Phone</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="dataUser.password"
            type="password"
            name="floating_password"
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Password</label
          >
        </div>
        <p class="text-sm p-1 font-light text-gray-500 dark:text-gray-400">
          <a
            href="/forgot"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Forgot password?</a
          >
        </p>
        <SecundaryButton text="Login" v-if="formView === 'login'" />
        <SecundaryButton
          text="Create an account"
          v-if="formView === 'register'"
        />
        <p
          v-if="formView === 'login'"
          class="text-sm p-4 font-light text-gray-500 dark:text-gray-400"
        >
          Dont have an account?
          <a
            @click.prevent="formView = 'register'"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Register here</a
          >
        </p>
        <p
          v-if="formView === 'register'"
          class="text-sm p-4 font-light text-gray-500 dark:text-gray-400"
        >
          Already have an account?
          <a
            @click.prevent="formView = 'login'"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Login here</a
          >
        </p>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { authStore } from "@/stores/auth/authStore";
import SecundaryButton from "@/components/buttons/RegisterButton.vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
const input = ref(false);
const useAuthStore = authStore();
const isLoading = ref(false);
const formView = ref("login");
const router = useRouter();
const dataUser = reactive({
  email: "",
  password: "",
  username: "",
  mobile: "",
});
const loginOrRegister = () => {
  isLoading.value = true;
  if (formView.value === "register") {
    userRegister().then(() => {
      isLoading.value = false;
    });
  } else {
    checkUser().then(() => {
      isLoading.value = false;
    });
    toast.success("Login Success");
  }
};
const checkUser = async () => {
  await useAuthStore.login({
    email: dataUser.email,
    password: dataUser.password,
  });
};
const userRegister = async () => {
  try {
    console.log(dataUser);
    await useAuthStore.register({
      email: dataUser.email,
      password: dataUser.password,
      mobile: dataUser.mobile,
      username: dataUser.username,
    });
    router.push({ path: "/" });
  } catch (err) {
    console.error(err);
  }
};
</script>
