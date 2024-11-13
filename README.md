# vite-plugin-esm.sh
Rewrite imports with esm.sh at build time

This plugin rewrites the import statements in the project to use esm.sh so that you can fetch and cache all dependency on the client side instead of having to bundle them along with your application code.

> This plugin is something I have built for my personal projects. It currently doesn't have a lock file mechanism to verify integrity yet. So wouldn't recommend using this in production. [Might support this in the future](https://bsky.app/profile/jex.me/post/3la2jeo6bvl2l)

