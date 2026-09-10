import { WasteAnalysis, WasteDNA, WasteRescueScore } from '@/types/database';

export interface AIWasteAnalysisResponse {
  detectedMaterial: string;
  wasteCategory: string;
  confidence: number;
  possibleReusableMaterials: string[];
  wasteDNA: WasteDNA;
  rescueScore: WasteRescueScore;
}

export function computeDeterministicDNA(material: string, category: string): { dna: WasteDNA; rescueScore: WasteRescueScore } {
  const lower = (material + ' ' + category).toLowerCase();

  let reusability: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
  let transformationPotential = 92;
  let difficulty: 'Easy' | 'Easy–Medium' | 'Medium' | 'Medium–Hard' | 'Hard' = 'Easy–Medium';
  let possibleProductCategories = ['Home Decor', 'Planters', 'Lamps', 'Art Projects'];
  let potentialValueMin = 20;
  let potentialValueMax = 250;

  let criteria = {
    recyclability: 24,
    structuralIntegrity: 22,
    processingEase: 23,
    environmentalBenefit: 22,
  };

  if (lower.includes('glass')) {
    reusability = 'HIGH';
    transformationPotential = 94;
    difficulty = 'Easy–Medium';
    possibleProductCategories = ['Home Decor', 'Planters', 'Lamps', 'Terrariums', 'Candle Vessels'];
    potentialValueMin = 30;
    potentialValueMax = 350;
    criteria = { recyclability: 25, structuralIntegrity: 24, processingEase: 20, environmentalBenefit: 25 };
  } else if (lower.includes('plastic') || lower.includes('bottle') || lower.includes('pet')) {
    reusability = 'HIGH';
    transformationPotential = 91;
    difficulty = 'Easy';
    possibleProductCategories = ['Self-Watering Planters', 'Desk Organizers', 'LED Ambient Lamps', 'Bird Feeders'];
    potentialValueMin = 20;
    potentialValueMax = 220;
    criteria = { recyclability: 23, structuralIntegrity: 22, processingEase: 24, environmentalBenefit: 22 };
  } else if (lower.includes('cardboard') || lower.includes('paper') || lower.includes('box')) {
    reusability = 'HIGH';
    transformationPotential = 88;
    difficulty = 'Easy';
    possibleProductCategories = ['Desk Organizers', 'Storage Bins', 'Architectural Models', 'Cat Playhouses'];
    potentialValueMin = 15;
    potentialValueMax = 180;
    criteria = { recyclability: 25, structuralIntegrity: 19, processingEase: 25, environmentalBenefit: 20 };
  } else if (lower.includes('denim') || lower.includes('cloth') || lower.includes('fabric') || lower.includes('textile')) {
    reusability = 'HIGH';
    transformationPotential = 95;
    difficulty = 'Medium';
    possibleProductCategories = ['Tote Bags', 'Coasters & Placemats', 'Pillow Covers', 'Patchwork Quilts'];
    potentialValueMin = 50;
    potentialValueMax = 550;
    criteria = { recyclability: 24, structuralIntegrity: 24, processingEase: 21, environmentalBenefit: 25 };
  } else if (lower.includes('coconut') || lower.includes('shell')) {
    reusability = 'HIGH';
    transformationPotential = 89;
    difficulty = 'Easy–Medium';
    possibleProductCategories = ['Organic Hanging Planters', 'Polished Coconut Bowls', 'Aroma Candle Cups', 'Soap Dishes'];
    potentialValueMin = 40;
    potentialValueMax = 380;
    criteria = { recyclability: 22, structuralIntegrity: 25, processingEase: 19, environmentalBenefit: 24 };
  } else if (lower.includes('metal') || lower.includes('can') || lower.includes('aluminum')) {
    reusability = 'HIGH';
    transformationPotential = 90;
    difficulty = 'Medium';
    possibleProductCategories = ['Pen Holders', 'Lantern Votives', 'Herb Pots', 'Wind Chimes'];
    potentialValueMin = 25;
    potentialValueMax = 280;
    criteria = { recyclability: 25, structuralIntegrity: 23, processingEase: 20, environmentalBenefit: 23 };
  }

  const score = criteria.recyclability + criteria.structuralIntegrity + criteria.processingEase + criteria.environmentalBenefit;
  const level: WasteRescueScore['level'] =
    score >= 85 ? 'HIGH RESCUE POTENTIAL' : score >= 70 ? 'MODERATE RESCUE POTENTIAL' : 'BASIC RECYCLING ONLY';

  const dna: WasteDNA = {
    material: material || 'Reusable Waste Material',
    category: category || 'General Reusable',
    reusability,
    transformationPotential,
    difficulty,
    possibleProductCategories,
    potentialValueMin,
    potentialValueMax,
    isEstimated: true,
  };

  const rescueScore: WasteRescueScore = {
    score,
    level,
    tagline: score >= 85
      ? 'This material has exceptional upcycling potential with high structural durability and zero toxic byproducts.'
      : 'Solid candidate for creative upcycling with moderate post-processing requirements.',
    criteria,
  };

  return { dna, rescueScore };
}

export async function analyzeWasteImage(base64Image: string, apiKey?: string): Promise<AIWasteAnalysisResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/analyze', {
    method: 'POST',
    headers,
    body: JSON.stringify({ image: base64Image }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'AI analysis is temporarily unavailable. Please try again.');
  }

  return response.json();
}
