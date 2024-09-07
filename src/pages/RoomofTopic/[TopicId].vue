<template>
  <v-container fluid>
    <!-- Odalar Kartları -->
    <v-row>
      <v-col v-for="(room, index) in rooms" :key="index" cols="12" md="4">
        <v-card class="mx-auto mb-5 room-card" max-width="350" elevation="4">
          <v-card-title class="headline">{{
            room.Topic.TopicTitle
          }}</v-card-title>

          <v-card-subtitle
            class="grey--text text--darken-1 text-subtitle-1 px-4 mt-3"
          >
            {{ room.Topic.TopicDesc }}
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text>
            <p>Status: {{ room.RoomStatus.StatusName }}</p>
            <p>Duration Limit: {{ room.DurationLimit }} minutes</p>
            <p>Total Duration: {{ room.TotalDuration }} minutes</p>
            <p>
              Created Date:
              {{ new Date(room.CreatedDate).toLocaleDateString() }}
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="joinRoom(room.RoomId)"
              >Join Room</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Geri Dön Butonu -->
    <v-btn
      block
      large
      color="blue darken-1"
      class="mt-4 py-3 white--text text-uppercase"
      @click="goBack"
    >
      <v-icon style="margin-right: 6px" left>mdi-arrow-left</v-icon>
      Geri Dön
    </v-btn>
  </v-container>
</template>

<script>
import axios from "@/store/api"; // Axios'u doğru şekilde içe aktarın

export default {
  data() {
    return {
      rooms: [],
      TopicId: null, // Konu ID'sini saklamak için bir alan
    };
  },
  async created() {
    this.TopicId = this.$route.params.TopicId; // Route parametresinden TopicId'yi al
    console.log(this.$route.params);
    if (this.TopicId) {
      await this.fetchRoomsByTopicId();
    }
  },
  methods: {
    async fetchRoomsByTopicId() {
      try {
        const response = await axios.get(
          `api/rooms/getRoomsByTopicId/${this.TopicId}`
        );

        console.log(response.data);

        console.log(response.data);

        if (response.data && response.data.rooms) {
          this.rooms = response.data.rooms;
        }
      } catch (error) {
        console.error("API'den odalar alınamadı:", error);
      }
    },
    joinRoom(RoomId) {
      this.$router.push(`/rooms/${RoomId}`);
    },
    goBack() {
      // Kullanıcıyı önceki sayfaya yönlendir
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* Stil dosyanız burada kalacak */
</style>
