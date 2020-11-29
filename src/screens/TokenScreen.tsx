import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { formatUSD } from '../utils/utils';
import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import DefaultLayout from '../components/defaultLayout';
import { Trans } from '@lingui/macro';
import { TokenIcon } from '../components/tokenIcon';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import CardBase from '../components/layout/CardBase';
import LogoLoader from '../components/layout/LogoLoader';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';
import TopPairs from '../components/TopPairs';
import { useCurrencyPairState } from '../utils/currencyPair';

interface MatchParams {
	address: string;
}

const TokenScreen = ({ match, history }: RouteComponentProps<MatchParams>) => {
	const { enrichedTokens } = useContext(EnrichedDataContext);
	const token = enrichedTokens.find(el => el.mint === match.params.address);
	const usdc = enrichedTokens.find(el => el.symbol === 'USDC');

	const { A, B } = useCurrencyPairState();

	let tokenStats;
	if (token) {
		// TODO there must be a better way to set correct context (earlier)
		if (A.mint !== token.mint) A.setMint(token.mint);
		if (B.mint !== usdc.mint) B.setMint(usdc.mint);

		tokenStats = (
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<Box
								display="inline-flex"
								alignItems="baseline"
								component={props => (
									<Typography {...props} variant="h4" color="textPrimary" component="span" />
								)}
							>
								<IconButton color="inherit" onClick={() => history.goBack()}>
									<ArrowBackIosRoundedIcon fontSize="inherit" />
								</IconButton>
								<Box mr={3} component="span" />
								<TokenIcon mintAddress={token.mint} />
								<Box mr={2} component="span" />
								{token.symbol}
								<Box mr={1} component="span" />
								<Typography variant="h5">{formatUSD.format(token.price)}</Typography>
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
						<Grid item xs={12} md={6} lg={3}>
							<CardBase p={2.5}>
								<Grid item>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										<Trans>Total Liquidity</Trans>
									</Typography>
									<Typography variant="h5" color="textPrimary">
										<Box component="span" display="flex">
											{formatUSD.format(token.liquidity)}
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
											{formatUSD.format(token.volume24h)}
										</Box>
									</Typography>
								</Grid>
							</CardBase>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>
						<Trans>Pairs</Trans>
					</Typography>
					<TopPairs mintAddress={token.mint} />
				</Grid>
			</Grid>
		);
	}
	return <DefaultLayout appBarBorder>{token ? tokenStats : <LogoLoader />}</DefaultLayout>;
};

export default TokenScreen;
