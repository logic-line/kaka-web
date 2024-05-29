import config from '@/config';
import router from '@/router';
import { FetchData } from '@/utils/fetch-utils';
import { useStore } from 'vuex'; 

export function useErrorHandler() {
  const store = useStore();
  const logOut = async () => {
    try {
      const url = config.authUrl + '/logout?accessToken=' + store.getters["auth/accessToken"];
      const method = "GET";
      const result = await FetchData(url, method, false, false);

      if (result.error) {
      } else {
        if (result.data) {
          localStorage.removeItem('vuex');
          router.push({ path: "/signin" });
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return {
    logOut
  };
}