import config from "@/config";

export const isTokenExpired = (expiryTime: number) => {
  return new Date().getTime() > expiryTime;
};

export const getMetadata = (token: string) => {
  return {
    authorization: "Bearer " + token,
  };
};

export const clearData = () => {
  localStorage.removeItem("client.ces.dashboard");
};

export const getRole = async (token: string) => {
  const url = config.usermgmGatewayUrl + "/usermgm/v1/role/get/UserID";
  const method = "GET";
  const requestOptions: RequestInit = {
    method: method,
  };

  const myHeaders = new Headers({
    "Authorization": token,
    "Content-Type": "application/json",
  });
  requestOptions.headers = myHeaders;

  const response = await fetch(url, requestOptions);

  if (response.ok) {
    const data = await response.json();
    if (data.Name) {
      return data.Name
    }
    return 'user'
  } else {
    return 'user'
  }
}

export default {
  getMetadata,
  isTokenExpired,
  clearData,
  getRole,
};
