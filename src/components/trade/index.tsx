import React, { useEffect, useMemo, useState } from 'react';
import { useConnection, useConnectionConfig, useSlippageConfig } from '../../utils/connection';
import { useWallet } from '../../utils/wallet';
import { CurrencyInput } from '../currencyInput';
import { LIQUIDITY_PROVIDER_FEE, PoolOperation, swap, usePoolForBasket } from '../../utils/pools';
import { notify } from '../../utils/notifications';
import { useCurrencyPairState } from '../../utils/currencyPair';
import { generateActionLabel, POOL_NOT_AVAILABLE, SWAP_LABEL } from '../labels';
import { getTokenName } from '../../utils/utils';
import { AdressesPopover } from '../pool/address';
import { Box, Button, CircularProgress, Grid, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import RaisedBase from '../layout/RaisedBase';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import { t, Trans } from '@lingui/macro';
import { PoolInfo } from '../../models';
import { useEnrichedPools } from '../../context/market';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

// TODO:
// Compute price breakdown with/without fee
// Show slippage
// Show fee information

export const TradeEntry = () => {
	const theme = useTheme();
	const { wallet, connected } = useWallet();
	const connection = useConnection();
	const [pendingTx, setPendingTx] = useState(false);
	const { A, B, setLastTypedAccount, setPoolOperation } = useCurrencyPairState();
	const pool = usePoolForBasket([A?.mintAddress, B?.mintAddress]);
	const { slippage } = useSlippageConfig();
	const { tokenMap } = useConnectionConfig();
	const [invertPricePer, setInvertPricePer] = useState(false);

	const swapAccounts = () => {
		const tempMint = A.mintAddress;
		const tempAmount = A.amount;
		A.setMint(B.mintAddress);
		A.setAmount(B.amount);
		B.setMint(tempMint);
		B.setAmount(tempAmount);
		// @ts-ignore
		setPoolOperation((op: PoolOperation) => {
			switch (+op) {
				case PoolOperation.SwapGivenInput:
					return PoolOperation.SwapGivenProceeds;
				case PoolOperation.SwapGivenProceeds:
					return PoolOperation.SwapGivenInput;
				case PoolOperation.Add:
					return PoolOperation.SwapGivenInput;
			}
		});
	};

	const handleSwap = async () => {
		if (A.account && B.mintAddress) {
			try {
				setPendingTx(true);

				const components = [
					{
						account: A.account,
						mintAddress: A.mintAddress,
						amount: A.convertAmount(),
					},
					{
						mintAddress: B.mintAddress,
						amount: B.convertAmount(),
					},
				];

				await swap(connection, wallet, components, slippage, pool);
			} catch {
				notify({
					description: t`Please try again and approve transactions from your wallet`,
					message: t`Swap trade cancelled.`,
					type: 'error',
				});
			} finally {
				setPendingTx(false);
			}
		}
	};

	return (
		<>
			<Box
				borderRadius={20}
				p={2}
				style={{
					boxShadow:
						'rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px',
					backgroundColor: theme.palette.type === 'dark' ? '#212429' : 'white',
				}}
			>
				<CurrencyInput
					title={t`From`}
					onInputChange={(val: any) => {
						setPoolOperation(PoolOperation.SwapGivenInput);
						if (A.amount !== val) {
							setLastTypedAccount(A.mintAddress);
						}

						A.setAmount(val);
					}}
					amount={A.amount}
					mint={A.mintAddress}
					onMintChange={item => {
						A.setMint(item);
					}}
				/>

				<Box mt={1.25} mb={1.25} position="relative" display="flex" alignItems="center" justifyContent="center">
					<Typography color="textSecondary" component="div">
						<IconButton onClick={swapAccounts} color="inherit">
							<ArrowDownwardRoundedIcon />
						</IconButton>
						<Box position="absolute" right={8} top={0}>
							<AdressesPopover
								pool={pool}
								aName={A.name}
								aMint={A.mintAddress}
								bName={B.name}
								bMint={B.mintAddress}
							/>
						</Box>
					</Typography>
				</Box>
				<CurrencyInput
					title={t`To (Estimate)`}
					onInputChange={(val: any) => {
						setPoolOperation(PoolOperation.SwapGivenProceeds);
						if (B.amount !== val) {
							setLastTypedAccount(B.mintAddress);
						}

						B.setAmount(val);
					}}
					amount={B.amount}
					mint={B.mintAddress}
					onMintChange={item => {
						B.setMint(item);
					}}
				/>
				{slippage && (
					<Box display="flex" alignItems="center" ml={1} mr={1} mt={2} mb={0}>
						<Grid container justify="space-between">
							<Grid item>
								<Typography color="textSecondary" variant="subtitle1">
									<Trans>Slippage Tolerance</Trans>
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="textSecondary" variant="subtitle1">
									{slippage * 100}%
								</Typography>
							</Grid>
						</Grid>
					</Box>
				)}
				{A.amount && B.amount && +A.amount / +B.amount > 0 ? (
					<Box display="flex" alignItems="center" ml={1} mr={1} mt={0} mb={2}>
						<Grid container justify="space-between">
							<Grid item>
								<Typography color="textSecondary" variant="subtitle1">
									<Trans>Price</Trans>
								</Typography>
							</Grid>
							<Grid item style={{ cursor: 'pointer' }}>
								<Typography color="textSecondary" variant="subtitle1">
									{invertPricePer ? (
										<Box display="inline-flex" alignItems="center" component="span">
											<Box component="span" mr={0.5}>
												{(+B.amount / +A.amount).toLocaleString('en-US', {
													minimumFractionDigits: 4,
													maximumFractionDigits: 4,
												})}{' '}
												{A.name} <Trans>per</Trans> {B.name}
											</Box>
											<IconButton size="small" onClick={() => setInvertPricePer(!invertPricePer)}>
												<CachedRoundedIcon fontSize="inherit" color="inherit" />
											</IconButton>
										</Box>
									) : (
										<Box display="inline-flex" alignItems="center" component="span">
											<Box component="span" mr={0.5} fontWeight={500}>
												{(+A.amount / +B.amount).toLocaleString('en-US', {
													minimumFractionDigits: 4,
													maximumFractionDigits: 4,
												})}{' '}
												{B.name} <Trans>per</Trans> {A.name}
											</Box>
											<IconButton
												color="inherit"
												size="small"
												onClick={() => setInvertPricePer(!invertPricePer)}
											>
												<CachedRoundedIcon fontSize="inherit" color="inherit" />
											</IconButton>
										</Box>
									)}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				) : (
					''
				)}
				<RaisedBase mt={1.25}>
					<Button
						variant="contained"
						color="primary"
						disableElevation
						size="large"
						fullWidth
						onClick={connected ? handleSwap : wallet.connect}
						style={{ height: 64 }}
						endIcon={pendingTx && <CircularProgress size={16} />}
						disabled={
							connected &&
							(pendingTx ||
								!A.account ||
								!B.mintAddress ||
								A.account === B.account ||
								!A.sufficientBalance() ||
								!pool)
						}
					>
						{generateActionLabel(
							!pool
								? POOL_NOT_AVAILABLE(
										getTokenName(tokenMap, A.mintAddress),
										getTokenName(tokenMap, B.mintAddress)
								  )
								: SWAP_LABEL,
							connected,
							tokenMap,
							A,
							B,
							true
						)}
					</Button>
				</RaisedBase>
			</Box>
			<TradeInfo pool={pool} />
		</>
	);
};

export const TradeInfo = (props: { pool?: PoolInfo }) => {
	const { A, B, lastTypedAccount } = useCurrencyPairState();
	const { pool } = props;
	const { slippage } = useSlippageConfig();
	const pools = useMemo(() => (pool ? [pool] : []), [pool]);
	const enriched = useEnrichedPools(pools);

	const [amountOut, setAmountOut] = useState(0);
	const [maxMinLabel, setMaxMinLabelOut] = useState('');
	const [priceImpact, setPriceImpact] = useState(0);
	const [lpFee, setLpFee] = useState(0);
	const [, setExchangeRate] = useState(0);
	const [priceAccount] = useState('');

	useEffect(() => {
		if (!pool || enriched.length === 0) {
			return;
		}
		if (B.amount) {
			const minAmountOut = parseFloat(B?.amount) * (1 - slippage);
			setAmountOut(minAmountOut);
			setMaxMinLabelOut(t`Minimum Received`);
		}

		const liqA = enriched[0].liquidityA;
		const liqB = enriched[0].liquidityB;
		const supplyRatio = liqA / liqB;
		// We need to make sure the order matched the pool's accounts order
		const enrichedA = A.mintAddress === enriched[0].mints[0] ? A : B;
		const enrichedB = enrichedA.mintAddress === A.mintAddress ? B : A;
		const calculatedRatio = parseFloat(enrichedA.amount) / parseFloat(enrichedB.amount);
		// % difference between pool ratio and  calculated ratio
		setPriceImpact(Math.abs(100 - (calculatedRatio * 100) / supplyRatio));

		// 6 decimals without trailing zeros
		const lpFeeStr = (parseFloat(A.amount) * LIQUIDITY_PROVIDER_FEE).toFixed(6);
		setLpFee(parseFloat(lpFeeStr));
	}, [A, B, slippage, lastTypedAccount, pool, enriched]);

	useEffect(() => {
		if (priceAccount === B.mintAddress) {
			setExchangeRate(parseFloat(B.amount) / parseFloat(A.amount));
		} else {
			setExchangeRate(parseFloat(A.amount) / parseFloat(B.amount));
		}
	}, [A, B, priceAccount]);

	return !!parseFloat(B.amount) ? (
		<Box p={2}>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1" component="span">
							<Box component="span" display="flex">
								{maxMinLabel}
								<Tooltip
									TransitionProps={{ timeout: 0 }}
									title={
										<Typography variant="caption" color="textPrimary">
											<Trans>
												You transaction will revert if there is a large, unfavorable price
												movement before it is confirmed.
											</Trans>
										</Typography>
									}
								>
									<IconButton size="small" color="inherit">
										<HelpOutlineRoundedIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{amountOut.toFixed(6)} {B.name}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1" component="span">
							<Box component="span" display="flex">
								Price Impact
								<Tooltip
									TransitionProps={{ timeout: 0 }}
									title={
										<Typography variant="caption" color="textPrimary">
											<Trans>
												The difference between the market price and estimated price due to trade
												size.
											</Trans>
										</Typography>
									}
								>
									<IconButton size="small" color="inherit">
										<HelpOutlineRoundedIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{priceImpact < 0.01 ? '< 0.01%' : priceImpact.toFixed(3) + '%'}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1" component="span">
							<Box component="span" display="flex">
								Liquidity Provider Fee
								<Tooltip
									TransitionProps={{ timeout: 0 }}
									title={
										<Typography variant="caption" color="textPrimary">
											{t`A portion of each trade (${
												LIQUIDITY_PROVIDER_FEE * 100
											}%) goes to liquidity
											providers as a protocol incentive.`}
										</Typography>
									}
								>
									<IconButton size="small" color="inherit">
										<HelpOutlineRoundedIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{lpFee} {A.name}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	) : null;
};
