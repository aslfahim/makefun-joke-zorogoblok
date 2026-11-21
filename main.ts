// The joke the reviewer laughs at — @zorogoblok entry.
// Structure: a quoted understatement from the agent, a hard number that
// exposes it, and a cutaway reaction shot. Built with a small builder
// class so each fragment is appended in performance order.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

class OneLiner {
  private fragments: string[] = [];

  say(fragment: string): this {
    this.fragments.push(fragment);
    return this;
  }

  build(): string {
    // Fragments are stored verbatim; the join is the only place spacing
    // is decided, which keeps the delivered line deterministic.
    return this.fragments.map((f) => f.trim()).join(" ");
  }
}

function compose(): string {
  const filesOpened = 47; // the "simple fix" blast radius
  return new OneLiner()
    .say('The agent said "simple fix"')
    .say(`and opened ${filesOpened} files.`)
    .say("Somewhere upstairs, a senior engineer felt a great disturbance.")
    .build();
}

function main(): void {
  const line = compose();
  const n = [...line].length;
  if (n < 1 || n > 280) {
    throw new Error(`length ${n} outside 1..280`);
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
