/**
 * Splits text into chunks for AI processing
 * @param {string} text - The text to split into chunks
 * @param {number} chunkSize - Maximum words per chunk
 * @param {number} overlap - Overlap words between chunks
 * @returns {Array<{content: string, chunkIndex: number, pageNumber: number}>}
 */

export const chunkText = (
    text,
    chunkSize = 500,
    overlap = 50
) => {

    if (!text || text.trim().length === 0) {
        return [];
    }

    // Clean text
    const cleanedText = text
        .replace(/\r\n/g, '\n')
        .replace(/\s+/g, ' ')
        .trim();

    // Split into paragraphs
    const paragraphs = cleanedText
        .split(/\n+/)
        .filter(p => p.trim().length > 0);

    const chunks = [];

    let currentChunk = [];
    let currentWordCount = 0;
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {

        const paragraphWords = paragraph
            .trim()
            .split(/\s+/);

        const paragraphWordCount =
            paragraphWords.length;

        // If paragraph itself exceeds chunk size
        if (paragraphWordCount > chunkSize) {

            // Save current chunk first
            if (currentChunk.length > 0) {

                chunks.push({
                    content: currentChunk.join(' '),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0
                });

                currentChunk = [];
                currentWordCount = 0;
            }

            // Split large paragraph
            for (
                let i = 0;
                i < paragraphWords.length;
                i += (chunkSize - overlap)
            ) {

                const chunkWords = paragraphWords.slice(
                    i,
                    i + chunkSize
                );

                chunks.push({
                    content: chunkWords.join(' '),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0
                });
            }

            continue;
        }

        // Start new chunk if limit exceeded
        if (
            currentWordCount + paragraphWordCount > chunkSize &&
            currentChunk.length > 0
        ) {

            chunks.push({
                content: currentChunk.join(' '),
                chunkIndex: chunkIndex++,
                pageNumber: 0
            });

            // Create overlap
            const previousWords =
                currentChunk
                    .join(' ')
                    .split(/\s+/);

            const overlapText = previousWords
                .slice(
                    -Math.min(overlap, previousWords.length)
                )
                .join(' ');

            currentChunk = [
                overlapText,
                paragraph.trim()
            ];

            currentWordCount =
                overlapText.split(/\s+/).length +
                paragraphWordCount;

        } else {

            currentChunk.push(paragraph.trim());

            currentWordCount += paragraphWordCount;
        }
    }

    // Push remaining chunk
    if (currentChunk.length > 0) {

        chunks.push({
            content: currentChunk.join(' '),
            chunkIndex: chunkIndex++,
            pageNumber: 0
        });
    }

    // Fallback
    if (chunks.length === 0 && cleanedText.length > 0) {

        const words = cleanedText.split(/\s+/);

        for (
            let i = 0;
            i < words.length;
            i += (chunkSize - overlap)
        ) {

            const chunkWords = words.slice(
                i,
                i + chunkSize
            );

            chunks.push({
                content: chunkWords.join(' '),
                chunkIndex: chunkIndex++,
                pageNumber: 0
            });
        }
    }

    return chunks;
};

/**
 * Find relevant chunks using keyword matching
 * @param {Array<Object>} chunks
 * @param {string} query
 * @param {number} maxChunks
 * @returns {Array<Object>}
 */

export const findRelevantChunks = (
    chunks,
    query,
    maxChunks = 3
) => {

    if (!chunks || chunks.length === 0 || !query) {
        return [];
    }

    const stopWords = new Set([
        'the',
        'is',
        'in',
        'and',
        'to',
        'of',
        'a',
        'that',
        'it',
        'with',
        'as',
        'for',
        'was',
        'on',
        'are',
        'by',
        'this',
        'be',
        'or',
        'from'
    ]);

    const queryWords = query
        .toLowerCase()
        .split(/\s+/)
        .filter(word => !stopWords.has(word));

    if (queryWords.length === 0) {

        return chunks
            .slice(0, maxChunks)
            .map(chunk => ({
                content: chunk.content,
                chunkIndex: chunk.chunkIndex,
                pageNumber: chunk.pageNumber,
                _id: chunk._id
            }));
    }

    const scoredChunks = chunks.map((chunk, index) => {

        const content =
            chunk.content.toLowerCase();

        const contentWords =
            content.split(/\s+/).length;

        let score = 0;

        for (const word of queryWords) {

            const exactMatches =
                (
                    content.match(
                        new RegExp(`\\b${word}\\b`, 'g')
                    ) || []
                ).length;

            score += exactMatches * 3;

            const partialMatches =
                (
                    content.match(
                        new RegExp(word, 'g')
                    ) || []
                ).length;

            score +=
                Math.max(
                    0,
                    partialMatches - exactMatches
                ) * 1.5;
        }

        const uniqueWordsFound =
            queryWords.filter(word =>
                content.includes(word)
            ).length;

        if (uniqueWordsFound > 1) {
            score += uniqueWordsFound * 2;
        }

        const normalizedScore =
            score / Math.sqrt(contentWords);

        const positionBonus =
            1 - (index / chunks.length);

        return {
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageNumber: chunk.pageNumber,
            _id: chunk._id,
            score: normalizedScore + positionBonus,
            rawScore: score,
            matchedWords: uniqueWordsFound
        };
    });

    return scoredChunks
        .filter(chunk => chunk.score > 0)
        .sort((a, b) => {

            if (b.score === a.score) {
                return b.rawScore - a.rawScore;
            }

            if (b.matchedWords !== a.matchedWords) {
                return (
                    b.matchedWords -
                    a.matchedWords
                );
            }

            return a.chunkIndex - b.chunkIndex;
        })
        .slice(0, maxChunks);
};

export default {
    chunkText,
    findRelevantChunks
};