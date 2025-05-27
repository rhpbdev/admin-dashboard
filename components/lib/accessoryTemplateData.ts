// app/editor/accessoryTemplateData.ts
import { AccessoryTemplateType } from '@/components/canvas/types/canvas';
import { goldGradient } from './gradients';

const VERSION = '6.6.4';

// Common dimensions
const bookmarkWidth = 360;
const bookmarkHeight = 1008;
const glassPlaqueWidth = 1500;
const glassPlaqueHeight = 1008;
const thankYouCardWidth = 1080; // 4.5" at 240 DPI
const thankYouCardHeight = 768; // 3.2" at 240 DPI

// Common styles
const whiteShadow = 'rgba(0,0,0,0.8) 1.5px 1.5px 4px';
const strongShadow = 'rgba(0,0,0,1) 1px 1px 1px';

// Shared object configurations
const createMemoryHeader = (width: number) => ({
  type: 'textbox',
  text: 'IN LOVING MEMORY',
  name: 'title',
  top: 20,
  width,
  fill: '#FFFFFF',
  shadow: whiteShadow,
  fontSize: 24,
  fontFamily: 'Georgia',
  textAlign: 'center'
});

const createDeceasedPhoto = () => ({
  type: 'Image',
  src: '/brianna-richards-pic.png',
  name: 'deceased_cover_photo',
  top: 60,
  scaleX: 0.75,
  scaleY: 0.75
});

const createDeceasedName = (width: number) => ({
  type: 'textbox',
  text: 'Name Here',
  name: 'name_of_deceased',
  top: width,
  width,
  fill: '#FFFFFF',
  shadow: whiteShadow,
  fontSize: 42,
  fontFamily: 'Aston Script Pro Bold',
  textAlign: 'center',
  editable: false
});

const createDateFields = (width: number) => [
  {
    type: 'textbox',
    text: 'Sunrise',
    name: 'sunrise',
    left: 0,
    top: 430,
    width,
    fill: '#FFFFFF',
    shadow: whiteShadow,
    fontSize: 22.5,
    fontFamily: 'Aston Script Pro Bold',
    textAlign: 'center',
    editable: false
  },
  {
    type: 'textbox',
    text: 'XX-XX-XXXX',
    name: 'sunrise_date',
    top: 460,
    width,
    fill: '#FFFFFF',
    shadow: whiteShadow,
    fontSize: 20,
    fontFamily: 'Georgia',
    textAlign: 'center',
    editable: false
  },
  {
    type: 'textbox',
    text: 'Sunset',
    name: 'sunset_text',
    left: 0,
    top: 507.5,
    width,
    fill: '#FFFFFF',
    shadow: whiteShadow,
    fontSize: 22.5,
    fontFamily: 'Aston Script Pro Bold',
    textAlign: 'center',
    editable: false
  },
  {
    type: 'textbox',
    text: 'XX-XX-XXXX',
    name: 'sunset_date',
    top: 550,
    width,
    fill: '#FFFFFF',
    shadow: whiteShadow,
    fontSize: 22.5,
    fontFamily: 'Georgia',
    textAlign: 'center'
  },
  {
    type: 'textbox',
    text: 'XX-XX-XXXX',
    name: 'service_date',
    top: 650,
    width,
    fill: '#FFFFFF',
    shadow: whiteShadow,
    fontSize: 22.5,
    fontFamily: 'Georgia',
    textAlign: 'center'
  }
];

const createPoemInside = (
  backgroundSrc: string,
  width: number,
  height: number
) =>
  createLayoutWithBackground({ src: backgroundSrc }, width, height, [
    {
      type: 'textbox',
      version: VERSION,
      top: 80,
      width,
      fill: goldGradient,
      shadow: strongShadow,
      text: "God's Garden",
      fontSize: 37.5,
      fontFamily: 'Aston Script Pro Bold',
      fontWeight: 'bold',
      textAlign: 'center',
      name: 'left_poem_title',
      lockMovementX: true
    },
    {
      type: 'textbox',
      version: VERSION,
      top: 160,
      width,
      height: 500,
      fill: '#FFFFFF',
      shadow: strongShadow,
      text: `God looked around His garden,
And He found an empty place.
He then looked down upon the Earth
And saw your precious face.
He put His arms around you
And lifted you to rest.
God's garden must be beautiful;
He always takes the best.
He knew that you were suffering;
He knew you were in pain.
He knew you would never, ever
Get well on Earth again.
So He closed your weary eyelids
And whispered, "Peace be thine."
Then He took you up to Heaven
With hands so gentle and kind.
It broke our hearts to lose you,
But you did not go alone.
Part of us went with you
The day God welcomed you home.`,
      fontSize: 18,
      fontFamily: 'Georgia',
      textAlign: 'center',
      fontStyle: 'italic',
      lineHeight: 1.4,
      name: 'left_poem_text',
      lockMovementX: true
    }
  ]);

