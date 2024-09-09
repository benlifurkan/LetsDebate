<template>
  <v-container fluid>
    <!-- Etkinlik Kartları -->
    <v-row>
      <v-col
        v-for="(item, index) in events"
        :key="index"
        cols="12"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto mb-5 event-card hover-card"
          max-width="350"
          elevation="6"
          @click="handleTopicClick(item.TopicId)"
          outlined
        >
          <!-- Etkinlik Resmi -->
          <v-img
            :src="item.image"
            class="event-image"
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.7)"
            height="220px"
            cover
          >
            <v-card-title
              style="font-size: 20px"
              class="font-weight-bold white--text text-shadow"
            >
              {{ item.title }}
            </v-card-title>
          </v-img>

          <!-- Kart Bilgileri -->
          <v-card-subtitle
            class="grey--text text--darken-1 text-subtitle-1 px-4 py-2"
          >
            <v-avatar class="mr-2" size="30">
              <v-img :src="item.userImage" alt="User Avatar"></v-img>
            </v-avatar>
            <span class="text--primary font-weight-medium">{{
              item.desc
            }}</span>
            <br />
            <small class="text--grey">{{
              new Date(item.createdAt).toLocaleDateString()
            }}</small>
          </v-card-subtitle>

          <!-- Aksiyon Butonları -->
          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-between px-4">
            <v-btn
              icon
              class="action-btn"
              color="red darken-2"
              v-tooltip.bottom="'Beğen'"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              class="action-btn"
              color="blue darken-2"
              v-tooltip.bottom="'Kaydet'"
            >
              <v-icon>mdi-bookmark-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              class="action-btn"
              color="green darken-2"
              v-tooltip.bottom="'Paylaş'"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Oda Aç Butonu -->
    <v-btn
      block
      large
      color="primary"
      class="mt-6 py-3 white--text text-uppercase open-room-btn"
      elevation="5"
    >
      <v-icon style="margin-right: 6px" left>mdi-video-outline</v-icon>
      Oda Aç
    </v-btn>
  </v-container>
</template>

<script>
import axios from "@/store/api";

export default {
  data() {
    return {
      events: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/api/topics/getrandomtwelvetopics");

      let randomTopics = [];

      if (response.data && response.data.success) {
        randomTopics = response.data.randomTopics;
      }

      this.events = randomTopics.map((topic) => ({
        TopicId: topic.TopicId,
        title: topic.TopicTitle,
        desc: topic.TopicDesc,
        createdAt: new Date(topic.CreatedDate).toLocaleDateString(),
        image: `https://picsum.photos/id/10/400/400`,
        userImage: "https://via.placeholder.com/40",
      }));
    } catch (error) {
      console.error("API'den veriler alınamadı:", error);
    }
  },
  methods: {
    handleTopicClick(TopicId) {
      this.$router.push(`/RoomofTopic/${TopicId}`);
    },
  },
};
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.event-image {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.text-shadow {
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.8);
}
.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.open-room-btn {
  font-weight: bold;
  font-size: 18px;
}
</style>
