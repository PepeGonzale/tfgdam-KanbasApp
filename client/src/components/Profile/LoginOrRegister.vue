<template>
  <div class="relative flex min-h-screen bg-bg-base items-center justify-center px-4 overflow-hidden">

    <!-- Ambient background glows -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-600/[0.05] rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-900/[0.07] rounded-full blur-[100px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/[0.025] rounded-full blur-[140px]"></div>
    </div>

    <!-- Dot grid -->
    <div
      class="absolute inset-0 pointer-events-none opacity-40"
      style="background-image: radial-gradient(circle, rgba(90,78,66,0.4) 1px, transparent 1px); background-size: 28px 28px;"
    ></div>

    <div class="relative w-full max-w-sm">

      <!-- Logo + tagline -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 mb-3">
          <span class="text-2xl font-bold text-[#F5F0E8] tracking-tight">Kanvas</span>
          <span class="w-2 h-2 rounded-full bg-amber-500 mb-0.5 inline-block" style="box-shadow: 0 0 10px rgba(245,158,11,0.6);"></span>
        </div>
        <p class="text-sm text-[#6A5C4E] tracking-wide">Organize your work, beautifully.</p>
      </div>

      <!-- Card -->
      <div class="bg-bg-card/80 backdrop-blur-xl border border-white/[0.07] rounded-2xl overflow-hidden" style="box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.06);">
        <!-- Top amber highlight line -->
        <div class="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

        <div class="p-7">
          <!-- Tab toggle -->
          <div class="flex bg-bg-surface/80 border border-white/[0.05] rounded-xl p-1 mb-6">
            <button
              type="button"
              @click="formView = 'login'"
              class="flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200"
              :class="formView === 'login'
                ? 'bg-bg-elevated text-[#F5F0E8] shadow-sm'
                : 'text-[#5A4E42] hover:text-[#8A7A66]'"
            >Sign in</button>
            <button
              type="button"
              @click="formView = 'register'"
              class="flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200"
              :class="formView === 'register'
                ? 'bg-bg-elevated text-[#F5F0E8] shadow-sm'
                : 'text-[#5A4E42] hover:text-[#8A7A66]'"
            >Register</button>
          </div>

          <!-- Heading -->
          <div class="mb-5">
            <h1 class="text-lg font-semibold text-[#F5F0E8]">
              <span v-if="formView === 'login'">Welcome back</span>
              <span v-if="formView === 'register'">Create your account</span>
            </h1>
            <p class="text-xs text-[#6A5C4E] mt-1">
              <span v-if="formView === 'login'">Enter your credentials to continue</span>
              <span v-if="formView === 'register'">Fill in the details below to get started</span>
            </p>
          </div>

          <form class="space-y-3.5" @submit.prevent="loginOrRegister">
            <div>
              <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-1.5">Email</label>
              <LoginInputVue text="you@example.com" type="email" @value="(e) => dataUser.email = e" />
            </div>

            <div v-if="formView === 'register'">
              <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-1.5">Username</label>
              <LoginInputVue text="Your name" type="text" @value="(e) => dataUser.username = e" />
            </div>

            <div v-if="formView === 'register'">
              <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-1.5">Mobile</label>
              <LoginInputVue text="+1 555 000 0000" type="text" @value="(e) => dataUser.mobile = e" />
            </div>

            <div>
              <label class="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-1.5">Password</label>
              <LoginInputVue text="••••••••" type="password" @value="(e) => dataUser.password = e" />
            </div>

            <div
              v-if="errorMessage"
              class="text-xs text-red-400 bg-red-500/10 border border-red-500/15 rounded-xl px-3 py-2.5"
              v-html="errorMessage"
            ></div>

            <button
              type="submit"
              class="w-full mt-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-[#0E0C0A] font-bold rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style="box-shadow: 0 0 20px rgba(245,158,11,0.2);"
              :disabled="useAuthStore.loading"
            >
              <svg v-if="useAuthStore.loading" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span v-if="formView === 'login'">Sign in</span>
              <span v-if="formView === 'register'">Create account</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Footer note -->
      <p class="text-center text-[11px] text-[#3D3425] mt-5">
        By continuing you agree to our
        <span class="text-[#5A4E42] hover:text-amber-500 cursor-pointer transition-colors">Terms</span>
        &amp;
        <span class="text-[#5A4E42] hover:text-amber-500 cursor-pointer transition-colors">Privacy Policy</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { authStore } from '@/stores/auth/authStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import LoginInputVue from '../General/LoginInput.vue';

const useAuthStore = authStore();
const formView = ref('login');
const router = useRouter();
const errorMessage = ref('');

const dataUser = reactive({
  email: '',
  password: '',
  username: '',
  mobile: '',
});

const loginOrRegister = async () => {
  if (formView.value === 'register') {
    userRegister();
  } else {
    const { success, error } = await checkUser();
    if (success) {
      toast.success('Login success');
    } else {
      errorMessage.value = error;
    }
  }
};

const checkUser = async () => {
  return useAuthStore.login({
    email: dataUser.email,
    password: dataUser.password,
  });
};

const userRegister = async () => {
  const { success, error } = await useAuthStore.register({
    email: dataUser.email,
    password: dataUser.password,
    mobile: dataUser.mobile,
    username: dataUser.username,
  });
  if (success) {
    router.push({ path: '/' });
  }
  if (error && !success) {
    errorMessage.value = error;
  }
};
</script>
