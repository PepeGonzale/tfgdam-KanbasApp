<template>
  <div class="flex min-h-screen bg-blue-primary items-center justify-center">
    <div
      class="box-shadow rounded-md bg-white border-4 border-gray-800 p-12 shadow-xl w-3/12 h-2.2/6"
    >
      <h1 class="block w-full text-black text-center mb-6">
        <span v-if="formView === 'login'">Login</span>
        <span v-if="formView === 'register'">Register</span>
      </h1>

      <form class="p-4 space-y-4" @submit.prevent="loginOrRegister">
        <div class="relative mb-3">
          <LoginInputVue text="Email address" type="email" @value="(e) => dataUser.email = e" />
        </div>

        <div
          class="relative z-0 w-full mb-6 group"
          v-if="formView === 'register'"
        >
          <LoginInputVue text="Username" type="text" @value="(e) => dataUser.username = e"/>
        </div>
        <div
          class="relative z-0 w-full mb-6 group"
          v-if="formView === 'register'"
        >
          <LoginInputVue text="Mobile" type="text" @value="(e) => dataUser.mobile = e"/>
        </div>
        <div class="relative mb-3">
          <LoginInputVue text="Password" type="password" @value="(e) => dataUser.password = e"/>
        </div>
        <div
          v-if="errorMessage"
          class="my-4 text-sm text-red-500"
          v-html="errorMessage"
        ></div>

        <SecundaryButton
          text="Login"
          v-if="formView === 'login'"
          :loading="useAuthStore.loading"
        />
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
            class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
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
            class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
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
import LoginInputVue from "../General/LoginInput.vue";
const input = ref(false);
const useAuthStore = authStore();
const isLoading = ref(false);
const formView = ref("login");
const router = useRouter();
const errorMessage = ref("");
const dataUser = reactive({
  email: "",
  password: "",
  username: "",
  mobile: "",
});
const loginOrRegister = async () => {
  console.log(dataUser);
  
  if (formView.value === "register") {
    userRegister();
  } else {
    const { success, error } = await checkUser();

    if (success) {
      toast.success("Login success");
    } else {
      console.log("error", error);
      errorMessage.value = error;
    }
  }
};
const checkUser = async () => {
  const res = await useAuthStore.login({
    email: dataUser.email,
    password: dataUser.password,
  });

  return res;
};
const userRegister = async () => {
  const { success, error } = await useAuthStore.register({
    email: dataUser.email,
    password: dataUser.password,
    mobile: dataUser.mobile,
    username: dataUser.username,
  });
  if (success) {
    router.push({ path: "/" });
  }
  if (error && !success) {
    errorMessage.value = error;
  }
};
</script>
