import { writable, get } from 'svelte/store';

export const inputTime = writable<string>('');
export const seconds = writable<number>(0);
export const totalTime = writable<number>(0);
export const isRunning = writable<boolean>(false);
export const isInputValid = writable<boolean>(true);
export const progress = writable<number>(0);

let interval: NodeJS.Timeout | null = null;

/**
 * Verarbeitet und prüft die Benutzereingabe im Input
 * Bei ungültiger Eingabe wird das Field zurückgesetzt
 */
export const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  if (/^\d*$/.test(value)) {
    const newTime = parseInt(value, 10) || 0;
    const isTimeChanged = newTime !== get(totalTime);
    if (isTimeChanged) {
      inputTime.set(value);
      seconds.set(newTime);
      totalTime.set(newTime);
    }
  } else {
    inputTime.set('');
  }
}

/**
 * Startet oder stoppt den Timer, abhängig vom aktuellen Zustand.
 */
export const toggleTimer = (): void => {
  const isTimerRunning = get(isRunning);
  const currentSeconds = get(seconds);

  if (isTimerRunning) {
    clearInterval(interval!);
    interval = null;
    isRunning.set(false);
  } else {
    if (currentSeconds > 0) {
      interval = setInterval(() => {
        const updatedSeconds = get(seconds) - 1;
        seconds.set(updatedSeconds);

        const total = get(totalTime);
        const elapsedTime = total - updatedSeconds;
        const currentProgress = calculateProgress(elapsedTime, total);
        progress.set(currentProgress);

        inputTime.set(updatedSeconds > 0 ? updatedSeconds.toString() : '');

        if (updatedSeconds <= 0) {
          clearInterval(interval!);
          isRunning.set(false);
        }
      }, 1000);
      isRunning.set(true);
    }
  }
}

export const resetTimer = (): void => {
  if (interval) clearInterval(interval);
  interval = null;
  isRunning.set(false);
  seconds.set(0);
  inputTime.set('');
  totalTime.set(0);
  progress.set(0);
}

/**
 * Berechnet den Fortschritt des Timers basierend auf der verstrichenen Zeit und der Gesamtzeit.
 * Der Fortschritt wird als Wert zwischen 0 und 1 zurückgegeben (0 = keine Zeit vergangen, 1 = Timer abgelaufen).
 * @param elapsedTime bereits verstrichene Zeit
 * @param totalTime Gesamtzeit des Timers in Sekunden.
 * @returns Fortschritt als Dezimalwert
 */
export const calculateProgress = (elapsedTime: number, totalTime: number): number => {
  if (totalTime === 0) return 0;
  return elapsedTime / totalTime;
}
