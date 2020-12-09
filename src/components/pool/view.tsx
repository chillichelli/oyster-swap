import React from 'react';
import { useOwnedPools } from '../../utils/pools';
import { useWallet } from '../../utils/wallet';
import { Box, Button, Divider, fade, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import DefaultLayout from '../defaultLayout';
import { Trans } from '@lingui/macro';
import OwnedPoolTable from '../OwnedPoolTable';
import CardBase from '../layout/CardBase';

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(2),
		maxWidth: theme.spacing(90),
		marginTop: '10%',
		zIndex: 1,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	borderedBox: {
		border: `1px solid ${fade(theme.palette.text.primary, 0.5)}`,
	},
}));

export const PoolOverview = () => {
	const owned = useOwnedPools();
	const { connected } = useWallet();
	const history = useHistory();
	const styles = useStyles();

	return (
		<DefaultLayout>
			<Box className={styles.root}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<CardBase p={1.5}>
							<Typography component="span" color="textPrimary" align="left">
								<Box fontWeight={600}>
									<Trans>Liquidity provider rewards</Trans>
								</Box>
							</Typography>
							<Box mt={1} mb={1}>
								<Divider />
							</Box>
							<Typography align="left" color="textSecondary">
								<Box fontWeight={400} component="span">
									<Trans>
										Liquidity providers earn a fixed percentage fee on all trades proportional to
										their share of the pool. Fees are added to the pool, accrue in real time and can
										be claimed by withdrawing your liquidity.
									</Trans>
								</Box>
							</Typography>
						</CardBase>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="space-between">
							<Grid item>
								<Box ml={0.75}>
									<Typography align="left" color="textPrimary" variant="h5">
										<Trans>Your liquidity</Trans>
									</Typography>
								</Box>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									disableElevation
									color="primary"
									onClick={() => history.push('/add')}
								>
									<Trans>Add Liquidity</Trans>
								</Button>
							</Grid>
						</Grid>
					</Grid>
					{!connected && (
						<Grid item xs={12}>
							<Box p={8}>
								<Typography variant="subtitle1" color="textSecondary" align="center">
									<Trans>Connect to a wallet to view your liquidity</Trans>
								</Typography>
							</Box>
						</Grid>
					)}
					{connected && owned.length > 0 && (
						<Grid item xs={12}>
							<OwnedPoolTable />
						</Grid>
					)}
					{connected && owned.length === 0 && (
						<Grid item xs={12}>
							<Box
								width={1}
								height={48}
								borderRadius={10}
								className={styles.borderedBox}
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Typography color="textSecondary" component="span">
									<Trans>No liquidity found</Trans>
								</Typography>
							</Box>
						</Grid>
					)}
				</Grid>
			</Box>
		</DefaultLayout>
	);
};
