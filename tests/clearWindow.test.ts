import { expect, test } from "vitest";
import { sanitize, clearWindow, removed } from "../src/index";

const CHUNK = 500;
const ROUNDS = 5;
const DIRTY_HTML = `<div onclick="alert(1)"><script>xss</script><b>safe</b></div>`;

function heapMB(): number {
  global.gc?.();
  return process.memoryUsage().heapUsed / 1024 / 1024;
}

function runChunk(n: number): { avgMs: number } {
  const start = performance.now();
  for (let i = 0; i < n; i++) {
    sanitize(DIRTY_HTML);
  }
  return { avgMs: (performance.now() - start) / n };
}

// Yield to the event loop so GC can sweep closed jsdom windows
function tick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

test("clearWindow resets heap growth and prevents time degradation", { timeout: 60_000 }, async () => {
  // Warm up
  runChunk(50);

  // --- Run WITHOUT clearing ---
  const noClearHeaps: number[] = [];
  const noClearTimes: number[] = [];

  for (let r = 0; r < ROUNDS; r++) {
    const { avgMs } = runChunk(CHUNK);
    noClearTimes.push(avgMs);
    noClearHeaps.push(heapMB());
  }

  const noClearHeapGrowth = noClearHeaps[ROUNDS - 1] - noClearHeaps[0];
  const noClearTimeRatio = noClearTimes[ROUNDS - 1] / noClearTimes[0];

  // Reset before the next phase
  clearWindow();
  await tick();
  global.gc?.();
  await tick();

  // --- Run WITH clearing between rounds ---
  const withClearHeaps: number[] = [];
  const withClearTimes: number[] = [];

  for (let r = 0; r < ROUNDS; r++) {
    const { avgMs } = runChunk(CHUNK);
    withClearTimes.push(avgMs);
    clearWindow();
    await tick();
    withClearHeaps.push(heapMB());
  }

  const withClearHeapGrowth = withClearHeaps[ROUNDS - 1] - withClearHeaps[0];
  const withClearTimeRatio = withClearTimes[ROUNDS - 1] / withClearTimes[0];

  // --- Report ---
  console.table({
    "Without clearWindow": {
      "heap start (MB)": noClearHeaps[0].toFixed(1),
      "heap end (MB)": noClearHeaps[ROUNDS - 1].toFixed(1),
      "heap growth (MB)": noClearHeapGrowth.toFixed(1),
      "avg ms/call first round": noClearTimes[0].toFixed(3),
      "avg ms/call last round": noClearTimes[ROUNDS - 1].toFixed(3),
      "time ratio (last/first)": noClearTimeRatio.toFixed(2),
    },
    "With clearWindow": {
      "heap start (MB)": withClearHeaps[0].toFixed(1),
      "heap end (MB)": withClearHeaps[ROUNDS - 1].toFixed(1),
      "heap growth (MB)": withClearHeapGrowth.toFixed(1),
      "avg ms/call first round": withClearTimes[0].toFixed(3),
      "avg ms/call last round": withClearTimes[ROUNDS - 1].toFixed(3),
      "time ratio (last/first)": withClearTimeRatio.toFixed(2),
    },
  });

  // Without clearing, per-call time should degrade noticeably (>1.5x)
  expect(noClearTimeRatio).toBeGreaterThan(1.5);

  // With clearing, per-call time should stay roughly stable (<1.5x)
  expect(withClearTimeRatio).toBeLessThan(1.5);

  // With clearing, heap growth should be significantly less (only reliable with --expose-gc)
  if (global.gc) {
    expect(withClearHeapGrowth).toBeLessThan(noClearHeapGrowth);
  }
});

test("sanitize works correctly after clearWindow", () => {
  const before = sanitize(DIRTY_HTML);
  clearWindow();
  const after = sanitize(DIRTY_HTML);

  expect(before).toBe("<div><b>safe</b></div>");
  expect(after).toBe(before);
});

test("removed named export reflects new instance after clearWindow", () => {
  sanitize('<img src="x" onerror="alert(1)">');
  expect(removed.length).toBeGreaterThan(0);

  clearWindow();

  // After clearing, removed should be empty (fresh instance, no sanitize calls yet)
  expect(removed.length).toBe(0);

  // After sanitizing on the new instance, removed should update
  sanitize('<img src="x" onerror="alert(1)">');
  expect(removed.length).toBeGreaterThan(0);
});
