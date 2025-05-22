'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Canvas as FabricCanvas, Textbox } from 'fabric';
import { format, parseISO } from 'date-fns';
import { useDeceasedCoverPhoto } from 'hooks/useDeceasedCoverPhoto';
import { useDeceasedInfo } from 'hooks/useDeceasedInfo';

interface CanvasProps {
  canvas: FabricCanvas | null;
}

const Inputs = ({ canvas }: CanvasProps) => {
  const [deceasedName, setDeceasedName] = useState('');
  const [sunriseDate, setSunriseDate] = useState('');
  const [sunsetDate, setSunsetDate] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceFormatted, setServiceFormatted] = useState('');

  const { coverPhoto, handleCoverPhotoUpload } = useDeceasedCoverPhoto(canvas);
  const { get, set } = useDeceasedInfo();

  useEffect(() => {
    const saved = get();
    if (!saved) return;

    setDeceasedName(saved.name ?? '');
    setSunriseDate(saved.sunrise ?? '');
    setSunsetDate(saved.sunset ?? '');
    setServiceDate(saved.service ?? '');
    setServiceFormatted(saved.serviceFormatted ?? '');
  }, [canvas, get]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        deceasedName &&
        sunriseDate &&
        sunsetDate &&
        serviceDate &&
        coverPhoto
      ) {
        set({
          name: deceasedName,
          sunrise: sunriseDate,
          sunset: sunsetDate,
          service: serviceDate,
          serviceFormatted,
          coverPhoto
        });
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [
    deceasedName,
    sunriseDate,
    sunsetDate,
    serviceDate,
    serviceFormatted,
    coverPhoto,
    set
  ]);

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

  return (
    <div className="p-6 bg-white shadow mt-6 max-w-2xl mx-auto rounded space-y-4">
      <InputField
        label="Name of Deceased"
        value={deceasedName}
        onChange={(val) => {
          setDeceasedName(val);
          updateTextboxValue('name_of_deceased', val);
        }}
      />
      <InputField
        label="Sunrise"
        value={sunriseDate}
        onChange={(val) => {
          setSunriseDate(val);
          updateTextboxValue('sunrise_date', val);
        }}
      />
      <InputField
        label="Sunset"
        value={sunsetDate}
        onChange={(val) => {
          setSunsetDate(val);
          updateTextboxValue('sunset_date', val);
        }}
      />
      <div>
        <label className="font-semibold block mb-1">Service Date</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={serviceDate}
          onChange={(e) => {
            const val = e.target.value;
            setServiceDate(val);

            try {
              const formatted = format(parseISO(val), 'PPPP');
              setServiceFormatted(formatted);
              updateTextboxValue('service_date', formatted);
            } catch {
              setServiceFormatted(val);
              updateTextboxValue('service_date', val);
            }
          }}
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
            if (file) handleCoverPhotoUpload(file);
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
