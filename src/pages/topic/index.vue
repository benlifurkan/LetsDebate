<template>
  <v-container fluid class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h3 class="font-weight-bold mb-8 text-center display-1 title">
          Tüm Konular
        </h3>

        <!-- Arama Alanı -->
        <v-text-field
          v-model="search"
          label="Konularda Ara"
          solo
          prepend-inner-icon="mdi-magnify"
          class="mb-8"
        ></v-text-field>

        <!-- Skeleton Loader: Konular yüklenirken gösterilir -->
        <v-skeleton-loader
          v-if="topics.loading"
          class="mt-5 rounded-lg"
          type="card"
          loading
          elevation="8"
          height="60"
          tile
          :lines="5"
        ></v-skeleton-loader>

        <!-- Konu Kartları: Yükleme tamamlandığında gösterilir -->
        <v-row v-else class="topic-cards" align="center">
          <!-- Filtrelenmiş Konu Kartlarını Döngüye Sok -->
          <v-col
            v-for="(topic, index) in filteredTopics"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="d-flex"
          >
            <v-card
              class="mx-auto mb-6 rounded-lg hover-card"
              elevation="10"
              max-width="400"
              style="padding-top: 10px"
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                height="200px"
                class="rounded-top"
              ></v-img>
              <v-card-title class="headline font-weight-bold mb-2">
                {{ topic.TopicTitle }}
              </v-card-title>
              <v-card-subtitle class="grey--text text--darken-1">
                {{ topic.TopicDesc }}
              </v-card-subtitle>

              <v-divider></v-divider>

              <v-card-actions>
                <v-chip
                  style="font-size: 12px"
                  color="blue lighten-4"
                  class="ma-1"
                >
                  ID: {{ topic.TopicId }}
                </v-chip>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from "vue";
import { toast } from "vue-sonner";
import axios from "@/store/api";

// Konu veri yapısını tanımla
interface Topic {
  TopicId: string;
  TopicTitle: string;
  CreatedDate: Date;
  TopicDesc: string;
}

// Konuların saklandığı ve yüklenme durumunun tutulduğu reaktif obje
const topics = reactive<{
  list: Topic[];
  loading: boolean;
}>({
  list: [], // Başlangıçta boş bir liste
  loading: false, // Başlangıçta yüklenmiyor
});

// Arama alanı için model
const search = ref("");

// Filtrelenmiş konular
const filteredTopics = computed(() =>
  topics.list.filter(
    (topic) =>
      topic.TopicTitle.toLowerCase().includes(search.value.toLowerCase()) ||
      topic.TopicDesc.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Sayfa yüklendiğinde konuları getir
onMounted(async () => {
  await fetchTopics();
});

// API'den konuları getir
const fetchTopics = async () => {
  topics.loading = true;

  try {
    const response = await axios.get(`/api/topics/getAllTopic`);

    // Yanıtın bir nesne olduğunu ve içinde "topics" dizisinin bulunduğunu kontrol et
    if (response.data && response.status === 200) {
      if (response.data.success && Array.isArray(response.data.topics)) {
        // Yanıt başarıyla geldiyse ve "topics" bir dizi ise
        topics.list = response.data.topics;
      } else {
        throw new Error(
          "Yanıt geçerli bir formatta değil veya 'topics' bir dizi değil"
        );
      }
    } else {
      toast.error("Konular alınamadı: Yanıt yapısı geçersiz");
    }
  } catch (error) {
    toast.error("Konular alınırken bir hata oluştu");
  } finally {
    topics.loading = false;
  }
};
</script>

<style scoped>
.title {
  color: #3f51b5;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.hover-card {
  border-radius: 12px;
  overflow: hidden;
}

.v-card-title {
  font-size: 1.25rem;
}

.v-card-subtitle {
  font-size: 0.875rem;
}

.topic-cards {
  display: flex;
  flex-wrap: wrap;
}

.v-chip {
  font-size: 0.75rem;
}

.mb-8 {
  margin-bottom: 8px;
}
</style>
