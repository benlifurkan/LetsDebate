import { default as axiosIns } from "axios";

export const axios = axiosIns.create({
    baseURL: "https://orionn.xyz:7007",
});
