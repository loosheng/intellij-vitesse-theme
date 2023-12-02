import { promises as fs } from 'node:fs'
import getTheme from './theme'
import {GetThemeOptions} from "./helper";

interface ThemeBuildMeta {
  base: Omit<GetThemeOptions, 'editorScheme'>
  editorThemePath: string
  UIPath: string
}

fs.mkdir('../src/main/resources/themes', { recursive: true }).then(() => {
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

  const promises = VitesseThemes.flatMap((theme) => {
    const { base, editorThemePath, UIPath } = theme

    const { editorTheme, UITheme } = getTheme({ ...base, editorScheme: editorThemePath.replace('./src/main/resources', '') })

    return [
      fs.writeFile(editorThemePath, editorTheme, 'utf-8'),
      fs.writeFile(UIPath, `${JSON.stringify(UITheme, null, 2)}\n`, 'utf-8'),
    ]
  })

  return Promise.all(promises)
})
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
