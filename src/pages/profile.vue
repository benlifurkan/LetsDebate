<template>
  <div class="profile-container">
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
        <p><strong>Puanlar:</strong> {{ userData.UserPoints }}</p>
        <p><strong>Kullanıcı ID:</strong> {{ userData.UserId }}</p>
      </div>
    </div>
    <div v-else class="loading">
      <v-skeleton-loader
        style="padding: 0px 100px 0px 100px"
        width="600px"
        height="100vh"
        type="card"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { axios } from "@/store/api";

export default {
  data() {
    return {
      userData: null,
    };
  },
  async created() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`api/users/getuserbyid/${userId}`, {});
      console.log(response.data);

      if (response.data) {
        console.log("Kullanıcı verisi alındı:", response.data);
        this.userData = response.data;
      } else {
        console.error("Kullanıcı verisi bulunamadı.");
      }
    } catch (error) {
      console.error("Kullanıcı verisi alınırken hata oluştu:", error);
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
</style>
