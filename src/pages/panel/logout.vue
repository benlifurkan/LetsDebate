<script lang="ts" setup>
import { authStore } from "@/store/auth";
import { useTimeoutFn } from "@vueuse/core";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const router = useRouter();

useTimeoutFn(() => {
  authStore.value.isLoggedIn = false;
  toast.success("Çıkış yapıldı");

  router.push("/");
}, 1500);
</script>

<template>Çıkış yapılıyor...</template>
