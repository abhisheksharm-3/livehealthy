/**
 * History service for storing past results in localStorage.
 */
import type { AnalyseFormType, HistoryEntryType } from '@/types';

const HISTORY_KEY = 'livehealthy_history';
const MAX_HISTORY = 10;

/**
 * Get all history entries.
 */
export function getHistory(): HistoryEntryType[] {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

/**
 * Get the most recent history entry.
 */
export function getLastResult(): HistoryEntryType | null {
    const history = getHistory();
    return history.length > 0 ? history[0] : null;
}

/**
 * Save a new result to history.
 */
export function saveResult(prediction: string, data: AnalyseFormType): HistoryEntryType {
    const entry: HistoryEntryType = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        prediction,
        data,
    };

    const history = getHistory();
    history.unshift(entry);

    // Keep only last N entries
    const trimmed = history.slice(0, MAX_HISTORY);

    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    } catch {
        // Storage quota exceeded, clear old entries
        localStorage.setItem(HISTORY_KEY, JSON.stringify([entry]));
    }

    return entry;
}

/**
 * Clear all history.
 */
export function clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY);
}
