import { NextRequest, NextResponse } from 'next/server';
import { CombinationLabResult, CombinedWastePart } from '@/types/database';
import { getFallbackTutorials } from '@/services/youtube';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { materials } = body;

    const matList: string[] = Array.isArray(materials) && materials.length > 0 ? materials : ['Plastic Bottle', 'Cardboard'];
    const joined = matList.join(' + ');

    const partsMapping: CombinedWastePart[] = matList.map((m) => {
      const lower = m.toLowerCase();
      if (lower.includes('bottle') || lower.includes('plastic')) {
        return {
          wasteMaterial: m,
          function: 'Internal Waterproof Storage Compartments & Reservoir',
          preparationNote: 'Clean, slice horizontally into cylinders, sand rims smooth.',
        };
      } else if (lower.includes('cardboard') || lower.includes('box')) {
        return {
          wasteMaterial: m,
          function: 'Rigid Outer Structural Chassis & Tiered Base Framework',
          preparationNote: 'Laminate double-layer sheets with wood glue for rigid load support.',
        };
      } else if (lower.includes('newspaper') || lower.includes('paper')) {
        return {
          wasteMaterial: m,
          function: 'Reinforced Paper-Mâché Exterior Skin & Smooth Sculptural Finish',
          preparationNote: 'Shred into strips and blend with non-toxic flour/water paste.',
        };
      } else if (lower.includes('cloth') || lower.includes('denim') || lower.includes('fabric')) {
        return {
          wasteMaterial: m,
          function: 'Padded Compartment Liners, Texture Accents & Pull Straps',
          preparationNote: 'Cut into strips with pinking shears, apply textile adhesive.',
        };
      } else if (lower.includes('glass')) {
        return {
          wasteMaterial: m,
          function: 'Center Heavyweight Floral / Candle Pillar Vessel',
          preparationNote: 'Thoroughly sterilize and secure into recessed base ring.',
        };
      }
      return {
        wasteMaterial: m,
        function: 'Reinforcement & Functional Aesthetic Trim',
        preparationNote: 'Trim and sand into modular interlocking segments.',
      };
    });

    const productName = `Eco-Architect ${matList.slice(0, 2).join(' & ')} Multi-Utility Organizer`;
    const estimatedCost = 65;
    const suggestedSellingPrice = 380;
    const estimatedProfit = suggestedSellingPrice - estimatedCost;
    const profitMargin = Number(((estimatedProfit / suggestedSellingPrice) * 100).toFixed(1));

    const result: CombinationLabResult = {
      productName,
      tagline: `A harmonious fusion of ${matList.length} distinct waste materials into an indispensable modular desk organizer.`,
      conceptDescription: `This design synthesizes the rigidity of ${matList[0] || 'recycled base'} with the versatile properties of ${matList.slice(1).join(' and ')}, eliminating material single-use waste.`,
      partsMapping,
      requiredTools: ['Utility Craft Knife', 'PVA Wood Glue / Non-toxic Glue', 'Steel Ruler', 'Sandpaper (180 grit)', 'Clamps / Heavy Book'],
      additionalMaterials: ['Natural Jute String', 'Protective Eco Varnish', 'Felt/Rubber Feet Pads'],
      steps: [
        'Sort, sanitize, and measure all raw waste materials to coordinate dimensional compatibility.',
        'Construct the core chassis using the primary structural waste element.',
        'Integrate secondary sub-compartments and affix with non-toxic adhesive.',
        'Apply paper-mâché or textile wrapping for durable surface reinforcement.',
        'Seal with water-resistant eco matte varnish and allow 12 hours curing time.'
      ],
      difficulty: matList.length > 2 ? 'Medium' : 'Easy',
      estimatedTime: matList.length > 2 ? '2.5 hours' : '1.5 hours',
      estimatedCost,
      suggestedSellingPrice,
      estimatedProfit,
      profitMargin,
      targetCustomers: ['Students & Desk Workers', 'Boutique Eco-Homeware Buyers', 'Architects & Designers'],
      synergyScore: 94,
      tutorials: getFallbackTutorials(matList[0] || 'Mixed Waste', productName),
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Combination API Error:', error);
    return NextResponse.json({ error: 'Failed to generate combination blueprint' }, { status: 500 });
  }
}
