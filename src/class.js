import { Counter } from "k6/metrics";
import { hist100, hist50, hist150, hist200, hist250, hist300, hist350, hist400, histOver } from "./lib.js";

export class Count {
  counts = [
    new Counter(hist50),
    new Counter(hist100),
    new Counter(hist150),
    new Counter(hist200),
    new Counter(hist250),
    new Counter(hist300),
    new Counter(hist350),
    new Counter(hist400),
    new Counter(histOver)
  ];

  constructor() { }

  addCount(d) {
    if (d <= 50) this.counts[0].add(1);
    else if (d <= 100) this.counts[1].add(1);
    else if (d <= 150) this.counts[2].add(1);
    else if (d <= 200) this.counts[3].add(1);
    else if (d <= 250) this.counts[4].add(1);
    else if (d <= 300) this.counts[5].add(1);
    else if (d <= 350) this.counts[6].add(1);
    else if (d <= 400) this.counts[7].add(1);
    else this.counts[8].add(1);
  }
}