<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Hoş Geldin!</h2>
        <p class="mt-2 text-gray-600">Lütfen Let's Debate'e kayıt ol</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label
              for="UserName"
              class="block text-sm font-medium text-gray-700"
              >Ad</label
            >
            <input
              v-model="UserName"
              id="UserName"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Adınız"
            />
          </div>
          <div>
            <label
              for="UserLastName"
              class="block text-sm font-medium text-gray-700"
              >Soyad</label
            >
            <input
              v-model="UserLastName"
              id="UserLastName"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Soyadınız"
            />
          </div>
          <div>
            <label
              for="NickName"
              class="block text-sm font-medium text-gray-700"
              >Kullanıcı Adı</label
            >
            <input
              v-model="NickName"
              id="NickName"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Kullanıcı adınız"
            />
          </div>
          <div>
            <label
              for="UserEmail"
              class="block text-sm font-medium text-gray-700"
              >E-posta</label
            >
            <input
              v-model="UserEmail"
              id="UserEmail"
              type="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              for="UserPassword"
              class="block text-sm font-medium text-gray-700"
              >Şifre</label
            >
            <input
              v-model="UserPassword"
              id="UserPassword"
              type="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              for="DateOfBirth"
              class="block text-sm font-medium text-gray-700"
              >Doğum Tarihi</label
            >
            <input
              v-model="DateOfBirth"
              id="DateOfBirth"
              type="date"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              for="ProfilePicture"
              class="block text-sm font-medium text-gray-700"
              >Profil Resmi Yolu</label
            >
            <input
              v-model="ProfilePicture"
              id="ProfilePicture"
              type="text"
              placeholder="Dosya yolunu girin"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md focus:outline-none"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { toast } from "vue-sonner";
import axios from "@/store/api";

export default {
  data() {
    return {
      UserName: "",
      UserLastName: "",
      NickName: "",
      UserEmail: "",
      UserPassword: "",
      DateOfBirth: "",
      ProfilePicture: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Doğum tarihini "yyyy.mm.dd" formatına çevir
        const formattedDateOfBirth = new Date(
          this.DateOfBirth
        ).toLocaleDateString("en-CA");

        // FormData oluştur
        const data = {
          UserName: this.UserName,
          UserLastName: this.UserLastName,
          NickName: this.NickName,
          UserEmail: this.UserEmail,
          UserPassword: this.UserPassword,
          UserPoints: 0, // Varsayılan değer
          RoleId: "780C0F03-0CEA-4016-A80C-EA7B9C05E71F", // Varsayılan değer
          DateOfBirth: formattedDateOfBirth,
          ProfilePicture: this.ProfilePicture, // Dosya yolu
        };

        // API'ya POST isteği gönderin
        const response = await axios.post("/api/auth/register", data);

        // API yanıtını kontrol edin
        if (response.data.user && response.data.success) {
          toast.success("Kayıt başarılı!");
          // Başarılı kayıt sonrası yapılacak işlemler, örneğin giriş sayfasına yönlendirme
          this.$router.push("../panel/login");
        } else {
          toast.error("Kayıt başarısız: Geçersiz yanıt yapısı");
          console.error("Kayıt başarısız", response.data);
        }
      } catch (error) {
        toast.error("Kayıt sırasında bir hata oluştu");

        // Hata durumunda gelen yanıtı loglayın
        if (error.response) {
          console.error("Error Response:", error.response);
          console.error("Error Data:", error.response.data); // Sunucudan dönen hata mesajı
          console.error("Error Status:", error.response.status); // HTTP durum kodu
          console.error("Error Headers:", error.response.headers); // Yanıt başlıkları
        } else {
          console.error("Error Message:", error.message); // Başka bir hata mesajı
        }
      }
    },
  },
};
</script>
