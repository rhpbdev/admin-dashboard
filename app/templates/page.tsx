// app/templates/page.tsx

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Edit3, // Used in the button
  Search, // Used in FilterControls
  Filter, // Used in FilterControls
  Image as ImageIcon, // Used for "No Templates Found"
  Palette // Used in the page header
  // ArrowRight, FileText, Users, Heart, MessageSquare are not used here
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Sample template data - imageSrc updated to local placeholder
const templates = [
  {
    id: 'trifold-green-elegance',
    title: 'Green Elegance Trifold',
    description:
      'A timeless trifold program with elegant typography and a traditional layout. Ample space for service details and a heartfelt obituary.',
    imageSrc: '/brianna-trifold-mockup.png',
    category: 'Funeral Program',
    tags: ['Trifold', 'Traditional', 'Elegant', 'Text-focused'],
    slug: '/editor/trifold-green-elegance'
  },
  {
    id: 'trifold-pink-roses',
    title: 'Pink Roses Trifold',
    description:
      'A timeless trifold program with elegant typography and a traditional layout. Ample space for service details and a heartfelt obituary.',
    imageSrc: '/pink-roses-bg.jpg',
    category: 'Funeral Program',
    tags: ['Trifold', 'Traditional', 'Elegant', 'Text-focused'],
    slug: '/editor/trifold-pink-roses'
  },
  {
    id: 'trifold-blue-and-gold-elegance',
    title: 'Blue and Gold Elegance Trifold',
    description:
      'A contemporary trifold layout designed to showcase cherished photos alongside key service information. Clean lines and modern fonts.',
    imageSrc: '/blue-and-gold-elegance-mockup.webp',
    category: 'Funeral Program',
    tags: ['Trifold', 'Modern', 'Photo Album', 'Storytelling'],
    slug: '/editor/trifold-blue-and-gold-elegance'
  },
  {
    id: 'serene-single-page-简约',
    title: 'Serene Single Page Order of Service',
    description:
      'A minimalist single-page design for a concise order of service. Perfect for simpler services or as an insert.',
    imageSrc: '/placeholder.webp',
    category: 'Funeral Program',
    tags: ['Single Page', 'Minimalist', 'Concise'],
    slug: '/editor/serene-single-page'
  },
  {
    id: 'floral-memorial-card-hope',
    title: 'Hope Floral Memorial Card',
    description:
      'Beautiful prayer card featuring delicate floral accents. A small, shareable keepsake for attendees to cherish.',
    imageSrc: '/placeholder.webp',
    category: 'Memorial Card',
    tags: ['Prayer Card', 'Floral', 'Keepsake', 'Small'],
    slug: '/editor/floral-memorial-card-hope'
  },
  {
    id: 'elegant-thank-you-gratitude',
    title: 'Gratitude Thank You Card',
    description:
      'Express your appreciation with these refined thank you cards, designed to coordinate with our program styles.',
    imageSrc: '/placeholder.webp',
    category: 'Thank You Card',
    tags: ['Stationery', 'Elegant', 'Coordinating'],
    slug: '/editor/elegant-thank-you-gratitude'
  },
  {
    id: 'remembrance-registry-book-legacy',
    title: 'Legacy Registry Book Pages',
    description:
      'Printable guest book pages for attendees to share condolences and memories. Thoughtfully designed for ease of use.',
    imageSrc: '/placeholder.webp',
    category: 'Registry Book',
    tags: ['Guest Book', 'Printable', 'Memories'],
    slug: '/editor/remembrance-registry-book-legacy'
  },
  {
    id: 'photo-collage-bifold-celebration',
    title: 'Celebration of Life Photo Bifold',
    description:
      'A vibrant bifold program designed to celebrate a life through a beautiful photo collage and uplifting design elements.',
    imageSrc: '/placeholder.webp',
    category: 'Funeral Program',
    tags: ['Bifold', 'Photo Collage', 'Celebration of Life', 'Vibrant'],
    slug: '/editor/photo-collage-bifold-celebration'
  },
  {
    id: 'minimalist-trifold-reflection',
    title: 'Reflection Minimalist Trifold',
    description:
      'A clean and understated trifold program focusing on clarity and reflective space. Modern and respectful.',
    imageSrc: '/placeholder.webp',
    category: 'Funeral Program',
    tags: ['Trifold', 'Minimalist', 'Modern', 'Understated'],
    slug: '/editor/minimalist-trifold-reflection'
  }
];

const FilterControls = () => {
  return (
    <div className="mb-12 p-6 bg-slate-100 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label
            htmlFor="search-templates"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Search Templates
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="search-templates"
              className="block w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm py-2.5"
              placeholder="e.g., Bifold, Modern, Floral"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Filter by Category
          </label>
          <select
            id="category-filter"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm py-2.5 px-3 bg-white"
          >
            <option>All Categories</option>
            <option>Funeral Programs</option>
            <option>Memorial Cards</option>
            <option>Thank You Cards</option>
            <option>Registry Books</option>
          </select>
        </div>
        <Button
          variant="outline"
          className="md:mt-0 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white"
        >
          <Filter className="mr-2 h-4 w-4" /> Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default function TemplatesPage() {
  return (
    <div className="bg-white text-slate-800">
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-slate-100 to-slate-200 text-center">
        <div className="container mx-auto max-w-3xl">
          <Palette className="h-16 w-16 text-slate-700 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Find Your Perfect Memorial Template
          </h1>
          <p className="text-lg md:text-xl text-slate-700">
            Browse our thoughtfully designed collection of funeral programs,
            memorial cards, and more. Each template is fully customizable to
            help you create a beautiful and personal tribute.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="container mx-auto max-w-7xl">
          <FilterControls />

          {templates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col group"
                >
                  <CardHeader className="p-0 relative">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={template.imageSrc}
                        alt={template.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className="bg-slate-800 text-white text-xs"
                      >
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-2 leading-tight group-hover:text-slate-600 transition-colors">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {template.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-slate-300 text-slate-500"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 bg-slate-50/50 border-t border-slate-200">
                    <Button
                      asChild
                      className="w-full bg-slate-700 text-white hover:bg-slate-600" // Ensure these styles are what you want
                    >
                      <Link href={template.slug}>
                        {/* Wrap the content of Link in a single element like <span> */}
                        <span>
                          Customize Template{' '}
                          <Edit3 className="ml-2 h-4 w-4 inline" />{' '}
                          {/* Added inline for better alignment with text */}
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-24 w-24 text-slate-400 mb-4" />
              <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                No Templates Found
              </h3>
              <p className="text-slate-500">
                We couldn't find any templates matching your criteria. Please
                try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
