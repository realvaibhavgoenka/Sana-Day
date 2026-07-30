import { AppConfig, DatePlanResponse } from '../types';
import { defaultConfig } from '../config';

const CONFIG_KEY = 'sana_girlfriend_day_config_v1';
const RESPONSE_KEY = 'sana_girlfriend_day_date_response_v1';

export function getAppConfig(): AppConfig {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultConfig, ...parsed, scratchCards: defaultConfig.scratchCards };
    }
  } catch (e) {
    console.error('Failed to parse config from localStorage', e);
  }
  return defaultConfig;
}

export function saveAppConfig(config: AppConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config to localStorage', e);
  }
}

export function resetAppConfig(): void {
  try {
    localStorage.removeItem(CONFIG_KEY);
  } catch (e) {
    console.error('Failed to reset config', e);
  }
}

export function getDateResponse(): DatePlanResponse | null {
  try {
    const saved = localStorage.getItem(RESPONSE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse date response', e);
  }
  return null;
}

export function saveDateResponse(response: DatePlanResponse): void {
  try {
    localStorage.setItem(RESPONSE_KEY, JSON.stringify(response));
  } catch (e) {
    console.error('Failed to save date response', e);
  }
}

export function clearDateResponse(): void {
  try {
    localStorage.removeItem(RESPONSE_KEY);
  } catch (e) {
    console.error('Failed to clear date response', e);
  }
}
