<script lang="ts" setup>
import { Toaster } from "vue-sonner";
import { authStore } from "@/store/auth";
import { ref, onMounted } from "vue";

const sidebar = ref(false);
const link = ref("");

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
          <VBtn to="/trend" class="mr-2"> Trend </VBtn>
          <VBtn to="/siralama"> Sıralama </VBtn>
        </div>

        <template #append>
          <VBtn
            prepend-icon="mdi-plus"
            href="/topic/create"
            variant="tonal"
            color="success"
            class="ml-2 text-transform"
            >Konu Oluştur</VBtn
          >
          <VBtn
            prepend-icon="mdi-format-list-bulleted"
            href="/topic/"
            variant="tonal"
            color="primary"
            class="ml-2 text-transform"
            >Konular</VBtn
          >
          <VBtn
            icon
            href="/profile"
            size="small"
            variant="tonal"
            color="primary"
            class="ml-2"
            title="Profilim"
          >
            <VIcon icon="mdi-account" />
          </VBtn>

          <VBtn
            icon
            href="#"
            size="small"
            variant="tonal"
            color="primary"
            class="ml-2"
            title="Telefon"
          >
            <VIcon icon="mdi-phone" />
          </VBtn>

          <VBtn
            icon
            href="/auth/register"
            size="small"
            variant="tonal"
            color="primary"
            class="ml-2"
            title="Kayıt Ol"
          >
            <VIcon icon="mdi-account-plus" />
          </VBtn>

          <VBtn
            v-if="!authStore.isLoggedIn"
            icon
            to="/auth/login"
            size="small"
            variant="tonal"
            color="primary"
            class="ml-2"
            title="Giriş Yap"
          >
            <VIcon icon="mdi-login" />
          </VBtn>

          <template v-else>
            <!-- <VBtn
              icon
              to="/auth"
              size="small"
              variant="tonal"
              color="primary"
              class="ml-2"
            >
              <VIcon icon="mdi-grid-large" />
            </VBtn> -->

            <VBtn
              icon
              to="/auth/logout"
              size="small"
              variant="tonal"
              color="error"
              class="ml-2"
              title="Çıkış Yap"
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
            class="text-black px-4 py-2 rounded-xl sm text-decoration-none bg-grey-lighten-1"
          >
            <VIcon
              class="mr-2 rounded-x1"
              to="/"
              icon="mdi-account"
              color="#11111"
              variant="tonal"
            />
            <span class="text-xs">LET'S DEBATE</span>
          </RouterLink>
        </template>

        <template #append>
          <VBtn icon>
            <VIcon icon="mdi-menu" @click="sidebar = !sidebar" />
          </VBtn>
        </template>
      </VAppBar>

      <VNavigationDrawer v-model="sidebar" temporary floating>
        <!-- HOME Bölümü -->
        <VList>
          <VListSubheader>HOME</VListSubheader>
          <VListItem
            prepend-icon="mdi-account"
            title="Senin İçin"
            to="/"
            link
          />
          <VListItem prepend-icon="mdi-fire" to="/trend" title="Trendler" />
          <VListItem
            prepend-icon="mdi-account-group-outline"
            to="/siralama"
            title="Sıralama"
          />
        </VList>

        <!-- AUTH Bölümü -->
        <VList>
          <VListSubheader>AUTH</VListSubheader>
          <VListItem
            v-if="!authStore.isLoggedIn"
            prepend-icon="mdi-login"
            to="/auth/login"
            title="Giriş Yap"
          />
          <VListItem
            v-else
            prepend-icon="mdi-logout"
            to="/auth/logout"
            title="Çıkış Yap"
          />
          <VListItem
            prepend-icon="mdi-account-plus"
            to="/auth/register"
            title="Kayıt Ol"
          />
          <VListItem
            prepend-icon="mdi-account-details-outline"
            to="/profile"
            title="Profilim"
          />
        </VList>

        <!-- TOPIC Bölümü -->
        <VList>
          <VListSubheader>TOPIC</VListSubheader>
          <VListItem
            prepend-icon="mdi-tooltip-outline"
            to="/topic/create"
            title="Konu Oluştur"
          />
          <VListItem
            prepend-icon="mdi-format-list-bulleted"
            to="/topic"
            title="Konular"
          />
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
          ></div>

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
<style scoped>
.text-transform {
  text-transform: inherit;
}
</style>
