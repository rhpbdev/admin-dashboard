// app/editorProduct/[slug]/page.tsx
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CanvasApp from '@/components/canvas/CanvasApp'; // Assuming CanvasApp is in this path
import {
  sampleProgramTemplates,
  YourSpecificTemplateType
} from '../sampleTemplateData'; // Adjusted path
import { useEditorFlow } from 'context/EditorFlowContext';
import { toast } from 'sonner';
import StepTracker from '@/components/StepTracker';

export default function EditorPage() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const router = useRouter();

  const slug = params.slug ?? '';
  const size = search.get('size') ?? '';
  const accessory = search.get('accessory') ?? '';

  const [designApproved, setDesignApproved] = useState(false);
  const [designId, setDesignId] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] =
    useState<YourSpecificTemplateType | null>(null);
  const [isLoading, setIsLoading] = useState(true); // To handle async loading or template finding

  const [deceasedName, setDeceasedName] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

  const { setEditorData } = useEditorFlow();

  useEffect(() => {
    // This effect runs when the component mounts or 'slug' changes.
    if (slug) {
      setIsLoading(true); // Set loading to true when slug changes and we start fetching
      // Find the template that matches the slug from the imported sample data.
      const foundTemplate = sampleProgramTemplates.find(
        (template) => template.id === slug
      );
      if (foundTemplate) {
        setCurrentTemplate(foundTemplate); // Set the found template to state.
      } else {
        // If no template is found for the given slug, log an error.
        // Consider redirecting to a 404 page or showing a user-friendly error message.
        console.error(`Template with slug "${slug}" not found.`);
        setCurrentTemplate(null); // Ensure currentTemplate is null if not found
        // router.push('/404'); // Example: redirect to a 404 page
      }
      setIsLoading(false); // Set loading to false after attempting to find the template.
    } else {
      setIsLoading(false); // If there's no slug, stop loading.
    }
  }, [slug]); // Dependency array: effect reruns if 'slug' changes.

  const handleApproveDesign = () => {
    // This function is called when the user approves the design.
    // In a real application, CanvasApp might provide a method to get the current design data (e.g., Fabric.js JSON).
    // For now, we simulate a design ID.
    const fakeDesignId = `design-${Date.now()}`;
    setDesignId(fakeDesignId);
    setDesignApproved(true);
    // TODO: Potentially save the current canvas state (e.g., as JSON from CanvasApp) here.
  };

  const handleApprove = () => {
    const data = localStorage.getItem('deceasedInfo');
    if (!data) {
      toast.error('Missing saved data.');
      return;
    }

    try {
      const { name, sunrise, sunset } = JSON.parse(data);

      if (!name.trim() || !sunrise.trim() || !sunset.trim()) {
        toast.error('All fields are required.');
        return;
      }

      router.push(
        `/editorAccessory/${accessory}?size=${size}&accessory=${accessory}`
      );
    } catch (e) {
      toast.error('Failed to read saved data.');
    }
  };

  const handleAddToCart = () => {
    // This function is called when the user clicks "Add to Cart" after approving the design.
    if (!designApproved || !designId) return; // Ensure design is approved and an ID exists.

    // Construct the cart item object with product details and the design reference.
    const cartItem = {
      productSlug: slug,
      programSize: size,
      accessory,
      designId // This could be the Fabric.js JSON string or a reference to it.
      // You might also want to include a thumbnail URL or other design specifics.
    };

    console.log('Added to Cart:', cartItem); // Log the cart item for debugging.
    router.push('/cart'); // Redirect the user to the cart page.
  };

  // Display a loading message while the template is being fetched.
  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <p>Loading template...</p>
      </div>
    );
  }

  // Display a "Template Not Found" message if no template matches the slug.
  if (!currentTemplate) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Template Not Found
        </h1>
        <p>The template you are looking for ({slug}) could not be found.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  // Render the main editor page content if a template is found.
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {/* Display the name of the current template. */}
        Design: {currentTemplate.name}
      </h1>
      <p className="text-center mb-4">
        {/* Display program size and accessory information. */}
        Program Size: {size}, Accessory: {accessory}
      </p>

      {/* Render the CanvasApp component, passing the entire currentTemplate object. */}
      <StepTracker currentStep="program" />
      <CanvasApp templateData={currentTemplate} />

      <div className="flex flex-col items-center mt-8 gap-4">
        {/* Conditionally render the "Approve Design" button or "Add to Cart" button. */}
        {!designApproved && (
          <Button size="lg" onClick={handleApprove}>
            Approve Design
          </Button>
        )}

        {designApproved && (
          <>
            <p className="text-green-600 font-semibold">Design Approved ✅</p>
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
