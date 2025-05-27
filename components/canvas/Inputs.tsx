'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Canvas as FabricCanvas, Textbox } from 'fabric';
import { format, parseISO } from 'date-fns';
import { useDeceasedCoverPhoto } from 'hooks/useDeceasedCoverPhoto';
import { useDeceasedInfoContext } from 'context/DeceasedInfoContext';

interface CanvasProps {
  canvas: FabricCanvas | null;
}

const Inputs = ({ canvas }: CanvasProps) => {
  const { info, updateField } = useDeceasedInfoContext();
  const [localCoverPhoto, setLocalCoverPhoto] = useState(info.coverPhoto ?? '');
  const { handleCoverPhotoUpload } = useDeceasedCoverPhoto(canvas);

  const updateTextboxValue = useCallback(
    (name: string, value: string) => {
      const textbox = canvas
        ?.getObjects()
        .find((obj) => obj.type === 'textbox' && (obj as any).name === name) as
        | Textbox
        | undefined;

      if (textbox && canvas) {
        textbox.set({ text: value });
        canvas.requestRenderAll();
      }
    },
    [canvas]
  );

  const handleDateChange = (val: string) => {
    let formatted = val;
    try {
      formatted = format(parseISO(val), 'PPPP');
    } catch {}
    updateField({ service: val, serviceFormatted: formatted });
    updateTextboxValue('service_date', formatted);
  };

  return (
    <div className="p-6 bg-white shadow mt-6 max-w-2xl mx-auto rounded space-y-4">
      <InputField
        label="Name of Deceased"
        value={info.name}
        onChange={(val) => {
          updateField({ name: val });
          updateTextboxValue('name_of_deceased', val);
        }}
      />
      <InputField
        label="Sunrise"
        value={info.sunrise}
        onChange={(val) => {
          updateField({ sunrise: val });
          updateTextboxValue('sunrise_date', val);
        }}
      />
      <InputField
        label="Sunset"
        value={info.sunset}
        onChange={(val) => {
          updateField({ sunset: val });
          updateTextboxValue('sunset_date', val);
        }}
      />
      <div>
        <label className="font-semibold block mb-1">Service Date</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={info.service}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      <div>
        <label className="font-semibold block mb-1">Cover Photo</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleCoverPhotoUpload(file);
              // ImageKit upload/restore will also update localStorage
            }
          }}
        />
      </div>
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  const id =
    label
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '') + '-input';

  return (
    <div>
      <label htmlFor={id} className="font-semibold block mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="w-full border px-3 py-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Inputs;
