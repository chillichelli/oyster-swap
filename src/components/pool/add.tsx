import React, { useMemo, useState } from 'react';
import { addLiquidity, usePoolForBasket, PoolOperation } from '../../utils/pools';
import { Dropdown } from 'antd';
import { useWallet } from '../../utils/wallet';
import { useConnection, useConnectionConfig, useSlippageConfig } from '../../utils/connection';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { notify } from '../../utils/notifications';
import { CurrencyInput } from '../currencyInput';
import { DEFAULT_DENOMINATOR, PoolConfigCard } from './config';
import './add.less';
import { PoolConfig, PoolInfo } from '../../models';
import { SWAP_PROGRAM_OWNER_FEE_ADDRESS } from '../../utils/ids';
import { useCurrencyPairState } from '../../utils/currencyPair';
import { CREATE_POOL_LABEL, ADD_LIQUIDITY_LABEL, generateActionLabel } from '../labels';
import { AdressesPopover } from './address';
import { Box, Button, CircularProgress, Grid, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import { useHistory } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { formatPriceNumber } from '../../utils/utils';
import { useEnrichedPools } from '../../context/market';
import { useMint, useUserAccounts } from '../../utils/accounts';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const AddToLiquidity = () => {
	const theme = useTheme();
	const { wallet, connected } = useWallet();
	const connection = useConnection();
	const history = useHistory();
	const [pendingTx, setPendingTx] = useState(false);
	const { A, B, setLastTypedAccount, setPoolOperation } = useCurrencyPairState();
	const pool = usePoolForBasket([A?.mintAddress, B?.mintAddress]);
	const { slippage } = useSlippageConfig();
	const { tokenMap } = useConnectionConfig();
	const [options, setOptions] = useState<PoolConfig>({
		curveType: 0,
		tradeFeeNumerator: 25,
		tradeFeeDenominator: DEFAULT_DENOMINATOR,
		ownerTradeFeeNumerator: 5,
		ownerTradeFeeDenominator: DEFAULT_DENOMINATOR,
		ownerWithdrawFeeNumerator: 0,
		ownerWithdrawFeeDenominator: DEFAULT_DENOMINATOR,
	});

	const executeAction = !connected
		? wallet.connect
		: async () => {
				if (A.account && B.account && A.mint && B.mint) {
					setPendingTx(true);
					const components = [
						{
							account: A.account,
							mintAddress: A.mintAddress,
							amount: A.convertAmount(),
						},
						{
							account: B.account,
							mintAddress: B.mintAddress,
							amount: B.convertAmount(),
						},
					];

					addLiquidity(connection, wallet, components, slippage, pool, options)
						.then(() => {
							setPendingTx(false);
						})
						.catch(e => {
							console.log(t`Transaction failed`, e);
							notify({
								description: t`Please try again and approve transactions from your wallet`,
								message: t`Adding liquidity cancelled.`,
								type: 'error',
							});
							setPendingTx(false);
						});
				}
		  };

	const hasSufficientBalance = A.sufficientBalance() && B.sufficientBalance();

	const createPoolButton = SWAP_PROGRAM_OWNER_FEE_ADDRESS ? (
		<Button
			disableElevation
			onClick={executeAction}
			disabled={connected && (pendingTx || !A.account || !B.account || A.account === B.account)}
			variant="contained"
			color="primary"
			fullWidth
			style={{ height: 64 }}
			endIcon={pendingTx && <CircularProgress size={16} />}
		>
			{generateActionLabel(CREATE_POOL_LABEL, connected, tokenMap, A, B)}
		</Button>
	) : (
		<Dropdown.Button
			className="add-button"
			onClick={executeAction}
			disabled={connected && (pendingTx || !A.account || !B.account || A.account === B.account)}
			type="primary"
			size="large"
			overlay={<PoolConfigCard options={options} setOptions={setOptions} />}
		>
			{generateActionLabel(CREATE_POOL_LABEL, connected, tokenMap, A, B)}
			{pendingTx && <Spin indicator={antIcon} className="add-spinner" />}
		</Dropdown.Button>
	);

	return (
		<>
			<Box
				borderRadius={20}
				p={2}
				pt={0}
				style={{
					backgroundColor: theme.palette.type === 'dark' ? '#212429' : 'white',
				}}
			>
				<Box pt={2} pb={2}>
					<Grid container alignItems="center">
						<Grid item>
							<IconButton onClick={() => history.replace('/pool')}>
								<ArrowBackRoundedIcon />
							</IconButton>
						</Grid>
						<Grid item xs>
							<Typography variant="h5" color="textPrimary" align="center">
								<Trans>Add Liquidity</Trans>
							</Typography>
						</Grid>
						<Grid item>
							<Tooltip
								TransitionProps={{ timeout: 0 }}
								title={
									<Typography variant="caption" color="textPrimary">
										<Trans>
											Liquidity providers earn a fixed percentage fee on all trades proportional
											to their share of the pool. Fees are added to the pool, accrue in real time
											and can be claimed by withdrawing your liquidity.
										</Trans>
									</Typography>
								}
							>
								<IconButton>
									<HelpOutlineRoundedIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Box>
				<CurrencyInput
					title={t`Input`}
					onInputChange={(val: any) => {
						setPoolOperation(PoolOperation.Add);
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
						<Box p={1} display="inline-flex" alignItems="center">
							<AddRoundedIcon color="inherit" />
						</Box>
						<Box position="absolute" right={10} top={0}>
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
					title={t`Input`}
					onInputChange={(val: any) => {
						setPoolOperation(PoolOperation.Add);
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
				<Box pt={2.5} pb={2.5}>
					{pool && <PoolPrice pool={pool} />}
				</Box>
				{pool && (
					<Box>
						<Button
							disableElevation
							fullWidth
							variant="contained"
							color="primary"
							size="large"
							onClick={executeAction}
							disabled={
								connected &&
								(pendingTx ||
									!A.account ||
									!B.account ||
									A.account === B.account ||
									!hasSufficientBalance)
							}
							style={{ height: 64 }}
							endIcon={pendingTx && <CircularProgress size={16} />}
						>
							{generateActionLabel(ADD_LIQUIDITY_LABEL, connected, tokenMap, A, B)}
						</Button>
					</Box>
				)}
				{!pool && createPoolButton}
			</Box>
			<YourPosition pool={pool} />
		</>
	);
};

export const PoolPrice = (props: { pool: PoolInfo }) => {
	const pool = props.pool;
	const pools = useMemo(() => [props.pool].filter(p => p) as PoolInfo[], [props.pool]);
	const enriched = useEnrichedPools(pools)[0];

	const { userAccounts } = useUserAccounts();
	const lpMint = useMint(pool.pubkeys.mint);

	const ratio =
		userAccounts
			.filter(f => pool.pubkeys.mint.equals(f.info.mint))
			.reduce((acc, item) => item.info.amount.toNumber() + acc, 0) / (lpMint?.supply.toNumber() || 0);

	if (!enriched) {
		return null;
	}
	return (
		<Grid container justify="center">
			<Grid item xs={4}>
				<Typography align="center">
					{formatPriceNumber.format(parseFloat(enriched.liquidityA) / parseFloat(enriched.liquidityB))}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography align="center">
					{formatPriceNumber.format(parseFloat(enriched.liquidityB) / parseFloat(enriched.liquidityA))}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography align="center">
					{ratio * 100 < 0.001 && ratio > 0 ? '<' : ''}
					&nbsp;{formatPriceNumber.format(ratio * 100)}%
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography align="center" color="textSecondary" variant="subtitle1">
					{enriched.names[0]} <Trans>per</Trans> {enriched.names[1]}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography align="center" color="textSecondary" variant="subtitle1">
					{enriched.names[1]} <Trans>per</Trans> {enriched.names[0]}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography align="center" color="textSecondary" variant="subtitle1">
					<Trans>Share of pool</Trans>
				</Typography>
			</Grid>
		</Grid>
	);
};

export const YourPosition = (props: { pool?: PoolInfo }) => {
	const { pool } = props;
	const pools = useMemo(() => [props.pool].filter(p => p) as PoolInfo[], [props.pool]);
	const enriched = useEnrichedPools(pools)[0];
	const { userAccounts } = useUserAccounts();
	const lpMint = useMint(pool?.pubkeys.mint);

	if (!pool || !enriched) {
		return null;
	}

	const ratio =
		userAccounts
			.filter(f => pool.pubkeys.mint.equals(f.info.mint))
			.reduce((acc, item) => item.info.amount.toNumber() + acc, 0) / (lpMint?.supply.toNumber() || 0);

	return (
		<Box pl={3.5} pr={3.5} pt={2} pb={2}>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1" display="inline">
							{enriched?.name}
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{formatPriceNumber.format(ratio * enriched.supply)}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1" display="inline">
							{enriched.names[0]}:
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{formatPriceNumber.format(ratio * enriched.liquidityA)}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1" display="inline">
							{enriched.names[1]}:
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{formatPriceNumber.format(ratio * enriched.liquidityB)}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box display="flex" alignItems="center">
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="textSecondary" variant="subtitle1">
							Your Share:
						</Typography>
					</Grid>
					<Grid item>
						<Typography color="textPrimary" variant="subtitle1">
							<Box fontWeight={500} component="span">
								{ratio * 100 < 0.001 && ratio > 0 ? '<' : ''}
								{formatPriceNumber.format(ratio * 100)}%
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
