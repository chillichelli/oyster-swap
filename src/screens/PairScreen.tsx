import React, { useContext } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { formatPct, formatPriceNumber, formatUSD } from '../utils/utils';
import { Box, Button, Grid, IconButton, Link, Typography } from '@material-ui/core';
import DefaultLayout from '../components/defaultLayout';
import { Trans } from '@lingui/macro';
import { PoolIcon, TokenIcon } from '../components/tokenIcon';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { usePrice } from '../context/market';
import CardBase from '../components/layout/CardBase';
import DefaultTable from '../components/layout/DefaultTable';
import { ExplorerLink } from '../components/explorerLink';
import LogoLoader from '../components/layout/LogoLoader';
import { useCurrencyPairState } from '../utils/currencyPair';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';

interface MatchParams {
	address: string;
}

const PriceAPerB = ({
	symbolA,
	symbolB,
	mintA,
	mintB,
}: {
	symbolA: string;
	symbolB: string;
	mintA: string;
	mintB: string;
}) => {
	const history = useHistory();
	const priceA = usePrice(mintA);
	const priceB = usePrice(mintB);
	const result = formatPriceNumber.format(priceA / priceB ? priceA / priceB : 0);
	return (
		<CardBase display="inline-flex" borderRadius={20}>
			<Button
				onClick={() => history.push(`/token/${mintA}`)}
				size="large"
				style={{ padding: '2px 8px' }}
				startIcon={<TokenIcon mintAddress={mintA} />}
			>
				1 {symbolA} = {result} {symbolB} ({formatUSD.format(priceA)})
			</Button>
		</CardBase>
	);
};

