function createUniqueRandomGenerator(min: number, max: number): () => number | null {
    if (max < min) throw new Error("max 必须大于等于 min");

    const range: number[] = [];
    for (let i = min; i <= max; i++) {
        range.push(i);
    }

    // 洗牌（Fisher-Yates 算法）
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [range[i], range[j]] = [range[j], range[i]];
    }

    return (): number | null => {
        if (range.length === 0) {
            return null; // 所有数都被用完了
        }
        return range.pop()!;
    };
}

export default createUniqueRandomGenerator;