export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'hoodies' | 'crewnecks' | 'sweatpants';
  priceUSD: number;
  image: string;
  backImage?: string;
  gallery?: string[];
  material: string;
  fabricOrigin: string;
  fabricWeight: string;
  colorways: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  careInstructions: string;
  inStock: boolean;
  edition: string;
  isNew?: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'simple-star-orbit-crewneck',
    name: 'SIMPLE Star Orbit Crewneck — Sky Blue',
    subtitle: 'Signature white star orbit crest & back 8-point constellation star',
    category: 'crewnecks',
    priceUSD: 800 / 49, // Exact 800 EGP
    image: '/assets/aistudio/simple_baby_blue_crewneck_front.jpg',
    backImage: '/assets/aistudio/simple_baby_blue_crewneck_back.jpg',
    gallery: [
      '/assets/aistudio/simple_baby_blue_crewneck_front.jpg',
      '/assets/aistudio/simple_baby_blue_crewneck_back.jpg',
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.43.24_PM_3fc6c840.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Sky Blue', hex: '#97C8EB' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'The defining original piece of the SIMPLE collection. Engineered in crisp baby sky blue featuring the signature embroidered white star orbit "simple" insignia on the left chest and the iconic 8-point celestial star centered on the upper back. Cut with relaxed drop shoulders, dense 2x2 ribbed collar, and substantial shape-retaining cuffs.',
    details: [
      'Dual signature artwork: Front chest elliptical star orbit insignia & upper back 8-point star emblem',
      'Dense combed cotton loopback fleece with ultra-soft brushed interior',
      'High-retention 2x2 double-knit ribbed collar, cuffs, and hemband',
      'Architectural drop shoulder with relaxed boxy silhouette',
      'Pre-washed with gentle organic enzymes for color longevity and lasting softness'
    ],
    careInstructions: 'Machine wash cold inside out with light colors. Line dry in shade to preserve crisp chest embroidery and back star emblem.',
    inStock: true,
    edition: 'Edition 04 — Signature Archive',
    isNew: true,
    featured: true
  },
  {
    id: 'simple-star-orbit-crewneck-black',
    name: 'SIMPLE Star Orbit Crewneck — Pitch Black',
    subtitle: 'Signature metallic star insignia on pitch black fleece',
    category: 'crewnecks',
    priceUSD: 800 / 49, // Exact 800 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.57.27_PM_35553796.jpeg',
    backImage: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.57.27_PM__1__2a7559c9.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.57.27_PM_35553796.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.57.27_PM__1__2a7559c9.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_3.57.26_PM_56e952cf.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Pitch Black', hex: '#0F0F0F' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'The defining graphic piece of the SIMPLE collection. Engineered in deep pitch black featuring the signature embroidered silver star orbit "simple" insignia on the left chest and the iconic 8-point celestial star emblem centered on the upper back. Cut with relaxed drop shoulders, dense 2x2 ribbed collar, and substantial wrist cuffs.',
    details: [
      'Dual signature artwork: Embroidered silver orbit star "simple" chest crest & upper back 8-point star',
      'Dense combed cotton loopback fleece with soft brushed interior',
      'High-retention 2x2 double-knit collar, cuffs, and hemband',
      'Drop shoulder with boxy relaxed silhouette',
      'Pre-washed with mineral enzymes for lasting deep black tone and broken-in drape'
    ],
    careInstructions: 'Machine wash cold inside out with dark colors. Line dry in shade to preserve crisp chest embroidery.',
    inStock: true,
    edition: 'Edition 04 — Signature',
    isNew: true,
    featured: true
  },
  {
    id: 'simple-crewneck-burgundy',
    name: 'SIMPLE Star Orbit Crewneck — Deep Burgundy',
    subtitle: 'Signature front star orbit insignia & sleeve star graphics',
    category: 'crewnecks',
    priceUSD: 800 / 49, // Exact 800 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_4.07.40_PM_8b1b3c0a.jpeg',
    backImage: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_4.07.40_PM__2__564592a5.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_4.07.40_PM_8b1b3c0a.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_4.07.40_PM__2__564592a5.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Deep Burgundy', hex: '#4A1521' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'Constructed in rich deep burgundy wine featuring our signature white and silver star orbit "simple" chest insignia, celestial sleeve graphics, and an architectural drop-shoulder cut. Crafted from heavyweight combed Egyptian cotton loopback fleece with a plush brushed interior.',
    details: [
      'Embroidered star orbit "simple" chest crest & sleeve celestial star insignia',
      'Dual studio view: Front graphic mockup and dedicated rear drape profile',
      'Dense combed cotton loopback fleece with ultra-soft brushed interior',
      'High-retention 2x2 double-knit ribbed collar, cuffs, and hemband',
      'Architectural drop shoulder with relaxed boxy silhouette',
      'Deep burgundy wine colorway dyed with reactive pigments for lasting depth',
      'Pre-washed with gentle organic enzymes for vintage broken-in handle'
    ],
    careInstructions: 'Machine wash cold inside out with dark colors. Line dry in shade to preserve embroidery and rich fabric tone.',
    inStock: true,
    edition: 'Edition 04 — Signature Archive',
    isNew: true,
    featured: true
  },

  {
    id: 'simple-star-orbit-hoodie-black',
    name: 'SIMPLE Star Orbit Hoodie — Pitch Black',
    subtitle: 'Front star orbit crest & back illuminated silver constellation graphic',
    category: 'hoodies',
    priceUSD: 1000 / 49, // Exact 1,000 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.28.59_PM_fecb7835.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.28.59_PM_fecb7835.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Pitch Black', hex: '#0F0F0F' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'The defining hoodie archetype of the SIMPLE collection. Engineered in deep pitch black with our signature star orbit crest on the left chest and the expansive illuminated star constellation spine artwork across the back reading "SIMPLE / SMALL STEPS BIG DIFFERENCE". Features a structured double-layer crossover hood and drop-shoulder volume.',
    details: [
      'Dual-sided studio artwork: Front chest star orbit insignia & full back illuminated star constellation',
      'Authentic motto typography: "SIMPLE / SMALL STEPS BIG DIFFERENCE"',
      'Self-lined double-layer crossover hood (no drawstrings)',
      'Dense 2x2 ribbed cuffs and hemband for lasting shape retention',
      'Drop shoulder with relaxed boxy silhouette',
      'Pre-washed with mineral enzymes for lasting softness and color depth'
    ],
    careInstructions: 'Machine wash cold inside out with dark colors. Line dry in shade to preserve back graphic & chest crest.',
    inStock: true,
    edition: 'Edition 04 — Signature',
    isNew: true,
    featured: true
  },
  {
    id: 'simple-star-orbit-hoodie-navy',
    name: 'SIMPLE Star Orbit Hoodie — Midnight Navy',
    subtitle: 'Front star orbit crest & back illuminated icy constellation graphic',
    category: 'hoodies',
    priceUSD: 1000 / 49, // Exact 1,000 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.36.58_PM_9f2bc598.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.36.58_PM_9f2bc598.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Midnight Navy', hex: '#1C2942' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'Constructed in rich deep midnight navy featuring our signature white star orbit crest on the left chest and an illuminated cosmic planetary orbit ring and star flare on the back with "SIMPLE / EST. 2025". Designed with an architectural double-layer crossover hood, drop shoulders, and kangaroo pouch.',
    details: [
      'Dual-sided studio presentation: Front star orbit crest & rear glowing planetary ring with star flare',
      'Signature collection print: "SIMPLE / EST. 2025" with celestial axis',
      'Self-lined double-layer crossover hood (no drawstrings)',
      'Dense 2x2 ribbed cuffs and hemband for lasting shape retention',
      'Drop shoulder with relaxed boxy silhouette',
      'Pre-washed with organic enzymes for vintage broken-in handle and deep navy tone'
    ],
    careInstructions: 'Machine wash cold inside out with dark tones. Line dry in shade to preserve back graphic & chest crest.',
    inStock: true,
    edition: 'Edition 04 — Signature',
    isNew: true,
    featured: true
  },
  {
    id: 'simple-star-orbit-sweatpants-pink',
    name: 'SIMPLE Star Orbit Sweatpants — Blush Pink',
    subtitle: 'Upper thigh typography & vertical calf star orbit insignia',
    category: 'sweatpants',
    priceUSD: 850 / 49, // Exact 850 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.21_PM_9ab54ebf.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.21_PM_9ab54ebf.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Blush Pink', hex: '#EAA4B8' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'Constructed in soft pastel blush pink featuring our signature clean "SIMPLE" lettering on the upper left thigh and the distinctive vertical star orbit insignia extending along the lower calf. Cut with an architectural wide-leg pooling silhouette, encased elastic drawstring waistband, deep front slash pockets, and a clean rear patch pocket.',
    details: [
      'Dual signature artwork: Upper thigh "SIMPLE" wordmark & vertical calf star orbit insignia',
      'Studio duo presentation: Front and back perspectives',
      'Encased ribbed elastic waistband with matching tone drawstrings',
      'Deep jersey-lined side slant pockets and rear square patch pocket',
      'Relaxed wide-leg pooling cut with clean hemmed cuffs',
      'Pre-washed with gentle organic enzymes for vintage broken-in handle and color retention'
    ],
    careInstructions: 'Machine wash cold inside out with light tones. Line dry in shade to preserve crisp graphic prints.',
    inStock: true,
    edition: 'Edition 04 — Signature Archive',
    isNew: true,
    featured: true
  },
  {
    id: 'simple-star-orbit-sweatpants-black',
    name: 'SIMPLE Star Orbit Sweatpants — Pitch Black',
    subtitle: 'Upper thigh typography & vertical calf star orbit insignia',
    category: 'sweatpants',
    priceUSD: 850 / 49, // Exact 850 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.42_PM_e5eaa49c.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.42_PM_e5eaa49c.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Pitch Black', hex: '#0F0F0F' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'Constructed in deep pitch black featuring our signature white "SIMPLE" lettering on the upper left thigh and the distinctive vertical star orbit insignia extending along the lower calf. Cut with an architectural wide-leg pooling silhouette, encased elastic drawstring waistband, deep front slash pockets, and a clean rear patch pocket.',
    details: [
      'Dual signature artwork: Upper thigh "SIMPLE" wordmark & vertical calf star orbit insignia',
      'Studio duo presentation: Front and back perspectives',
      'Encased ribbed elastic waistband with matching tone drawstrings',
      'Deep jersey-lined side slant pockets and rear square patch pocket',
      'Relaxed wide-leg pooling cut with clean hemmed cuffs',
      'Pre-washed with mineral enzymes for lasting deep black tone and plush feel'
    ],
    careInstructions: 'Machine wash cold inside out with dark tones. Line dry in shade to preserve crisp graphic prints.',
    inStock: true,
    edition: 'Edition 04 — Signature Archive',
    isNew: true,
    featured: true
  },
  {
    id: 'simple-star-orbit-sweatpants-grey',
    name: 'SIMPLE Star Orbit Sweatpants — Heather Grey',
    subtitle: 'Upper thigh typography & contrast black calf star orbit insignia',
    category: 'sweatpants',
    priceUSD: 850 / 49, // Exact 850 EGP
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.31_PM_ea167519.jpeg',
    gallery: [
      '/assets/aistudio/WhatsApp_Image_2026-10-23_at_5.43.31_PM_ea167519.jpeg'
    ],
    material: '100% Combed Heavy Cotton Fleece',
    fabricOrigin: 'Knitted from premium long-staple Egyptian cotton',
    fabricWeight: 'Heavy Brushed Fleece',
    colorways: [
      { name: 'Heather Grey', hex: '#9E9E9E' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    description: 'Constructed in melange heather grey featuring our signature crisp black "SIMPLE" lettering on the upper left thigh and the distinctive contrast black vertical star orbit insignia extending along the lower calf. Cut with an architectural wide-leg pooling silhouette, encased elastic drawstring waistband, deep front slash pockets, and a clean rear patch pocket.',
    details: [
      'Dual signature artwork: Upper thigh "SIMPLE" wordmark & contrast black calf star orbit insignia',
      'Studio duo presentation: Front and back perspectives',
      'Encased ribbed elastic waistband with matching tone drawstrings',
      'Deep jersey-lined side slant pockets and rear square patch pocket',
      'Relaxed wide-leg pooling cut with clean hemmed cuffs',
      'Pre-washed with gentle organic enzymes for vintage broken-in handle and color retention'
    ],
    careInstructions: 'Machine wash cold inside out with light tones. Line dry in shade to preserve crisp graphic prints.',
    inStock: true,
    edition: 'Edition 04 — Signature Archive',
    isNew: true,
    featured: true
  }
];

export interface LookbookLook {
  id: string;
  title: string;
  location: string;
  image: string;
  caption: string;
  items: {
    productId: string;
    label: string;
    role: string;
    x: number;
    y: number;
  }[];
}

export const LOOKBOOK_SERIES: LookbookLook[] = [
  {
    id: 'look-01-sweatset-uniform',
    title: 'Study 01: The Considered Uniform',
    location: 'Modernist Concrete Pavilion, Humlebaek',
    image: '/src/assets/images/hero_sweatset_hoodie_pants_1792668818467.jpg',
    caption: 'Exploring heavyweight fleece as an architectural uniform. The crossover hood and wide pooling sweatpants create a fluid, intentional line without synthetic linings.',
    items: [
      {
        productId: 'simple-star-orbit-hoodie-black',
        label: 'Star Orbit Hoodie in Pitch Black',
        role: 'Hoodie',
        x: 49,
        y: 35
      },
      {
        productId: 'simple-star-orbit-sweatpants-black',
        label: 'Star Orbit Sweatpants in Pitch Black',
        role: 'Sweatpants',
        x: 51,
        y: 72
      }
    ]
  },
  {
    id: 'look-02-loungewear-duo',
    title: 'Study 02: Dialogue in Fleece',
    location: 'Sculpture Wing, Humlebaek',
    image: '/src/assets/images/lookbook_sweatset_editorial_1792668819837.jpg',
    caption: 'Juxtaposing heather grey reverse-weave crewnecks with oatmeal French terry pullover sets. Garments engineered to transition seamlessly between studio and solitude.',
    items: [
      {
        productId: 'simple-star-orbit-crewneck',
        label: 'SIMPLE Star Orbit Crewneck',
        role: 'Crewneck',
        x: 37,
        y: 42
      },
      {
        productId: 'simple-star-orbit-hoodie-black',
        label: 'Star Orbit Hoodie in Pitch Black',
        role: 'Hoodie',
        x: 64,
        y: 45
      },
      {
        productId: 'simple-star-orbit-sweatpants-grey',
        label: 'Star Orbit Sweatpants in Heather Grey',
        role: 'Sweatpants',
        x: 35,
        y: 75
      }
    ]
  }
];

export const SUSTAINABILITY_PRINCIPLES = [
  {
    number: '01',
    title: '100% Pure Organic Cotton',
    detail: 'Zero synthetic polyester, elastane, or poly-fleece blends. Pure GOTS-certified combed cotton that breathes naturally and degrades cleanly.'
  },
  {
    number: '02',
    title: 'Dense Heavyweight Gauge',
    detail: 'Double the density of commercial sportswear. Knitted densely on vintage loopwheel looms so hoods and cuffs retain architectural structure forever.'
  },
  {
    number: '03',
    title: 'Reverse-Weave Engineering',
    detail: 'Horizontally woven fleece body panels and ribbed side gussets prevent vertical shrinkage and collar sagging through unlimited machine wash cycles.'
  },
  {
    number: '04',
    title: 'Non-Toxic Mineral Dyeing',
    detail: 'Low-impact mineral pigments that impart a nuanced, chalky patina with every wear without harmful toxic fixatives.'
  }
];
