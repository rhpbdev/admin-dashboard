// app/editor/sampleTemplateData.ts
import { Gradient } from 'fabric';
import { YourSpecificTemplateType } from '@/components/canvas/types/canvas';
import { goldGradient } from './gradients';

const greenEleganceShadow = 'rgba(0,0,0,1) 1px 1px 1px';
const centerMiddlePanelTrifold = 462.5;
const VERSION = '6.6.4';

export const sampleProgramTemplates: YourSpecificTemplateType[] = [
  // ==============================================================
  // BIFOLDS (792 x 612)
  // ==============================================================

  // 1. Graceful Classic Bifold (Resized)
  {
    id: 'classic-bifold-grace',
    name: 'Graceful Classic Bifold',
    style: 'green-elegance',
    width: 792, // Resized: 1056 * 0.75
    height: 612, // Resized: 816 * 0.75
    backgroundColor: '#f8f9fa',
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        // Left Panel (0 to 396)
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
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 37.5,
          top: 60,
          width: 345, // Scaled: 50*0.75, 80*0.75, 460*0.75
          fill: '#343a40',
          text: 'In Loving Memory',
          fontSize: 24, // Scaled: 32*0.75
          fontFamily: 'Georgia',
          name: 'title_left',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 37.5,
          top: 105,
          width: 345, // Scaled: 50*0.75, 140*0.75, 460*0.75
          fill: '#343a40',
          text: 'Name of Deceased\nSunrise - Sunset',
          fontSize: 18, // Scaled: 24*0.75
          fontFamily: 'Georgia',
          name: 'name_dates_left',
          textAlign: 'center',
          lineHeight: 1.4
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 37.5,
          top: 187.5,
          width: 345,
          height: 225, // Scaled: 50*0.75, 250*0.75, 460*0.75, 300*0.75
          fill: '#e9ecef',
          name: 'photo_placeholder_left',
          stroke: '#ced4da',
          strokeWidth: 1
        },
        // Right Panel (396 to 792)
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 409.5,
          top: 22.5,
          width: 360,
          height: 22.5, // Scaled: 546*0.75, 30*0.75, 480*0.75
          fill: '#e9ecef',
          name: 'header_banner_right_panel'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 424.5,
          top: 60,
          width: 345, // Scaled: 566*0.75, 80*0.75, 460*0.75
          fill: '#495057',
          text: 'Order of Service',
          fontSize: 21, // Scaled: 28*0.75
          fontFamily: 'Georgia',
          name: 'order_of_service_title_right',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 424.5,
          top: 105,
          width: 345,
          height: 450, // Scaled: 566*0.75, 140*0.75, 460*0.75, 600*0.75
          fill: '#495057',
          text: 'Prelude\nOpening Prayer\nScripture Reading\nEulogy\nSong\nMessage\nClosing Prayer\nRecessional',
          fontSize: 12, // Scaled: 16*0.75
          fontFamily: 'Arial',
          name: 'order_of_service_content_right',
          lineHeight: 1.6
        }
      ]
    })
  },

  // 2. NEW Photo Collage Bifold
  {
    id: 'celebration-photo-collage-bifold',
    name: 'Celebration Photo Collage Bifold',
    width: 792,
    height: 612,
    backgroundColor: '#ffffff',
    fabricJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        // Example subtle background pattern
        type: 'image',
        version: VERSION,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 792,
        height: 612,
        src: '/subtle-light-texture.png', // ** ASSUMES you have this image in /public **
        opacity: 0.5,
        name: 'subtle_background'
      },
      objects: [
        // Line divider for fold (visual only)
        {
          type: 'line',
          version: VERSION,
          left: 396,
          top: 20,
          height: 572, // height - margins
          stroke: '#dee2e6',
          strokeWidth: 1,
          angle: 90, // Vertical line
          selectable: false,
          evented: false,
          name: 'fold_line_visual'
        },
        // Left Panel (e.g., Cover when folded) - 0 to 396
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 198,
          top: 60,
          width: 356, // Centered in left panel
          fill: '#2c3e50',
          text: 'A Celebration of Life',
          fontSize: 28,
          fontFamily: 'Lato',
          fontWeight: '300',
          name: 'cover_title',
          textAlign: 'center'
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 198,
          top: 130,
          width: 280,
          height: 200,
          fill: '#e9ecef',
          name: 'cover_photo_placeholder',
          stroke: '#bdc3c7',
          strokeWidth: 1
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 198,
          top: 350,
          width: 356,
          fill: '#34495e',
          text: 'Beloved Name',
          fontSize: 24,
          fontFamily: 'Lato',
          fontWeight: 'bold',
          name: 'cover_name',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 198,
          top: 400,
          width: 356,
          fill: '#7f8c8d',
          text: 'Date of Birth – Date of Passing',
          fontSize: 14,
          fontFamily: 'Lato',
          name: 'cover_dates',
          textAlign: 'center'
        },

        // Right Panel (e.g., Inside page) - 396 to 792
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 594,
          top: 40,
          width: 356, // Centered in right panel (396 + 198)
          fill: '#2c3e50',
          text: 'Cherished Memories',
          fontSize: 22,
          fontFamily: 'Lato',
          name: 'inside_title',
          textAlign: 'center'
        },
        // Photo collage placeholders
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 426,
          top: 90,
          width: 150,
          height: 120,
          fill: '#f8f9fa',
          name: 'photo1',
          stroke: '#bdc3c7',
          strokeWidth: 1
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'right',
          originY: 'top',
          left: 762,
          top: 90,
          width: 150,
          height: 120, // 792-30 margin
          fill: '#f8f9fa',
          name: 'photo2',
          stroke: '#bdc3c7',
          strokeWidth: 1
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'center',
          originY: 'center',
          left: 594,
          top: 280,
          width: 200,
          height: 160, // Centered vertically somewhat
          fill: '#f8f9fa',
          name: 'photo3_center',
          stroke: '#bdc3c7',
          strokeWidth: 1,
          angle: -5 // Slight angle
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'bottom',
          left: 426,
          top: 572,
          width: 150,
          height: 120, // 612-40 margin
          fill: '#f8f9fa',
          name: 'photo4',
          stroke: '#bdc3c7',
          strokeWidth: 1
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'right',
          originY: 'bottom',
          left: 762,
          top: 572,
          width: 150,
          height: 120,
          fill: '#f8f9fa',
          name: 'photo5',
          stroke: '#bdc3c7',
          strokeWidth: 1
        }
      ]
    })
  },

  // ==============================================================
  // TRIFOLDS (1275 x 825)
  // ==============================================================

  // 3. Jane Doe Trifold Memorial Program (Resized)
  {
    id: 'trifold-green-elegance',
    name: 'Green Elegance Trifold',
    style: 'green-elegance',
    width: 1275,
    height: 825,
    outsideJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        version: VERSION,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825, // Resized
        fit: 'contain',
        src: '/green-elegance-smol.jpg',
        name: 'background_image_green_elegance'
      },
      objects: [
        // --- Panel 3: Front Cover (Rightmost: X from 850 to 1275) --- Panel Width = 425
        {
          type: 'Image',
          src: '/dove-01.png',
          name: 'dove_image_front',
          left: 830,
          top: 120,
          scaleX: 0.85,
          scaleY: 0.85,
          angle: 4.7812
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'Image',
          src: '/brianna-richards-pic.png',
          name: 'deceased_cover_photo',
          left: 865,
          top: 60,
          scaleX: 0.75,
          scaleY: 0.75
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'textbox',
          text: 'Celebration',
          left: 760,
          top: 50,
          width: 375,
          fill: 'white',
          shadow: greenEleganceShadow,
          fontSize: 21,
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'of',
          left: 770,
          top: 70,
          width: 375,
          fill: 'white',
          shadow: greenEleganceShadow,
          fontSize: 21,
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'for',
          left: 745,
          top: 150,
          width: 375,
          fill: 'white',
          shadow: greenEleganceShadow,
          fontSize: 21,
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'Life',
          left: 760,
          top: 100,
          width: 375,
          fill: goldGradient,
          padding: 10,
          shadow: greenEleganceShadow,
          fontSize: 42,
          fontFamily: 'Aston Script Pro Bold',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 412.5,
          width: 375,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Name Here',
          fontSize: 48,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'name_of_deceased',
          editable: false
        },
        {
          type: 'textbox',
          originX: 'center',
          originY: 'top',
          left: 962.5,
          top: 507.5,
          width: 300,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Sunrise',
          fontSize: 24, // Scaled
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'sunrise',
          editable: false
        },
        {
          type: 'textbox',
          originX: 'center',
          originY: 'top',
          left: 1162.5,
          top: 507.5,
          width: 300,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Sunset',
          fontSize: 24,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'sunset',
          editable: false
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'sunrise_date',
          left: 840,
          top: 550,
          width: 250,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'sunset_date',
          left: 1040,
          top: 550,
          width: 250,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'Wednesday, March 23, 2025',
          name: 'service_date',
          left: 880,
          top: 608,
          width: 375,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: '12:00 PM',
          name: 'service_time',
          left: 880,
          top: 635,
          width: 375,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 685,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'RHPB Baptist Church\n1024 9th Ave N\nRocky Heights, AL 35001',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_church_address'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 760,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Rev. James Carmichael — Officiating',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          name: 'front_officiant'
        },

        // --- Panel 2: Middle Panel (X from 425 to 850) ---
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 62.5,
          width: 350,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Pallbearers',
          fontSize: 34,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 110,
          width: 350,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Friends of the Family',
          fontSize: 18,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 182.5,
          width: 350,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Flower Bearers',
          fontSize: 34,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 230,
          width: 350,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Friends of the Family',
          fontSize: 18,
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_flowerbearers_names_2'
        },
        {
          type: 'textbox',
          version: VERSION,
          left: centerMiddlePanelTrifold,
          top: 302.5,
          width: 350,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Burial',
          fontSize: 34,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'mid_burial_title'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 350,
          width: 350, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Rocky Heights Memorial Garden',
          fontSize: 18, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_burial_location'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 500,
          width: 375, // Scaled: 2000*0.25
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Acknowledgement',
          fontSize: 27.5, // Scaled: 110*0.25
          fontFamily: 'Aston Script Pro Bold',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'mid_ack_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 550,
          width: 350, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'The family of Jane Doe would like to thank everyone for their kind expressions. Your phone calls, visits, flowers, thoughts, and prayers have all helped greatly during our time of bereavement. May God continue to bless each of you is our prayer.',
          fontSize: 20, // Scaled: 80*0.25
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 1.5,
          name: 'mid_ack_text'
        },

        // --- Panel 1: Left Panel (Back Page when folded - X from 0 to 425) ---
        {
          type: 'rect',
          version: VERSION,
          left: 48,
          bottom: 10,
          width: 325,
          height: 1275,
          fill: '#04291d',
          opacity: '.5',
          name: 'green_bar',
          cornerColor: 'rgb(178,204,0)'
        },
        {
          type: 'textbox',
          version: VERSION,
          left: 48,
          top: 80,
          width: 325, // Scaled: (1700 / 2)*0.25, 250*0.25, 1500*0.25
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: "God's Garden",
          fontSize: 37.5, // Scaled: 150*0.25
          fontFamily: 'Aston Script Pro Bold',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'left_poem_title',
          lockMovementX: true
        },
        {
          type: 'textbox',
          version: VERSION,
          left: 48,
          top: 160,
          width: 325,
          height: 500,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: `God looked around His garden,
And He found an empty place.
He then looked down upon the Earth
And saw your precious face.
He put His arms around you
And lifted you to rest.
God’s garden must be beautiful;
He always takes the best.
He knew that you were suffering;
He knew you were in pain.
He knew you would never, ever
Get well on Earth again.
So He closed your weary eyelids
And whispered, “Peace be thine.”
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
      ]
    }),
    insideJSON: JSON.stringify({
      version: '6.0.0',
      backgroundImage: {
        type: 'image',
        version: '6.0.0',
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825,
        src: '/green-elegance-smol.jpg',
        name: 'background_image_green_elegance'
      },
      objects: [
        {
          type: 'textbox',
          name: 'left_poem_title',
          left: 48,
          top: 62.5,
          width: 325,
          fill: '#FFFFFF',
          text: "God's Garden",
          fontSize: 37.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          name: 'left_poem_text',
          left: 48,
          top: 137.5,
          width: 325,
          fill: '#FFFFFF',
          text: 'God looked around His garden...\n(...rest of the poem...)',
          fontSize: 18,
          fontFamily: 'Georgia',
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: 1.2
        }
      ]
    })
  },
  {
    id: 'trifold-blue-elegance',
    name: 'Blue Elegance Trifold',
    style: 'blue-elegance',
    width: 1275,
    height: 825,
    outsideJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        version: VERSION,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825, // Resized
        fit: 'contain',
        src: '/blue-and-gold-elegance.jpg',
        name: 'background_image_blue_elegance'
      },
      objects: [
        // --- Panel 3: Front Cover (Rightmost: X from 850 to 1275) --- Panel Width = 425
        {
          type: 'Image',
          src: '/dove-01.png',
          name: 'dove_image_front',
          left: 830,
          top: 120,
          scaleX: 0.85,
          scaleY: 0.85,
          angle: 4.7812
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'Image',
          src: '/brianna-richards-pic.png',
          name: 'deceased_cover_photo',
          left: 865,
          top: 60,
          scaleX: 0.75,
          scaleY: 0.75
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'textbox',
          text: 'Celebration',
          left: 760,
          top: 50,
          width: 375,
          fill: 'white',
          shadow: greenEleganceShadow,
          fontSize: 21,
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'of',
          left: 770,
          top: 70,
          width: 375,
          fill: 'white',
          shadow: greenEleganceShadow,
          fontSize: 21,
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'for',
          left: 745,
          top: 150,
          width: 375,
          fill: 'white',
          shadow: greenEleganceShadow,
          fontSize: 21,
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: 'Life',
          left: 760,
          top: 100,
          width: 375,
          fill: goldGradient,
          padding: 10,
          shadow: greenEleganceShadow,
          fontSize: 42,
          fontFamily: 'Aston Script Pro Bold',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 412.5,
          width: 375,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Name Here',
          fontSize: 48,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'name_of_deceased',
          editable: false
        },
        {
          type: 'textbox',
          originX: 'center',
          originY: 'top',
          left: 962.5,
          top: 507.5,
          width: 300,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Sunrise',
          fontSize: 24, // Scaled
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'sunrise',
          editable: false
        },
        {
          type: 'textbox',
          originX: 'center',
          originY: 'top',
          left: 1162.5,
          top: 507.5,
          width: 300,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Sunset',
          fontSize: 24,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'sunset',
          editable: false
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'sunrise_date',
          left: 840,
          top: 550,
          width: 250,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'XX-XX-XXXX',
          name: 'sunset_date',
          left: 1040,
          top: 550,
          width: 250,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center',
          editable: false
        },
        {
          type: 'textbox',
          text: 'Wednesday, March 23, 2025',
          name: 'service_date',
          left: 880,
          top: 608,
          width: 375,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          text: '12:00 PM',
          name: 'service_time',
          left: 880,
          top: 635,
          width: 375,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          fontSize: 22.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 685,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'RHPB Baptist Church\n1024 9th Ave N\nRocky Heights, AL 35001',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_church_address'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 760,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Rev. James Carmichael — Officiating',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          name: 'front_officiant'
        },

        // --- Panel 2: Middle Panel (X from 425 to 850) ---
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 62.5,
          width: 350,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Pallbearers',
          fontSize: 34,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 110,
          width: 350,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Friends of the Family',
          fontSize: 18,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 182.5,
          width: 350,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Flower Bearers',
          fontSize: 34,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 230,
          width: 350,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Friends of the Family',
          fontSize: 18,
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_flowerbearers_names_2'
        },
        {
          type: 'textbox',
          version: VERSION,
          left: centerMiddlePanelTrifold,
          top: 302.5,
          width: 350,
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Burial',
          fontSize: 34,
          fontFamily: 'Aston Script Pro Bold',
          textAlign: 'center',
          name: 'mid_burial_title'
        },
        {
          type: 'textbox',
          left: centerMiddlePanelTrifold,
          top: 350,
          width: 350, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'Rocky Heights Memorial Garden',
          fontSize: 18, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_burial_location'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 500,
          width: 375, // Scaled: 2000*0.25
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: 'Acknowledgement',
          fontSize: 27.5, // Scaled: 110*0.25
          fontFamily: 'Aston Script Pro Bold',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'mid_ack_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 550,
          width: 350, // Scaled approx
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: 'The family of Jane Doe would like to thank everyone for their kind expressions. Your phone calls, visits, flowers, thoughts, and prayers have all helped greatly during our time of bereavement. May God continue to bless each of you is our prayer.',
          fontSize: 20, // Scaled: 80*0.25
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 1.5,
          name: 'mid_ack_text'
        },

        // --- Panel 1: Left Panel (Back Page when folded - X from 0 to 425) ---
        {
          type: 'rect',
          version: VERSION,
          left: 48,
          bottom: 10,
          width: 325,
          height: 1275,
          fill: '#04291d',
          opacity: '.5',
          name: 'green_bar',
          cornerColor: 'rgb(178,204,0)'
        },
        {
          type: 'textbox',
          version: VERSION,
          left: 48,
          top: 80,
          width: 325, // Scaled: (1700 / 2)*0.25, 250*0.25, 1500*0.25
          fill: goldGradient,
          shadow: greenEleganceShadow,
          text: "God's Garden",
          fontSize: 37.5, // Scaled: 150*0.25
          fontFamily: 'Aston Script Pro Bold',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'left_poem_title',
          lockMovementX: true
        },
        {
          type: 'textbox',
          version: VERSION,
          left: 48,
          top: 160,
          width: 325,
          height: 500,
          fill: '#FFFFFF',
          shadow: greenEleganceShadow,
          text: `God looked around His garden,
And He found an empty place.
He then looked down upon the Earth
And saw your precious face.
He put His arms around you
And lifted you to rest.
God’s garden must be beautiful;
He always takes the best.
He knew that you were suffering;
He knew you were in pain.
He knew you would never, ever
Get well on Earth again.
So He closed your weary eyelids
And whispered, “Peace be thine.”
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
      ]
    }),
    insideJSON: JSON.stringify({
      version: '6.0.0',
      backgroundImage: {
        type: 'image',
        version: '6.0.0',
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825,
        src: '/green-elegance-smol.jpg',
        name: 'background_image_green_elegance'
      },
      objects: [
        {
          type: 'textbox',
          name: 'left_poem_title',
          left: 48,
          top: 62.5,
          width: 325,
          fill: '#FFFFFF',
          text: "God's Garden",
          fontSize: 37.5,
          fontFamily: 'Georgia',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          name: 'left_poem_text',
          left: 48,
          top: 137.5,
          width: 325,
          fill: '#FFFFFF',
          text: 'God looked around His garden...\n(...rest of the poem...)',
          fontSize: 18,
          fontFamily: 'Georgia',
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: 1.2
        }
      ]
    })
  },

  {
    id: 'trifold-blue-and-gold-elegance',
    name: 'Blue and Gold Elegance Trifold',
    width: 1275, // Resized: 5100 * 0.25
    height: 825, // Resized: 3300 * 0.25
    fabricJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        version: VERSION,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825, // Resized
        fit: 'contain',
        src: '/blue-and-gold-elegance.jpg',
        name: 'background_image_green_elegance'
      },
      objects: [
        // --- Panel 3: Front Cover (Rightmost: X from 850 to 1275) --- Panel Width = 425
        {
          type: 'ellipse',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 50, // Scaled: (3400 + 1700 / 2)*0.25, 200*0.25
          rx: 150,
          ry: 137.5, // Scaled: 600*0.25, 550*0.25
          fill: 'rgba(232, 245, 233, 0.85)',
          stroke: '#A5D6A7',
          strokeWidth: 2.5, // Scaled: 10*0.25
          name: 'photo_oval_placeholder',
          selectable: true
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 350,
          width: 375, // Scaled: (3400 + 1700 / 2)*0.25, (1100 + 200 + 100)*0.25, 1500*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px', // Scaled shadow
          text: 'Celebration of Life for',
          fontSize: 27.5, // Scaled: 110*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'front_celebration_text'
        },
        {
          // Scaled Image Placeholder (Original was an actual image, keeping structure but scaling pos/size)
          type: 'Image',
          version: VERSION,
          originX: 'center',
          originY: 'center',
          left: 923.56,
          top: 456.34,
          width: 250,
          height: 250, // Scaled: 3694.2494*0.25, 1825.3796*0.25, 300*0.25, 300*0.25
          // Keep original src, angle, scaleX/Y - let Fabric handle scaling on load based on new width/height if possible
          angle: 4.7812,
          src: '/dove-01.png', // Use a placeholder path or ensure this exists
          name: 'dove_image_placeholder'
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 412.5,
          width: 375, // Scaled
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Jane Doe',
          fontSize: 55, // Scaled: 220*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'front_jane_doe_name'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 962.5,
          top: 507.5,
          width: 300, // Scaled approx: (3400 + 900 / 2)*0.25 etc.
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Sunrise\nOctober 14, 1985',
          fontSize: 22.5, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_sunrise_date_text'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1162.5,
          top: 507.5,
          width: 300, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Sunset\nMarch 20, 2025',
          fontSize: 22.5, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_sunset_date_text'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 607.5,
          width: 375, // Scaled
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Wednesday, March 23, 2025\n12:00 Noon',
          fontSize: 22.5, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_service_datetime'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 685,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'RHPB Baptist Church\n1024 9th Ave N\nRocky Heights, AL 35001',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_church_address'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 760,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Rev. James Carmichael — Officiating',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          name: 'front_officiant'
        },

        // --- Panel 2: Middle Panel (X from 425 to 850) ---
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 62.5,
          width: 375, // Scaled: (1700 + 1700 / 2)*0.25, 250*0.25, 1500*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Pallbearers',
          fontSize: 32.5, // Scaled: 130*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'mid_pallbearers_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 110,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Friends of the Family',
          fontSize: 22.5, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_pallbearers_names'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 182.5,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Flower Bearers',
          fontSize: 32.5, // Scaled: 130*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'mid_flowerbearers_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 230,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Friends of the Family',
          fontSize: 22.5, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_flowerbearers_names_2'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 302.5,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Burial',
          fontSize: 32.5, // Scaled: 130*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'mid_burial_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 350,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Rocky Heights Memorial Garden',
          fontSize: 22.5, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_burial_location'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 500,
          width: 375, // Scaled: 2000*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Acknowledgement',
          fontSize: 27.5, // Scaled: 110*0.25
          fontFamily: 'Georgia',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'mid_ack_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 550,
          width: 350, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'The family of Jane Doe would like to thank everyone for their kind expressions. Your phone calls, visits, flowers, thoughts, and prayers have all helped greatly during our time of bereavement. May God continue to bless each of you is our prayer.',
          fontSize: 20, // Scaled: 80*0.25
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 1.5,
          name: 'mid_ack_text'
        },

        // --- Panel 1: Left Panel (Back Page when folded - X from 0 to 425) ---
        {
          type: 'rect',
          version: VERSION,
          left: 48,
          top: 0,
          width: 325,
          height: 1275,
          fill: '#04291d',
          opacity: '.5',
          name: 'green_bar'
        },
        {
          type: 'textbox',
          version: VERSION,
          left: 50,
          top: 62.5,
          width: 328,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: "God's Garden",
          fontSize: 37.5, // Scaled: 150*0.25
          fontFamily: 'Georgia',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'left_poem_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          left: 50,
          top: 137.5,
          width: 328,
          height: 500, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'God looked around His garden...\n(...rest of the poem scaled...)', // Shortened for brevity
          fontSize: 18, // Scaled: 72*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: 1.2,
          name: 'left_poem_text'
        }
      ]
    })
  },

  {
    id: 'trifold-pink-roses',
    name: 'Pink Roses Trifold',
    width: 1275, // Resized: 5100 * 0.25
    height: 825, // Resized: 3300 * 0.25
    fabricJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        version: VERSION,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825, // Resized
        fit: 'contain',
        src: '/pink-roses-bg.jpg',
        name: 'background_image_pink_roses'
      },
      objects: [
        // --- Panel 3: Front Cover (Rightmost: X from 850 to 1275) --- Panel Width = 425
        {
          type: 'ellipse',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 50, // Scaled: (3400 + 1700 / 2)*0.25, 200*0.25
          rx: 150,
          ry: 137.5, // Scaled: 600*0.25, 550*0.25
          fill: 'rgba(232, 245, 233, 0.85)',
          stroke: '#A5D6A7',
          strokeWidth: 2.5, // Scaled: 10*0.25
          name: 'photo_oval_placeholder',
          selectable: true
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 350,
          width: 375, // Scaled: (3400 + 1700 / 2)*0.25, (1100 + 200 + 100)*0.25, 1500*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px', // Scaled shadow
          text: 'Celebration of Life for',
          fontSize: 27.5, // Scaled: 110*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'front_celebration_text'
        },
        {
          // Scaled Image Placeholder (Original was an actual image, keeping structure but scaling pos/size)
          type: 'Image',
          version: VERSION,
          originX: 'center',
          originY: 'center',
          left: 923.56,
          top: 456.34,
          width: 250,
          height: 250, // Scaled: 3694.2494*0.25, 1825.3796*0.25, 300*0.25, 300*0.25
          // Keep original src, angle, scaleX/Y - let Fabric handle scaling on load based on new width/height if possible
          angle: 4.7812,
          src: '/dove-01.png', // Use a placeholder path or ensure this exists
          name: 'dove_image_placeholder'
          // NOTE: Loading external images or large base64 might be slow. Consider placeholders first.
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 412.5,
          width: 375, // Scaled
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Jane Doe',
          fontSize: 55, // Scaled: 220*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'front_jane_doe_name'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 962.5,
          top: 507.5,
          width: 300, // Scaled approx: (3400 + 900 / 2)*0.25 etc.
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Sunrise\nOctober 14, 1985',
          fontSize: 22.5, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_sunrise_date_text'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1162.5,
          top: 507.5,
          width: 300, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Sunset\nMarch 20, 2025',
          fontSize: 22.5, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_sunset_date_text'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 607.5,
          width: 375, // Scaled
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Wednesday, March 23, 2025\n12:00 Noon',
          fontSize: 22.5, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_service_datetime'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 685,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'RHPB Baptist Church\n1024 9th Ave N\nRocky Heights, AL 35001',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          textAlign: 'center',
          lineHeight: 1.2,
          name: 'front_church_address'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 1062.5,
          top: 760,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Rev. James Carmichael — Officiating',
          fontSize: 20, // Scaled
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          name: 'front_officiant'
        },

        // --- Panel 2: Middle Panel (X from 425 to 850) ---
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 62.5,
          width: 375, // Scaled: (1700 + 1700 / 2)*0.25, 250*0.25, 1500*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Pallbearers',
          fontSize: 32.5, // Scaled: 130*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'mid_pallbearers_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 110,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Friends of the Family',
          fontSize: 22.5, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_pallbearers_names'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 182.5,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Flower Bearers',
          fontSize: 32.5, // Scaled: 130*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'mid_flowerbearers_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 230,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Friends of the Family',
          fontSize: 22.5, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_flowerbearers_names_2'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 302.5,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Burial',
          fontSize: 32.5, // Scaled: 130*0.25
          fontFamily: 'Brush Script MT',
          textAlign: 'center',
          name: 'mid_burial_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 350,
          width: 375, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Rocky Heights Memorial Garden',
          fontSize: 22.5, // Scaled: 90*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          name: 'mid_burial_location'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 500,
          width: 375, // Scaled: 2000*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'Acknowledgement',
          fontSize: 27.5, // Scaled: 110*0.25
          fontFamily: 'Georgia',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'mid_ack_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 550,
          width: 350, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'The family of Jane Doe would like to thank everyone for their kind expressions. Your phone calls, visits, flowers, thoughts, and prayers have all helped greatly during our time of bereavement. May God continue to bless each of you is our prayer.',
          fontSize: 20, // Scaled: 80*0.25
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 1.5,
          name: 'mid_ack_text'
        },

        // --- Panel 1: Left Panel (Back Page when folded - X from 0 to 425) ---
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 212.5,
          top: 62.5,
          width: 375, // Scaled: (1700 / 2)*0.25, 250*0.25, 1500*0.25
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: "God's Garden",
          fontSize: 37.5, // Scaled: 150*0.25
          fontFamily: 'Georgia',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'left_poem_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 212.5,
          top: 137.5,
          width: 350,
          height: 500, // Scaled approx
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.8) 1.5px 1.5px 4px',
          text: 'God looked around His garden...\n(...rest of the poem scaled...)', // Shortened for brevity
          fontSize: 18, // Scaled: 72*0.25
          fontFamily: 'Georgia',
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: 1.2,
          name: 'left_poem_text'
        }
      ]
    })
  },

  // 4. Memories Modern Trifold (Resized & Adjusted)
  {
    id: 'modern-photo-trifold-memories',
    name: 'Memories Modern Trifold',
    width: 1275, // New width
    height: 825, // New height
    fabricJSON: JSON.stringify({
      version: VERSION,
      backgroundImage: {
        type: 'image',
        version: VERSION,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 1275,
        height: 825, // Updated
        src: '/modern-abstract-bg.jpg', // ** Different background image **
        name: 'background_image_modern'
      },
      objects: [
        // Panel 3 (Rightmost: 850 to 1275) - Photo Panel
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 870,
          top: 30,
          width: 385,
          height: 765, // Adjusted for new panel width (425), keeping margins
          fill: 'rgba(241,243,245,0.7)',
          name: 'panel3_photo_placeholder_large',
          stroke: '#cccccc',
          strokeWidth: 1
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'bottom',
          left: 1062.5,
          top: 780,
          width: 365, // Centered in panel 3, near bottom
          fill: '#343a40',
          text: 'Moments to Cherish',
          fontSize: 18, // Adjusted font size
          fontFamily: 'Helvetica Neue',
          fontWeight: '300',
          textAlign: 'center',
          name: 'panel3_caption'
        },
        // Panel 2 (Center: 425 to 850) - Main Info
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 80,
          width: 385, // Centered in panel 2
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.5) 1px 1px 3px',
          text: 'Celebrating the Life of',
          fontSize: 30, // Adjusted
          fontFamily: 'Helvetica Neue',
          fontWeight: '300',
          textAlign: 'center',
          name: 'panel2_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 150,
          width: 385,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.5) 1px 1px 3px',
          text: 'DECEASED NAME',
          fontSize: 36, // Adjusted
          fontFamily: 'Helvetica Neue',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'panel2_name'
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 240,
          width: 320,
          height: 240, // Adjusted size
          fill: 'rgba(233,236,239,0.8)',
          name: 'panel2_main_photo',
          stroke: '#bdc3c7',
          strokeWidth: 1
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 520,
          width: 385,
          fill: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.5) 1px 1px 3px',
          text: 'Service Details:\nDate, Time\nLocation\nOfficiant',
          fontSize: 18, // Adjusted
          fontFamily: 'Helvetica Neue',
          fontWeight: '300',
          textAlign: 'center',
          name: 'panel2_service_details',
          lineHeight: 1.6
        },
        // Panel 1 (Leftmost: 0 to 425) - Back Panel / Info
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 20,
          top: 30,
          width: 385,
          height: 280, // Adjusted size/position
          fill: 'rgba(222,226,230,0.7)',
          name: 'panel1_info_photo_placeholder',
          stroke: '#cccccc',
          strokeWidth: 1
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 212.5,
          top: 350,
          width: 385, // Centered in panel 1
          fill: '#343a40',
          text: 'Acknowledgements',
          fontSize: 24, // Adjusted
          fontFamily: 'Helvetica Neue',
          fontWeight: '500',
          textAlign: 'center',
          name: 'panel1_ack_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 212.5,
          top: 420,
          width: 365, // Adjusted
          fill: '#495057',
          text: 'The family wishes to express their sincere gratitude for the many acts of kindness, love, and support shown during this time of bereavement.',
          fontSize: 16, // Adjusted
          fontFamily: 'Helvetica Neue',
          fontWeight: '300',
          textAlign: 'center',
          name: 'panel1_ack_text',
          lineHeight: 1.5
        }
      ]
    })
  },

  // 5. NEW Minimalist Trifold Reflection
  {
    id: 'minimalist-trifold-reflection',
    name: 'Minimalist Reflection Trifold',
    width: 1275,
    height: 825,
    backgroundColor: '#ffffff', // Clean white background
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        // Visual fold lines (subtle)
        {
          type: 'line',
          version: VERSION,
          left: 425,
          top: 20,
          height: 785,
          angle: 90,
          stroke: '#f1f3f5',
          strokeWidth: 1,
          selectable: false,
          evented: false,
          name: 'fold1_visual'
        },
        {
          type: 'line',
          version: VERSION,
          left: 850,
          top: 20,
          height: 785,
          angle: 90,
          stroke: '#f1f3f5',
          strokeWidth: 1,
          selectable: false,
          evented: false,
          name: 'fold2_visual'
        },

        // Panel 3 (Rightmost / Cover Panel: 850 to 1275)
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'center',
          left: 1062.5,
          top: 412.5, // Centered in panel 3
          width: 380,
          fill: '#343a40',
          text: 'In Remembrance',
          fontSize: 36,
          fontFamily: 'Lato',
          fontWeight: '300',
          textAlign: 'center',
          name: 'cover_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'bottom',
          left: 1062.5,
          top: 780, // Bottom of panel 3
          width: 380,
          fill: '#868e96',
          text: 'Full Name | Dates',
          fontSize: 16,
          fontFamily: 'Lato',
          textAlign: 'center',
          name: 'cover_name_dates'
        },

        // Panel 2 (Center Panel: 425 to 850) - Order of Service / Main Content
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 100, // Centered in panel 2
          width: 380,
          fill: '#212529',
          text: 'Order of Service',
          fontSize: 24,
          fontFamily: 'Lato',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'oos_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 637.5,
          top: 180, // Below title
          width: 360,
          fill: '#495057',
          text: 'Prelude\nInvocation\nReading\nHymn\nEulogy\nBenediction\nRecessional',
          fontSize: 18,
          fontFamily: 'Lato',
          fontWeight: '300',
          textAlign: 'center',
          name: 'oos_items',
          lineHeight: 2.2
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'bottom',
          left: 637.5,
          top: 780, // Bottom of panel 2
          width: 380,
          fill: '#adb5bd',
          text: 'Location | Date | Time',
          fontSize: 14,
          fontFamily: 'Lato',
          textAlign: 'center',
          name: 'service_details'
        },

        // Panel 1 (Leftmost / Back Panel: 0 to 425) - Poem or Quote & Ack.
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 212.5,
          top: 150, // Centered in panel 1
          width: 360,
          fill: '#495057',
          text: '"Perhaps they are not stars in the sky, but rather openings where our loved ones shine down to let us know they are happy."', // Example quote
          fontSize: 18,
          fontFamily: 'Lato',
          fontStyle: 'italic',
          fontWeight: '300',
          textAlign: 'center',
          name: 'back_quote',
          lineHeight: 1.6
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'bottom',
          left: 212.5,
          top: 700, // Lower part of panel 1
          width: 360,
          fill: '#343a40',
          text: 'Acknowledgements',
          fontSize: 20,
          fontFamily: 'Lato',
          fontWeight: 'bold',
          textAlign: 'center',
          name: 'back_ack_title'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'bottom',
          left: 212.5,
          top: 780, // Bottom of panel 1
          width: 360,
          fill: '#868e96',
          text: 'The family thanks you for your love and support.',
          fontSize: 14,
          fontFamily: 'Lato',
          fontWeight: '300',
          textAlign: 'center',
          name: 'back_ack_text',
          lineHeight: 1.5
        }
      ]
    })
  },

  // ==============================================================
  // OTHER TEMPLATES (Original Sizes)
  // ==============================================================

  // 6. Serene Single Page Order of Service (Original)
  {
    id: 'serene-single-page-简约',
    name: 'Serene Single Page Order of Service',
    width: 816,
    height: 1056,
    backgroundColor: '#ffffff',
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 408,
          top: 60,
          width: 700,
          fill: '#333',
          text: 'Order of Service',
          fontSize: 36,
          fontFamily: 'Garamond',
          name: 'title',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 408,
          top: 130,
          width: 700,
          fill: '#555',
          text: 'Honoring The Life Of',
          fontSize: 20,
          fontFamily: 'Garamond',
          name: 'subtitle',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 408,
          top: 180,
          width: 700,
          fill: '#333',
          text: 'Beloved Full Name',
          fontSize: 28,
          fontFamily: 'Garamond',
          fontWeight: 'bold',
          name: 'deceased_name',
          textAlign: 'center'
        },
        {
          type: 'line',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 408,
          top: 250,
          x1: -150,
          y1: 0,
          x2: 150,
          y2: 0,
          stroke: '#ccc',
          strokeWidth: 1,
          name: 'divider_line'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 100,
          top: 300,
          width: 616,
          fill: '#444',
          text: 'Opening Remarks\nMusical Selection\nReadings\nEulogy\nAcknowledgements\nClosing Prayer',
          fontSize: 18,
          fontFamily: 'Garamond',
          name: 'service_items',
          lineHeight: 2.2,
          textAlign: 'center'
        }
      ]
    })
  },

  // 7. Hope Floral Memorial Card (Original)
  {
    id: 'floral-memorial-card-hope',
    name: 'Hope Floral Memorial Card',
    width: 240,
    height: 408,
    backgroundColor: '#fdfbf8',
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        {
          type: 'rect',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 120,
          top: 20,
          width: 200,
          height: 80,
          fill: '#e6f0e6',
          name: 'floral_placeholder_top'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 120,
          top: 120,
          width: 200,
          fill: '#5d4037',
          text: 'In Loving Memory',
          fontSize: 16,
          fontFamily: 'Brush Script MT',
          name: 'card_title',
          textAlign: 'center'
        },
        {
          type: 'rect',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 120,
          top: 160,
          width: 100,
          height: 120,
          fill: '#e0e0e0',
          name: 'photo_placeholder_small'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 120,
          top: 290,
          width: 200,
          fill: '#5d4037',
          text: 'Full Name\nDates',
          fontSize: 12,
          fontFamily: 'Times New Roman',
          name: 'card_name_dates',
          textAlign: 'center',
          lineHeight: 1.3
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 120,
          top: 340,
          width: 200,
          fill: '#795548',
          text: '"A cherished verse\nor short prayer here."',
          fontSize: 10,
          fontFamily: 'Times New Roman',
          fontStyle: 'italic',
          name: 'card_verse',
          textAlign: 'center',
          lineHeight: 1.3
        }
      ]
    })
  },

  // 8. Gratitude Thank You Card (Original)
  {
    id: 'elegant-thank-you-gratitude',
    name: 'Gratitude Thank You Card',
    width: 408,
    height: 528,
    backgroundColor: '#ffffff',
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        {
          type: 'rect',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 15,
          top: 15,
          width: 378,
          height: 498,
          fill: 'transparent',
          stroke: '#adb5bd',
          strokeWidth: 1,
          name: 'border'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'center',
          left: 204,
          top: 200,
          width: 350,
          fill: '#6c757d',
          text: 'With Sincere Gratitude',
          fontSize: 28,
          fontFamily: 'Playfair Display',
          name: 'thank_you_title',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'center',
          left: 204,
          top: 300,
          width: 350,
          fill: '#6c757d',
          text: 'Your kindness and support are deeply appreciated during this time of loss.',
          fontSize: 14,
          fontFamily: 'Lato',
          name: 'thank_you_message',
          textAlign: 'center',
          lineHeight: 1.5
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'bottom',
          left: 204,
          top: 480,
          width: 350,
          fill: '#6c757d',
          text: 'The Family of [Deceased Name]',
          fontSize: 12,
          fontFamily: 'Lato',
          name: 'family_signature',
          textAlign: 'center'
        }
      ]
    })
  },

  // 9. Legacy Registry Book Pages (Original)
  {
    id: 'remembrance-registry-book-legacy',
    name: 'Legacy Registry Book Pages',
    width: 816,
    height: 1056,
    backgroundColor: '#f8f9fa',
    fabricJSON: JSON.stringify({
      version: VERSION,
      objects: [
        {
          type: 'textbox',
          version: VERSION,
          originX: 'center',
          originY: 'top',
          left: 408,
          top: 50,
          width: 700,
          fill: '#343a40',
          text: 'Guests & Memories',
          fontSize: 30,
          fontFamily: 'Merriweather',
          name: 'registry_title',
          textAlign: 'center'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 70,
          top: 120,
          width: 250,
          fill: '#495057',
          text: 'Name',
          fontSize: 16,
          fontFamily: 'Merriweather',
          fontWeight: 'bold',
          name: 'header_name'
        },
        {
          type: 'textbox',
          version: VERSION,
          originX: 'left',
          originY: 'top',
          left: 350,
          top: 120,
          width: 400,
          fill: '#495057',
          text: 'Address / Condolences / Favorite Memory',
          fontSize: 16,
          fontFamily: 'Merriweather',
          fontWeight: 'bold',
          name: 'header_message'
        },
        // Lines represent rows for signing
        {
          type: 'line',
          version: VERSION,
          x1: 70,
          y1: 160,
          x2: 746,
          y2: 160,
          stroke: '#ced4da',
          strokeWidth: 1,
          name: 'line1'
        },
        {
          type: 'line',
          version: VERSION,
          x1: 70,
          y1: 200,
          x2: 746,
          y2: 200,
          stroke: '#ced4da',
          strokeWidth: 1,
          name: 'line2'
        },
        {
          type: 'line',
          version: VERSION,
          x1: 70,
          y1: 240,
          x2: 746,
          y2: 240,
          stroke: '#ced4da',
          strokeWidth: 1,
          name: 'line3'
        },
        // ... add more lines as needed ...
        {
          type: 'line',
          version: VERSION,
          x1: 70,
          y1: 950,
          x2: 746,
          y2: 950,
          stroke: '#ced4da',
          strokeWidth: 1,
          name: 'line_last'
        },
        // Vertical divider
        {
          type: 'line',
          version: VERSION,
          x1: 330,
          y1: 120,
          x2: 330,
          y2: 950,
          stroke: '#ced4da',
          strokeWidth: 1,
          name: 'divider_vertical'
        }
      ]
    })
  }
];
