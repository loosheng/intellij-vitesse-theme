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
    ? '#000000'
    : soft
      ? vitesse('lowBackground')
      : vitesse('background')
  const activeBackground = black
    ? '#eeeeee15'
    : soft
      ? vitesse('lowActiveBackground')
      : vitesse('activeBackground')

  const selectionBackgroundInActive = pick({ light: '#22222208', dark: '#eeeeee08' })
  const selectionBackgroundActive = pick({ light: '#22222215', dark: '#eeeeee15' })
  const selectionBackground = pick({ light: '#22222215', dark: '#eeeeee15' })
  const selectionBackground2 = pick({ light: '#22222220', dark: '#eeeeee20' })

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
  colorsElement.ele('option', { name: 'SELECTION_BACKGROUND', value: selectionBackground2 })
  // SELECTION_FOREGROUND 选中区域前景色
  colorsElement.ele('option', { name: 'SELECTION_FOREGROUND' })

  colorsElement.ele('option', { name: 'ANNOTATIONS_COLOR', value: vitesse('comment') })
  colorsElement.ele('option', { name: 'ANNOTATIONS_LAST_COMMIT_COLOR', value: vitesse('comment') })
  colorsElement.ele('option', { name: 'CARET_COLOR', value: pick({ light: '#000000', dark: '#aeafad' }) })
  colorsElement.ele('option', { name: 'CARET_ROW_COLOR', value: activeBackground })
  colorsElement.ele('option', { name: 'CONSOLE_BACKGROUND_KEY', value: background })
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

  //   <option name="DEFAULT_METADATA">
  //   <value>
  //     <option name="FOREGROUND" value="1633a5" />
  //   </value>
  // </option>
  const DEFAULT_METADATA = attributesElement.ele('option', { name: 'DEFAULT_METADATA' }).ele('value')
  DEFAULT_METADATA.ele('option', { name: 'FOREGROUND', value: vitesse('decorator') })

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
  //   <option name="DEFAULT_COMMA">
  //   <value>
  //     <option name="FOREGROUND" value="c42c2c" />
  //   </value>
  // </option>
  const DEFAULT_COMMA = attributesElement.ele('option', { name: 'DEFAULT_COMMA' }).ele('value')
  DEFAULT_COMMA.ele('option', { name: 'FOREGROUND', value: vitesse('punctuation') })

  //   <option name="DEFAULT_SEMICOLON">
  //   <value>
  //     <option name="FOREGROUND" value="c42c2c" />
  //   </value>
  // </option>
  const DEFAULT_SEMICOLON = attributesElement.ele('option', { name: 'DEFAULT_SEMICOLON' }).ele('value')
  DEFAULT_SEMICOLON.ele('option', { name: 'FOREGROUND', value: vitesse('punctuation') })

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

  //   <option name="DEFAULT_DOC_COMMENT_TAG_VALUE">
  //   <value>
  //     <option name="FOREGROUND" value="7a5428" />
  //   </value>
  // </option>
  const DEFAULT_DOC_COMMENT_TAG_VALUE = attributesElement.ele('option', { name: 'DEFAULT_DOC_COMMENT_TAG_VALUE' }).ele('value')
  DEFAULT_DOC_COMMENT_TAG_VALUE.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })

  //   <option name="DEFAULT_TAG">
  //   <value>
  //     <option name="BACKGROUND" value="ff0000" />
  //   </value>
  // </option>
  const DEFAULT_TAG = attributesElement.ele('option', { name: 'DEFAULT_TAG' }).ele('value')
  DEFAULT_TAG.ele('option', { name: 'BACKGROUND', value: background })
  DEFAULT_TAG.ele('option', { name: 'FOREGROUND', value: primary })

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
  attributesElement.ele('option', { name: 'DEFAULT_FUNCTION_CALL' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('function') })
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

  attributesElement.ele('option', { name: 'DEFAULT_IDENTIFIER' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('property') })

  //       <option name="DEFAULT_GLOBAL_VARIABLE">
  //         <value>
  //           <option name="FOREGROUND" value="e80303" />
  //         </value>
  //       </option>
  attributesElement.ele('option', { name: 'DEFAULT_GLOBAL_VARIABLE' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('variable') })
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

  attributesElement.ele('option', { name: 'DEFAULT_INSTANCE_FIELD' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('property') })
  //   <option name="DEFAULT_INTERFACE_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="6440ba" />
  //   </value>
  // </option>
  const DEFAULT_INTERFACE_NAME = attributesElement.ele('option', { name: 'DEFAULT_INTERFACE_NAME' }).ele('value')
  DEFAULT_INTERFACE_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('interface') })

  //   <option name="DEFAULT_STATIC_FIELD">
  //   <value>
  //     <option name="FOREGROUND" value="8231af" />
  //     <option name="FONT_TYPE" value="2" />
  //   </value>
  // </option>
  attributesElement.ele('option', { name: 'DEFAULT_STATIC_FIELD' }).ele('value').ele('option', { name: 'FOREGROUND', value: vitesse('property') })
  // <option name="DEFAULT_STATIC_METHOD" baseAttributes="DEFAULT_FUNCTION_DECLARATION" />
  attributesElement.ele('option', { name: 'DEFAULT_STATIC_METHOD', baseAttributes: 'DEFAULT_FUNCTION_DECLARATION' })
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

  //   <option name="DEFAULT_INVALID_STRING_ESCAPE">
  //   <value>
  //     <option name="FOREGROUND" value="6a8759" />
  //     <option name="EFFECT_COLOR" value="aa3434" />
  //     <option name="EFFECT_TYPE" value="2" />
  //   </value>
  // </option>
  // <option name="DEFAULT_REASSIGNED_LOCAL_VARIABLE" baseAttributes="DEFAULT_LOCAL_VARIABLE" />
  // <option name="DEFAULT_REASSIGNED_PARAMETER" baseAttributes="DEFAULT_PARAMETER" />
  const DEFAULT_INVALID_STRING_ESCAPE = attributesElement.ele('option', { name: 'DEFAULT_INVALID_STRING_ESCAPE' }).ele('value')
  DEFAULT_INVALID_STRING_ESCAPE.ele('option', { name: 'FOREGROUND', value: vitesse('comment') })
  DEFAULT_INVALID_STRING_ESCAPE.element('option', { name: 'EFFECT_COLOR', value: vitesse('red') })
  DEFAULT_INVALID_STRING_ESCAPE.element('option', { name: 'EFFECT_TYPE', value: '2' })

  const DEFAULT_LOCAL_VARIABLE = attributesElement.ele('option', { name: 'DEFAULT_LOCAL_VARIABLE' }).ele('value')
  DEFAULT_LOCAL_VARIABLE.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })
  const DEFAULT_PARAMETER = attributesElement.ele('option', { name: 'DEFAULT_PARAMETER' }).ele('value')
  DEFAULT_PARAMETER.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })

  attributesElement.ele('option', { name: 'DEFAULT_REASSIGNED_LOCAL_VARIABLE', baseAttributes: 'DEFAULT_LOCAL_VARIABLE' })
  attributesElement.ele('option', { name: 'DEFAULT_REASSIGNED_PARAMETER', baseAttributes: 'DEFAULT_PARAMETER' })

  //   <option name="BAD_CHARACTER">
  //   <value>
  //     <option name="EFFECT_COLOR" value="af3c3c" />
  //     <option name="EFFECT_TYPE" value="2" />
  //   </value>
  // </option>
  const BAD_CHARACTER = attributesElement.ele('option', { name: 'BAD_CHARACTER' }).ele('value')
  BAD_CHARACTER.ele('option', { name: 'EFFECT_COLOR', value: vitesse('red') })
  BAD_CHARACTER.ele('option', { name: 'EFFECT_TYPE', value: '2' })

  //   <option name="DEFAULT_OPERATION_SIGN">
  //   <value>
  //     <option name="FOREGROUND" value="c42c2c" />
  //   </value>
  // </option>
  const DEFAULT_OPERATION_SIGN = attributesElement.ele('option', { name: 'DEFAULT_OPERATION_SIGN' }).ele('value')
  DEFAULT_OPERATION_SIGN.ele('option', { name: 'FOREGROUND', value: vitesse('operator') })

  // <option name="HTML_ATTRIBUTE_NAME" baseAttributes="DEFAULT_ATTRIBUTE" />
  attributesElement.ele('option', { name: 'HTML_ATTRIBUTE_NAME', baseAttributes: 'DEFAULT_ATTRIBUTE' })
  // <option name="HTML_ATTRIBUTE_VALUE" baseAttributes="DEFAULT_STRING" />
  attributesElement.ele('option', { name: 'HTML_ATTRIBUTE_VALUE', baseAttributes: 'DEFAULT_STRING' })
  // <option name="HTML_TAG">
  //   <value>
  //     <option name="FOREGROUND" value="959da5" />
  //     <option name="BACKGROUND" value="222222" />
  //   </value>
  // </option>
  const HTML_TAG = attributesElement.ele('option', { name: 'HTML_TAG' }).ele('value')
  HTML_TAG.ele('option', { name: 'FOREGROUND', value: primer.gray[5] })
  HTML_TAG.ele('option', { name: 'BACKGROUND', value: background })
  // <option name="HTML_TAG_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="4d9375" />
  //   </value>
  // </option>
  //   <option name="HTML_CUSTOM_TAG_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="4530d7" />
  //   </value>
  // </option>
  const HTML_TAG_NAME = attributesElement.ele('option', { name: 'HTML_TAG_NAME' }).ele('value')
  HTML_TAG_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('keyword') })
  const HTML_CUSTOM_TAG_NAME = attributesElement.ele('option', { name: 'HTML_CUSTOM_TAG_NAME' }).ele('value')
  HTML_CUSTOM_TAG_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })

  // <option name="XML_ATTRIBUTE_NAME" baseAttributes="DEFAULT_ATTRIBUTE" />
  attributesElement.ele('option', { name: 'XML_ATTRIBUTE_NAME', baseAttributes: 'DEFAULT_ATTRIBUTE' })
  // <option name="XML_ATTRIBUTE_VALUE" baseAttributes="DEFAULT_STRING" />
  attributesElement.ele('option', { name: 'XML_ATTRIBUTE_VALUE', baseAttributes: 'DEFAULT_STRING' })
  // <option name="XML_TAG">
  //   <value>
  //     <option name="FOREGROUND" value="959da5" />
  //     <option name="BACKGROUND" value="222222" />
  //   </value>
  // </option>
  const XML_TAG = attributesElement.ele('option', { name: 'XML_TAG' }).ele('value')
  XML_TAG.ele('option', { name: 'FOREGROUND', value: primer.gray[5] })
  XML_TAG.ele('option', { name: 'BACKGROUND', value: background })
  // <option name="XML_TAG_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="4d9375" />
  //   </value>
  // </option>
  const XML_TAG_NAME = attributesElement.ele('option', { name: 'XML_TAG_NAME' }).ele('value')
  XML_TAG_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('keyword') })

  // <option name="JS.GLOBAL_FUNCTION" baseAttributes="DEFAULT_FUNCTION_DECLARATION" />
  // <option name="JS.GLOBAL_VARIABLE" baseAttributes="DEFAULT_GLOBAL_VARIABLE" />
  // <option name="JS.LOCAL_VARIABLE" baseAttributes="DEFAULT_LOCAL_VARIABLE" />
  attributesElement.ele('option', { name: 'JS.GLOBAL_FUNCTION', baseAttributes: 'DEFAULT_FUNCTION_DECLARATION' })
  attributesElement.ele('option', { name: 'JS.GLOBAL_VARIABLE', baseAttributes: 'DEFAULT_GLOBAL_VARIABLE' })
  attributesElement.ele('option', { name: 'JS.LOCAL_VARIABLE', baseAttributes: 'DEFAULT_LOCAL_VARIABLE' })

  //   <option name="JS.MODULE_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="d7c63e" />
  //   </value>
  // </option>
  // <option name="JS.PRIMITIVE.TYPE">
  //   <value>
  //     <option name="FOREGROUND" value="d7c63e" />
  //   </value>
  // </option>
  // <option name="JS.TYPE_ALIAS">
  //   <value>
  //     <option name="FOREGROUND" value="d7c63e" />
  //   </value>
  // </option>
  // <option name="JS.INSTANCE_MEMBER_FUNCTION" baseAttributes="DEFAULT_INSTANCE_METHOD" />

  const JS_MODULE_NAME = attributesElement.ele('option', { name: 'JS.MODULE_NAME' }).ele('value')
  JS_MODULE_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('namespace') })
  const JS_PRIMITIVE_TYPE = attributesElement.ele('option', { name: 'JS.PRIMITIVE.TYPE' }).ele('value')
  JS_PRIMITIVE_TYPE.ele('option', { name: 'FOREGROUND', value: vitesse('type') })
  const JS_TYPE_ALIAS = attributesElement.ele('option', { name: 'JS.TYPE_ALIAS' }).ele('value')
  JS_TYPE_ALIAS.ele('option', { name: 'FOREGROUND', value: vitesse('type') })
  attributesElement.ele('option', { name: 'JS.INSTANCE_MEMBER_FUNCTION', baseAttributes: 'DEFAULT_INSTANCE_METHOD' })

  //   <option name="JS.DOC_TYPE">
  //   <value>
  //     <option name="FOREGROUND" value="cb9557" />
  //   </value>
  // </option>
  const JS_DOC_TYPE = attributesElement.ele('option', { name: 'JS.DOC_TYPE' }).ele('value')
  JS_DOC_TYPE.ele('option', { name: 'FOREGROUND', value: vitesse('type') })

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
  // <value>
  //       <option name="FOREGROUND" value="c26d30" />
  //       <option name="EFFECT_COLOR" value="c26d30" />
  //       <option name="EFFECT_TYPE" value="1" />
  //     </value>
  // </option>
  const CSS_URL = attributesElement.ele('option', { name: 'CSS.URL' }).ele('value')
  CSS_URL.ele('option', { name: 'FOREGROUND', value: vitesse('orange') })
  CSS_URL.ele('option', { name: 'EFFECT_COLOR', value: vitesse('orange') })
  CSS_URL.ele('option', { name: 'EFFECT_TYPE', value: '1' })

  //   <option name="JS.BRACES">
  //   <value>
  //     <option name="FOREGROUND" value="d21e1e" />
  //   </value>
  // </option>
  // <option name="JS.BRACKETS">
  //   <value>
  //     <option name="FOREGROUND" value="d21e1e" />
  //   </value>
  // </option>
  // <option name="JS.PARENTHS">
  //   <value>
  //     <option name="FOREGROUND" value="d21e1e" />
  //   </value>
  // </option>
  //   <option name="JS.KEYWORD">
  //   <value>
  //     <option name="FOREGROUND" value="cb7676" />
  //   </value>
  // </option>
  // <option name="JS.PARAMETER">
  //     <value>
  //       <option name="EFFECT_COLOR" value="984949" />
  //       <option name="EFFECT_TYPE" value="1" />
  //     </value>
  //   </option>
  const JS_BRACES = attributesElement.ele('option', { name: 'JS.BRACES' }).ele('value')
  JS_BRACES.ele('option', { name: 'FOREGROUND', value: primary })
  const JS_BRACKETS = attributesElement.ele('option', { name: 'JS.BRACKETS' }).ele('value')
  JS_BRACKETS.ele('option', { name: 'FOREGROUND', value: primary })
  const JS_PARENTHS = attributesElement.ele('option', { name: 'JS.PARENTHS' }).ele('value')
  JS_PARENTHS.ele('option', { name: 'FOREGROUND', value: primary })
  const JS_KEYWORD = attributesElement.ele('option', { name: 'JS.KEYWORD' }).ele('value')
  JS_KEYWORD.ele('option', { name: 'FOREGROUND', value: vitesse('keyword') })
  const JS_PARAMETER = attributesElement.ele('option', { name: 'JS.PARAMETER' }).ele('value')
  JS_PARAMETER.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })

  //   <option name="CSS.ATTRIBUTE_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  // <option name="CSS.CLASS_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  // <option name="CSS.FUNCTION">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  //   <option name="CSS.PROPERTY_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //     <option name="FONT_TYPE" value="1" />
  //   </value>
  // </option>
  // <option name="CSS.PSEUDO">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  const CSS_ATTRIBUTE_NAME = attributesElement.ele('option', { name: 'CSS.ATTRIBUTE_NAME' }).ele('value')
  CSS_ATTRIBUTE_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })
  const CSS_CLASS_NAME = attributesElement.ele('option', { name: 'CSS.CLASS_NAME' }).ele('value')
  CSS_CLASS_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })
  const CSS_FUNCTION = attributesElement.ele('option', { name: 'CSS.FUNCTION' }).ele('value')
  CSS_FUNCTION.ele('option', { name: 'FOREGROUND', value: vitesse('function') })
  const CSS_PROPERTY_NAME = attributesElement.ele('option', { name: 'CSS.PROPERTY_NAME' }).ele('value')
  CSS_PROPERTY_NAME.ele('option', { name: 'FOREGROUND', value: vitesse('property') })
  const CSS_PSEUDO = attributesElement.ele('option', { name: 'CSS.PSEUDO' }).ele('value')
  CSS_PSEUDO.ele('option', { name: 'FOREGROUND', value: vitesse('variable') })

  //   <option name="CSS.BRACES">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>
  // </option>
  // <option name="CSS.BRACKETS">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>
  // </option>
  // </option>
  //   <option name="CSS.PARENTHESES">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>
  // </option>
  // <option name="CSS.COLON">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>

  const CSS_BRACES = attributesElement.ele('option', { name: 'CSS.BRACES' }).ele('value')
  CSS_BRACES.ele('option', { name: 'FOREGROUND', value: vitesse('blue') })
  const CSS_BRACKETS = attributesElement.ele('option', { name: 'CSS.BRACKETS' }).ele('value')
  CSS_BRACKETS.ele('option', { name: 'FOREGROUND', value: vitesse('blue') })
  const CSS_PARENTHS = attributesElement.ele('option', { name: 'CSS.PARENTHESES' }).ele('value')
  CSS_PARENTHS.ele('option', { name: 'FOREGROUND', value: vitesse('blue') })
  const CSS_COLON = attributesElement.ele('option', { name: 'CSS.COLON' }).ele('value')
  CSS_COLON.ele('option', { name: 'FOREGROUND', value: vitesse('punctuation') })

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

          focusColor: vitesse('primary', '80'),

          infoForeground: vitesse('comment'),

          primaryText: primary,
        },
        'Component': {
          borderColor: pick({ light: primer.gray[3], dark: primer.gray[1] }),
        },
        'Button': {
          foreground,
          startBackground: activeBackground,
          endBackground: activeBackground,
          startBorderColor: activeBackground,
          endBorderColor: activeBackground,
          focusedBorderColor: border,
          default: {
            foreground: background,
            startBackground: primary,
            endBackground: primary,
            startBorderColor: primary,
            endBorderColor: primary,
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
        // 'SearchOption': {
        //   selectedBackground: selectionBackground,
        //   selectedHoveredBackground: selectionBackgroundActive,
        //   selectedPressedBackground: selectionBackgroundInActive,
        // },
        'SpeedSearch': {
          background,
          foreground,
          borderColor: border,
        },
        'SearchMatch': {
          startBackground: pick({ light: '#e6cc7766', dark: '#e6cc7744' }),
          endBackground: pick({ light: '#e6cc7766', dark: '#e6cc7744' }),
        },
        'SearchEverywhere': {
          Tab: {
            selectedBackground: activeBackground,
            selectedForeground: foreground,
          },
        },
        'ProgressBar': {
          progressColor: primary,
          indeterminateStartColor: vitesse('primary', '80'),
          indeterminateEndColor: vitesse('primary', '40'),
          // passedColor: 'Green5',
          // passedEndColor: 'Green8',
          // failedColor: 'Red5',
          // failedEndColor: 'Red8',
          trackColor: selectionBackground,
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
        // 'MainMenu': {
        //   selectionForeground: foreground,
        //   selectionBackground: activeBackground,
        // },
        'Menu': {
          separatorColor: border,
        },
        'MenuItem': {
          background,
          foreground,
          selectionBackground,
          selectionForeground: foreground,
        },
        'CheckBox': {
          background,
        },
        'CheckBoxMenuItem': {
          background,
          foreground,
          selectionBackground: activeBackground,
          selectionForeground: foreground,
        },
        'ColorChooser': {
          foreground,
          background,
        },
        'ComboBox': {
          foreground,
          background,
          selectionForeground: foreground,
          selectionBackground: activeBackground,
          nonEditableBackground: background,
          modifiedItemForeground: primary,
          ArrowButton: {
            background,
            iconColor: foreground,
            nonEditableBackground: background,
          },
        },
        'icons': {
          ColorPalette: {
            'Actions.Grey': pick({ light: primer.gray[3], dark: primer.gray[1] }),
            'Actions.Red': vitesse('red'),
            'Actions.Yellow': vitesse('yellow'),
            'Actions.Green': vitesse('green'),
            'Actions.Blue': vitesse('blue'),
            // 'Actions.GreyInline.Dark': '#9f99bfb3',

            // 'Objects.Grey': '#9790ad',
            // 'Objects.RedStatus': '#dd3962',
            // 'Objects.Red': '#c63a5d',
            // 'Objects.Pink': '#f98b9e',
            // 'Objects.Yellow': '#caba2d',
            // 'Objects.Green': '#239e62',
            // 'Objects.Blue': '#598bff',
            // 'Objects.Purple': '#af71e0',
            // 'Objects.BlackText': '#000000ff',
            // 'Objects.YellowDark': '#988c26',
            // 'Objects.GreenAndroid': '#78c257',

            [`Checkbox.Background.Default${style === 'dark' ? '.Dark' : ''}`]: background,
            [`Checkbox.Border.Default${style === 'dark' ? '.Dark' : ''}`]: pick({ light: primer.gray[3], dark: primer.gray[1] }),
            [`Checkbox.Foreground.Selected${style === 'dark' ? '.Dark' : ''}`]: foreground,
            [`Checkbox.Focus.Wide${style === 'dark' ? '.Dark' : ''}`]: vitesse('primary', '80'),
            [`Checkbox.Focus.Thin.Default${style === 'dark' ? '.Dark' : ''}`]: primary,
            [`Checkbox.Focus.Thin.Selected${style === 'dark' ? '.Dark' : ''}`]: primary,
            [`Checkbox.Background.Disabled${style === 'dark' ? '.Dark' : ''}`]: vitesse('comment'),
            [`Checkbox.Border.Disabled${style === 'dark' ? '.Dark' : ''}`]: pick({ light: primer.gray[3], dark: primer.gray[1] }),
            [`Checkbox.Foreground.Disabled${style === 'dark' ? '.Dark' : ''}`]: foreground,
            // "Checkbox.Border.Default": "Grey8",
            // "Checkbox.Background.Selected": "Blue4",
            // "Checkbox.Border.Selected": "Blue4",
            // "Checkbox.Focus.Thin.Default": "Grey14",
            // "Checkbox.Focus.Thin.Selected": "Grey14",
            // "Checkbox.Focus.Wide": "Blue4",
            // "Checkbox.Foreground.Disabled": "Grey8",
            // "Checkbox.Border.Disabled": "Grey11",
            // "Checkbox.Background.Disabled": "Grey13"
          },
        },

      },
    },
  }
}
