export const fontFamilyDefaults = [
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Brush Script MT',
  'Roboto',
  'Pacifico',
  'Aston Script Pro Bold',
  'Pinyon Script'
];

// Optional fine-tuning for problematic fonts
export const fontAlignmentMap: Record<
  string,
  { padding?: number; shiftY?: number }
> = {
  'Aston Script Pro Bold': { padding: 58, shiftY: -120 },
  'Brush Script MT': { padding: 5, shiftY: -1 }
  // Add more fonts as needed
};
