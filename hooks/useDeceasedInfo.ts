'use client';

import { useCallback } from 'react';

export interface DeceasedInfo {
  name: string;
  sunrise: string;
  sunset: string;
  service: string;
  serviceFormatted?: string;
  coverPhoto?: string;
}

export interface CanvasTextValues {
  name_of_deceased: string;
  sunrise_date: string;
  sunset_date: string;
  service_date: string;
  deceased_cover_photo: string;
}

export const useDeceasedInfo = () => {
  const key = 'deceasedInfo';

  const get = useCallback((): DeceasedInfo | null => {
    if (typeof window === 'undefined') return null;

    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('Failed to parse deceasedInfo from localStorage:', err);
      return null;
    }
  }, []);

  const getCanvasValues = useCallback((): CanvasTextValues => {
    const info = get();
    return {
      name_of_deceased: info?.name || '',
      sunrise_date: info?.sunrise || '',
      sunset_date: info?.sunset || '',
      service_date: info?.serviceFormatted || info?.service || '',
      deceased_cover_photo: info?.coverPhoto || ''
    };
  }, [get]);

  const set = useCallback((info: DeceasedInfo) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(info));
  }, []);

  const clear = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }, []);

  return {
    get,
    getCanvasValues,
    set,
    clear
  };
};
