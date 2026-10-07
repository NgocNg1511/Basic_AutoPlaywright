import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type SignupCounter = { lastUsed: number };

export async function nextSignupEmail(baseEmail: string): Promise<string> {
  const atIndex = baseEmail.lastIndexOf('@');
  if (atIndex < 1) {
    throw new Error('EMAIL must be a valid email address.');
  }

  const originalLocalPart = baseEmail.slice(0, atIndex);
  const domain = baseEmail.slice(atIndex);
  const aliasMatch = originalLocalPart.match(/\+(\d+)$/);
  const localPart = originalLocalPart.replace(/\+\d+$/, '');
  const counterPath = resolve(__dirname, '../../test-data/signup-counter.json');

  let lastUsed = aliasMatch ? Number(aliasMatch[1]) : 0;
  try {
    const counter = JSON.parse(await readFile(counterPath, 'utf8')) as SignupCounter;
    if (Number.isInteger(counter.lastUsed) && counter.lastUsed >= 0) {
      lastUsed = Math.max(lastUsed, counter.lastUsed);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }

  const nextNumber = lastUsed + 1;
  await mkdir(resolve(__dirname, '../../test-data'), { recursive: true });
  await writeFile(counterPath, JSON.stringify({ lastUsed: nextNumber }, null, 2) + '\n', 'utf8');

  return localPart + '+' + nextNumber + domain;
}

