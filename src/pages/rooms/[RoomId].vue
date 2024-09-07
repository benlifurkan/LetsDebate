<template>
  <div class="flex h-screen">
    <!-- Chat Box - Solda -->
    <div class="w-1/4 bg-gray-200 p-4">
      <h3 class="text-lg font-semibold">Chat</h3>
      <div class="mt-4 h-full bg-white shadow-md rounded-lg p-4">
        <p class="text-sm text-gray-600">Chat burada olacak (Pasif durumda).</p>
      </div>
    </div>

    <!-- Kamera - Ortada -->
    <div class="w-2/4 flex flex-col items-center overflow-hidden bg-gray-100">
      <div
        class="bg-black w-full h-3/4 rounded-lg flex items-center justify-center"
      >
        <video
          ref="videoRef"
          autoplay
          playsinline
          muted
          class="w-full h-full object-cover rounded-lg pointer-events-none"
          :controls="false"
        />
      </div>

      <!-- Kamera, Mikrofon ve Çıkış Cihazı Seçimi -->
      <div class="mt-4 grid lg:grid-cols-3 gap-4 px-3">
        <select
          class="p-2 rounded border border-gray-300"
          v-model="selectedDeviceId.camera"
        >
          <option
            v-for="device in cameras"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            {{ device.label || `Kamera ${device.deviceId}` }}
          </option>
        </select>

        <select
          class="p-2 rounded border border-gray-300"
          v-model="selectedDeviceId.microphone"
        >
          <option
            v-for="device in microphones"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            {{ device.label || `Mikrofon ${device.deviceId}` }}
          </option>
        </select>

        <select
          class="p-2 rounded border border-gray-300"
          v-model="selectedDeviceId.output"
        >
          <option
            v-for="device in speakers"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            {{ device.label || `Hoparlör ${device.deviceId}` }}
          </option>
        </select>
      </div>
    </div>

    <!-- Oda Bilgileri - Sağda -->
    <div class="w-1/4 bg-gray-200 p-4">
      <h3 class="text-lg font-semibold">Oda Bilgileri</h3>
      <div class="mt-4 bg-white shadow-md rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-2">
          Topic: {{ room?.Topic?.TopicTitle }}
        </h3>
        <p class="text-sm text-gray-600 mb-1">
          Description: {{ room?.Topic?.TopicDesc }}
        </p>
        <p class="text-sm text-gray-600 mb-1">
          Status: {{ room?.RoomStatus?.StatusName }}
        </p>
        <p class="text-sm text-gray-600 mb-1">
          Duration Limit:
          {{ room?.DurationLimit ? `${room.DurationLimit} minutes` : "N/A" }}
        </p>
        <p class="text-sm text-gray-600 mb-1">
          Total Duration:
          {{ room?.TotalDuration ? `${room.TotalDuration} minutes` : "N/A" }}
        </p>
        <p class="text-sm text-gray-600">
          Created On: {{ new Date(room.CreatedDate).toLocaleDateString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, watch, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "@/store/api"; // Axios'u doğru şekilde içe aktarın
import { useDevicesList, useUserMedia } from "@vueuse/core";

interface Room {
  Topic: {
    TopicTitle: string;
    TopicDesc: string;
  };
  RoomStatus: {
    StatusName: string;
  };
  DurationLimit: number;
  TotalDuration: number;
  CreatedDate: string;
}

const route = useRoute();
const RoomId = route.params.RoomId;
const room = ref<Room>({} as Room);

const videoRef = ref<HTMLVideoElement>();

const selectedDeviceId = reactive({
  camera: "",
  microphone: "",
  output: "",
});

const {
  videoInputs: cameras,
  audioInputs: microphones,
  audioOutputs: speakers,
} = useDevicesList({
  requestPermissions: true,
});

watchEffect(() => {
  if (!selectedDeviceId.camera && cameras.value)
    selectedDeviceId.camera = cameras.value[0]?.deviceId;

  if (!selectedDeviceId.microphone && microphones.value)
    selectedDeviceId.microphone = microphones.value[0]?.deviceId;

  if (!selectedDeviceId.output && speakers.value)
    selectedDeviceId.output = speakers.value[0]?.deviceId;
});

const currentCamera = computed(() => selectedDeviceId.camera);

const { stream, start, stop } = useUserMedia({
  constraints: {
    // @ts-ignore-next-line
    video: { deviceId: currentCamera },
    audio: false,
  },
});

const fetchRoomData = async () => {
  try {
    const response = await axios.get(`api/rooms/getRoomById/${RoomId}`);
    room.value = response.data.room;
  } catch (error) {
    console.error("Veri alınırken hata oluştu:", error);
  }
};

onMounted(async () => {
  await fetchRoomData(); // Oda verilerini çek
  start();
});

watchEffect(() => {
  if (!videoRef.value || !stream.value) return;
  videoRef.value.srcObject = stream.value;
});

watch(
  () => selectedDeviceId.camera,
  () => {
    stop();
    start();
  }
);
</script>
