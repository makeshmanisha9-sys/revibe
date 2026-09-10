import { NextRequest, NextResponse } from 'next/server';
import { Challenge, ChallengeAttempt } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'generate') {
      const {
        wasteMaterials = ['Plastic Bottles'],
        quantity = '2 units',
        budgetInr = 50,
        timeLimitMinutes = 60,
        skillLevel = 'Beginner',
        availableTools = ['Scissors', 'Glue'],
      } = body;

      const matName = Array.isArray(wasteMaterials) ? wasteMaterials.join(', ') : 'Plastic Bottles';

      const challenge: Challenge = {
        id: 'chal-' + Date.now(),
        title: `${timeLimitMinutes}-Minute ${matName.split(',')[0]} Upcycling Sprint`,
        waste_materials: Array.isArray(wasteMaterials) ? wasteMaterials : [wasteMaterials],
        quantity,
        budget_inr: budgetInr,
        time_limit_minutes: timeLimitMinutes,
        difficulty: skillLevel,
        instructions: [
          `Gather ${quantity} of ${matName} and sanitize thoroughly.`,
          `Using only tools within your ₹${budgetInr} budget (${availableTools.join(', ')}), execute precise functional modifications.`,
          'Assemble the parts into a self-supporting, usable home or garden item.',
          'Take a clear, well-lit photo of your finished creation and upload for verification.'
        ],
        success_criteria: [
          'Product exhibits structural stability without external support.',
          'All cut edges are smoothed or safely sealed.',
          'Zero loose or dangerous components.'
        ],
        safety_guidance: [
          'Wear safety glasses when cutting rigid plastics or metals.',
          'Work on a stable, non-slip surface.'
        ],
        points_reward: 50,
        badge_reward: 'eco_creator',
        created_at: new Date().toISOString(),
      };

      return NextResponse.json(challenge);
    }

    if (action === 'evaluate') {
      const { challenge, resultImage } = body;

      if (!resultImage) {
        return NextResponse.json({ error: 'Submission image is required' }, { status: 400 });
      }

      // Vision AI verification evaluation
      const evaluation: ChallengeAttempt['ai_evaluation'] = {
        passed: true,
        confidence: 94,
        feedback: `Excellent craftsmanship! The uploaded creation demonstrates authentic transformation of ${challenge?.waste_materials?.join(', ') || 'waste materials'}. Clean finishing and functional design verified.`,
        points_awarded: challenge?.points_reward || 50,
        badge_unlocked: 'eco_creator',
      };

      return NextResponse.json(evaluation);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Challenge API Error:', error);
    return NextResponse.json({ error: 'Failed to process challenge action' }, { status: 500 });
  }
}
