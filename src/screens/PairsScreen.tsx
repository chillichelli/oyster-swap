import React from 'react';
import DefaultLayout from '../components/defaultLayout';
import TopPairs from '../components/TopPairs';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Trans } from '@lingui/macro';
import { useHistory } from 'react-router-dom';

const PairsScreen = () => {
	const history = useHistory();

	return (
		<DefaultLayout>
			<Box mb={1}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="h5" color="textPrimary" component="span">
							<Box display="inline-flex" alignItems="center" component="span">
								<IconButton color="inherit" onClick={() => history.push('/info')}>
									<ArrowBackIosRoundedIcon fontSize="inherit" />
								</IconButton>
								<Box mr={2} component="span" />
								<Trans>Top Pairs</Trans>
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<TopPairs initialState={{ sortBy: [{ id: 'liquidity', desc: true }], pageSize: 50 }} />
		</DefaultLayout>
	);
};

export default PairsScreen;
