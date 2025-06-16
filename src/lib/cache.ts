import { Product } from "@/types/interfaces";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 1800 }); // 30 mins TTL

export default cache;

export const getCache = (key: string) => {
  if (!key) {
    throw new Error("Cache key is required");
  }
  return cache.get(key);
};

export const setCache = (key: string, value: Product) => {
  if (!key) {
    throw new Error("Cache key is required");
  }
  cache.set(key, value);
};
