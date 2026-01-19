'use client';

import { useState } from 'react';
import { getBestRate, MOCK_POOLS } from '@/lib/mockSui';

export default function Aggregator() {
    const [amountIn, setAmountIn] = useState<number>(0);
    const [bestRate, setBestRate] = useState<{ amountOut: number, poolId: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFindRate = async () => {
        setLoading(true);
        setBestRate(null);
        try {
            const result = await getBestRate(amountIn);
            setBestRate(result);
        } catch (error) {
            console.error('Failed to get best rate:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Rate Aggregator</h2>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount In (SUI)</label>
                <div className="relative">
                    <input
                        type="number"
                        value={amountIn}
                        onChange={(e) => setAmountIn(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900 pr-12"
                        placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 text-sm">SUI</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleFindRate}
                disabled={loading || amountIn <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50"
            >
                {loading ? 'Finding Best Rate...' : 'Find Best Rate'}
            </button>

            {bestRate && (
                <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200">
                    <p className="text-green-800 font-semibold">Best Output: {bestRate.amountOut} SUI</p>
                    <p className="text-sm text-green-600">via Pool ID: {bestRate.poolId}</p>
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Simulated Pools</h3>
                <div className="grid grid-cols-1 gap-2">
                    {MOCK_POOLS.map((pool) => (
                        <div
                            key={pool.id}
                            className={`p-3 rounded border ${bestRate?.poolId === pool.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-700">{pool.name}</span>
                                <span className="text-sm text-gray-500">Rate: {(pool.rate / 10000).toFixed(2)}x</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
