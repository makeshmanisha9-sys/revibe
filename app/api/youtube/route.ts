import { NextRequest, NextResponse } from 'next/server';
import { getFallbackTutorials } from '@/services/youtube';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { material, productName } = body;

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (apiKey && !apiKey.includes('your-youtube-api-key')) {
      try {
        const query = encodeURIComponent(`${material} ${productName} DIY upcycling tutorial`);
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${query}&type=video&key=${apiKey}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            const tutorials = data.items.map((item: any) => ({
              id: item.id.videoId,
              videoId: item.id.videoId,
              title: item.snippet.title,
              channel: item.snippet.channelTitle,
              thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
              duration: '8:30',
              category: 'Upcycling Tutorial',
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            }));
            return NextResponse.json({ tutorials });
          }
        }
      } catch (ytErr) {
        console.warn('YouTube API error, using curated tutorial engine:', ytErr);
      }
    }

    const tutorials = getFallbackTutorials(material || 'Waste Material', productName || 'Planter');
    return NextResponse.json({ tutorials });
  } catch (error: any) {
    console.error('YouTube API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch tutorials' }, { status: 500 });
  }
}
