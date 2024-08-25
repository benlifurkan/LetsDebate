<template>
  <div class="profile-container">
    <div v-if="user" class="profile-card">
      <div class="profile-header">
        <img
          :src="user.ProfilePicture"
          alt="Profile Picture"
          class="profile-picture"
        />
        <h1 class="username">{{ user.UserName }} {{ user.UserLastName }}</h1>
        <h2 class="nickname">{{ user.NickName }}</h2>
      </div>
      <div class="profile-details">
        <p><strong>Email:</strong> {{ user.UserEmail }}</p>
        <p><strong>Doğum Tarihi:</strong> {{ formattedDate }}</p>
        <p><strong>Puanlar:</strong> {{ user.UserPoints }}</p>
        <p><strong>Kullanıcı ID:</strong> {{ user.UserId }}</p>
        <p><strong>Oluşturulma Tarihi:</strong> {{ formattedCreatedDate }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    formattedDate() {
      return this.user
        ? new Date(this.user.DateOfBirth).toLocaleDateString("tr-TR")
        : "";
    },
    formattedCreatedDate() {
      return this.user
        ? new Date(this.user.CreatedDate).toLocaleDateString("tr-TR")
        : "";
    },
  },
  async created() {
    const userId = localStorage.getItem("userId");
    console.log("Kullanıcı ID:", userId);

    if (userId) {
      try {
        // const response = await axios.get(`/api/users/getUserById`, {
        //   params: {
        //     id: userId,
        //   },
        // });
        const response = await axios.get(`/users/getuserbyid/${userId}`);
        console.log(response.data);

        // Yanıtı işleme
        if (response.data) {
          console.log("Kullanıcı verisi alındı:", response.data);
          this.user = response.data;
        } else {
          console.error("Kullanıcı verisi bulunamadı.");
        }
      } catch (error) {
        console.error("Kullanıcı verisi alınırken hata oluştu:", error);
      }
    } else {
      console.error("Kullanıcı ID bulunamadı.");
      this.$router.push("/login");
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
  background-color: #f5f5f5;
  padding: 20px;
}

.profile-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
  text-align: center;
  padding: 20px;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.username {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333333;
}

.nickname {
  font-size: 18px;
  color: #777777;
}

.profile-details p {
  font-size: 16px;
  margin: 10px 0;
  color: #555555;
}

.profile-details p strong {
  font-weight: bold;
}
</style>
