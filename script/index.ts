import { promises as fs } from 'node:fs'
import path from 'node:path'
import getTheme from './theme'
import type { GetThemeOptions } from './helper'

interface ThemeBuildMeta {
  base: Omit<GetThemeOptions, 'editorScheme'>
  editorThemePath: string
  UIPath: string
}

async function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
}

async function buildThemes() {
  try {
    const themesDir = path.resolve(__dirname, '../src/main/resources/themes')
    await fs.mkdir(themesDir, { recursive: true })
    const VitesseThemes: ThemeBuildMeta[] = [
      {
        base: {
          name: 'Vitesse Light',
          color: 'light',
        },
        editorThemePath: './src/main/resources/themes/vitesse.light.xml',
        UIPath: './src/main/resources/themes/vitesse.light.theme.json',
      },
      {
        base: {
          name: 'Vitesse Light Soft',
          color: 'light',
          soft: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.light.soft.xml',
        UIPath: './src/main/resources/themes/vitesse.light.soft.theme.json',
      },
      {
        base: {
          name: 'Vitesse Dark',
          color: 'dark',
        },
        editorThemePath: './src/main/resources/themes/vitesse.dark.xml',
        UIPath: './src/main/resources/themes/vitesse.dark.theme.json',
      },
      {
        base: {
          name: 'Vitesse Dark Soft',
          color: 'dark',
          soft: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.dark.soft.xml',
        UIPath: './src/main/resources/themes/vitesse.dark.soft.theme.json',
      },
      {
        base: {
          name: 'Vitesse Black',
          color: 'dark',
          black: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.black.xml',
        UIPath: './src/main/resources/themes/vitesse.black.theme.json',
      },

    ]

    const promises = []

    for (const theme of VitesseThemes) {
      const { base, editorThemePath, UIPath } = theme
      const fullEditorThemePath = path.resolve(__dirname, '..', editorThemePath)
      const fullUIThemePath = path.resolve(__dirname, '..', UIPath)

      // Ensure directories exist
      await ensureDirectoryExists(fullEditorThemePath)
      await ensureDirectoryExists(fullUIThemePath)

      const { editorTheme, UITheme } = getTheme({
        ...base,
        editorScheme: editorThemePath.replace('./src/main/resources', ''),
      })

      promises.push(
        fs.writeFile(fullEditorThemePath, editorTheme, 'utf-8').then(() => {
          // eslint-disable-next-line no-console
          console.log(`Generated: ${editorThemePath}`)
        }),
        fs.writeFile(fullUIThemePath, `${JSON.stringify(UITheme, null, 2)}\n`, 'utf-8').then(() => {
          // eslint-disable-next-line no-console
          console.log(`Generated: ${UIPath}`)
        }),
      )
    }

    await Promise.all(promises)
    // eslint-disable-next-line no-console
    console.log('All theme files generated successfully!')
  }
  catch (e) {
    console.error('Error generating theme files:', e)
    process.exit(1)
  }
}

// Run the build
buildThemes().catch((e) => {
  console.error('Unhandled error in build process:', e)
  process.exit(1)
})
