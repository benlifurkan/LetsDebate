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
import api from "@/store/api";
import { authStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";

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
      try {
        const response = await api.post("/api/auth/login", {
          UserEmail: this.UserEmail,
          UserPassword: this.UserPassword,
        });

        if (response.data && response.data.token && response.data.success) {
          toast.success("Login successful!");

          const token = response.data.token;
          localStorage.setItem("token", token);

          localStorage.setItem(
            "isLoggedIn",
            (authStore.value.isLoggedIn = true)
          );

          this.$router.push("/");
        } else {
          toast.error("Login failed: Invalid response structure");
          console.error("Login failed", response.data);
        }
      } catch (error) {
        toast.error("An error occurred while logging in");
        console.error("An error occurred while logging in", error);

        if (error.response) {
          console.error("Error Response:", error.response);
        }
      }
    },
  },
};
</script>
