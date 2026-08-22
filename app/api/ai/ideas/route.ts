import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

function generateBuiltInIdeas(material: string, category: string) {
  const matLower = (material || '').toLowerCase();

  if (matLower.includes('cardboard') || matLower.includes('paper')) {
    return [
      {
        id: 'idea-cb-1',
        product_name: 'Modular Cardboard Desk Organizer',
        description: 'Eco-friendly multi-tiered desktop organizer crafted from reinforced corrugated cardboard boxes.',
        difficulty: 'Easy' as const,
        materials: ['Corrugated Cardboard Sheets', 'Non-toxic PVA Glue', 'Kraft Paper Tape'],
        tools: ['Utility Knife', 'Ruler', 'Cutting Mat'],
        instructions: [
          'Measure and cut cardboard into 5 interlocking compartment panels.',
          'Score fold lines lightly with a utility knife for sharp 90-degree edges.',
          'Apply PVA glue along join seams and clamp with tape until set.',
          'Coat with protective kraft paper tape for smooth finish.'
        ],
        estimated_time: '45 minutes',
        cost: 40,
        selling_price: 250,
        profit: 210,
      },
      {
        id: 'idea-cb-2',
        product_name: 'Architectural Cardboard Light Pendant',
        description: 'Laser-cut aesthetic ceiling light shade creating ambient shadow patterns.',
        difficulty: 'Medium' as const,
        materials: ['Cardboard Sheets', 'Pendant Light Cord Set', 'Eco Spray Paint'],
        tools: ['Craft Knife', 'Glue Gun'],
        instructions: [
          'Cut 24 concentric cardboard rings of increasing diameter.',
          'Stack rings with 5mm spacer tabs in a helical spiral pattern.',
          'Mount light socket fixture through top ring opening.'
        ],
        estimated_time: '1.5 hours',
        cost: 90,
        selling_price: 450,
        profit: 360,
      }
    ];
  } else if (matLower.includes('glass')) {
    return [
      {
        id: 'idea-gl-1',
        product_name: 'Scented Soy Candle in Repurposed Glass Jar',
        description: 'Artisanal hand-poured aromatherapy soy wax candle inside washed glass bottles.',
        difficulty: 'Easy' as const,
        materials: ['Washed Glass Jar', 'Natural Soy Wax Flakes', 'Cotton Wick', 'Essential Oils'],
        tools: ['Double Boiler', 'Wick Holder', 'Thermometer'],
        instructions: [
          'Sterilize glass bottle and secure cotton wick to center base.',
          'Melt soy wax to 85°C and stir in essential oil fragrance.',
          'Pour slowly into glass jar and let cool for 24 hours.'
        ],
        estimated_time: '1 hour',
        cost: 70,
        selling_price: 320,
        profit: 250,
      }
    ];
  } else if (matLower.includes('denim') || matLower.includes('fabric')) {
    return [
      {
        id: 'idea-dn-1',
        product_name: 'Repurposed Denim Multi-Pocket Tote Bag',
        description: 'Durable eco-fashion tote bag crafted from upcycled jean pockets and denim legs.',
        difficulty: 'Medium' as const,
        materials: ['Old Denim Jeans', 'Cotton Thread', 'Canvas Lining'],
        tools: ['Sewing Machine', 'Fabric Scissors', 'Pins'],
        instructions: [
          'Cut denim pant legs into rectangular side panels.',
          'Preserve original back pockets and stitch onto outer front panel.',
          'Stitch side seams with reinforced double topstitching.',
          'Attach heavy-duty denim handles to upper rim.'
        ],
        estimated_time: '2 hours',
        cost: 60,
        selling_price: 480,
        profit: 420,
      }
    ];
  }

  // Default PET Plastic Bottle Upcycling Ideas
  return [
    {
      id: 'idea-pl-1',
      product_name: 'Plastic Bottle Ambient Table Lamp',
      description: 'Transform recycled PET bottles into a stylish geometric ambient table lamp with warm LED illumination.',
      difficulty: 'Medium' as const,
      materials: ['1x Clean Plastic Bottle', 'Warm LED String Light', 'Decorative Jute Rope', 'Eco Glue'],
      tools: ['Scissors', 'Craft Knife', 'Sandpaper'],
      instructions: [
        'Clean and thoroughly dry the plastic bottle.',
        'Carefully slice off top neck section using a craft knife.',
        'Smooth down the cut edge using sandpaper.',
        'Wrap jute rope around base for organic texture.',
        'Insert LED string light assembly inside and test illumination.'
      ],
      estimated_time: '1.5 hours',
      cost: 80,
      selling_price: 300,
      profit: 220,
    },
    {
      id: 'idea-pl-2',
      product_name: 'Self-Watering Hydroponic Planter',
      description: 'Sub-irrigated vertical planter module made from cut plastic bottles.',
      difficulty: 'Easy' as const,
      materials: ['Plastic Bottle', 'Cotton Wick', 'Potting Soil'],
      tools: ['Scissors', 'Hole Punch'],
      instructions: [
        'Cut bottle in half horizontally.',
        'Invert top neck section into bottom water reservoir base.',
        'Thread cotton wick through cap hole into water base.',
        'Fill top with soil and plant seeds.'
      ],
      estimated_time: '30 mins',
      cost: 20,
      selling_price: 150,
      profit: 130,
    }
  ];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { detectedMaterial, wasteCategory } = body;

    const headerKey = req.headers.get('x-ai-api-key');
    const apiKey = headerKey || process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey && apiKey.startsWith('AIzaSy') && !apiKey.includes('your-gemini-ai-api-key')) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        const prompt = `
You are an expert sustainable designer and DIY craftsman.
Generate 3 distinct creative upcycling product ideas for the waste material: "${detectedMaterial}" (Category: ${wasteCategory}).

Return ONLY a JSON array of 3 objects formatted as:
[
  {
    "product_name": "Plastic Bottle Ambient Table Lamp",
    "description": "Transform recycled PET bottles into a stylish geometric ambient table lamp with warm LED illumination.",
    "difficulty": "Medium",
    "materials": ["1x Clean Plastic Bottle", "Warm LED String Light", "Decorative Jute Rope", "Eco-friendly Glue"],
    "tools": ["Scissors", "Craft Knife", "Sandpaper"],
    "instructions": [
      "Clean and thoroughly dry the plastic bottle.",
      "Carefully slice off the top neck section using a craft knife.",
      "Smooth down the cut edge using sandpaper.",
      "Wrap jute rope around the base for an organic texture.",
      "Insert the LED string light assembly inside and test illumination."
    ],
    "estimated_time": "1.5 - 2 hours",
    "cost": 120,
    "selling_price": 450,
    "profit": 330
  }
]
`;
        const candidateModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-pro'];
        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            if (text) {
              const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
              const parsed = JSON.parse(cleanJson);
              return NextResponse.json(parsed);
            }
          } catch (mErr) {
            continue;
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini Ideas API call failed, using built-in engine');
      }
    }

    // Built-in intelligent idea generator
    const ideas = generateBuiltInIdeas(detectedMaterial, wasteCategory);
    return NextResponse.json(ideas);
  } catch (error: any) {
    console.error('API Ideas Error:', error);
    return NextResponse.json(generateBuiltInIdeas('Plastic Bottle', 'Plastic Waste'));
  }
}
