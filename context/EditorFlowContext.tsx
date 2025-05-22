'use client';

// context/EditorFlowContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface EditorData {
  deceasedName: string;
  sunrise: string;
  sunset: string;
  setEditorData: (data: Partial<EditorData>) => void;
}

const EditorFlowContext = createContext<EditorData | null>(null);

export const EditorFlowProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    deceasedName: '',
    sunrise: '',
    sunset: ''
  });

  const setEditorData = (newData: Partial<EditorData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <EditorFlowContext.Provider value={{ ...data, setEditorData }}>
      {children}
    </EditorFlowContext.Provider>
  );
};

export const useEditorFlow = () => {
  const ctx = useContext(EditorFlowContext);
  if (!ctx) throw new Error('EditorFlowProvider missing');
  return ctx;
};
