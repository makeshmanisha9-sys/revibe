import { NextRequest, NextResponse } from 'next/server';
import { BusinessAnalysisResult, Idea } from '@/types/database';
import { getFallbackTutorials } from '@/services/youtube';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { material, category } = body;

    const lower = ((material || '') + ' ' + (category || '')).toLowerCase();

    let productionCost = 70;
    let additionalCost = 30;
    let sellingPrice = 300;
    let marketDemand: 'High' | 'Moderate' | 'Niche' = 'High';
    let potentialBuyers = [
      'Eco-conscious Urban Dwellers',
      'Boutique Lifestyle & Craft Stores',
      'Sustainable Corporate Gifting Brands',
      'Interior Decor & Plant Enthusiasts',
    ];

    if (lower.includes('glass')) {
      productionCost = 80;
      additionalCost = 40;
      sellingPrice = 350;
      marketDemand = 'High';
      potentialBuyers = ['Cafes & Restaurants', 'Home Stagers', 'Zero-Waste Consumers', 'Gift Boutiques'];
    } else if (lower.includes('cardboard')) {
      productionCost = 40;
      additionalCost = 25;
      sellingPrice = 220;
      marketDemand = 'Moderate';
      potentialBuyers = ['Work-from-home Professionals', 'Students & Artists', 'Stationery Lovers'];
    } else if (lower.includes('fabric') || lower.includes('denim')) {
      productionCost = 90;
      additionalCost = 50;
      sellingPrice = 480;
      marketDemand = 'High';
      potentialBuyers = ['Sustainable Fashion Shoppers', 'College Students', 'Urban Commuters'];
    }

    const totalCost = productionCost + additionalCost;
    const estimatedProfit = sellingPrice - totalCost;
    const profitMargin = Number(((estimatedProfit / sellingPrice) * 100).toFixed(1));

    const sampleIdeas: Idea[] = [
      {
        id: 'biz-idea-1',
        product_name: `${material || 'Upcycled Material'} Premium Decor Pod`,
        description: 'Scalable commercial product line optimized for batch handcrafting and direct-to-consumer ecommerce sales.',
        difficulty: 'Easy',
        materials: [`Raw ${material || 'Waste'}`, 'Eco-friendly Resin/Sealant', 'Branded Kraft Packaging'],
        tools: ['Standard Craft Hand Tools', 'Polishing Buffer'],
        instructions: [
          'Batch sort and sterilize incoming waste items.',
          'Execute precision cuts and structural finishing.',
          'Apply natural eco-sealant for water resistance.',
          'Attach branded ReVIBE circular economy tag and package.'
        ],
        estimated_time: '45 mins / unit',
        cost: totalCost,
        selling_price: sellingPrice,
        profit: estimatedProfit,
        waste_material: material || 'Reusable Waste',
        tutorials: getFallbackTutorials(material || 'Plastic', 'Commercial Decor'),
      },
    ];

    const result: BusinessAnalysisResult = {
      production_cost: productionCost,
      additional_cost: additionalCost,
      suggested_selling_price: sellingPrice,
      estimated_profit: estimatedProfit,
      profit_margin: profitMargin,
      market_demand: marketDemand,
      potential_buyers: potentialBuyers,
      product_ideas: sampleIdeas,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Business API Error:', error);
    return NextResponse.json({ error: 'Failed to generate business valuation' }, { status: 500 });
  }
}
