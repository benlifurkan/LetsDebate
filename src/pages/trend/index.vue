<template>
  <v-container>
    <h1 class="text-center mb-6">Güncel Trendler</h1>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="(trend, index) in trendler"
        :key="index"
      >
        <v-card class="trend-card">
          <v-img
            :src="trend.mediaThumb"
            alt="trend görseli"
            height="200px"
            class="rounded-t-md"
          ></v-img>
          <v-card-title class="headline text-primary">{{
            trend.title
          }}</v-card-title>
          <v-card-subtitle class="text--secondary">{{
            trend.summary
          }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { parse } from "node-html-parser";

// Trend verisi için bir arayüz tanımlıyoruz
interface Trend {
  title: string;
  summary: string;
  mediaThumb: string;
  link: string;
}

// Trendler dizisini tipliyoruz
const trendler = ref<Trend[]>([]);

const fetchTrends = async () => {
  const response = await fetch(
    "https://opentodebate.org/debates/trending/"
  ).then((res) => res.text());

  const root = parse(response);
  const titles = root.querySelectorAll(".title");
  const summaries = root.querySelectorAll(".summary");
  const mediaElements = root.querySelectorAll(".media-thumb");

  const postsArray: Trend[] = [];

  titles.forEach((titleElement, index) => {
    const title = titleElement.text.trim();
    const summary = summaries[index]?.text.trim() || "Özet bilgisi bulunamadı.";
    const link = titleElement.closest("a")?.getAttribute("href") || "#";

    // Style içinde background-image url'i alınıyor
    const styleAttr = mediaElements[index]?.getAttribute("style") || "";
    const mediaThumbMatch = styleAttr.match(
      /background-image:\s*url\(['"]?([^'"]+)['"]?\)/
    );
    const mediaThumb = mediaThumbMatch
      ? mediaThumbMatch[1]
      : "https://via.placeholder.com/1920x1080"; // Placeholder

    postsArray.push({
      title,
      summary,
      mediaThumb,
      link,
    });
  });

  trendler.value = postsArray;
};

onMounted(() => {
  fetchTrends();
});
</script>

<style scoped>
.trend-card {
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  background-color: #ffffff;
  color: white;
  border: 1px solid #333;
  margin-bottom: 1rem;
  padding: 1rem;
  height: 500px;
}

.trend-card:hover {
  transform: translateY(-5px);
}

.v-card-title {
  font-weight: 700;
  font-size: 1rem;
  margin-top: 1rem;
  text-wrap: balance;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.v-card-subtitle {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.7);
  text-align: justify;
  text-justify: inter-word;
  text-wrap: balance;
  overflow: hidden;
}

.text-center {
  text-align: center;
}

.mb-6 {
  margin-bottom: 24px;
}
</style>
