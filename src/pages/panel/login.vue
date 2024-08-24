<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Hoş Geldin!</h2>
        <p class="mt-2 text-gray-600">Lütfen hesabına giriş yap</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
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
              required
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
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="flex items-center"></div>
          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >Şifreni mi unuttun?</a
            >
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md focus:outline-none"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { toast } from "vue-sonner";
import { axios } from "@/store/api";
import { authStore } from "@/store/auth";

export default {
  data() {
    return {
      UserEmail: "",
      UserPassword: "",
      remember: false,
    };
  },
  methods: {
    async handleSubmit() {
      console.log("Email:", this.UserEmail);
      console.log("Password:", this.UserPassword);

      try {
        // API isteği
        const response = await axios.post("/api/auth/login", {
          UserEmail: this.UserEmail,
          UserPassword: this.UserPassword,
        });

        // API yanıtını konsola yazdır
        console.log("API Response:", response);

        // Başarılı giriş yapıldığını kontrol et (token olup olmadığını kontrol edin)
        if (response.data && response.data.token) {
          toast.success("Login successful!");
          console.log("Login successful!", response.data);
          console.log(response.data.UserId);
          // Kullanıcıyı yönlendirin veya başka bir işlem yapın, örneğin token'ı saklayın
          // Token'ı localStorage veya Vuex gibi bir yere saklayın
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem(
            "isLoggedIn",
            (authStore.value.isLoggedIn = true)
          );
          // authStore.value.isLoggedIn = true;

          // Ana sayfaya yönlendirme yapın
          this.$router.push("/");
        } else {
          toast.error("Login failed: Invalid response structure");
          console.error("Login failed", response.data);
        }
      } catch (error) {
        toast.error("An error occurred while logging in");
        console.error("An error occurred while logging in", error);

        // Hata durumunda gelen yanıtı da loglayın
        if (error.response) {
          console.error("Error Response:", error.response);
        }
      }
    },
  },
};
</script>
