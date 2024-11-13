import fs from 'node:fs'
import path from 'node:path'
import type NPMCliPackageJson from '@npmcli/package-json'
import type { PluginOption } from 'vite'

const packageJson: NPMCliPackageJson['content'] = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'),
)

const provider = 'https://esm.sh/'

const imports = Object.entries(packageJson?.dependencies ?? {}).reduce(
  (prev, [key, value]) => {
    prev[key] = `${provider}${key}@${value}`
    prev[`${key}/`] = `${provider}${key}@${value}/`
    return prev
  },
  {} as Record<string, string>,
)

const importmap = {
  imports,
}

export const useImportMap = (): PluginOption => {
  return {
    name: 'use-import-map',
    config() {
      return {
        build: {
          rollupOptions: {
            external: Object.keys(packageJson?.dependencies ?? {}),
          },
        },
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: {
                type: 'importmap',
              },
              children: JSON.stringify(importmap),
              injectTo: 'head-prepend',
            },
          ],
        }
      },
    },
  }
}
