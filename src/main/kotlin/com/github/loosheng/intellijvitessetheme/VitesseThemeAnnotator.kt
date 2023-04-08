package com.github.loosheng.intellijvitessetheme

import com.intellij.lang.annotation.AnnotationHolder
import com.intellij.lang.annotation.Annotator
import com.intellij.lang.annotation.HighlightSeverity
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.editor.DefaultLanguageHighlighterColors
import com.intellij.openapi.editor.colors.TextAttributesKey
import com.intellij.openapi.editor.markup.EffectType
import com.intellij.openapi.util.TextRange
import com.intellij.psi.PsiElement
import com.intellij.psi.impl.source.tree.LeafPsiElement
import com.intellij.ui.JBColor

class VitesseThemeAnnotator : Annotator {
    companion object {
        val attributes = TextAttributesKey.createTextAttributesKey("DEFAULT_MODULE_KEYWORDS", DefaultLanguageHighlighterColors.IDENTIFIER)
//        val logger = logger<VitesseThemeAnnotator>()
    }

    override fun annotate(element: PsiElement, holder: AnnotationHolder) {
        if (element is LeafPsiElement) {
            val text = element.elementType.toString()
            val keywordType = KeywordElementType.values().find { it.matches(text) }
            if (keywordType != null) {
                val range = TextRange(element.textRange.startOffset, element.textRange.endOffset)
                holder
                    .newSilentAnnotation(HighlightSeverity.INFORMATION)
                    .range(range)
                    .textAttributes(attributes)
                    .create()
            }
        }
    }
}
