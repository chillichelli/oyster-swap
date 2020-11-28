import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useConnectionConfig } from '../utils/connection';
import { usePools } from '../utils/pools';
import { getTokenName } from '../utils/utils';
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import DefaultLayout from '../components/defaultLayout';
import { Trans } from '@lingui/macro';
import { PoolIcon } from '../components/tokenIcon';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

interface MatchParams {
	address: string;
}

const PairScreen = ({ match }: RouteComponentProps<MatchParams>) => {
	const { tokenMap } = useConnectionConfig();
	const { pools } = usePools();
	const pool = pools.find(el => el.pubkeys.account.toBase58() === match.params.address);

	let mints: string[] = [];
	if (pool) {
		mints = pool.pubkeys.holdingMints.map(el => getTokenName(tokenMap, el.toBase58()));

		return (
			<DefaultLayout>
				<Grid container justify="space-between">
					<Grid item>
						<Typography variant="h4" display="inline">
							<PoolIcon
								mintA={pool.pubkeys.holdingMints[0].toBase58()}
								mintB={pool.pubkeys.holdingMints[1].toBase58()}
							/>
							<Box mr={1} component="span" />
							{mints.join('-')} <Trans>Pair</Trans>
						</Typography>
					</Grid>
					<Grid item>
						<Grid container spacing={1}>
							<Button color="primary" startIcon={<AddRoundedIcon />}>
								Add liquidity
							</Button>
							<Button color="primary" variant="contained">
								Trade
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</DefaultLayout>
		);
	}

	return <CircularProgress />;
};

export default PairScreen;
