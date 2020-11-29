import React from 'react';
import { NumericInput } from '../numericInput';
import { getPoolName, getTokenName, isKnownMint } from '../../utils/utils';
import { useAccountByMint, useCachedPool, useMint, useUserAccounts } from '../../utils/accounts';
import './styles.less';
import { useConnectionConfig } from '../../utils/connection';
import { PoolIcon, TokenIcon } from '../tokenIcon';
import { PublicKey } from '@solana/web3.js';
import { PoolInfo, TokenAccount } from '../../models';
import RaisedBase from '../layout/RaisedBase';
import { Box, Grid, ListItemIcon, ListItemText, MenuItem, Select, Typography, useTheme } from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { Trans } from '@lingui/macro';

interface ITokenDisplay {
	name: string;
	mintAddress: string;
	icon?: JSX.Element;
	showBalance?: boolean;
}

const TokenDisplay = ({ showBalance, mintAddress, name, icon }: ITokenDisplay) => {
	const tokenMint = useMint(mintAddress);
	const tokenAccount = useAccountByMint(mintAddress);

	let balance: number = 0;
	let hasBalance: boolean = false;
	if (showBalance) {
		if (tokenAccount && tokenMint) {
			balance = tokenAccount.info.amount.toNumber() / Math.pow(10, tokenMint.decimals);
			hasBalance = balance > 0;
		}
	}

	return (
		<>
			<ListItemIcon>
				<TokenIcon mintAddress={mintAddress} />
			</ListItemIcon>
			<ListItemText disableTypography>{name}</ListItemText>
			{/*{showBalance && (*/}
			{/*	<ListItemText color="textSecondary">*/}
			{/*		{hasBalance && balance < 0.001 ? '<0.001' : balance.toFixed(3)}*/}
			{/*	</ListItemText>*/}
			{/*)}*/}
			{/*<div*/}
			{/*	title={mintAddress}*/}
			{/*	key={mintAddress}*/}
			{/*	style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}*/}
			{/*>*/}
			{/*	<div style={{ display: 'flex', alignItems: 'center' }}>*/}
			{/*		{icon || <TokenIcon mintAddress={mintAddress} />}*/}
			{/*		{name}*/}
			{/*	</div>*/}
			{/*	{showBalance ? (*/}
			{/*		<span title={balance.toString()} key={mintAddress} className="token-balance">*/}
			{/*			&nbsp; {hasBalance && balance < 0.001 ? '<0.001' : balance.toFixed(3)}*/}
			{/*		</span>*/}
			{/*	) : null}*/}
			{/*</div>*/}
		</>
	);
};

export const CurrencyInput = (props: {
	mint?: string;
	amount?: string;
	title?: string;
	onInputChange?: (val: number) => void;
	onMintChange?: (account: string) => void;
}) => {
	const theme = useTheme();
	const { userAccounts } = useUserAccounts();
	const { pools } = useCachedPool();
	const mint = useMint(props.mint);

	const { tokens, tokenMap } = useConnectionConfig();

	const renderPopularTokens = tokens.map(item => {
		return (
			<MenuItem key={item.mintAddress} value={item.mintAddress}>
				<TokenDisplay
					key={item.mintAddress}
					name={item.tokenSymbol}
					mintAddress={item.mintAddress}
					showBalance
				/>
			</MenuItem>
		);
	});

	// TODO: expand nested pool names ...?

	// group accounts by mint and use one with biggest balance
	const grouppedUserAccounts = userAccounts
		.sort((a, b) => {
			return b.info.amount.toNumber() - a.info.amount.toNumber();
		})
		.reduce((map, acc) => {
			const mint = acc.info.mint.toBase58();
			if (isKnownMint(tokenMap, mint)) {
				return map;
			}

			const pool = pools.find(p => p && p.pubkeys.mint.toBase58() === mint);

			map.set(mint, (map.get(mint) || []).concat([{ account: acc, pool }]));

			return map;
		}, new Map<string, { account: TokenAccount; pool: PoolInfo | undefined }[]>());

	const additionalAccounts = [...grouppedUserAccounts.keys()];
	if (
		tokens.findIndex(t => t.mintAddress === props.mint) < 0 &&
		props.mint &&
		!grouppedUserAccounts.has(props?.mint)
	) {
		additionalAccounts.push(props.mint);
	}

	const renderAdditionalTokens = additionalAccounts.map(mint => {
		let pool: PoolInfo | undefined;
		const list = grouppedUserAccounts.get(mint);
		if (list && list.length > 0) {
			// TODO: group multple accounts of same time and select one with max amount
			const account = list[0];
			pool = account.pool;
		}

		let name: string;
		let icon: JSX.Element;
		if (pool) {
			name = getPoolName(tokenMap, pool);

			const sorted = pool.pubkeys.holdingMints.map((a: PublicKey) => a.toBase58()).sort();
			icon = <PoolIcon mintA={sorted[0]} mintB={sorted[1]} />;
		} else {
			name = getTokenName(tokenMap, mint, true, 3);
			icon = <TokenIcon mintAddress={mint} />;
		}

		return (
			<MenuItem key={mint} value={mint}>
				<Box boxShadow={theme.shadows[1]}>
					<ListItemIcon>{icon}</ListItemIcon>
				</Box>
				<ListItemText disableTypography>
					<Box fontWeight={500}>{name}</Box>
				</ListItemText>
			</MenuItem>
		);
	});

	const userUiBalance = () => {
		const currentAccount = userAccounts?.find(a => a.info.mint.toBase58() === props.mint);
		if (currentAccount && mint) {
			return currentAccount.info.amount.toNumber() / Math.pow(10, mint.decimals);
		}

		return 0;
	};

	return (
		<RaisedBase pl={1.5} pt={1} pb={1} pr={1.5}>
			<Grid container justify="space-between" alignItems="center">
				<Grid item>
					<Typography variant="subtitle1" color="textSecondary" component="span">
						{props.title}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						component="span"
						variant="subtitle1"
						color="textSecondary"
						onClick={() => props.onInputChange && props.onInputChange(userUiBalance())}
						style={{ cursor: 'pointer' }}
					>
						<Trans>Balance</Trans>: {userUiBalance().toFixed(6)}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Box mb={0.5} />
				</Grid>
				<Grid container item alignItems="center">
					<Grid item xs>
						<NumericInput
							value={props.amount}
							onChange={(val: any) => {
								if (props.onInputChange) {
									props.onInputChange(val);
								}
							}}
							style={{
								fontSize: 24,
								fontWeight: 500,
								color: theme.palette.text.primary,
								boxShadow: 'none',
								borderColor: 'transparent',
								outline: 'transparent',
								padding: 0,
							}}
							placeholder="0.0"
						/>
					</Grid>
					<Grid item>
						<Select
							autoWidth
							disableUnderline
							fullWidth
							placeholder="CCY"
							value={props.mint}
							onChange={(e: any) => {
								if (props.onMintChange) {
									props.onMintChange(e.target.value);
								}
							}}
							IconComponent={props => <ExpandMoreRoundedIcon {...props} color="inherit" />}
							style={{ fontSize: 20 }}
						>
							{[...renderPopularTokens, ...renderAdditionalTokens]}
						</Select>
					</Grid>
				</Grid>
			</Grid>
		</RaisedBase>
	);
};
