import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Idea } from '@/types/database';
import { getFallbackTutorials } from '@/services/youtube';

function getDeterministicIdeas(material: string, category: string): Idea[] {
  const lower = (material + ' ' + category).toLowerCase();

  if (lower.includes('glass')) {
    return [
      {
        id: 'idea-glass-1',
        product_name: 'Hanging Self-Watering Wine Bottle Planter',
        description: 'Cleanly score and divide wine bottles into sleek inverted planters with cotton wicking for indoor herbs and succulents.',
        difficulty: 'Easy',
        materials: ['1x Clean Glass Bottle', 'Cotton Rope Wick', 'Organic Potting Soil', 'Succulent or Herb Sapling'],
        tools: ['Glass Scoring Tool (or Cotton String + Acetone)', 'Cold Water Bath', 'Sandpaper (220 grit)'],
        instructions: [
          'Thoroughly clean the glass bottle and remove labels using warm soapy water.',
          'Score a precise line around the circumference 4 inches below the shoulder.',
          'Apply thermal shock (hot then cold water) until the glass separates cleanly.',
          'Sand the rim smooth with wet sandpaper to remove sharp burrs.',
          'Invert top neck section into bottom base, thread cotton wick, add soil and plant.'
        ],
        estimated_time: '45 minutes',
        cost: 40,
        selling_price: 250,
        profit: 210,
        waste_material: 'Glass Bottle',
        image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
        tutorials: getFallbackTutorials('Glass Bottle', 'Hanging Planter'),
      },
      {
        id: 'idea-glass-2',
        product_name: 'Warm LED Ambient Bottle Lamp',
        description: 'Repurpose discarded glass bottles with frosted sea glass finish and warm micro-LED string lights for boutique bedside lighting.',
        difficulty: 'Medium',
        materials: ['1x Clear or Amber Glass Bottle', 'Frosted Glass Spray or Etching Cream', 'Battery/USB LED String Light', 'Natural Cork Stopper'],
        tools: ['Diamond Glass Drill Bit (optional)', 'Protective Safety Glasses', 'Masking Tape'],
        instructions: [
          'Wash and completely dry interior of the bottle.',
          'Apply 2 thin coats of frosted glass finish spray for soft light diffusion.',
          'Insert LED fairy light string through the neck or drilled side hole.',
          'Seal top with natural cork stopper containing integrated switch.'
        ],
        estimated_time: '1.5 hours',
        cost: 80,
        selling_price: 380,
        profit: 300,
        waste_material: 'Glass Bottle',
        image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        tutorials: getFallbackTutorials('Glass Bottle', 'Ambient Lamp'),
      },
      {
        id: 'idea-glass-3',
        product_name: 'Hand-Poured Soy Wax Aroma Candle Vessel',
        description: 'Cut smooth glass bottle bottoms transformed into reusable artisan scented candles with wood wicks.',
        difficulty: 'Easy',
        materials: ['Cut Glass Bottle Base', 'Natural Soy Wax Flakes (200g)', 'Natural Wood Wick', 'Essential Oils (Lavender/Citrus)'],
        tools: ['Double Boiler or Melting Pitcher', 'Thermometer', 'Wick Centering Clip'],
        instructions: [
          'Secure wood wick base to bottom center of cut glass vessel.',
          'Melt soy wax to 175°F in a double boiler.',
          'Stir in essential oils at 150°F and pour smoothly into prepared glass.',
          'Allow to cure for 24 hours at room temperature and trim wick to 1/4 inch.'
        ],
        estimated_time: '1 hour',
        cost: 65,
        selling_price: 320,
        profit: 255,
        waste_material: 'Glass Bottle',
        image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        tutorials: getFallbackTutorials('Glass Bottle', 'Soy Candle'),
      },
    ];
  }

  if (lower.includes('cardboard') || lower.includes('paper') || lower.includes('box')) {
    return [
      {
        id: 'idea-cardboard-1',
        product_name: 'Modular Geometric Desk Organizer',
        description: 'Multi-tiered desktop organizer crafted from reinforced honeycomb cardboard with linen fabric lining.',
        difficulty: 'Easy',
        materials: ['Corrugated Cardboard Sheets', 'Natural Linen or Kraft Paper', 'Non-toxic PVA Wood Glue'],
        tools: ['Steel Ruler', 'Precision Craft Knife', 'Cutting Mat', 'Pencil'],
        instructions: [
          'Measure and cut modular dividers (pen slots, phone stand, sticky note tray).',
          'Score fold lines lightly to achieve crisp 90-degree edges.',
          'Laminate double layers together with PVA glue for rigid durability.',
          'Wrap external surfaces in kraft paper or linen for a boutique look.'
        ],
        estimated_time: '1 hour',
        cost: 30,
        selling_price: 220,
        profit: 190,
        waste_material: 'Cardboard Box',
        image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
        tutorials: getFallbackTutorials('Cardboard', 'Desk Organizer'),
      },
      {
        id: 'idea-cardboard-2',
        product_name: 'Modern Sculptural Pendant Light Shade',
        description: 'Layered concentric cardboard rings creating warm ambient light shadows with natural exposed fluting.',
        difficulty: 'Medium',
        materials: ['Thick Fluted Cardboard', 'E27 Lamp Holder Cord Kit', 'LED Warm Bulb (low heat)'],
        tools: ['Compass', 'Utility Blade', 'Hot Glue Gun'],
        instructions: [
          'Draw and cut 15 graduated concentric rings from cardboard.',
          'Stack rings with 0.5-inch staggered offsets to form an organic dome.',
          'Bond contact points with hot glue and mount E27 pendant ring.',
          'Install warm LED bulb (use only low-wattage LED to ensure zero heat).'
        ],
        estimated_time: '2 hours',
        cost: 60,
        selling_price: 450,
        profit: 390,
        waste_material: 'Cardboard',
        image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        tutorials: getFallbackTutorials('Cardboard', 'Light Shade'),
      },
    ];
  }

  // Default Plastic Bottle Ideas
  return [
    {
      id: 'idea-plastic-1',
      product_name: 'Self-Watering Herb Planter Pod',
      description: 'Transform discarded plastic beverage bottles into maintenance-free sub-irrigated windowsill planters.',
      difficulty: 'Easy',
      materials: ['1x 1L/2L Plastic Bottle', 'Cotton Wick Yarn', 'Potting Soil & Seedlings', 'Decorative Jute Twine'],
      tools: ['Kitchen Scissors', 'Awl or Hole Punch', 'Ruler'],
      instructions: [
        'Cut the plastic bottle horizontally 4 inches below the cap.',
        'Punch a 5mm hole in the bottle cap and thread cotton wick.',
        'Invert top neck section into the bottom reservoir base.',
        'Wrap bottom base with jute twine for natural texture.',
        'Fill upper section with soil and add water to bottom reservoir.'
      ],
      estimated_time: '30 minutes',
      cost: 25,
      selling_price: 150,
      profit: 125,
      waste_material: 'Plastic Bottle',
      image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      tutorials: getFallbackTutorials('Plastic Bottle', 'Self-Watering Planter'),
    },
    {
      id: 'idea-plastic-2',
      product_name: 'Recycled PET Geometric Ambient Desk Lamp',
      description: 'Heat-molded and stitched recycled plastic bottle silhouettes creating warm ambient room illumination.',
      difficulty: 'Medium',
      materials: ['2x Clean PET Bottles', 'Warm LED Fairy String Light', 'Wooden Base Block', 'Copper Wire'],
      tools: ['Craft Knife', 'Hole Piercer', 'Sandpaper'],
      instructions: [
        'Slice and flatten plastic bottle cylinders into curved petal segments.',
        'Sand plastic lightly for soft matte frosted light dispersion.',
        'Interlock petal segments using thin copper wire into a geometric sphere.',
        'Mount on wooden base block and install LED string light.'
      ],
      estimated_time: '1.5 hours',
      cost: 75,
      selling_price: 350,
      profit: 275,
      waste_material: 'Plastic Bottle',
      image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      tutorials: getFallbackTutorials('Plastic Bottle', 'Desk Lamp'),
    },
  ];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { material, category } = body;

    const apiKey = req.headers.get('x-ai-api-key') || process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.startsWith('AIzaSy') && !apiKey.includes('your-gemini-ai-api-key')) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        const prompt = `
Generate 3 realistic, high-quality, creative DIY upcycling product ideas for:
Material: ${material || 'Plastic Waste'}
Category: ${category || 'Recyclable'}

Return a JSON object matching this schema:
{
  "ideas": [
    {
      "id": "idea-1",
      "product_name": "Product Title",
      "description": "2-sentence concept description",
      "difficulty": "Easy",
      "materials": ["Material 1", "Material 2"],
      "tools": ["Tool 1", "Tool 2"],
      "instructions": ["Step 1", "Step 2", "Step 3", "Step 4"],
      "estimated_time": "45 minutes",
      "cost": 50,
      "selling_price": 250,
      "profit": 200,
      "waste_material": "${material}"
    }
  ]
}
`;
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const res = await model.generateContent(prompt);
        const text = res.response.text();
        if (text) {
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          if (parsed.ideas && Array.isArray(parsed.ideas)) {
            const enriched = parsed.ideas.map((idea: Idea, idx: number) => ({
              ...idea,
              id: idea.id || `idea-${idx}-${Date.now()}`,
              tutorials: getFallbackTutorials(material, idea.product_name),
            }));
            return NextResponse.json({ ideas: enriched });
          }
        }
      } catch (gemErr) {
        console.warn('Gemini ideas fallback invoked:', gemErr);
      }
    }

    const ideas = getDeterministicIdeas(material || 'Plastic Bottle', category || 'Plastic Waste');
    return NextResponse.json({ ideas });
  } catch (error: any) {
    console.error('Ideas API Error:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}
