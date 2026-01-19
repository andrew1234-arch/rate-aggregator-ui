export type Pool = {
    id: string;
    rate: number; // basis points, e.g. 10000 = 1.0x
    name: string;
};

// Mock pools
export const MOCK_POOLS: Pool[] = [
    { id: '0x1001', rate: 10000, name: 'SuiSwap (1.0x)' },
    { id: '0x1002', rate: 9500, name: 'Cetus (0.95x)' },
    { id: '0x1003', rate: 10500, name: 'Turbos (1.05x)' },
    { id: '0x1004', rate: 10200, name: 'Kriya (1.02x)' },
];

export async function getBestRate(amountIn: number): Promise<{ amountOut: number, poolId: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let bestRate = 0;
    let bestPoolId = '';

    for (const pool of MOCK_POOLS) {
        const amountOut = (amountIn * pool.rate) / 10000;
        if (amountOut > bestRate) {
            bestRate = amountOut;
            bestPoolId = pool.id;
        }
    }

    return { amountOut: Math.floor(bestRate), poolId: bestPoolId };
}
