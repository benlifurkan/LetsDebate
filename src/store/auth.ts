import { useStorage } from "@vueuse/core";

export const authStore = useStorage("auth", { isLoggedIn: false });
