<script lang="ts" setup>
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { Toaster } from "vue-sonner";
import { authStore } from "@/store/auth";
import { ref, onMounted } from "vue";

const sidebar = ref(false);
const link = ref("");
const qrCode = useQRCode(link, {
  margin: 0,
});

onMounted(() => {
  link.value = location.origin;
});
</script>

<template>
  <VLayout>
    <VApp class="bg-white">
      <VAppBar class="bg-white" v-if="$vuetify.display.mdAndUp" flat border>
        <template #prepend>
          <VBtn
            to="/"
            prepend-icon="mdi-account"
            color="#11111"
            variant="tonal"
            class="rounded-xl"
          >
            <span class="text-xs">Let's Debate</span>
          </VBtn>
        </template>

        <div class="d-flex align-center">
          <VBtn to="/" class="mr-2"> Senin İçin</VBtn>
          <VBtn to="/contact"> Trend </VBtn>
          <VBtn to="/contact"> Sıralama </VBtn>
        </div>

        <template #append>
          <VBtn
            icon
            href="#"
            size="small"
            variant="tonal"
            color="primary"
            class="ml-2"
          >
            <VIcon icon="mdi-phone" />
          </VBtn>

          <VBtn
            v-if="!authStore.isLoggedIn"
            icon
            to="/panel/login"
            size="small"
            variant="tonal"
            color="primary"
            class="ml-2"
          >
            <VIcon icon="mdi-login" />
          </VBtn>

          <template v-else>
            <VBtn
              icon
              to="/panel"
              size="small"
              variant="tonal"
              color="primary"
              class="ml-2"
            >
              <VIcon icon="mdi-grid-large" />
            </VBtn>

            <VBtn
              icon
              to="/panel/logout"
              size="small"
              variant="tonal"
              color="error"
              class="ml-2"
            >
              <VIcon icon="mdi-logout" />
            </VBtn>
          </template>
        </template>
      </VAppBar>

      <VAppBar v-else flat border>
        <template #prepend>
          <RouterLink
            to="/"
            class="text-white bg-warning px-4 py-2 rounded-xl sm text-decoration-none"
          >
            <VIcon icon="mdi-hamburger" class="mr-2" />
            <span class="text-xs">Hardal</span>
          </RouterLink>
        </template>

        <template #append>
          <VBtn icon>
            <VIcon icon="mdi-menu" @click="sidebar = !sidebar" />
          </VBtn>
        </template>
      </VAppBar>

      <VNavigationDrawer v-model="sidebar" temporary floating>
        <VList>
          <VListItem prepend-icon="mdi-hamburger" title="Menüler" to="/" link />
          <VListItem
            prepend-icon="mdi-phone"
            title="İletişim"
            to="/contact"
            link
          />

          <VListItem
            v-if="!authStore.isLoggedIn"
            prepend-icon="mdi-login"
            to="/panel/login"
            title="Giriş Yap"
          />

          <template v-else>
            <VListItem
              prepend-icon="mdi-grid-large"
              to="/panel"
              title="Kontrol Paneli"
            />

            <VListItem
              prepend-icon="mdi-logout"
              to="/panel/logout"
              title="Çıkış Yap"
            />
          </template>
        </VList>
      </VNavigationDrawer>

      <VMain class="my-4">
        <VContainer>
          <RouterView />
        </VContainer>
      </VMain>

      <VFooter
        style="margin-top: 120px; background-color: #f3f4f6"
        class="d-flex flex-column gap-4 bg-white"
      >
        <VContainer>
          <div
            class="d-flex flex-column-reverse align-center align-md-start flex-md-row"
          >
            <iframe
              title="Hardal Cafe Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385396.3210961672!2d28.682527326897503!3d41.00537021009964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1724182773271!5m2!1str!2str"
              width="100%"
              height="300"
              style="border: 0"
              allowfullscreen="false"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-lg flex-1-1 border"
            ></iframe>
            <VImg
              v-if="link"
              :src="qrCode"
              alt="qr-code"
              width="150"
              height="150"
              class="ms-md-6 mb-6 mb-md-0"
            />
          </div>

          <div
            class="d-flex flex-wrap align-center justify-md-space-between justify-center"
          >
            <span class="d-block mt-4" style="color: #6b7280">
              © {{ new Date().getFullYear() }} - Tüm hakları saklıdır - Let's
              Debate
            </span>

            <div class="d-flex align-center gap-4 mt-4">
              <VBtn icon size="small" variant="text" href="#" target="_blank">
                <VIcon icon="mdi-instagram" />
              </VBtn>

              <VBtn icon size="small" variant="text" href="#" target="_blank">
                <VIcon icon="mdi-facebook" />
              </VBtn>

              <VBtn icon size="small" variant="text" href="#" target="_blank">
                <VIcon icon="mdi-twitter" />
              </VBtn>
            </div>
          </div>
        </VContainer>
      </VFooter>
    </VApp>

    <Toaster rich-colors />
  </VLayout>
</template>
