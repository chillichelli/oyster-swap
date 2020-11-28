import React, { useContext, useEffect, useMemo, useState } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { notify } from './notifications';
import { useConnectionConfig } from './connection';
import { useLocalStorageState } from './utils';
import { SolongAdapter } from './solong_adapter';
import { Button } from '@material-ui/core';
import { t, Trans } from '@lingui/macro';

export const WALLET_PROVIDERS = [
	{ name: 'sollet.io', url: 'https://www.sollet.io' },
	{ name: 'solongwallet.com', url: 'http://solongwallet.com' },
	{ name: 'solflare.com', url: 'https://solflare.com/access-wallet' },
	{ name: 'mathwallet.org', url: 'https://www.mathwallet.org' },
];

const WalletContext = React.createContext<any>(null);

export function WalletProvider({ children = null as any }) {
	const { endpoint } = useConnectionConfig();
	const [providerUrl, setProviderUrl] = useLocalStorageState('walletProvider', 'https://www.sollet.io');
	const wallet = useMemo(() => {
		console.log('use new provider:', providerUrl, ' endpoint:', endpoint);
		if (providerUrl === 'http://solongwallet.com') {
			return new SolongAdapter(providerUrl, endpoint);
		} else {
			return new Wallet(providerUrl, endpoint);
		}
	}, [providerUrl, endpoint]);

	const [connected, setConnected] = useState(false);
	useEffect(() => {
		console.log('trying to connect');
		wallet.on('connect', () => {
			console.log('connected');
			setConnected(true);
			let walletPublicKey = wallet.publicKey.toBase58();

			notify({
				message: t`Wallet update`,
				action: () => (
					<Button size="small" component="a" href={`https://explorer.solana.com/address/${walletPublicKey}`}>
						<Trans>explorer</Trans>
						<sup>↗</sup>
					</Button>
				),
			});
		});
		wallet.on('disconnect', () => {
			setConnected(false);
			notify({
				message: t`Wallet update`,
				description: t`Disconnected from wallet`,
			});
		});
		return () => {
			wallet.disconnect();
			setConnected(false);
		};
	}, [wallet]);
	return (
		<WalletContext.Provider
			value={{
				wallet,
				connected,
				providerUrl,
				setProviderUrl,
				providerName: WALLET_PROVIDERS.find(({ url }) => url === providerUrl)?.name ?? providerUrl,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}

export function useWallet() {
	const context = useContext(WalletContext);
	return {
		connected: context.connected,
		wallet: context.wallet,
		providerUrl: context.providerUrl,
		setProvider: context.setProviderUrl,
		providerName: context.providerName,
	};
}
