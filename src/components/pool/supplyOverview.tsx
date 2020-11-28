import React, { useMemo } from 'react';
import { PoolInfo } from '../../models';
import { useEnrichedPools } from '../../context/market';
import { Divider, Grid, Typography } from '@material-ui/core';

export const SupplyOverview = (props: { pool?: PoolInfo }) => {
	const { pool } = props;
	const pools = useMemo(() => (pool ? [pool] : []), [pool]);
	const enriched = useEnrichedPools(pools);

	if (enriched.length === 0) {
		return null;
	}

	return (
		<Grid container>
			<Grid item xs>
				<Grid item xs={12}>
					<Grid container justify="flex-start">
						<Grid item xs={12}>
							<Typography align="left" variant="caption">
								$
								{enriched[0].liquidityBinUsd.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</Typography>
							<Typography align="left" variant="caption" component="p">
								{enriched[0].liquidityB.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}{' '}
								{enriched[0].names[1]}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Divider orientation="vertical" />
			</Grid>
			<Grid item xs>
				<Grid item xs={12}>
					<Grid container justify="flex-start">
						<Grid item xs={12}>
							<Typography align="right" variant="caption" component="p">
								$
								{enriched[0].liquidityAinUsd.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</Typography>
							<Typography align="right" variant="caption" component="p">
								{enriched[0].liquidityA.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}{' '}
								{enriched[0].names[0]}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
