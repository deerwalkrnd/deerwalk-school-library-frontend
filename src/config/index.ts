import type { Metadata } from "next";
import rawConfig from "./school.config.json";

type ThemeTokenMap = Record<string, string>;

interface ThemeConfig {
  light: ThemeTokenMap;
  dark: ThemeTokenMap;
}

interface ConfigMetadata {
  title: string;
  description: string;
  keywords?: string[];
  baseUrl?: string;
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  icons?: Metadata["icons"];
}

export interface SchoolConfig {
  metadata: ConfigMetadata;
  theme: ThemeConfig;
}

const schoolConfig = rawConfig as SchoolConfig;

export default schoolConfig;
