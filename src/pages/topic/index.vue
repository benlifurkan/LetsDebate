<template>
  <v-row justify="center" class="mt-10">
    <v-col cols="12" md="10">
      <h3 class="font-weight-bold mb-4 text-center">Tüm Konular</h3>

      <!-- Skeleton Loader: Konular yüklenirken gösterilir -->
      <v-skeleton-loader
        v-if="topics.loading"
        class="mt-5"
        type="card"
        loading
        elevation="4"
      ></v-skeleton-loader>

      <!-- Konu Tablosu: Yükleme tamamlandığında gösterilir -->
      <v-data-table
        v-else
        :headers="headers"
        :items="topics.list"
        item-key="TopicId"
        class="elevation-1"
      >
        <template v-slot:item.CreatedDate="{ item }">
          {{ new Date(item.CreatedDate).toLocaleDateString() }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
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

// Tablo başlıkları
const headers = [
  { title: "Topic ID", key: "TopicId" },
  { title: "Başlık", key: "TopicTitle" },
  { title: "Açıklama", key: "TopicDesc" },
  { title: "Oluşturulma Tarihi", key: "CreatedDate" },
];

// Sayfa yüklendiğinde konuları getir
onMounted(async () => {
  await fetchTopics();
});

// API'den konuları getir
const fetchTopics = async () => {
  topics.loading = true;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/api/topics/getAllTopics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data); // Yanıtı konsola yazdır

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
      console.error("Konular alınamadı", response.data);
    }
  } catch (error) {
    toast.error("Konular alınırken bir hata oluştu");
    console.error("Konular alınırken bir hata oluştu", error);
  } finally {
    topics.loading = false;
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mt-10 {
  margin-top: 10px;
}
</style>
