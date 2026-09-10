import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { wasteMaterial, productName, beforeImage, afterImage } = body;

    const stages = [
      {
        stage: '01',
        title: 'Raw Waste Inception',
        description: `Collected discarded ${wasteMaterial || 'material'} diverted from municipal landfill.`,
      },
      {
        stage: '02',
        title: 'AI Material DNA Analysis',
        description: `ReVIBE Multimodal Vision AI identified structural integrity and upcycling potential.`,
      },
      {
        stage: '03',
        title: 'Craft & Fabrication',
        description: `Executed precision cutting, edge finishing, and eco-friendly assembly.`,
      },
      {
        stage: '04',
        title: 'Finished Upcycled Creation',
        description: `Transformed into functional ${productName || 'product'}, adding tangible value and avoiding emissions.`,
      },
    ];

    const storyText = `From discarded ${wasteMaterial || 'waste'} to an artisanal ${productName || 'product'}. By giving this item a second life, we eliminated landfill waste and saved estimated CO2 emissions.`;

    return NextResponse.json({
      waste_material: wasteMaterial || 'Recycled Waste',
      product_name: productName || 'Upcycled Creation',
      before_image_url: beforeImage,
      after_image_url: afterImage,
      stages,
      story_text: storyText,
      published_to_community: false,
    });
  } catch (error: any) {
    console.error('Transform API Error:', error);
    return NextResponse.json({ error: 'Failed to generate transformation story' }, { status: 500 });
  }
}
