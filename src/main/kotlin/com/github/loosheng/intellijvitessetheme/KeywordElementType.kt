package com.github.loosheng.intellijvitessetheme

enum class KeywordElementType(private val keyword: String) {
    IMPORT("import"),
    EXPORT("export");

    fun matches(text: String): Boolean {
        return keyword == text
    }
}