/**
 * Splits text into chunks for ai processing
 * @param {string} text - The text to split into chunks
 * @param {number} chunkSize - The maximum size of each chunk
 * @param {number} overlap - The number of characters to overlap between chunks
 * @returns{Array<{content: string, chunkIndex: number, pageNumber: number}>} - An array of text chunks with metadata
 */
export const chunkText = (text, chunkSize = 500, overlap = 50) => {
    if (!text || text.trim().length === 0) {
        return [];
    }
    const cleanedText = text
        .replace(/\r\n/g, '\n') // Normalize newlines
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .replace(/\n+/g, '\n') // Collapse multiple newlines
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .trim();

    //try to split into para (single or double line)
    const paragraphs = cleanedText.split(/\n+/).filter(p => p.trim().length > 0);
    const chunks = [];
    let currentChunk = [];
    let currentWordCount = 0;
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {
        const paragraphWords = paragraph.trim().split(/\s+/);
        const paragraphWordCount = paragraphWords.length;

        // if single para exceeds chunk size , split it by words
        if (paragraphWordCount > chunkSize) {
            if (currentChunk.length > 0) {
                chunks.push({
                    content: currentChunk.join('\n\n '),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0 // page number is not available at this stage
                });
                currentChunk = [];
                currentWordCount = 0;
            }

            // Split the paragraph into smaller chunks

            for (let i = 0; i < paragraphWords.length; i += chunkSize - overlap) {
                const chunkWords = paragraphWords.slice(i, i + chunkSize);
                chunks.push({
                    content: chunkWords.join(' '),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0 // page number is not available at this stage
                });
                if (i + chunkSize - overlap >= paragraphWords.length) {
                    break;
                }

            }
            continue;
        }
    }

    // if adding the current paragraph exceeds the chunk size, start a new chunk
    if (currentWordCount + paragraphWordCount > chunkSize && currentChunk.length > 0) {
        chunks.push({
            content: currentChunk.join('\n\n '),
            chunkIndex: chunkIndex++,
            pageNumber: 0 // page number is not available at this stage
        });
        //create overlap from previous chunk
        const prevChunkText = currentChunk.join(' ');
        const prevWords = prevChunkText.trim().split(/\s+/);
        const overlapText = prevWords.slice(-Math.min(overlap, prevWords.length)).join(' ');

        currentChunk = [overlapText, paragraph.trim()];
        currentWordCount = overlapText.split(/\s+/).length + paragraphWordCount;
    } else {
        // add para to current chunk
        currentChunk.push(paragraph.trim());
        currentWordCount += paragraphWordCount;
    }

// add any remaining text as a final chunk
if (currentChunk.length > 0) {
    chunks.push({
        content: currentChunk.join('\n\n '),
        chunkIndex: chunkIndex++,
        pageNumber: 0 // page number is not available at this stage
    });
}
// Fallback: if no chunk created, split by words
if (chunks.length === 0 && cleanedText.length > 0) {
    const words = cleanedText.split(/\s+/);
    for (let i = 0; i < words.length; i += chunkSize - overlap) {
        const chunkWords = words.slice(i, i + chunkSize);
        chunks.push({
            content: chunkWords.join(' '),
            chunkIndex: chunkIndex++,
            pageNumber: 0 // page number is not available at this stage
        });
    }
}

return chunks;
}; 

/**
 * Find relevant chunks based on keyword matching
 * @param{Array<Object>} chunks - The array of text chunks with metadata
 * @param{string} query - The search query to match against the chunks
 * @param{number} maxChunks - The number of top relevant chunks to return
 * @return {Array<Object>} - An array of the most relevant chunks based on keyword matching
 */
export const findRelevantChunks = (chunks, query, maxChunks = 3) => {
    if(!chunks || chunks.length === 0 || !query){
        return [];
    }
    // Common stop words
    const stopWords = new Set(['the', 'is', 'in', 'and', 'to', 'of', 'a', 'that', 'it', 'with', 'as', 'for', 'was', 'on', 'are', 'by', 'this', 'be', 'or', 'from']);
    // Normalize query and remove stop words
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => !stopWords.has(word));

    if(queryWords.length === 0){
        // return clean chunk object without mongoose metadta
        return chunks.slice(0, maxChunks).map(chunk => ({
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageNumber: chunk.pageNumber,
            _id: chunk._id
        }));
    }
    // Score chunks based on keyword matches
    const scoredChunks = chunks.map((chunk, index) => {
        const content = chunk.content.toLowerCase();
        const contentWords = content.split(/\s+/).length;
        let score = 0;

        // score each query words
        for (const word of queryWords) {
            //exact word match -- higher score
            const exactMatches = (content.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length;
            score += exactMatches *3; // weight for exact matches

            // partial match (substring) -- lower score
            const partialMatches = (content.match(new RegExp(word, 'g')) || []).length;
            score += Math.max(0, partialMatches - exactMatches) * 1.5; // weight for partial matches
        }
        // Bonus: multiple query word found
        const uniqueWordsFound = queryWords.filter(word =>
            content.includes(word)
        ).length;
        if(uniqueWordsFound > 1){
            score += uniqueWordsFound * 2; // weight for multiple query words found
        }

        // normalize by content length
        const normalizedScore = score/Math.sqrt(contentWords); // normalize by content length to avoid bias towards longer chunks

        // small bonus for earlier chunks
        const positionBonus = 1- (index / chunks.length); // earlier chunks get a higher bonus

        // return clean chunk object without mongoose metadata
        return {
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageNumber: chunk.pageNumber,
            _id: chunk._id,
            score: normalizedScore + positionBonus,
            rawScore: score,
            matchedWords: uniqueWordsFound
        }       

        });
        return scoredChunks
        .filter(chunk => chunk.score > 0) // filter out chunks with no matches
        .sort((a, b) => {
            if(b.score === a.score){
                return b.rawScore - a.rawScore; // if scores are equal, sort by raw score
            }
            if(b.matchedWords !== a.matchedWords){
                return b.matchedWords - a.matchedWords; // if matched words are equal, sort by matched words
            }
            return a.chunkIndex - b.chunkIndex; // otherwise, maintain original order
        })
        .slice(0, maxChunks); // return top relevant chunks
    };

export default {
    chunkText,
    findRelevantChunks
}

