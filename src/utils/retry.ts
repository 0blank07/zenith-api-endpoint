import logger from './logger';

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 2000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      logger.warn(`Attempt ${i + 1} failed: ${error.message}. Retrying in ${delay}ms...`);
      if (i < attempts - 1) {
        await sleep(delay);
        delay *= 2; // Exponential backoff
      }
    }
  }

  throw lastError;
}
