# vite-plugin-esm.sh
Rewrite imports with esm.sh at build time

This plugin rewrites the import statements in the project to use esm.sh so that you can fetch and cache all dependency on the client side instead of having to bundle them along with your application code.

> This plugin is something I have built for my personal projects. It currently doesn't have a lock file mechanism to verify integrity yet. So wouldn't recommend using this in production. [Might support this in the future](https://bsky.app/profile/jex.me/post/3la2jeo6bvl2l)

## Install
```sh
npm i -D vite-plugin-esm.sh
# or
bun i -D vite-plugin-esm.sh
# or
yarn add -D vite-plugin-esm.sh
# or
pnpm add -D vite-plugin-esm.sh
```

## Usage

```ts
import { defineConfig } from 'vite'
import { useESMImport } from 'vite-plugin-esm.sh'

export default defineConfig({
  plugins: [
    // ...
    useESMImport(),
  ],
});
```

## Options

Currently this plugin supports no options

## How it works

This plugin will read your package.json dependencies and will add that dependency as an Import map to your html file that uses [esm.sh](https://esm.sh/) links on build time. Your development workflow will remain the same.

For example, if this is your package.json:
```json
{
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
    }
}
```

Your resulting html file on build output will have the following importmap added to it:

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^18.3.1",
    "react/": "https://esm.sh/react@^18.3.1/",
    "react-dom": "https://esm.sh/react-dom@^18.3.1",
    "react-dom/": "https://esm.sh/react-dom@^18.3.1/"
  }
}
</script>
```