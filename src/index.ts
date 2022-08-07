#!/usr/bin/env node

import main from "./lib/main.js";
import { program } from "commander";

program
  .name("vite-node-dev")
  .version("1.0.0");

program
  .argument("<file>")
  .option("-r, --run", "run a file without reloading")
  .action(main);

program.parse();
