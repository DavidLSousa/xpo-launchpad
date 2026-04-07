import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n, TranslateOptions } from "i18n-js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import en from "@/src/shared/i18n/locales/en-US.json";
import pt from "@/src/shared/i18n/locales/pt-BR.json";
import { ImageSourcePropType } from "react-native";
import { STORAGE_KEYS } from "../constants";

const defaultLocale = "pt";

const i18n = new I18n({ en, pt });
i18n.locale = defaultLocale;
i18n.enableFallback = true;
i18n.defaultLocale = defaultLocale;

interface I18nContextType {
  languages: {
    code: string;
    name: string;
    flag: ImageSourcePropType;
  }[];
  locale: string;
  setLocale: (locale: string) => Promise<void>;
  t: (key: string, options?: TranslateOptions) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
}

export const LANGUAGES = [
  {
    code: "pt",
    name: "Português",
    flag: require("@/assets/images/i18n/br_flag.png"),
  },
  {
    code: "en",
    name: "English",
    flag: require("@/assets/images/i18n/us_flag.png"),
  },
  {
    code: "es",
    name: "Español",
    flag: require("@/assets/images/i18n/es_flag.png"),
  },
];

export const I18nProvider = ({ children }: LocaleProviderProps) => {
  const [locale, setLocaleState] = useState<string>(defaultLocale);

  const languages = LANGUAGES;

  const setLocale = useCallback(async (newLocale: string) => {
    if (i18n.locale !== newLocale) {
      i18n.locale = newLocale;
      setLocaleState(newLocale);
      await AsyncStorage.setItem(STORAGE_KEYS.APP_LOCALE, newLocale);
    }
  }, []);

  useEffect(() => {
    const loadLocale = async () => {
      const savedLocale = await AsyncStorage.getItem(STORAGE_KEYS.APP_LOCALE);
      if (savedLocale && i18n.translations.hasOwnProperty(savedLocale)) {
        i18n.locale = savedLocale;
        setLocaleState(savedLocale);
      } else {
        i18n.locale = defaultLocale;
        setLocaleState(defaultLocale);
      }
    };
    loadLocale();
  }, []);

  const t = useCallback(
    (key: string, options?: TranslateOptions) => {
      i18n.locale = locale;
      return i18n.t(key, options);
    },
    [locale],
  );

  const contextValue = useMemo(
    () => ({
      languages,
      locale,
      setLocale,
      t,
    }),
    [languages, locale, setLocale, t],
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within a LocaleProvider");
  }
  return context;
};
