import { i18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";

import en from "@config/translation/en";
import ar from "@config/translation/ar";

import Languages from "@config/language";

i18n.fallbacks = true;
i18n.defaultLocale = "en";
i18n.locale = "en";
i18n.translations = {
  en,
  ar,
};
// i18nManager.allowRTL(false)

export const setLocale = (language, direction) => {
  const isRTL = direction === "rtl";
  i18n.locale = language;
  if (i18nManager.isRTL !== isRTL) {
    i18nManager.forceRTL(isRTL);
  }
};

export const setDefaultLocale = async () => {
  const code = await AsyncStorage.getItem("language");
  const l = Languages.find((item) => item.code === code);
  if (l) {
    setLocale(code, l.direction);
  }
};

export const __ = (name, params = {}) =>
  i18n.t(name, { ...params, defaultValue: name });
