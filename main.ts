// main.ts — "Pigeon Pitch, One Line", a one-line elevator pitch (Node 22, stdlib only).
//
// The entry is a single pitch, written to /output/entry.txt:
//
//   Invest in DeadDrop: pigeons carry your secrets across the city in envelopes nobody opens, because nobody has ever once suspected a pigeon.
//
// Why this sentence, and why it is built this way:
//
// The judge's brief rewards, in order, an on-subject pigeon pitch to
// investors, a real joke that lands, originality, the pigeon's voice and
// city life, and tight writing. The sentence is shaped to that order. It
// opens as a pitch ("Invest in DeadDrop"), so axis 1 is settled in the
// first three words. The middle is the mechanism: pigeons carrying
// secrets in envelopes nobody opens. The punch is the last clause —
// "because nobody has ever once suspected a pigeon" — which re-reads
// everything before it: the secrecy is not the product, the pigeon is.
// A pigeon is the perfect courier because nobody watches a pigeon.
// That is the moat, and it is also the joke.
//
// The angle is fresh against the lanes the winner research bans. The
// field is saturated with seed rounds, crumb delivery, coo- startup
// names, Statuebnb and ten-thousand-pigeon boasts; this line uses none
// of them. The empty lane it builds in is the pigeon as a courier of
// secrets, and the pigeon-ness comes from the situation, not from
// spelling "coo" or from a statue gag. No researched winner pitches
// invisibility as the product: the hire-me winners win on hyper-specific
// proof, the builder-pitch winners on a risk-removal kicker, and this
// line wins its tournament on a single reframe instead. At 138
// characters it sits inside the 90–150 band every winner occupies, and
// the tie-break favours smaller text, so nothing in it is spare:
// "DeadDrop" names the startup in one word, "envelopes nobody opens"
// is the whole security model, "ever once" carries the century of
// being ignored in two words.
//
// How this line was chosen: twelve candidates in empty lanes (see
// CANDIDATES.md), pairwise self-judged against the brief's five axes
// with the real top-3 pitch winners as opponents — daring-gecko-25
// (71.8%), hazel-harbor-63 (74.5%), panji (74.7%). The winner beats all
// three on axes 2–5 (axis 1 is a gimme: none of the three is a pigeon
// pitch). Runner-up: the Pigeon Legal line ("sue the weather"), two
// jokes in 148 chars where the winner carries one reframe in 138.
// Honest statement: the win over daring-gecko-25 is narrow, decided on
// originality, not on the size of the laugh, and no candidate here has
// a punch as specific as "$41,000, eleven cents at a time".
//
// The program does nothing clever on purpose. It holds the sentence as
// one constant, checks it against the competition's own gate before
// writing (1–200 Unicode code points, a single line, not only
// whitespace), and writes it with a trailing newline. No clock, no
// random source, no network, so two runs write identical bytes. Run it
// with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The pitch. One ask (Invest in DeadDrop), one mechanism (pigeons carry
// secrets in envelopes nobody opens), one punch (nobody has ever once
// suspected a pigeon — the bird itself is the moat).
const PITCH =
  'Invest in DeadDrop: pigeons carry your secrets across the city in envelopes nobody opens, because nobody has ever once suspected a pigeon.';

// The competition's gate, applied here before anything is written.
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 200;

function abort(why: string): never {
  throw new Error('main.ts: ' + why);
}

function writePitch(): void {
  // Count Unicode code points, not UTF-16 code units and not bytes, because
  // that is how the gate counts: [...PITCH] splits on code points. Check the
  // exact text that lands in the file, trailing newline included, because
  // the gate scores /output/entry.txt itself, not the constant alone.
  const written = PITCH + '\n';
  const length = [...written].length;
  if (length < MIN_CODE_POINTS || length > MAX_CODE_POINTS) {
    abort(`entry text is ${length} code points, outside the 1–200 gate`);
  }
  if (PITCH.trim().length === 0) {
    abort('pitch is only whitespace');
  }
  if (PITCH.includes('\n') || PITCH.includes('\r')) {
    abort('pitch must be a single line');
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const to = join(outDir, 'entry.txt');

  mkdirSync(outDir, { recursive: true });
  writeFileSync(to, written, 'utf8');
  console.log(`wrote ${to} (${[...PITCH].length} code points in the pitch, ${length} with the newline)`);
}

writePitch();
