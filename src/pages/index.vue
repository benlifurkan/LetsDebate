<template>
  <v-container fluid>
    <!-- Etkinlik Kartları -->
    <v-row>
      <v-col v-for="(item, index) in events" :key="index" cols="12" md="3">
        <v-card class="mx-auto mb-5 event-card" max-width="350" elevation="4">
          <v-img
            :src="item.image"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <v-card-title class="text-white event-title">{{
              item.title
            }}</v-card-title>
          </v-img>

          <v-card-subtitle
            class="grey--text text--darken-1 text-subtitle-1 px-4 mt-3"
          >
            <v-avatar class="mr-2" size="24">
              <v-img :src="item.userImage" alt="User Avatar"></v-img>
            </v-avatar>
            {{ item.desc }} - {{ item.createdAt }}
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn
              icon
              class="action-btn"
              color="grey darken-1"
              v-tooltip.bottom="'Like'"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn
              icon
              class="action-btn"
              color="grey darken-1"
              v-tooltip.bottom="'Bookmark'"
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>

            <v-btn
              icon
              class="action-btn"
              color="grey darken-1"
              v-tooltip.bottom="'Share'"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Start Live Button -->
    <v-btn
      block
      large
      color="red darken-1"
      class="mt-4 py-3 white--text text-uppercase"
    >
      <v-icon left>mdi-video-outline</v-icon>
      Start Live
    </v-btn>
  </v-container>
</template>

<script>
import { axios } from "@/store/api";

export default {
  data() {
    return {
      events: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/api/topics/getrandomtentopics");
      const randomTopics = response.data.randomTopics;

      // API'den gelen verileri Vue bileşenindeki events dizisine aktar
      this.events = randomTopics.map((topic) => ({
        title: topic.TopicTitle,
        desc: topic.TopicDesc, // Konunun açıklaması
        createdAt: new Date(topic.CreatedDate).toLocaleDateString(), // Oluşturulma tarihini yerel tarih formatına çevir
        image: `https://picsum.photos/id/10/400/400`, // Eğer resim linki gelmiyorsa
        userImage: "https://via.placeholder.com/40", // Kullanıcı resmi gelmiyorsa
      }));
    } catch (error) {
      console.error("API'den veriler alınamadı:", error);
    }
  },
};
</script>

<style scoped>
/* Container for the cards */
.v-container {
  padding: 30px 50px;
  background-color: #f9f9f9;
}

/* Event card style */
.event-card {
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Event title style */
.event-title {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  padding: 10px;
}

/* Action buttons */
.action-btn {
  margin: 0 5px;
  transition: color 0.2s ease;
}

.action-btn:hover {
  color: #ff5252;
}

/* Start live button style */
.v-btn {
  font-weight: bold;
}

/* index.vue - Mobil uyumluluk için düzenlemeler */
.v-container {
  padding: 15px; /* Mobil cihazlar için daha dar padding */
  background-color: #f9f9f9;
}

.event-card {
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: #ffffff;
  margin: 10px auto; /* Kartlar arasında daha fazla boşluk bırak */
}

@media (max-width: 600px) {
  .event-card {
    max-width: 100%; /* Mobil cihazlarda kartın genişliğini sınırlama */
  }
  .v-container {
    padding: 5px; /* Mobil cihazlar için daha da dar padding */
  }
}
</style>
