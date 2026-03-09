import 'server-only';

import caller from '@lib/http/api-caller';
import { Message } from '@lib/types';

export async function getHello(): Promise<Message> {
  const data = await caller('/');
  return data as Message;
}
