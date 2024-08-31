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
    <div class="w-2/4 flex flex-col items-center bg-gray-100">
      <div
        class="bg-black w-full h-3/4 rounded-lg flex items-center justify-center"
      >
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full h-full object-cover rounded-lg"
          controls
        ></video>
      </div>
      <!-- Kamera, Mikrofon ve Çıkış Cihazı Seçimi -->
      <div class="mt-4 flex space-x-4">
        <select
          class="p-2 rounded border border-gray-300"
          v-model="selectedVideoDevice"
          @change="getUserMedia"
        >
          <option
            v-for="device in videoDevices"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            {{ device.label || `Kamera ${device.deviceId}` }}
          </option>
        </select>
        <select
          class="p-2 rounded border border-gray-300"
          v-model="selectedAudioDevice"
          @change="getUserMedia"
        >
          <option
            v-for="device in audioDevices"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            {{ device.label || `Mikrofon ${device.deviceId}` }}
          </option>
        </select>
        <select
          class="p-2 rounded border border-gray-300"
          v-model="selectedOutputDevice"
          @change="changeAudioOutput"
        >
          <option
            v-for="device in outputDevices"
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

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "@/store/api"; // Axios'u doğru şekilde içe aktarın

export default {
  setup() {
    const route = useRoute();
    const RoomId = route.params.RoomId;
    const room = ref({});
    const videoDevices = ref([]);
    const audioDevices = ref([]);
    const outputDevices = ref([]);
    const selectedVideoDevice = ref("");
    const selectedAudioDevice = ref("");
    const selectedOutputDevice = ref("");
    const videoRef = ref(null);

    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`api/rooms/getRoomById/${RoomId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        room.value = response.data.room;
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    };

    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        videoDevices.value = devices.filter(
          (device) => device.kind === "videoinput"
        );
        audioDevices.value = devices.filter(
          (device) => device.kind === "audioinput"
        );
        outputDevices.value = devices.filter(
          (device) => device.kind === "audiooutput"
        );

        selectedVideoDevice.value = videoDevices.value[0]?.deviceId || "";
        selectedAudioDevice.value = audioDevices.value[0]?.deviceId || "";
        selectedOutputDevice.value = outputDevices.value[0]?.deviceId || "";
      } catch (error) {
        console.error("Cihazları listelerken hata oluştu:", error);
      }
    };

    const getUserMedia = async () => {
      try {
        const constraints = {
          video: selectedVideoDevice.value
            ? { deviceId: { exact: selectedVideoDevice.value } }
            : true,
          audio: selectedAudioDevice.value
            ? { deviceId: { exact: selectedAudioDevice.value } }
            : true,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.value) {
          videoRef.value.srcObject = stream;

          // Tarayıcının video oynatmayı otomatik başlatmasına izin vermesi için
          videoRef.value.onloadedmetadata = () => {
            videoRef.value.play();
          };
        } else {
          console.error("Video elementi bulunamadı.");
        }
      } catch (error) {
        console.error("Kamera veya mikrofon erişim hatası:", error);
      }
    };

    const changeAudioOutput = async () => {
      if (videoRef.value && typeof videoRef.value.setSinkId !== "undefined") {
        try {
          await videoRef.value.setSinkId(selectedOutputDevice.value);
        } catch (error) {
          console.warn("Hoparlör değiştirilemedi:", error);
        }
      } else {
        console.warn("Tarayıcı hoparlör seçim desteği sağlamıyor.");
      }
    };

    onMounted(async () => {
      await fetchRoomData(); // Oda verilerini çek
      await getDevices(); // Cihazları listele
      await getUserMedia(); // Kamera ve mikrofon akışını başlat
    });

    return {
      room,
      videoDevices,
      audioDevices,
      outputDevices,
      selectedVideoDevice,
      selectedAudioDevice,
      selectedOutputDevice,
      videoRef,
      getUserMedia,
      changeAudioOutput,
    };
  },
};
</script>

<style scoped>
/* Stil dosyanız burada kalacak */
</style>
