<template>
  <Default>
    <div class="min-h-screen bg-bg-base px-6 py-8 xl:max-w-5xl xl:mx-auto">

      <!-- Page header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A4E42] mb-1">Settings</p>
          <h1 class="text-2xl font-semibold text-[#F5F0E8]">Profile</h1>
        </div>
        <a
          href="https://github.com/PepeGonzale/tfgdam-KanbasApp"
          target="_blank"
          class="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] text-[#6A5C4E] hover:text-[#F5F0E8] text-sm font-medium rounded-xl px-4 py-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>

      <!-- Avatar card -->
      <div class="bg-bg-card border border-white/[0.06] rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div class="relative shrink-0">
          <img
            v-if="useAuthStore.userData.imageUrl"
            :src="useAuthStore.userData.imageUrl"
            class="w-20 h-20 rounded-2xl object-cover border border-white/[0.10]"
            alt="Avatar"
          />
          <div
            v-else
            class="w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-2xl font-bold text-amber-400"
          >
            {{ useAuthStore.userData.username?.[0]?.toUpperCase() }}
          </div>
          <!-- Upload overlay -->
          <label class="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <input type="file" @change="(e: any) => uploadImage(e.target.files[0])" class="hidden" />
          </label>
        </div>
        <div class="text-center sm:text-left">
          <h2 class="text-lg font-semibold text-[#F5F0E8]">{{ useAuthStore.userData.username }}</h2>
          <p class="text-sm text-[#5A4E42] mt-0.5">{{ useAuthStore.userData.email }}</p>
          <div class="flex items-center justify-center sm:justify-start gap-3 mt-3">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Verified
            </span>
            <span class="text-xs text-[#5A4E42]">{{ store.boards.length }} project{{ store.boards.length !== 1 ? 's' : '' }}</span>
          </div>
        </div>
      </div>

      <!-- Forms grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Profile info form -->
        <UserForm @submit="updateUser">
          <div class="px-6 pt-6 pb-2">
            <h3 class="text-sm font-semibold text-[#F5F0E8] mb-1">Account information</h3>
            <p class="text-xs text-[#5A4E42] mb-5">Update your display name and email address.</p>
            <ProfileInput label="Name" v-model="userCredentials.username">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="14" height="14" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </ProfileInput>
            <ProfileInput label="Email" v-model="userCredentials.email">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
              </svg>
            </ProfileInput>
          </div>
        </UserForm>

        <!-- Password form -->
        <UserForm @submit="handlePassword">
          <div class="px-6 pt-6 pb-2">
            <h3 class="text-sm font-semibold text-[#F5F0E8] mb-1">Change password</h3>
            <p class="text-xs text-[#5A4E42] mb-5">Use a strong password with at least 8 characters.</p>
            <ProfileInput type="password" label="Current password" v-model="credentials.curr_password">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="14" height="14" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </ProfileInput>
            <ProfileInput type="password" label="New password" v-model="credentials.new_password">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="14" height="14" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </ProfileInput>
            <ProfileInput type="password" label="Confirm new password" v-model="credentials.confirm_password">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="14" height="14" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </ProfileInput>
          </div>
        </UserForm>

      </div>
    </div>
  </Default>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { authStore } from '@/stores/auth/authStore';
import UserForm from '@/components/Profile/UserForm.vue';
import { auth } from '@/helpers/auth';
import { useStore } from '@/stores/store';
import { toast } from 'vue-sonner';
import Default from '@/layouts/Default.vue';
import ProfileInput from '@/components/Profile/ProfileInput.vue';

const useAuthStore = authStore();
const store = useStore();
const credentials = reactive({ curr_password: '', new_password: '', confirm_password: '' });
const userCredentials = reactive({ email: '', username: '' });

onMounted(async () => {
  store.fetchBoards();
  await useAuthStore.fetchUserInfo();
});

const handlePassword = async () => {
  await useAuthStore.changeUserPassword(credentials)
    .then(() => toast.success('Password updated successfully'))
    .catch((err) => toast.error(err.response?.data?.message || 'Error updating password'));
};

const uploadImage = async (file: any) => {
  const bucket = 'tfg-kanban-app';
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', useAuthStore.userData._id);
  await auth.post(`/user/image/${bucket}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => { useAuthStore.userData.imageUrl = res.data.image; });
};

const updateUser = async () => {
  await auth.post('/update', { email: userCredentials.email, username: userCredentials.username })
    .then(() => toast.success('Profile updated'));
};
</script>
