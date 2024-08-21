<template>
  <v-container fluid>
    <!-- Etkinlik Kartları -->
    <v-row>
      <v-col v-for="(item, index) in events" :key="index" cols="12" md="3">
        <v-card
          class="mx-auto mb-2"
          max-width="500"
          style="background: light; border: none"
        >
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
                <v-img
                  :src="item.image"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="400px"
                  cover
                >
                  <v-card-title class="text-white">{{
                    item.title
                  }}</v-card-title>
                </v-img>

                <v-card-subtitle class="grey--text text--darken-2 mt-2">
                  <v-avatar class="mr-2" size="24">
                    <v-img :src="item.userImage" alt="User Avatar"></v-img>
                  </v-avatar>
                  {{ item.status }} - {{ item.createdAt }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="medium-emphasis"
                    icon="mdi-heart"
                    size="small"
                  ></v-btn>

                  <v-btn
                    color="medium-emphasis"
                    icon="mdi-bookmark"
                    size="small"
                  ></v-btn>

                  <v-btn
                    color="medium-emphasis"
                    icon="mdi-share-variant"
                    size="small"
                  ></v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
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
  <v-container>
    <v-row>
      <iframe
        src="https://www.jigsawplanet.com/?rc=play&amp;pid=1a240ca29994&amp;view=iframe"
        style="width: 100%; height: 600px"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </v-row>
  </v-container>
</template>
<script>
import { axios } from "@/store/api";

export default {
  data() {
    return {
      events: [], // Başlangıçta boş olan events dizisi
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/api/rooms");
      const rooms = response.data;

      // API'den gelen verileri Vue bileşenindeki events dizisine aktar
      this.events = rooms.map((room) => ({
        title: room.roomName,
        status: room.roomStatus, // Kullanıcı adı gelmediği için varsayılan bir değer
        createdAt: "", // Lokasyon bilgisi de eklenebilir
        likes: "0", // Varsayılan bir like değeri
        image: "https://via.placeholder.com/400", // Eğer resim linki gelmiyorsa
        userImage: "https://via.placeholder.com/40", // Kullanıcı resmi gelmiyorsa
        isLive: room.roomStatus === "Basladı", // Durumuna göre canlı olup olmadığını kontrol et
      }));
    } catch (error) {
      console.error("API'den veriler alınamadı:", error);
    }
  },
};
</script>

<style scoped>
.text-lg {
  font-size: 1.25rem;
}

.v-card--active {
  border-left: 4px solid red;
}
</style>
