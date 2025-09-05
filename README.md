
<h1 align="center">Intellij Vitesse Theme</h1>

<p align="center">
<img src="https://github.com/loosheng/intellij-vitesse-theme/workflows/Build/badge.svg" alt="CI Status" />
<a href="https://plugins.jetbrains.com/plugin/21401-vitesse-theme">
<img src="https://img.shields.io/jetbrains/plugin/v/com.github.loosheng.intellijvitessetheme.svg" alt="Intellij Vitesse Theme" />
</a>
<a href="https://plugins.jetbrains.com/plugin/21401-vitesse-theme">
<img src="https://img.shields.io/jetbrains/plugin/d/com.github.loosheng.intellijvitessetheme.svg" alt="Downloads" />
</a>
</p>

<!-- Plugin description -->

A clean, elegant theme collection for IntelliJ-based IDEs, featuring 5 carefully crafted variants: **Vitesse Light**, **Light Soft**, **Dark**, **Dark Soft**, and **Black**. Designed with a minimalist philosophy, this theme provides excellent readability and a comfortable coding experience with balanced contrast and thoughtful color choices.

Perfect for developers who appreciate clean aesthetics and clear syntax highlighting across all supported languages and file types.

<h3 align="center"> Ported from antfu's <a href="https://github.com/antfu/vscode-theme-vitesse">
vscode-theme-vitesse</a></h3>

<!-- Plugin description end -->

## Screenshots

<div align="center">
  <img width="49%" src="./images/light.png"  alt="Vitesse light"/>
  <img width="49%" src="./images/dark.png" alt="Vitesse dark" />
</div>
<div align="center">Vitesse Light & Vitesse Dark</div>
<br />
<div align="center">
 <img width="49%" src="./images/light.soft.png" alt="Vitesse Light Soft" />
 <img width="49%" src="./images/dark.soft.png" alt="Vitesse Dark Soft" />
</div>
<div align="center">Vitesse Light Soft & Vitesse Dark Soft</div>
<br />
<div align="center">
  <img width="50%" src="./images/black.png" />
  <div align="center">Vitesse Black</div>  
</div>

## Installation

- Using IDE built-in plugin system:

  <kbd>Settings/Preferences</kbd> > <kbd>Plugins</kbd> > <kbd>Marketplace</kbd> > <kbd>Search for "Vitesse
  theme"</kbd> >
  <kbd>Install Plugin</kbd>

- Manually:

  Download the [latest release](https://github.com/loosheng/intellij-vitesse-theme/releases/latest) and install it
  manually using
  <kbd>Settings/Preferences</kbd> > <kbd>Plugins</kbd> > <kbd>⚙️</kbd> > <kbd>Install plugin from disk...</kbd>

---
## Development

1. Install dependencies

```bash
# Install script dependencies
pnpm install

# Install Java Dependencies or open in intellij IDEA (auto index)
# gradlew manual install dependencies
./gradlew dependencies

```

2. start dev script

```bash
  pnpm run dev
```

3. modify `script/*` content

4. index done, start intellij IDEA run 'runIde'

---

## SVG Logo Design

[Vitesse Logo Design](https://mastergo.com/goto/pDDCTgJo?file=90290510852665)

---

## Thanks

This project Ported from [vscode-theme-vitesse](https://github.com/antfu/vscode-theme-vitesse).

---
## License
MIT - Copyright (c) 2021 Anthony Fu <br>
MIT - Copyright (c) 2023 LooSheng

---
Plugin based on the [IntelliJ Platform Plugin Template][template].

[template]: https://github.com/JetBrains/intellij-platform-plugin-template

[docs:plugin-description]: https://plugins.jetbrains.com/docs/intellij/plugin-user-experience.html#plugin-description-and-presentation

## Special thanks

Thanks to [JetBrains](https://www.jetbrains.com/?from=intellij-vitesse-theme) for supporting free open source licenses.

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)
