class MarkdownParser {

    clean(text) {

        return text
            .replace(/\r\n/g, "\n")
            .trim();

    }

}

export default new MarkdownParser();