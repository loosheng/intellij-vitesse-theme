import builder from 'xmlbuilder'
import pkg from '../package.json'
import { getColors } from './primer'
import { VitesseThemes } from './colors'

export default function getEditorSchemeTheme({ style, name, soft = false, black = false, editorScheme }) {
  // Usage: `pick({ light: "lightblue", dark: "darkblue" })`
  const pick = options => options[style]

  const vitesse = (key: keyof typeof VitesseThemes, op = '') => pick({ light: VitesseThemes[key][1] + op, dark: VitesseThemes[key][0] + op })

  const primer = getColors(style)

  const foreground = vitesse('foreground')
  const secondaryForeground = vitesse('secondaryForeground')
  const activeForeground = vitesse('activeForeground')
  const primary = vitesse('primary')

  const border = soft
    ? vitesse('lowBorder')
    : vitesse('border')
  const background = black
    ? '#000'
    : soft
      ? vitesse('lowBackground')
      : vitesse('background')
  const activeBackground = black
    ? '#050505'
    : soft
      ? vitesse('lowActiveBackground')
      : vitesse('activeBackground')

  const selectionBackgroundInActive = pick({ light: '#22222208', dark: '#eeeeee08' })
  const selectionBackgroundActive = pick({ light: '#22222215', dark: '#eeeeee15' })
  const selectionBackground = pick({ light: '#22222215', dark: '#eeeeee15' })

  // root element
  const theme = builder.create('scheme', { encoding: 'utf-8' })
  theme.att('name', name)
  theme.att('parent_scheme', style === 'light' ? 'Default' : 'Darcula')
  theme.att('version', '1')
  /**
  ADDED_LINES_COLOR: 表示版本控制中新增行的颜色
  ANNOTATIONS_COLOR: 表示注释的颜色
  ANNOTATIONS_LAST_COMMIT_COLOR: 表示最后一次提交的注释颜色
  CARET_COLOR: 表示光标的颜色
  CARET_ROW_COLOR: 表示当前行的背景色
  CONSOLE_BACKGROUND_KEY: 表示控制台的背景色
  DELETED_LINES_COLOR: 表示版本控制中删除行的颜色
  DIFF_SEPARATORS_BACKGROUND: 表示差异分隔符的背景色
  DOCUMENTATION_COLOR: 表示文档注释的颜色
  DOC_COMMENT_GUIDE: 表示文档注释中的引导线的颜色
  DOC_COMMENT_LINK: 表示文档注释中的链接颜色
  ERROR_HINT: 表示错误提示的颜色
  FOLDED_TEXT_BORDER_COLOR: 表示折叠文本的边框颜色
  IGNORED_ADDED_LINES_BORDER_COLOR: 表示被忽略的新增行的边框颜色
  IGNORED_DELETED_LINES_BORDER_COLOR: 表示被忽略的删除行的边框颜色
  IGNORED_MODIFIED_LINES_BORDER_COLOR: 表示被忽略的修改行的边框颜色
  INDENT_GUIDE: 表示缩进线的颜色
  INFORMATION_HINT: 表示信息提示的颜色
  INLINE_REFACTORING_SETTINGS_DEFAULT: 表示内联重构默认颜色
  INLINE_REFACTORING_SETTINGS_FOCUSED: 表示被聚焦时的内联重构颜色
  INLINE_REFACTORING_SETTINGS_HOVERED: 表示被悬停时的内联重构颜色
  LINE_NUMBERS_COLOR: 表示行号的颜色
  LINE_NUMBER_ON_CARET_ROW_COLOR: 表示光标所在行号的颜色
  LOOKUP_COLOR: 表示查找提示的颜色
  METHOD_SEPARATORS_COLOR: 表示方法之间的分隔符颜色
  MODIFIED_LINES_COLOR: 表示版本控制中修改行的颜色
  NOTIFICATION_BACKGROUND: 表示通知的背景色
  PROMOTION_PANE: 表示推广面板的背景色
  QUESTION_HINT: 表示问题提示的颜色
  RECENT_LOCATIONS_SELECTION: 表示最近位置的选中颜色
  RIGHT_MARGIN_COLOR: 表示右边距的颜色
  SELECTED_INDENT_GUIDE: 表示选中缩进线的颜色
  ScrollBar.Mac.hoverThumbColor: 表示 Mac 系统悬停时滚动条的拇指颜色
  ScrollBar.Mac.thumbColor: 表示 Mac 系统滚动条的拇指颜色
  VCS_ANNOTATIONS_COLOR_1: 表示版本控制注释颜色 1
  VCS_ANNOTATIONS_COLOR_2: 表示版本控制注释颜色 2
  VCS_ANNOTATIONS_COLOR_3: 表示版本控制注释颜色 3
  VCS_ANNOTATIONS_COLOR_4: 表示版本控制注释颜色 4
  VCS_ANNOTATIONS_COLOR_5: 表示版本控制注释颜色 5
  VISUAL_INDENT_GUIDE: 表示可视化缩进线的颜色
  WHITESPACES: 表示空格和制表符的颜色
  WHITESPACES_MODIFIED_LINES_COLOR: 表示版本控制中修改后的空格和制表符的颜色
  **/
  const colorsElement = theme.ele('colors')
  // EDITOR_BACKGROUND  编辑区域背景色
  colorsElement.ele('option', { name: 'ADDED_LINES_COLOR', value: vitesse('green') })
  // GUTTER_BACKGROUND 编辑区域左侧行号区域背景色
  colorsElement.ele('option', { name: 'GUTTER_BACKGROUND', value: background })
  // SELECTION_BACKGROUND 选中区域背景色
  colorsElement.ele('option', { name: 'SELECTION_BACKGROUND', value: selectionBackground })
  // SELECTION_FOREGROUND 选中区域前景色
  colorsElement.ele('option', { name: 'SELECTION_FOREGROUND' })

  colorsElement.ele('option', { name: 'ANNOTATIONS_COLOR', value: vitesse('comment') })
  colorsElement.ele('option', { name: 'ANNOTATIONS_LAST_COMMIT_COLOR', value: vitesse('comment') })
  colorsElement.ele('option', { name: 'CARET_COLOR', value: pick({ light: '#000000', dark: '#aeafad' }) })
  colorsElement.ele('option', { name: 'CARET_ROW_COLOR', value: activeBackground })
  colorsElement.ele('option', { name: 'CONSOLE_BACKGROUND_KEY', value: vitesse('background') })
  colorsElement.ele('option', { name: 'DELETED_LINES_COLOR', value: vitesse('red') })
  colorsElement.ele('option', { name: 'DIFF_SEPARATORS_BACKGROUND', value: vitesse('activeBackground') })
  colorsElement.ele('option', { name: 'DOCUMENTATION_COLOR', value: background })
  colorsElement.ele('option', { name: 'DOC_COMMENT_GUIDE', value: vitesse('comment') })
  colorsElement.ele('option', { name: 'DOC_COMMENT_LINK', value: vitesse('comment') })
  colorsElement.ele('option', { name: 'ERROR_HINT', value: vitesse('red') })
  colorsElement.ele('option', { name: 'FOLDED_TEXT_BORDER_COLOR', value: activeBackground })
  colorsElement.ele('option', { name: 'IGNORED_ADDED_LINES_BORDER_COLOR', value: vitesse('green') })
  colorsElement.ele('option', { name: 'IGNORED_DELETED_LINES_BORDER_COLOR', value: vitesse('red') })
  colorsElement.ele('option', { name: 'IGNORED_MODIFIED_LINES_BORDER_COLOR', value: vitesse('blue') })
  colorsElement.ele('option', { name: 'INDENT_GUIDE', value: pick({ light: primer.gray[2], dark: primer.gray[1] }) })
  colorsElement.ele('option', { name: 'INFORMATION_HINT', value: background })
  colorsElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_DEFAULT', value: vitesse('primary') })
  colorsElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_FOCUSED', value: vitesse('primary') })
  colorsElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_HOVERED', value: vitesse('primary') })
  colorsElement.ele('option', { name: 'LINE_NUMBERS_COLOR', value: vitesse('ignored') })
  colorsElement.ele('option', { name: 'LINE_NUMBER_ON_CARET_ROW_COLOR', value: activeForeground })
  colorsElement.ele('option', { name: 'LOOKUP_COLOR', value: background })
  colorsElement.ele('option', { name: 'METHOD_SEPARATORS_COLOR', value: primer.gray[3] })
  colorsElement.ele('option', { name: 'MODIFIED_LINES_COLOR', value: vitesse('blue') })
  colorsElement.ele('option', { name: 'NOTIFICATION_BACKGROUND', value: activeBackground })
  colorsElement.ele('option', { name: 'PROMOTION_PANE', value: activeBackground })
  colorsElement.ele('option', { name: 'QUESTION_HINT', value: vitesse('yellow') })
  colorsElement.ele('option', { name: 'RECENT_LOCATIONS_SELECTION', value: activeBackground })
  colorsElement.ele('option', { name: 'RIGHT_MARGIN_COLOR', value: vitesse('ignored') })
  colorsElement.ele('option', { name: 'SELECTED_INDENT_GUIDE', value: vitesse('primary') })
  colorsElement.ele('option', { name: 'ScrollBar.Mac.hoverThumbColor', value: vitesse('ignored') })
  colorsElement.ele('option', { name: 'ScrollBar.Mac.thumbColor', value: vitesse('faded') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_1', value: vitesse('green') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_2', value: vitesse('blue') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_3', value: vitesse('yellow') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_4', value: vitesse('red') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_5', value: vitesse('orange') })
  colorsElement.ele('option', { name: 'VISUAL_INDENT_GUIDE', value: vitesse('ignored') })
  colorsElement.ele('option', { name: 'WHITESPACES', value: vitesse('ignored') })
  colorsElement.ele('option', { name: 'WHITESPACES_MODIFIED_LINES_COLOR', value: vitesse('ignored') })

  // attributes
  const attributesElement = theme.ele('attributes')
  const TEXT = attributesElement.ele('option', { name: 'TEXT' }).ele('value')
  TEXT.ele('option', { name: 'FOREGROUND', value: foreground })
  TEXT.ele('option', { name: 'BACKGROUND', value: background })

  attributesElement.ele('option', { name: 'ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES' }).ele('value')
  // ANNOTATION_NAME_ATTRIBUTES: 表示注释名称的属性
  attributesElement.ele('option', { name: 'ANNOTATION_NAME_ATTRIBUTES', baseAttributes: 'DEFAULT_METADATA' })

  // BREADCRUMBS_CURRENT : 表示当前面包屑的属性
  const BREADCRUMBS_CURRENT = attributesElement.ele('option', { name: 'BREADCRUMBS_CURRENT' }).ele('value')
  BREADCRUMBS_CURRENT.ele('option', { name: 'FOREGROUND', value: vitesse('foreground') })
  BREADCRUMBS_CURRENT.ele('option', { name: 'BACKGROUND', value: vitesse('activeBackground') })

  // BREADCRUMBS_DEFAULT : 表示默认面包屑的属性
  const BREADCRUMBS_DEFAULT = attributesElement.ele('option', { name: 'BREADCRUMBS_DEFAULT' }).ele('value')
  BREADCRUMBS_DEFAULT.ele('option', { name: 'FOREGROUND', value: primer.gray[5] })

  // BREADCRUMBS_HOVERED : 表示悬停面包屑的属性
  const BREADCRUMBS_HOVERED = attributesElement.ele('option', { name: 'BREADCRUMBS_HOVERED' }).ele('value')
  BREADCRUMBS_HOVERED.ele('option', { name: 'FOREGROUND', value: vitesse('foreground') })

  // BREADCRUMBS_INACTIVE : 表示不活动面包屑的属性
  const BREADCRUMBS_INACTIVE = attributesElement.ele('option', { name: 'BREADCRUMBS_INACTIVE' }).ele('value')
  BREADCRUMBS_INACTIVE.ele('option', { name: 'FOREGROUND', value: primer.gray[4] })

  // BREAKPOINT_ATTRIBUTES : 表示断点的属性
  const BREAKPOINT_ATTRIBUTES = attributesElement.ele('option', { name: 'BREAKPOINT_ATTRIBUTES' }).ele('value')
  BREAKPOINT_ATTRIBUTES.ele('option', { name: 'BACKGROUND', value: pick({ light: '#40252b', dark: '#40252b' }) })
  BREAKPOINT_ATTRIBUTES.ele('option', { name: 'ERROR_STRIPE_COLOR', value: pick({ light: '#8c5b65', dark: '#8c5b65' }) })

  // CSS.IMPORTANT : 表示 CSS !important 属性
  //   <option name="CSS.IMPORTANT">
  //   <value>
  //     <option name="FOREGROUND" value="CF8E6D" />
  //     <option name="FONT_TYPE" value="1" />
  //   </value>
  // </option>

  const CSS_IMPORTANT = attributesElement.ele('option', { name: 'CSS.IMPORTANT' }).ele('value')
  CSS_IMPORTANT.ele('option', { name: 'FOREGROUND', value: primary })
  CSS_IMPORTANT.ele('option', { name: 'FONT_TYPE', value: '1' })

  // 编辑器中代码镜头（Code Lens）边框颜色
  // <option name="CODE_LENS_BORDER_COLOR">
  // <value>
  //   <option name="EFFECT_COLOR" value="868a91" />
  // </value>
  // </option
  attributesElement.ele('option', { name: 'CODE_LENS_BORDER_COLOR' }).ele('value').ele('option', { name: 'EFFECT_COLOR', value: border })

  // CSS.URL : 表示CSS URL的属性
  //   <option name="CSS.URL">
  //   <value>
  //     <option name="FOREGROUND" value="5c92ff" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'CSS.URL' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('orange') })

  // <option name="CUSTOM_STRING_ATTRIBUTES" baseAttributes="DEFAULT_STRING" />
  attributesElement.ele('option', { name: 'CUSTOM_STRING_ATTRIBUTES' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('string') })
  // <option name="CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES" baseAttributes="DEFAULT_VALID_STRING_ESCAPE" />
  attributesElement.ele('option', { name: 'CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('string') })

  //   <option name="DEFAULT_DOT">
  //   <value>
  //     <option name="FOREGROUND" value="BCBEC4" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'DEFAULT_DOT' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('punctuation') })

  // 注释
  //   <option name="DEFAULT_BLOCK_COMMENT">
  //   <value>
  //     <option name="FOREGROUND" value="699856" />
  //   </value>
  // </option>
  //   <option name="DEFAULT_DOC_MARKUP">
  //   <value>
  //     <option name="FOREGROUND" value="68a67e" />
  //   </value>
  // </option>
  //   <option name="DEFAULT_DOC_COMMENT_TAG">
  //   <value>
  //     <option name="FOREGROUND" value="67a37c" />
  //     <option name="EFFECT_TYPE" value="1" />
  //   </value>
  // </option>

  attributesElement.ele('option', { name: 'DEFAULT_BLOCK_COMMENT' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('comment') })
  attributesElement.ele('option', { name: 'DEFAULT_DOC_MARKUP' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('comment') })
  attributesElement.ele('option', { name: 'DEFAULT_DOC_COMMENT_TAG' }).ele('value').ele('option', { name: 'FOREGROUND', value: primary })

  //   <option name="DEFAULT_TAG">
  //   <value>
  //     <option name="BACKGROUND" value="ff0000" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'DEFAULT_TAG' }).ele('value').ele('option', { name: 'BACKGROUND', value: background })

  // <option name="DEFAULT_CLASS_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="39c8b0" />
  //   </value>
  // </option>
  // <option name="DEFAULT_CLASS_REFERENCE">
  //   <value>
  //     <option name="FOREGROUND" value="39c8b0" />
  //   </value>
  // </option>

  attributesElement.ele('option', { name: 'DEFAULT_CLASS_NAME' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('class') })
  attributesElement.ele('option', { name: 'DEFAULT_CLASS_REFERENCE' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('class') })

  // 常量
  //   <option name="DEFAULT_CONSTANT">
  //   <value>
  //     <option name="FOREGROUND" value="d3d3d3" />
  //   </value>
  // </option>
  attributesElement.element('option', { name: 'DEFAULT_CONSTANT' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('constant') })

  // 关键词
  //   <option name="DEFAULT_KEYWORD">
  //   <value>
  //     <option name="FOREGROUND" value="499cd5" />
  //   </value>
  // </option>

  attributesElement.ele('option', { name: 'DEFAULT_KEYWORD' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('keyword') })

  // 函数调用
  //   <option name="DEFAULT_FUNCTION_CALL">
  //   <value>
  //     <option name="FOREGROUND" value="dbdbaa" />
  //   </value>
  // </option>
  // 函数声明
  // <option name="DEFAULT_FUNCTION_DECLARATION">
  //   <value>
  //     <option name="FOREGROUND" value="dcdcaa" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'DEFAULT_FUNCTION_CALL' }).ele('value').ele('option', { name: 'FOREGROUND', value: primary })
  attributesElement.ele('option', { name: 'DEFAULT_FUNCTION_DECLARATION' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('function') })

  // 数字
  // <option name="DEFAULT_NUMBER">
  //     <value>
  //       <option name="FOREGROUND" value="2aacb8" />
  //     </value>
  //   </option>
  attributesElement.ele('option', { name: 'DEFAULT_NUMBER' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('number') })
  // 字符串
  //   <option name="DEFAULT_STRING">
  //   <value>
  //     <option name="FOREGROUND" value="6aab73" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'DEFAULT_STRING' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('string') })

  // 标识符
  //   <option name="DEFAULT_IDENTIFIER">
  //   <value>
  //     <option name="FOREGROUND" value="bcbec4" />
  //   </value>
  // </option>

  /**
   * @tag <code>Markup<</code>
   */
  attributesElement.ele('option', { name: 'DEFAULT_IDENTIFIER' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('variable') })
  //   <option name="DEFAULT_ENTITY">
  //   <value>
  //     <option name="FOREGROUND" value="ff0000" />
  //     <option name="FONT_TYPE" value="1" />
  //   </value>
  // </option>
  const DEFAULT_ENTITY = attributesElement.ele('option', { name: 'DEFAULT_ENTITY' }).ele('value')
  DEFAULT_ENTITY.ele('option', { name: 'FOREGROUND', value: primary })
  DEFAULT_ENTITY.ele('option', { name: 'FONT_TYPE', value: '1' })

  //   <option name="DEFAULT_INSTANCE_FIELD">
  //   <value>
  //     <option name="FOREGROUND" value="0086B3" />
  //   </value>
  // </option>

  attributesElement.ele('option', { name: 'DEFAULT_INSTANCE_FIELD' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('variable') })

  //   <option name="DEFAULT_TEMPLATE_LANGUAGE_COLOR">
  //   <value>
  //     <option name="BACKGROUND" value="2b2d30" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'DEFAULT_TEMPLATE_LANGUAGE_COLOR' }).ele('value').ele('option', { name: 'BACKGROUND', value: background })

  //   <option name="DEFAULT_ATTRIBUTE">
  //   <value>
  //     <option name="FOREGROUND" value="994f4f" />
  //     <option name="FONT_TYPE" value="1" />
  //   </value>
  // </option>

  const DEFAULT_ATTRIBUTE = attributesElement.ele('option', { name: 'DEFAULT_ATTRIBUTE' }).ele('value')
  DEFAULT_ATTRIBUTE.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })
  DEFAULT_ATTRIBUTE.ele('option', { name: 'FONT_TYPE', value: '1' })

  //   <option name="TEXT_SEARCH_RESULT_ATTRIBUTES">
  //   <value>
  //     <option name="BACKGROUND" value="114957" />
  //     <option name="EFFECT_COLOR" value="165e70" />
  //     <option name="ERROR_STRIPE_COLOR" value="72d6d6" />
  //   </value>
  // </option>

  const TEXT_SEARCH_RESULT_ATTRIBUTES = attributesElement.ele('option', { name: 'TEXT_SEARCH_RESULT_ATTRIBUTES' }).ele('value')
  TEXT_SEARCH_RESULT_ATTRIBUTES.ele('option', { name: 'BACKGROUND', value: pick({ light: '#e6cc7766', dark: '#e6cc7744' }) })
  // TEXT_SEARCH_RESULT_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: foreground })

  return {
    editorTheme: theme.end({ pretty: true }),
    UITheme: {
      name,
      dark: style === 'dark',
      editorScheme,
      author: pkg.author,
      ui: {
        '*': {
          foreground,
          background,
          borderColor: border,
          disabledText: vitesse('comment'),
          disabledForeground: vitesse('comment'),
          disabledBackground: background,
          inactiveForeground: foreground,

          lightSelectionBackground: activeBackground,
          hoverBackground: activeBackground,

          selectionBackground: activeBackground,
          selectionForeground: foreground,
          selectionInactiveForeground: foreground,
          selectionInactiveBackground: activeBackground,

          focusColor: primer.green[0],

          infoForeground: vitesse('comment'),
        },
        'Button': {
          foreground,
          startBackground: background,
          endBackground: background,
          startBorderColor: border,
          endBorderColor: border,
          focusedBorderColor: border,
          default: {
            foreground: background,
            startBackground: primary,
            endBackground: primary,
            startBorderColor: border,
            endBorderColor: border,
            focusedBorderColor: border,
          },
        },
        'Link': {
          activeForeground: primary,
          hoverForeground: primary,
          pressedForeground: primary,
          visitedForeground: primary,
          secondaryForeground,
        },
        'Notification': {
          linkForeground: primary,
        },
        'GotItTooltip': {
          linkForeground: primary,
          Button: {
            foreground,
            startBackground: background,
            endBackground: background,
            startBorderColor: border,
            endBorderColor: border,
          },
        },
        'ToolTip': {
          background,
          borderColor: border,
          foreground,
          infoForeground: foreground,
          shortcutForeground: foreground,
        },
        'Tooltip.Learning': {
          background,
          borderColor: border,
          spanBackground: background,
          spanForeground: foreground,
          foreground,
          stepNumberForeground: foreground,
        },
        'CompletionPopup': {
          foreground,
          matchForeground: foreground,
          selectionBackground: activeBackground,
          Advertiser: {
            foreground,
            background,
          },
        },
        'ParameterInfo': {
          background,
          foreground,
          currentOverloadBackground: background,
          currentParameterForeground: foreground,
        },
        'SearchOption': {
          selectedBackground: background,
          selectedHoveredBackground: background,
          selectedPressedBackground: background,
        },
        'SpeedSearch': {
          background,
          foreground,
        },
        'ProgressBar': {
          progressColor: primary,
          indeterminateStartColor: pick({ light: primer.green[1], dark: primer.green[3] }),
          indeterminateEndColor: pick({ light: primer.green[3], dark: primer.green[5] }),
          // passedColor: 'Green5',
          // passedEndColor: 'Green8',
          // failedColor: 'Red5',
          // failedEndColor: 'Red8',
          trackColor: pick({ light: primer.green[2], dark: primer.green[4] }),
        },
        'Panel': {
          foreground,
          background,
        },
        'Tree': {
          background,
          foreground,
          selectionBackground: activeBackground,
          selectionForeground: foreground,
        },
        'MainMenu': {
          selectionForeground: foreground,
          selectionBackground: activeBackground,
        },
        'MenuItem': {
          background,
          foreground,
          selectionBackground,
        },

      },
    },
  }
}
