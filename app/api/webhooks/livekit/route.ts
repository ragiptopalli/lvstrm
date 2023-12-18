import { headers } from 'next/headers';
import { WebhookReceiver } from 'livekit-server-sdk';

import { db } from '@/lib/db';

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get('Authorization');

  if (!authorization) {
    return new Response('No authorization header', { status: 400 });
  }

  const webhookEvent = receiver.receive(body, authorization);

  if (webhookEvent.event === 'ingress_started') {
    await db.stream.update({
      where: {
        ingressId: webhookEvent.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
    return new Response('Streaming started...', { status: 200 });
  } else if (webhookEvent.event === 'ingress_ended') {
    await db.stream.update({
      where: {
        ingressId: webhookEvent.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
    return new Response('Streaming ended...', { status: 200 });
  } else {
    return new Response(`Unsupported event: ${webhookEvent.event}`, {
      status: 400,
    });
  }
}
