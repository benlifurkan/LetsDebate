import { default as axiosIns } from "axios";

export const axios = axiosIns.create({
    baseURL: "http://orionn.xyz:7007",
});
