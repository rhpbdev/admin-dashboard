// components/Templates.tsx
import React from 'react';
import {
  Canvas as FabricCanvas,
  Canvas,
  Image as FabricImage,
  FabricText,
  Textbox,
  Rect,
  Circle,
  Triangle,
  Polygon,
  Line
} from 'fabric';

// import businessBg from '@/public/templates/business-card-bg.png';

export interface TemplatesProps {
  canvas: FabricCanvas | null;
  onClose: () => void;
}

interface TemplateDefinition {
  id: string;
  title: string;
  apply: (canvas: FabricCanvas) => void;
}

const templates: TemplateDefinition[] = [
  {
    id: 't1',
    title: 'Bold Quote',
    apply: (canvas) => {
      // Clear existing objects and reset background
      canvas.clear();
      canvas.backgroundColor = '#2D3748';
      canvas.renderAll();

      // Add text on top
      const txt = new FabricText('“Design is thinking made visual”', {
        left: 50,
        top: 200,
        fill: '#EDF2F7',
        fontSize: 24,
        fontWeight: 'bold'
      });
      canvas.add(txt);
      canvas.renderAll();
    }
  },
  {
    id: 't2',
    title: 'Color Blocks',
    apply: (canvas) => {
      canvas.clear();
      canvas.backgroundColor = '#FFFFFF';
      canvas.renderAll();
      // two color blocks
      const left = new Rect({
        left: 0,
        top: 0,
        width: 250,
        height: 500,
        fill: '#E53E3E'
      });
      const right = new Rect({
        left: 250,
        top: 0,
        width: 250,
        height: 500,
        fill: '#3182CE'
      });
      const txt = new FabricText('Your Message Here', {
        left: 100,
        top: 220,
        fill: '#FFFFFF',
        fontSize: 20
      });
      canvas.add(left, right, txt);
      canvas.renderAll();
    }
  },
  {
    id: 't3',
    title: 'Minimalist Circle',
    apply: (canvas) => {
      canvas.clear();
      canvas.backgroundColor = '#FFFFFF';
      canvas.renderAll();
      const circle = new Circle({
        left: 150,
        top: 150,
        radius: 100,
        fill: '#68D391'
      });
      const txt = new FabricText('Hello World', {
        left: 170,
        top: 200,
        fill: '#1A202C',
        fontSize: 22
      });
      canvas.add(circle, txt);
      canvas.renderAll();
    }
  },
  {
    id: 't4',
    title: 'Framed Text',
    apply: (canvas) => {
      canvas.clear();
      canvas.backgroundColor = '#FFFFFF';
      canvas.renderAll();
      const frame = new Rect({
        left: 25,
        top: 25,
        width: 450,
        height: 450,
        stroke: '#D69E2E',
        strokeWidth: 8,
        fill: 'transparent'
      });
      const txt = new FabricText('Frame It', {
        left: 150,
        top: 220,
        fill: '#D69E2E',
        fontSize: 28,
        fontStyle: 'italic'
      });
      canvas.add(frame, txt);
      canvas.renderAll();
    }
  },
  {
    id: 't5',
    title: 'Business Card',
    apply: (canvas) => {
      console.log('Applying Business Card template (t5)');
      canvas.clear();
      const targetWidth = 1050;
      const targetHeight = 600;
      canvas.setDimensions({ width: targetWidth, height: targetHeight });
      canvas.backgroundColor = '#fcffa8';
      canvas.renderAll();

      const halfWidth = targetWidth / 2;

      const angledHalf = new Polygon(
        [
          { x: 0, y: 0 },
          { x: halfWidth + 150, y: 0 },
          { x: 380, y: targetHeight },
          { x: 0, y: targetHeight }
        ],
        {
          fill: '#0b2f03',
          selectable: false,
          evented: false
        }
      );

      const canvasWidth = canvas.getWidth();
      const rightMargin = 35;

      const combinedText = new Textbox(
        '+ New Homes\n+ Room Additions\n+ Finished Basements\n+ Interior + Exterior Remodeling',
        {
          left: halfWidth - rightMargin, // Adjust width of text box
          top: 120,
          fill: '#0b2f03',
          fontSize: 32,
          lineHeight: 2.125,
          fontWeight: 'bold',
          textAlign: 'right',
          width: 510
        }
      );

      const sinceText = new Textbox('Since 1984', {
        left: halfWidth - rightMargin,
        top: 435,
        fill: '#bebf73',
        fontSize: 112,
        fontWeight: 'bold',
        textAlign: 'right',
        underline: true,
        editable: true,
        width: 510
      });

      canvas.add(angledHalf, combinedText, sinceText);
      canvas.renderAll();

      const imageUrl = '/templates/t5-measuring-tape.png';
      const logoImageUrl = '/templates/t5-your-logo-here.png';
      console.log(`Attempting to load image from: ${imageUrl}`);

      FabricImage.fromURL(imageUrl)
        .then((img) => {
          console.log('Image loaded successfully:', img);

          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false
            // originX: 'center',
            // originY: 'center',
          });

          canvas.add(img);
          canvas.sendObjectToBack(img);
          canvas.sendObjectToBack(angledHalf);
          canvas.renderAll();
        })
        .catch((err) => {
          console.error(
            `Error loading image ${imageUrl}. Is the path correct and file accessible?`,
            err
          );
        });
      FabricImage.fromURL(logoImageUrl)
        .then((img) => {
          console.log('Image loaded successfully:', img);

          img.set({
            left: 60,
            top: 70,
            scaleX: 0.65,
            scaleY: 0.65
          });

          canvas.add(img);
          canvas.renderAll();
        })
        .catch((err) => {
          console.error(
            `Error loading image ${logoImageUrl}. Is the path correct and file accessible?`,
            err
          );
        });
    }
  },
  {
    id: 't6',
    title: 'Serene Bifold Program',
    apply: (canvas) => {
      console.log('Applying Serene Bifold Program template (t6)');
      canvas.clear();
      const targetWidth = 1100; // Represents 11 inches wide
      const targetHeight = 850; // Represents 8.5 inches high
      canvas.setDimensions({ width: targetWidth, height: targetHeight });
      canvas.backgroundColor = '#E6E6FA'; // Lavender blush background
      canvas.renderAll();

      const foldX = targetWidth / 2;

      // --- Fold Line (visual guide only) ---
      const foldLine = new Line([foldX, 0, foldX, targetHeight], {
        stroke: '#D3D3D3', // Light gray
        strokeWidth: 1,
        strokeDashArray: [5, 5], // Dashed line
        selectable: false,
        evented: false
      });

      // --- Front Cover (Right Half) ---
      const frontPanelX = foldX + 20; // Padding from fold
      const frontPanelWidth = foldX - 40; // Padding on both sides

      // Placeholder for Photo
      const photoPlaceholderFront = new Rect({
        left: frontPanelX + frontPanelWidth / 2 - 150, // Centered photo
        top: 50,
        width: 300,
        height: 250,
        fill: '#FFFFFF',
        stroke: '#B0C4DE', // Light steel blue
        strokeWidth: 2,
        selectable: false,
        evented: false
      });
      const photoTextFront = new Textbox('Photo Here', {
        left: photoPlaceholderFront.left ?? 0,
        top:
          (photoPlaceholderFront.top ?? 0) +
          (photoPlaceholderFront.height ?? 0) / 2 -
          15,
        width: photoPlaceholderFront.width,
        fontSize: 20,
        fill: '#B0C4DE',
        textAlign: 'center',
        selectable: false,
        evented: false
      });

      const titleTextFront = new Textbox('In Loving Memory Of', {
        left: frontPanelX,
        top: 330,
        width: frontPanelWidth,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#4682B4', // Steel blue
        textAlign: 'center',
        fontFamily: 'Georgia, serif'
      });

      const nameTextFront = new Textbox('[Full Name Here]', {
        left: frontPanelX,
        top: 380,
        width: frontPanelWidth,
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#2F4F4F', // Dark slate gray
        textAlign: 'center',
        fontFamily: 'Georgia, serif'
      });

      const datesTextFront = new Textbox(
        '[Date of Birth] - [Date of Passing]',
        {
          left: frontPanelX,
          top: 440,
          width: frontPanelWidth,
          fontSize: 20,
          fill: '#4682B4',
          textAlign: 'center',
          fontFamily: 'Georgia, serif'
        }
      );

      // --- Back Cover (Left Half) ---
      const backPanelX = 20; // Padding from edge
      const backPanelWidth = foldX - 40; // Padding on both sides

      const poemTitleBack = new Textbox('A Favorite Verse or Poem', {
        left: backPanelX,
        top: 50,
        width: backPanelWidth,
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#4682B4',
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
        marginBottom: 15
      });

      const poemTextBack = new Textbox(
        'Perhaps they are not stars in the sky, but rather openings where our loved ones shine down to let us know they are happy.\n\n(Enter your text here)',
        {
          left: backPanelX,
          top: 100,
          width: backPanelWidth,
          fontSize: 18,
          fill: '#2F4F4F',
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          lineHeight: 1.4
        }
      );

      const thanksTextBack = new Textbox(
        'The family wishes to express their sincere gratitude for your thoughts, prayers, and support during this difficult time.\n\n[Optional additional acknowledgement]',
        {
          left: backPanelX,
          top: 650, // Position towards the bottom
          width: backPanelWidth,
          fontSize: 16,
          fontStyle: 'italic',
          fill: '#4682B4',
          textAlign: 'center',
          fontFamily: 'Georgia, serif'
        }
      );

      canvas.add(
        photoPlaceholderFront,
        photoTextFront,
        titleTextFront,
        nameTextFront,
        datesTextFront,
        poemTitleBack,
        poemTextBack,
        thanksTextBack
      );
      canvas.renderAll();
    }
  }
];

const Templates: React.FC<TemplatesProps> = ({ canvas, onClose }) => {
  const handleTemplateClick = (applyFn: (canvas: FabricCanvas) => void) => {
    if (!canvas) return;
    applyFn(canvas);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Choose a Template</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleTemplateClick(tpl.apply)}
              className="h-24 border rounded cursor-pointer flex items-center justify-center text-sm text-center p-1 hover:shadow"
            >
              {tpl.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
