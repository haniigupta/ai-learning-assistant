import { generateEmbedding } from "./embeddingService.js";

export const cosineSimilarity = (
    vecA,
    vecB
) => {

    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {

        dot += vecA[i] * vecB[i];

        normA += vecA[i] * vecA[i];

        normB += vecB[i] * vecB[i];
    }

    return (
        dot /
        (
            Math.sqrt(normA) *
            Math.sqrt(normB)
        )
    );
};

export const findRelevantChunksByEmbedding =
    async (
        chunks,
        query,
        maxChunks = 5
    ) => {

        chunks = chunks.map(chunk =>
            chunk.toObject
                ? chunk.toObject()
                : chunk
        );

        const queryEmbedding =
            await generateEmbedding(query);

        if (!queryEmbedding.length) {
            return [];
        }
        console.log(
            "VECTOR INPUT:",
            chunks[0]
        );

        const scoredChunks =
            chunks
                .filter(
                    chunk =>
                        chunk.embedding &&
                        chunk.embedding.length
                )
                .map(chunk => {

                    const score =
                        cosineSimilarity(
                            queryEmbedding,
                            chunk.embedding
                        );

                    return {
                        content: chunk.content,
                        chunkIndex: chunk.chunkIndex,
                        pageNumber: chunk.pageNumber,
                        embedding: chunk.embedding,
                        score
                    };
                });


        return scoredChunks

        console.log(
  "TOP SCORES:",
  scoredChunks
    .sort((a,b)=>b.score-a.score)
    .slice(0,5)
    .map(c => ({
      chunk: c.chunkIndex,
      score: c.score
    }))
)
    .filter(chunk => chunk.score > 0.25)
    .sort((a,b)=>b.score-a.score)
    .slice(0,maxChunks);
    };