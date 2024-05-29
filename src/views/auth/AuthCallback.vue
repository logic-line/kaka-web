<template>
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
         <Loader :isLoading="isLoading" />
     </div>
</template>
<script  lang="ts">
import { mapActions } from "vuex";
import { AuthState } from "../../store/modules/auth";
import config from "../../config";
import UserActivitiesService from "../../services/userActivity/index";
import { CreateUserActivitiesRequest } from '../../types/userActivitty';

import { defineComponent } from "vue";
import { getRole } from "@/utils/auth-utils";
import Loader from '../../components/comp/Loader.vue';
const code = new URLSearchParams(window.location.search).get("code");
export default defineComponent({
  components: {
    Loader
  },

  data() {
    return {
      backendErrors: null,
      isLoading:true,
    }
  },
  methods: {
    ...mapActions("auth", ["exchangeCode"]),
  },
  async mounted() {
    
    fetch(config.authUrl + "/exchange?code=" + code)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("Error: " + response.status);
        }
      })
      .then(async (data) => {
        let role = '';
        await getRole(data.data.accessToken)
          .then(res => {
            if (res) {
              role = res;
            }
          });

        let newData: AuthState = {
          auth: {
            isValidToken: data.data.accessToken ? true : false,
            accessToken: data.data.accessToken,
            role: role,
          },
        };

        this.exchangeCode(newData);

        let activity: CreateUserActivitiesRequest = {
          activity: "login"
        };

        new UserActivitiesService().CreateUserActivities(activity)
          .then((response) => {
            if (response && response.Data) {
            }
          })
          .catch((error) => {
            this.backendErrors = JSON.parse(error);
            // throw new Error("Error: " + error);
          });

        this.$router.push({ path: "/profile" });
      })
      .catch((error) => {
        this.$router.push({ name: "signin" });
      });

      setTimeout(() => {
      this.isLoading = false  
    }, 1000);
  }
});

</script>
