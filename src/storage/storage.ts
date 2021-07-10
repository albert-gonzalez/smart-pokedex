import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = (key: string): Promise<string | null> =>
  AsyncStorage.getItem(key);

export const setItem = (key: string, item: string): Promise<void> =>
  AsyncStorage.setItem(key, item);

export const clear = (): Promise<void> => AsyncStorage.clear();
