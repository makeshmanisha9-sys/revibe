import { TutorialVideo } from '@/types/database';

export async function fetchTutorialRecommendations(
  material: string,
  productName: string,
  mode: 'creative' | 'business' = 'creative'
): Promise<TutorialVideo[]> {
  try {
    const response = await fetch('/api/youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ material, productName, mode }),
    });

    if (!response.ok) {
      return getFallbackTutorials(material, productName);
    }

    const data = await response.json();
    return data.tutorials || getFallbackTutorials(material, productName);
  } catch (e) {
    return getFallbackTutorials(material, productName);
  }
}

export function getFallbackTutorials(material: string, productName: string): TutorialVideo[] {
  const cleanMat = (material || 'Waste').toLowerCase();

  if (cleanMat.includes('glass')) {
    return [
      {
        id: 'yt-glass-1',
        title: `How to Safely Cut and Smooth Glass Bottles for DIY ${productName || 'Planters'}`,
        channel: 'EcoCraft Labs',
        thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
        duration: '8:45',
        category: 'Glass Upcycling',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('glass bottle ' + (productName || 'upcycling') + ' DIY tutorial step by step')}`,
      },
      {
        id: 'yt-glass-2',
        title: `DIY Glass Bottle Hanging Lamp & Warm LED Wiring Guide`,
        channel: 'Upcycling Studio',
        thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        duration: '12:10',
        category: 'Home Decor',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('glass bottle lamp fairy lights DIY tutorial')}`,
      },
      {
        id: 'yt-glass-3',
        title: `Self-Watering Wine Bottle Herb Planters for Balcony Gardens`,
        channel: 'Urban Green Thumb',
        thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
        duration: '6:30',
        category: 'Gardening DIY',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('wine bottle self watering planter DIY tutorial')}`,
      },
      {
        id: 'yt-glass-4',
        title: `Artisan Soy Wax Scented Candles in Cut Glass Bottles`,
        channel: 'Candle Craft Studio',
        thumbnail: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
        duration: '10:15',
        category: 'Artisan Craft',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('diy candle making recycled glass bottle')}`,
      },
    ];
  }

  if (cleanMat.includes('plastic')) {
    return [
      {
        id: 'yt-plastic-1',
        title: `Transform Plastic Bottles into Geometric Hanging Planters`,
        channel: 'DIY Earth Crafts',
        thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
        duration: '7:15',
        category: 'Planters',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('plastic bottle planter DIY tutorial step by step')}`,
      },
      {
        id: 'yt-plastic-2',
        title: `How to Make Recycled Plastic Desk Organizers & Storage Pots`,
        channel: 'Zero Waste Living',
        thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        duration: '10:04',
        category: 'Desk Decor',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('plastic bottle organizer pencil holder DIY')}`,
      },
      {
        id: 'yt-plastic-3',
        title: `High Value Recycled HDPE Melting & Molding for Small Business`,
        channel: 'Maker Economy',
        thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        duration: '14:20',
        category: 'Business DIY',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('precious plastic hdpe melting crafting small business')}`,
      },
      {
        id: 'yt-plastic-4',
        title: `Recycled Plastic Bottle Rope Maker & Heavy Duty Weaving`,
        channel: 'Eco Innovations',
        thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
        duration: '9:40',
        category: 'Survival & Utility',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('plastic bottle rope cutter and craft tutorial')}`,
      },
    ];
  }

  if (cleanMat.includes('cardboard') || cleanMat.includes('paper') || cleanMat.includes('box')) {
    return [
      {
        id: 'yt-cardboard-1',
        title: `Sturdy Modular Desk Organizer Made from Scrap Cardboard`,
        channel: 'Craft Architect',
        thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
        duration: '11:35',
        category: 'Organizers',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('cardboard organizer DIY tutorial step by step')}`,
      },
      {
        id: 'yt-cardboard-2',
        title: `Heavy-Duty Storage Bins with Paper-Mâché & Jute Finish`,
        channel: 'Eco Home Studio',
        thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        duration: '9:50',
        category: 'Storage Decor',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('cardboard box makeover basket aesthetic DIY')}`,
      },
      {
        id: 'yt-cardboard-3',
        title: `Layered Sculptural Cardboard Pendant Lamp Shade Build`,
        channel: 'Architectural DIY',
        thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        duration: '13:15',
        category: 'Lighting Design',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('cardboard lamp shade DIY laser cut handmade')}`,
      },
    ];
  }

  if (cleanMat.includes('coconut') || cleanMat.includes('shell')) {
    return [
      {
        id: 'yt-coconut-1',
        title: `How to Sand, Polish & Carve Natural Coconut Shells for Bowls`,
        channel: 'Tropical Crafts Lab',
        thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
        duration: '10:20',
        category: 'Natural Crafts',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('coconut shell bowl making tutorial sand polish oil')}`,
      },
      {
        id: 'yt-coconut-2',
        title: `DIY Coconut Shell Hanging Succulent Planter with Macramé`,
        channel: 'Green Living Crafts',
        thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
        duration: '8:15',
        category: 'Planters',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('coconut shell planter macrame hanger DIY')}`,
      },
      {
        id: 'yt-coconut-3',
        title: `Artisan Coconut Shell Scented Soy Wax Candle Crafting`,
        channel: 'Aroma Eco Crafts',
        thumbnail: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
        duration: '7:40',
        category: 'Eco Candles',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('coconut shell candle making tutorial')}`,
      },
    ];
  }

  if (cleanMat.includes('fabric') || cleanMat.includes('cloth') || cleanMat.includes('denim') || cleanMat.includes('textile')) {
    return [
      {
        id: 'yt-fabric-1',
        title: `Old Jeans into Durable Multi-Pocket Tote Bag (No Sewing Machine Needed)`,
        channel: 'Upcycled Fashion Studio',
        thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
        duration: '12:45',
        category: 'Sustainable Fashion',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('old denim jeans to tote bag tutorial DIY')}`,
      },
      {
        id: 'yt-fabric-2',
        title: `DIY Braided Scrap Fabric Coasters & Table Trivets`,
        channel: 'Zero Waste Weaving',
        thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        duration: '8:30',
        category: 'Home Decor',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('scrap fabric braided coasters rugs DIY tutorial')}`,
      },
      {
        id: 'yt-fabric-3',
        title: `Patchwork Eco Zipper Pouches from Fabric Offcuts`,
        channel: 'Boutique Maker',
        thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
        duration: '11:10',
        category: 'Accessories',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('patchwork fabric pouch zipper DIY tutorial')}`,
      },
    ];
  }

  if (cleanMat.includes('metal') || cleanMat.includes('can') || cleanMat.includes('aluminum') || cleanMat.includes('tin')) {
    return [
      {
        id: 'yt-metal-1',
        title: `Soda Can into Sturdy Camping Stove & High-Temp Burner`,
        channel: 'Bushcraft & Upcycle',
        thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        duration: '9:15',
        category: 'Metal Utility',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('soda can alcohol stove DIY tutorial step by step')}`,
      },
      {
        id: 'yt-metal-2',
        title: `Aesthetic Tin Can Planters & Rust-Free Desk Organizers`,
        channel: 'Urban Upcycler',
        thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
        duration: '7:50',
        category: 'Home Decor',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('tin can planter painting makeover DIY tutorial')}`,
      },
    ];
  }

  return [
    {
      id: 'yt-general-1',
      title: `Step-by-Step Upcycling Guide: DIY ${productName || material}`,
      channel: 'ReVIBE Makers Network',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      duration: '8:00',
      category: 'Upcycling Masterclass',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(material + ' upcycling ' + productName + ' DIY tutorial')}`,
    },
    {
      id: 'yt-general-2',
      title: `Creative Waste Transformation & Micro-Business Ideas`,
      channel: 'Sustainable Innovation',
      thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
      duration: '13:45',
      category: 'Eco Design',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(material + ' waste to wealth craft ideas')}`,
    },
    {
      id: 'yt-general-3',
      title: `Top 5 High-Value Crafts You Can Make From Discarded ${material}`,
      channel: 'Eco Craft Academy',
      thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      duration: '10:30',
      category: 'DIY Inspiration',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(material + ' recycle craft ideas easy')}`,
    },
  ];
}
