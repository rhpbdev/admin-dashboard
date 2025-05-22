// app/editor/sampleTemplateData.ts

// If not defined elsewhere:
export interface YourSpecificTemplateType {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor?: string;
  fabricJSON?: string; // Contains stringified Fabric.js canvas state
  outsideJSON?: string;
  insideJSON?: string;
  style?: string;
}

const centerMiddlePanelTrifold = 462.5; // Center of the middle panel for trifolds

const VERSION = '6.6.4'; // Using a consistent version for Fabric objects

export const accessoryTemplates: YourSpecificTemplateType[] = [
  // 1. Green Elegance Bookmark
  {
    id: 'green-elegance-bookmark',
    name: 'Green Elegance Bookmark',
    style: 'green-elegance',
    width: 360,
    height: 1008,
    backgroundColor: '#333',
    outsideJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        width: 360,
        height: 1008,
        fit: 'cover',
        src: '/green-elegance-bg-bookmark.jpg',
        name: 'background_image_green_elegance'
      },
      objects: [
        {
          type: 'textbox',
          text: 'IN LOVING MEMORY',
          name: 'title',
          top: 20,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 24,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'Image',
          src: '/brianna-richards-pic.png',
          name: 'deceased_cover_photo',
          top: 60,
          scaleX: 0.75,
          scaleY: 0.75
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'textbox',
          text: 'Name Here',
          name: 'name_of_deceased',
          top: 360,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 42,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'Sunrise',
          name: 'sunrise',
          left: 0,
          top: 430,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 22.5, // Scaled
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'sunrise_date',
          top: 460,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
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
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
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
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'service_date',
          top: 650,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        }
      ]
    }),
    insideJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        width: 360,
        height: 1008,
        fit: 'cover',
        src: '/green-elegance-bg-bookmark.jpg',
        name: 'background_image_green_elegance'
      },
      objects: [
        {
          type: 'textbox',
          text: 'IN LOVING MEMORY',
          name: 'title',
          top: 20,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 24,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'Name Here',
          name: 'name_of_deceased',
          top: 360,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 42,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'Sunrise',
          name: 'sunrise',
          left: 0,
          top: 430,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 22.5, // Scaled
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'sunrise_date',
          top: 460,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
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
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
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
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'service_date',
          top: 650,
          width: 360,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        }
      ]
    })
  },
  // 2. Blue Elegance Bookmark
  {
    id: 'blue-elegance-bookmark',
    name: 'Blue Elegance Bookmark',
    style: 'blue-elegance',
    width: 360,
    height: 1008,
    backgroundColor: '#f8f9fa',
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 22.5,
          top: 22.5,
          width: 360,
          height: 22.5, // Scaled: 30*0.75, 480*0.75
          fill: '#e9ecef',
          name: 'header_banner_left_panel'
        }
      ]
    })
  }
];
