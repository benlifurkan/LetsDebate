<template>
  <v-row justify="center" class="mt-10">
    <v-col cols="12" md="8" lg="6">
      <h3 class="font-weight-bold mb-4 text-center">Yeni Konu Oluştur</h3>

      <v-form @submit.prevent="handleCreateTopic">
        <v-text-field
          v-model="topic.title"
          label="Konu Başlığı"
          variant="outlined"
          required
        />

        <v-textarea
          v-model="topic.description"
          label="Konu Açıklaması"
          variant="outlined"
          rows="5"
          required
        />

        <v-btn
          type="submit"
          variant="tonal"
          color="success"
          :loading="loading.create"
          class="mt-4 text-transform"
          block
        >
          Oluştur
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { axios } from "@/store/api";
import { toast } from "vue-sonner";

// Router ve reaktif veri yapısını tanımla
const router = useRouter();

const topic = reactive({
  title: "",
  description: "",
});

const loading = reactive({
  create: false,
});

// Form gönderim işlemi
const handleCreateTopic = async () => {
  if (!topic.title || !topic.description) {
    return toast.error("Lütfen tüm alanları doldurun");
  }

  loading.create = true;

  try {
    // API isteği
    const response = await axios.post("/api/topics/createTopic", {
      TopicTitle: topic.title,
      TopicDesc: topic.description,
    });

    // API yanıtını konsola yazdır
    console.log("API Response:", response);

    // Başarılı yanıt kontrolü
    if (response.data && response.status == 201) {
      toast.success("Konu başarıyla oluşturuldu!");
      console.log("Konu başarıyla oluşturuldu!", response.data);

      // Kullanıcıyı konular sayfasına yönlendir
      router.push("/topic");
    } else if (response.data && response.status == 203) {
      toast.error(
        "Sunucudan olumlu yanıt geldi fakat işlem sırasında bir şeyler değiştirilmiş olabilir."
      );
    } else if (response.data && response.status == 204) {
      toast.error(
        "İçerik Yok! Sunucu isteği başarıyla işledi ve herhangi bir içerik döndürmüyor."
      );
      console.error(response.data);
    } else if (response.data && response.status == 400) {
      toast.error("Kötü İstek!");
      console.error(response.data);
    } else if (response.data && response.status == 401) {
      toast.error("	Yetkisiz İstek!");
      console.error(response.data);
    } else if (response.data && response.status == 403) {
      toast.error("	Forbidden!");
      console.error(response.data);
    } else if (response.data && response.status == 404) {
      toast.error("Not found!");
      console.error(response.data);
    } else if (response.data && response.status == 500) {
      toast.error("İç Sunucu Hatası!");
      console.error(response.data);
    } else if (response.data && response.status == 502) {
      toast.error("Kötü Ağ Geçidi!");
      console.error(response.data);
    } else if (response.data && response.status == 503) {
      toast.error("Hizmet Kullanılamıyor!");
      console.error(response.data);
    } else if (response.data && response.status == 505) {
      toast.error("HTTP Sürümü Desteklenmiyor!");
      console.error(response.data);
    }
    console.error("Konu oluşturulamadı", response.data);
  } catch (error) {
    toast.error("Konu oluşturulurken bir hata oluştu");
    console.error("Konu oluşturulurken bir hata oluştu", error);
  } finally {
    loading.create = false;
  }
};
</script>

<style scoped>
/* Sayfanın stilini düzenleyin */
.text-center {
  text-align: center;
}
.mt-10 {
  margin-top: 10px;
}

.text-transform {
  text-transform: inherit;
}
</style>
