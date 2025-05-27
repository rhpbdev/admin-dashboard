'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback
} from 'react';

export interface DeceasedInfo {
  name: string;
  sunrise: string;
  sunset: string;
  service: string;
  serviceFormatted?: string;
  coverPhoto?: string;
}

const defaultValue: DeceasedInfo = {
  name: '',
  sunrise: '',
  sunset: '',
  service: '',
  serviceFormatted: '',
  coverPhoto: ''
};

interface DeceasedInfoContextType {
  info: DeceasedInfo;
  updateField: (updates: Partial<DeceasedInfo>) => void;
  setCoverPhotoFromFile: (file: File) => void;
  reset: () => void;
  loadFromStorage: () => void;
}

const DeceasedInfoContext = createContext<DeceasedInfoContextType | undefined>(
  undefined
);

export const DeceasedInfoProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<DeceasedInfo>(defaultValue);
  const key = 'deceasedInfo';

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setInfo(JSON.parse(saved));
      } catch (err) {
        console.warn('Invalid deceasedInfo in storage', err);
      }
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(info));
  }, [info]);

  const updateField = useCallback((updates: Partial<DeceasedInfo>) => {
    setInfo((prev) => ({ ...prev, ...updates }));
  }, []);

  const reset = () => setInfo(defaultValue);

  const loadFromStorage = () => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setInfo(JSON.parse(saved));
      } catch (err) {
        console.warn('Error restoring state:', err);
      }
    }
  };

  const setCoverPhotoFromFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          updateField({ coverPhoto: dataUrl });
        } else {
          console.warn('Failed to read file as Data URL.');
        }
      };
      reader.readAsDataURL(file);
    },
    [updateField]
  );

  return (
    <DeceasedInfoContext.Provider
      value={{
        info,
        updateField,
        setCoverPhotoFromFile,
        reset,
        loadFromStorage
      }}
    >
      {children}
    </DeceasedInfoContext.Provider>
  );
};

export const useDeceasedInfoContext = () => {
  const context = useContext(DeceasedInfoContext);
  if (!context) {
    throw new Error(
      'useDeceasedInfoContext must be used within a DeceasedInfoProvider'
    );
  }
  return context;
};
