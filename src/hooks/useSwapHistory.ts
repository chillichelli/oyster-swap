import { useConnection, useConnectionConfig } from '../utils/connection';
import { cache } from '../utils/accounts';
import { useEffect, useState } from 'react';
import { getTokenName } from '../utils/utils';
import { WRAPPED_SOL_MINT } from '../utils/ids';

interface IPoolHistoryRow {
	title: string;
	signature: string;
	fromAmount: number;
	toAmount: number;
	toToken: string;
	fromToken: string;
	time: number | null;
}

const usePoolHistory = (pool?: any) => {
	const connection = useConnection();
	const { tokenMap } = useConnectionConfig();
	const poolMint = pool?.raw?.pubkeys?.mint;
	const [history, setHistory] = useState<IPoolHistoryRow[]>([]);

	useEffect(() => {
		(async () => {
			if (poolMint) {
				const mint = await cache.queryMint(connection, poolMint);
				if (mint.mintAuthority) {
					const transactions = await connection.getConfirmedSignaturesForAddress2(mint.mintAuthority, {
						limit: 10,
					});

					const swaps = await Promise.all(
						transactions.map(transaction => connection.getParsedConfirmedTransaction(transaction.signature))
					);

					let tmp = [];
					for (let i = 0; i < swaps.length; i++) {
						let swap = swaps[i];

						if (swap && !(swap.meta as any).err && (swap.meta as any).innerInstructions.length > 0) {
							const [from, to] = (swap.meta as any).innerInstructions[0].instructions;

							const fromAmount = (from as any).parsed.info.amount;
							const toAmount = (to as any).parsed.info.amount;

							let fromAccount;
							try {
								fromAccount = await cache.queryAccount(connection, (from as any).parsed.info.source);
							} catch (e) {
								fromAccount = { info: { mint: WRAPPED_SOL_MINT } };
							}

							const fromMint = await cache.queryMint(connection, fromAccount.info.mint);
							const fromToken = getTokenName(tokenMap, fromAccount.info.mint.toBase58());

							let toAccount;
							try {
								toAccount = await cache.queryAccount(connection, (to as any).parsed.info.destination);
							} catch (e) {
								toAccount = { info: { mint: WRAPPED_SOL_MINT } };
							}

							const toMint = await cache.queryMint(connection, toAccount.info.mint);
							const toToken = getTokenName(tokenMap, toAccount.info.mint.toBase58());

							const time = await connection.getBlockTime(swap.slot);

							tmp.push({
								title: `Swap ${fromToken} for ${toToken}`,
								signature: (swap.transaction as any).signatures[0],
								fromAmount: fromAmount / Math.pow(10, fromMint.decimals),
								toAmount: toAmount / Math.pow(10, toMint.decimals),
								fromToken,
								toToken,
								time,
							});
						}
					}

					setHistory(tmp);
				}
			}
		})();
	}, [poolMint, connection, tokenMap]);

	return history;
};

export default usePoolHistory;
