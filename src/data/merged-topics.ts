import { DEVOTIONAL_TOPICS } from './devotionals';
import type { DevotionalTopic } from './devotionals';
import { ADDITIONAL_DAYS } from './additional-series';

export function getMergedTopics(): DevotionalTopic[] {
  return DEVOTIONAL_TOPICS.map((topic) => {
    const extra = ADDITIONAL_DAYS[topic.id] ?? [];
    return { ...topic, days: [...topic.days, ...extra] };
  });
}

export const MERGED_TOPICS: DevotionalTopic[] = getMergedTopics();