// Helper function to create layout with background (image or color)
const createLayoutWithBackground = (
  background: { src?: string; color?: string },
  width: number,
  height: number,
  objects: any[]
) => {
  const layout: any = {
    version: VERSION,
    objects
  };

  if (background.src) {
    layout.backgroundImage = {
      type: 'image',
      width,
      height,
      fit: 'cover',
      src: background.src,
      name: 'background'
    };
  } else if (background.color) {
    // Set background color at the root level of the JSON
    layout.backgroundColor = background.color;
    // Also ensure there's no backgroundImage property
    layout.backgroundImage = null;
  }

  return layout;
};

// Helper function to create standard memorial layout
const createMemorialLayout = (
  backgroundSrc: string,
  width: number,
  height: number
) =>
  createLayoutWithBackground({ src: backgroundSrc }, width, height, [
    createMemoryHeader(width),
    createDeceasedPhoto(),
    createDeceasedName(width),
    ...createDateFields(width)
  ]);

export const accessoryTemplates: AccessoryTemplateType[] = [
  // ========== BOOKMARKS ==========
  {
    id: 'green-elegance-bookmark',
    name: 'Green Elegance Bookmark',
    style: 'green-elegance',
    width: bookmarkWidth,
    height: bookmarkHeight,
    backgroundColor: '#333',
    flipBackgroundOnInside: true,
    accessoryType: 'bookmarks',
    outsideJSON: JSON.stringify(
      createMemorialLayout(
        '/green-elegance-bg-bookmark.jpg',
        bookmarkWidth,
        bookmarkHeight
      )
    ),
    insideJSON: JSON.stringify(
      createPoemInside(
        '/green-elegance-bg-bookmark.jpg',
        bookmarkWidth,
        bookmarkHeight
      )
    )
  },
  {
    id: 'blue-elegance-bookmarks',
    name: 'Blue Elegance Bookmark',
    style: 'blue-elegance',
    width: bookmarkWidth,
    height: bookmarkHeight,
    backgroundColor: '#333',
    flipBackgroundOnInside: true,
    accessoryType: 'bookmarks',
    outsideJSON: JSON.stringify(
      createMemorialLayout(
        '/blue-and-gold-elegance.jpg',
        bookmarkWidth,
        bookmarkHeight
      )
    ),
    insideJSON: JSON.stringify(
      createPoemInside(
        '/blue-and-gold-elegance.jpg',
        bookmarkWidth,
        bookmarkHeight
      )
    )
  },

  // ========== GLASS PLAQUES ==========
  {
    id: 'green-elegance-glass-plaque',
    name: 'Green Elegance Glass Plaque',
    style: 'green-elegance',
    width: glassPlaqueWidth,
    height: glassPlaqueHeight,
    backgroundColor: '#333',
    flipBackgroundOnInside: true,
    accessoryType: 'glass-plaque',
    outsideJSON: JSON.stringify(
      createMemorialLayout(
        '/green-elegance-smol.jpg',
        glassPlaqueWidth,
        glassPlaqueHeight
      )
    )
  },
  {
    id: 'blue-elegance-glass-plaque',
    name: 'Blue Elegance Glass Plaque',
    style: 'blue-elegance',
    width: glassPlaqueWidth,
    height: glassPlaqueHeight,
    backgroundColor: '#333',
    flipBackgroundOnInside: true,
    accessoryType: 'glass-plaque',
    outsideJSON: JSON.stringify(
      createMemorialLayout(
        '/blue-and-gold-elegance.jpg',
        glassPlaqueWidth,
        glassPlaqueHeight
      )
    )
  },

  // ========== THANK YOU CARDS ==========
  {
    id: 'green-elegance-thank-you-card',
    name: 'Green Elegance Thank You Card',
    style: 'green-elegance',
    width: thankYouCardWidth,
    height: thankYouCardHeight,
    backgroundColor: '#333',
    flipBackgroundOnInside: true,
    accessoryType: 'thank-you-cards',
    outsideJSON: JSON.stringify(
      createLayoutWithBackground(
        { src: '/green-elegance-smol.jpg' },
        thankYouCardWidth,
        thankYouCardHeight,
        [
          {
            type: 'textbox',
            text: 'Thank You',
            name: 'thank_you_title',
            top: thankYouCardHeight / 3,
            width: thankYouCardWidth,
            fill: goldGradient,
            shadow: strongShadow,
            fontSize: 72,
            fontFamily: 'Aston Script Pro Bold',
            textAlign: 'center'
          },
          {
            type: 'textbox',
            text: 'for your kindness and sympathy',
            name: 'thank_you_subtitle',
            top: thankYouCardHeight / 2,
            width: thankYouCardWidth,
            fill: '#FFFFFF',
            shadow: whiteShadow,
            fontSize: 24,
            fontFamily: 'Georgia',
            fontStyle: 'italic',
            textAlign: 'center'
          }
        ]
      )
    ),
    insideJSON: JSON.stringify(
      createLayoutWithBackground(
        { color: '#FFFFFF' },
        thankYouCardWidth,
        thankYouCardHeight,
        [
          {
            type: 'textbox',
            text: `Your thoughtfulness and caring
have meant so much to us during
this difficult time. We are deeply
grateful for your support and the
beautiful memories you've shared.

With heartfelt appreciation,`,
            name: 'thank_you_message',
            top: 100,
            left: 100,
            width: thankYouCardWidth - 200,
            fill: '#333333',
            fontSize: 22,
            fontFamily: 'Georgia',
            textAlign: 'center',
            lineHeight: 1.6
          },
          {
            type: 'textbox',
            text: 'The Family of',
            name: 'family_of_text',
            top: thankYouCardHeight - 200,
            width: thankYouCardWidth,
            fill: '#333333',
            fontSize: 20,
            fontFamily: 'Georgia',
            fontStyle: 'italic',
            textAlign: 'center'
          },
          {
            type: 'textbox',
            text: 'Name Here',
            name: 'name_of_deceased',
            top: thankYouCardHeight - 150,
            width: thankYouCardWidth,
            fill: goldGradient,
            shadow: 'rgba(0,0,0,0.3) 1px 1px 2px',
            fontSize: 36,
            fontFamily: 'Aston Script Pro Bold',
            textAlign: 'center'
          }
        ]
      )
    )
  },
  {
    id: 'blue-elegance-thank-you-card',
    name: 'Blue Elegance Thank You Card',
    style: 'blue-elegance',
    width: thankYouCardWidth,
    height: thankYouCardHeight,
    backgroundColor: '#333',
    flipBackgroundOnInside: true,
    accessoryType: 'thank-you-cards',
    outsideJSON: JSON.stringify(
      createLayoutWithBackground(
        { src: '/blue-and-gold-elegance.jpg' },
        thankYouCardWidth,
        thankYouCardHeight,
        [
          {
            type: 'textbox',
            text: 'Thank You',
            name: 'thank_you_title',
            top: thankYouCardHeight / 3,
            width: thankYouCardWidth,
            fill: goldGradient,
            shadow: strongShadow,
            fontSize: 72,
            fontFamily: 'Aston Script Pro Bold',
            textAlign: 'center'
          },
          {
            type: 'textbox',
            text: 'for your kindness and sympathy',
            name: 'thank_you_subtitle',
            top: thankYouCardHeight / 2,
            width: thankYouCardWidth,
            fill: '#FFFFFF',
            shadow: whiteShadow,
            fontSize: 24,
            fontFamily: 'Georgia',
            fontStyle: 'italic',
            textAlign: 'center'
          }
        ]
      )
    ),
    insideJSON: JSON.stringify(
      createLayoutWithBackground(
        { color: '#FFFFFF' },
        thankYouCardWidth,
        thankYouCardHeight,
        [
          {
            type: 'textbox',
            text: `Your thoughtfulness and caring
have meant so much to us during
this difficult time. We are deeply
grateful for your support and the
beautiful memories you've shared.

With heartfelt appreciation,`,
            name: 'thank_you_message',
            top: 100,
            left: 100,
            width: thankYouCardWidth - 200,
            fill: '#333333',
            fontSize: 22,
            fontFamily: 'Georgia',
            textAlign: 'center',
            lineHeight: 1.6
          },
          {
            type: 'textbox',
            text: 'The Family of',
            name: 'family_of_text',
            top: thankYouCardHeight - 200,
            width: thankYouCardWidth,
            fill: '#333333',
            fontSize: 20,
            fontFamily: 'Georgia',
            fontStyle: 'italic',
            textAlign: 'center'
          },
          {
            type: 'textbox',
            text: 'Name Here',
            name: 'name_of_deceased',
            top: thankYouCardHeight - 150,
            width: thankYouCardWidth,
            fill: goldGradient,
            shadow: 'rgba(0,0,0,0.3) 1px 1px 2px',
            fontSize: 36,
            fontFamily: 'Aston Script Pro Bold',
            textAlign: 'center'
          }
        ]
      )
    )
  }
];
