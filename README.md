# vite-node-dev

> Run Node scripts with [vite-node](https://www.npmjs.com/package/vite-node) and reload them when they are changed.

## Overview
> [!WARNING]  
> The functionality that vite-node-dev provides is now [natively supported by vite-node](https://github.com/vitest-dev/vitest/pull/890). As a result, vite-node-dev is no longer being maintained and you should instead use vite-node's `--watch` option:
> ```bash
> vite-node --watch <file>
> ```

By default, vite-node has lightning fast support for TypeScript, ESM, Vite plugins, and more! This makes it a great choice for running Node apps. vite-node-dev allows you to run scripts with vite-node while automatically reloading them on change.

## Installation

The recommended way to install vite-node-dev is as a dev-dependency of your project with npm (or yarn/pnpm):

```bash
npm install --save-dev vite-node-dev
```

It can also be installed globally:

```bash
npm install --global vite-node-dev
```

## Usage

### Running a Script

To run a script with vite-node-dev, type `vite-node-dev` followed by the name of the file. If it is installed locally, prefix the command with `npx`.

```bash
npx vite-node-dev [filename]
```

You might want to add a script for this command to your project's `package.json`. To run the following script, type `npm run dev`.

```jsonc
"scripts": {
  // ...
  "dev": "vite-node-dev index.js" // You can omit the npx prefix inside a script
}
```

### Manually Restarting a Running Script

To manually restart a running script without quitting vite-node-dev, type `rs` and hit `enter`.

### Running a Script Without Reloading

The `--run` or `-r` flag instructs vite-node-dev to run a script with vite-node without reloading it: 

```bash
npx vite-node-dev --run [filename]
```

This is effectively equivalent to plain vite-node, but removes the need to manually install another dependency and can easily be passed as an additional argument to npm scripts.

## License

MIT license: [https://github.com/hugo-t-b/vite-node-dev/blob/main/LICENSE.txt](https://github.com/hugo-t-b/vite-node-dev/blob/main/LICENSE.txt).
