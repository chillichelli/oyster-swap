import React, { FC } from 'react';
import { usePools } from '../utils/pools';
import { useEnrichedPools, useEnrichedTokens } from '../context/market';

interface Totals {
	liquidity: number;
	volume: number;
	fees: number;
}

export const EnrichedDataContext = React.createContext({
	enrichedPools: [] as any[],
	enrichedTokens: [] as any[],
	totals: {
		liquidity: 0,
		volume: 0,
		fees: 0,
	} as Totals,
});

const EnrichedDataProvider: FC = ({ children }) => {
	const { pools } = usePools();
	const enrichedPools = useEnrichedPools(pools);
	const enrichedTokens = useEnrichedTokens(pools);
	const totals = enrichedPools.reduce(
		(acc, item) => {
			acc.liquidity = acc.liquidity + item.liquidity;
			acc.volume = acc.volume + item.volume24h;
			acc.fees = acc.fees + item.fees24h;
			return acc;
		},
		{ liquidity: 0, volume: 0, fees: 0 } as Totals
	);

	return (
		<EnrichedDataContext.Provider value={{ enrichedTokens, enrichedPools, totals }}>
			{children}
		</EnrichedDataContext.Provider>
	);
};

export default EnrichedDataProvider;
