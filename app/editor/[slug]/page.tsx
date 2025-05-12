// In app/editor/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'; // Import React for JSX
import CanvasApp, {
  YourSpecificTemplateType
} from '@/components/canvas/CanvasApp'; // Adjust path as needed
import { sampleProgramTemplates } from '../sampleTemplateData'; // Assuming you created this file in app/editor/

export default function EditorPage() {
  const params = useParams<{ slug: string }>(); // Get the slug from the URL
  const [activeTemplate, setActiveTemplate] = useState<
    YourSpecificTemplateType | null | undefined
  >(undefined);
  // undefined: loading state, null: not found, YourSpecificTemplateType: found

  useEffect(() => {
    if (params && params.slug) {
      console.log(
        `EditorPage: Looking for template with slug/id: ${params.slug}`
      );
      // Find the template from your sample data array using the slug (which we assume matches the 'id' field)
      const foundTemplate = sampleProgramTemplates.find(
        (t) => t.id === params.slug
      );

      if (foundTemplate) {
        console.log(`EditorPage: Found template - ${foundTemplate.name}`);
        setActiveTemplate(foundTemplate);
      } else {
        console.warn(
          `EditorPage: Template with slug/id "${params.slug}" not found in sample data.`
        );
        setActiveTemplate(null); // Set to null if not found
      }
    }
  }, [params]); // Re-run when params (especially params.slug) change

  if (activeTemplate === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading editor...</p>
      </div>
    );
  }

  if (!activeTemplate) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
        <p>Sorry, we couldn't find a template with the ID: {params.slug}</p>
        {/* You could add a link back to the templates selection page */}
      </div>
    );
  }

  return (
    <div className="editor-page-container">
      {' '}
      {/* Add your page layout styling */}
      <h1 className="text-2xl font-bold p-4 text-center">
        Editing: {activeTemplate.name}
      </h1>
      {/* The CanvasApp component will now receive the specific template data */}
      <CanvasApp templateData={activeTemplate} />
    </div>
  );
}
