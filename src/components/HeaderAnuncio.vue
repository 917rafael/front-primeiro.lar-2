
        <script setup>
        import { ref } from 'vue'
        import { useRouter } from 'vue-router'

        const router = useRouter()

        const isLoggedIn = ref(false)
        const userImage = ref(null)
        const defaultProfile = '/default-avatar.png'

        function handleProfileClick() {
          if (isLoggedIn.value) {
            // router.push('/perfil')
          } else {
            router.push('/')
          }
        }
        </script>
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="app-header">
    <div class="header-left" @click="$router.push('/')">
      <!-- <img src="@/assets/logo.png" alt="Logo" class="logo" /> -->
      <h1 class="company-name">Primeiro Lar</h1>
    </div>

    <div class="header-right">
      <div class="profile-icon" @click="handleProfileClick">
        <img
          v-if="isLoggedIn"
          :src="userImage || defaultProfile"
          alt="Perfil"
          class="avatar"
        />
        <i v-else class="fa-regular fa-user"></i>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-left {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.6rem;
}

.logo {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.08);
}

.company-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e60023;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.company-name:hover {
  color: #c4001c;
}

.header-right {
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 1px #ddd;
}

.profile-icon:hover {
  background: #e60023;
  transform: scale(1.05);
}

.profile-icon:hover i {
  color: #fff;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.profile-icon i {
  font-size: 1.4rem;
  color: #666;
  transition: color 0.3s ease;
}

/* Responsivo */
@media (max-width: 768px) {
  .company-name {
    font-size: 1.1rem;
  }

  .app-header {
    padding: 0 1rem;
  }

  .logo {
    height: 40px;
    width: 40px;
  }
}

@media (max-width: 480px) {
  .company-name {
    display: none;
  }
}
</style>
