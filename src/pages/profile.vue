<template>
  <div class="profile-container">
    <div v-if="isLoading" class="loading">Yükleniyor...</div>
    <div v-else>
      <div v-if="userData" class="profile-card">
        <div class="profile-header">
          <img
            :src="userData.ProfilePicture"
            alt="Profile Picture"
            class="profile-picture"
          />
          <div class="profile-info">
            <h1 class="username">
              {{ userData.UserName }} {{ userData.UserLastName }}
            </h1>
            <h2 class="nickname">{{ userData.NickName }}</h2>
          </div>
        </div>
        <div class="profile-details">
          <p><strong>Email:</strong> {{ userData.UserEmail }}</p>
          <p><strong>Şifre:</strong> ***********</p>
          <p><strong>Puan:</strong> {{ userData.UserPoints }}</p>
        </div>
      </div>
      <div v-else class="loading">Lütfen hesabınıza giriş yapın.</div>
    </div>
  </div>
</template>

<script>
import axios from "@/store/api";
import { toast } from "vue-sonner";

export default {
  data() {
    return {
      userData: null,
      isAuthenticated: true, // Başlangıçta oturum açılmış kabul ediyoruz
      isLoading: true,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        this.isAuthenticated = false; // Token yoksa kullanıcıyı oturum açmamış olarak işaretle
        this.isLoading = false; // Yüklenme tamamlandı
        return;
      }

      const response = await axios.get(`/api/users/profile/`);

      if (response.data.profile.user && response.data.success) {
        this.userData = response.data.profile.user;
      } else {
        this.isAuthenticated = false; // Kullanıcı verisi yoksa oturum açmamış olarak işaretle
      }
    } catch (error) {
      this.isAuthenticated = false; // Hata durumunda oturum açmamış olarak işaretle
      toast.error("Bilgiler getirilirken hata oluştu.");
    } finally {
      this.isLoading = false; // İstek tamamlandıktan sonra yüklenme tamamlandı
    }
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  padding: 20px;
}

.profile-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 450px;
  max-width: 100%;
  text-align: center;
  padding: 30px;
  transition: transform 0.3s;
}

.profile-card:hover {
  transform: translateY(-10px);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 4px solid #3498db;
  transition: border-color 0.3s;
}

.profile-info {
  text-align: center;
}

.username {
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 5px;
}

.nickname {
  font-size: 20px;
  color: #666666;
  margin-bottom: 20px;
}

.profile-details {
  text-align: left;
}

.profile-details p {
  font-size: 16px;
  margin: 10px 0;
  color: #444444;
}

.profile-details p strong {
  font-weight: bold;
  color: #333333;
}

.loading {
  font-size: 18px;
  color: #555555;
}
/* profile.vue - Mobil uyumluluk için düzenlemeler */
.profile-container {
  padding: 10px; /* Mobil cihazlar için padding'i azalt */
}

.profile-card {
  width: 100%; /* Kart genişliğini mobil cihazlarda sınırlama */
  max-width: 400px; /* Maksimum genişliği mobil uyumluluk için azalt */
}

@media (max-width: 600px) {
  .profile-card {
    padding: 20px; /* Mobil cihazlar için daha dar padding */
  }
  .username {
    font-size: 24px; /* Mobilde başlık boyutunu küçült */
  }
  .nickname {
    font-size: 18px; /* Mobilde takma ad boyutunu küçült */
  }
}
</style>