const PairScreen = ({ match, history }: RouteComponentProps<MatchParams>) => {
	const { enrichedPools } = useContext(EnrichedDataContext);
	const pool = enrichedPools.find(el => el.key === match.params.address);
	const { A, B } = useCurrencyPairState();

	let poolStats;
	if (pool) {
		const [symbolA, symbolB] = pool.names;
		const [mintA, mintB] = pool.mints;

		// TODO there must be a better way to set correct context (earlier)
		if (A.mint !== mintA) A.setMint(mintA);
		if (B.mint !== mintB) B.setMint(mintB);

		poolStats = (
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<Box
								display="inline-flex"
								alignItems="center"
								component={props => (
									<Typography {...props} variant="h4" color="textPrimary" component="span" />
								)}
							>
								<IconButton color="inherit" onClick={() => history.goBack()}>
									<ArrowBackIosRoundedIcon fontSize="inherit" />
								</IconButton>
								<Box mr={3} component="span" />
								<PoolIcon mintA={mintA} mintB={mintB} />
								<Box mr={2} component="span" />
								<Link
									underline="none"
									color="inherit"
									component="button"
									variant="h4"
									onClick={() => history.push(`/token/${mintA}`)}
								>
									{symbolA}
								</Link>
								&nbsp; - &nbsp;
								<Link
									underline="none"
									color="inherit"
									component="button"
									variant="h4"
									onClick={() => history.push(`/token/${mintB}`)}
								>
									{symbolB}
								</Link>
								&nbsp;
								<Trans>Pair</Trans>
							</Box>
						</Grid>
						<Grid item>
							<Grid container spacing={1}>
								<Grid item>
									<Button
										color="primary"
										startIcon={<AddRoundedIcon />}
										onClick={() => history.push('/add')}
									>
										Add liquidity
									</Button>
								</Grid>
								<Grid item>
									<Button color="primary" variant="contained" onClick={() => history.push('/')}>
										Trade
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item>
							<Typography variant="h6" display="inline" component="div">
								<PriceAPerB symbolA={symbolA} symbolB={symbolB} mintA={mintA} mintB={mintB} />
							</Typography>
						</Grid>
						<Grid item>
							<Typography display="inline" component="div">
								<PriceAPerB symbolA={symbolB} symbolB={symbolA} mintA={mintB} mintB={mintA} />
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>
						<Trans>Pair statistics</Trans>
					</Typography>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6} lg={3}>
							<CardBase p={2.5}>
								<Grid item>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										<Trans>Total Liquidity</Trans>
									</Typography>
									<Typography variant="h5" color="textPrimary">
										<Box component="span" display="flex">
											{formatUSD.format(pool.liquidity)}
										</Box>
									</Typography>
								</Grid>
							</CardBase>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<CardBase p={2.5}>
								<Grid item>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										<Trans>Volume (24hr)</Trans>
									</Typography>
									<Typography variant="h5" color="textPrimary">
										<Box component="span" display="flex">
											{formatUSD.format(pool.volume24h)}
										</Box>
									</Typography>
								</Grid>
							</CardBase>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<CardBase p={2.5}>
								<Grid item>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										<Trans>Fees (24hr)</Trans>
									</Typography>
									<Typography variant="h5" color="textPrimary">
										<Box component="span" display="flex">
											{formatUSD.format(pool.fees24h)}
										</Box>
									</Typography>
								</Grid>
							</CardBase>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<CardBase p={2.5}>
								<Grid item>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										<Trans>Annual Percentage Yield</Trans>
									</Typography>
									<Typography variant="h5" color="textPrimary">
										<Box component="span" display="flex">
											{formatPct.format(pool.apy)}
										</Box>
									</Typography>
								</Grid>
							</CardBase>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<CardBase p={2.5}>
								<Grid item>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										<Trans>Pooled Tokens</Trans>
									</Typography>
									<Box
										display="flex"
										alignItems="center"
										component={props => (
											<Typography {...props} variant="h5" color="textPrimary" gutterBottom />
										)}
									>
										<Link
											underline="none"
											color="inherit"
											component="button"
											variant="h5"
											onClick={() => history.push(`/token/${mintA}`)}
											style={{ display: 'flex', alignItems: 'center' }}
										>
											<Box mr={1} component="span" display="inline-flex">
												<TokenIcon mintAddress={mintA} />
											</Box>{' '}
											{formatPriceNumber.format(pool.liquidityA)} {symbolA}
										</Link>
									</Box>
									<Box
										display="flex"
										alignItems="center"
										component={props => <Typography {...props} variant="h5" color="textPrimary" />}
									>
										<Link
											underline="none"
											color="inherit"
											component="button"
											variant="h5"
											onClick={() => history.push(`/token/${mintB}`)}
											style={{ display: 'flex', alignItems: 'center' }}
										>
											<Box mr={1} component="span" display="inline-flex">
												<TokenIcon mintAddress={mintB} />
											</Box>{' '}
											{formatPriceNumber.format(pool.liquidityB)} {symbolB}
										</Link>
									</Box>
								</Grid>
							</CardBase>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>
						<Trans>Transactions</Trans> (Work in Progress)
					</Typography>
					<CardBase>
						<DefaultTable data={[]} columns={[]} />
					</CardBase>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>
						<Trans>Pair information</Trans>
					</Typography>
					<CardBase p={2.5}>
						<Grid container spacing={3}>
							<Grid item>
								<Typography color="textSecondary">
									<Trans>Pair Name</Trans>
								</Typography>
								<Typography>
									<Link
										underline="none"
										color="inherit"
										component="button"
										variant="body1"
										onClick={() => history.push(`/token/${mintA}`)}
									>
										{symbolA}
									</Link>
									&nbsp; - &nbsp;
									<Link
										underline="none"
										color="inherit"
										component="button"
										variant="body1"
										onClick={() => history.push(`/token/${mintB}`)}
									>
										{symbolB}
									</Link>
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="textSecondary">
									<Trans>Pair Address</Trans>
								</Typography>
								<Typography>
									<ExplorerLink address={pool.key} type="address" />
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="textSecondary">
									<Trans>{symbolA} Address</Trans>
								</Typography>
								<Typography>
									<ExplorerLink address={mintA} type="address" />
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="textSecondary">
									<Trans>{symbolB} Address</Trans>
								</Typography>
								<Typography>
									<ExplorerLink address={mintB} type="address" />
								</Typography>
							</Grid>
						</Grid>
					</CardBase>
				</Grid>
			</Grid>
		);
	}

	return <DefaultLayout appBarBorder>{pool ? poolStats : <LogoLoader />}</DefaultLayout>;
};

export default PairScreen;
