class MarkdownParser {

    clean(text) {

        if (!text) return "";

        return text
            .replace(/\r\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .replace(/[ \t]+\n/g, "\n")
            .trim();

    }

}

export default new MarkdownParser();