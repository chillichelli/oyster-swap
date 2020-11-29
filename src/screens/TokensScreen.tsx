import React, { useContext } from 'react';
import DefaultLayout from '../components/defaultLayout';
import TopTokens from '../components/TopTokens';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import { useHistory } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';

const TokensScreen = () => {
	const history = useHistory();
	const { enrichedTokens } = useContext(EnrichedDataContext);
	console.log(enrichedTokens);

	return (
		<DefaultLayout appBarBorder>
			<Box mb={1}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="h5" color="textPrimary" component="span">
							<Box display="inline-flex" alignItems="center" component="span">
								<IconButton color="inherit" onClick={() => history.push('/info')}>
									<ArrowBackIosRoundedIcon fontSize="inherit" />
								</IconButton>
								<Box mr={2} component="span" />
								<Trans>Top Tokens</Trans>
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<TopTokens initialState={{ sortBy: [{ id: 'liquidity', desc: true }], pageSize: 50 }} />
		</DefaultLayout>
	);
};

export default TokensScreen;
