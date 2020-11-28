import React, { useContext } from 'react';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';
import DefaultLayout from '../components/defaultLayout';
import CardBase from '../components/layout/CardBase';
import { formatUSD } from '../utils/utils';
import TopTokens from '../components/TopTokens';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import TopPairs from '../components/TopPairs';
import { Trans } from '@lingui/macro';
import { Link as RouterLink } from 'react-router-dom';

export const ChartsScreen = React.memo(() => {
	const { totals } = useContext(EnrichedDataContext);

	return (
		<DefaultLayout>
			<Box mb={3}>
				<Typography variant="h5" color="textPrimary">
					<Trans>Statistics</Trans>
				</Typography>
			</Box>
			{/*<Box minHeight="unset !important">*/}
			{/*	<Grid container>*/}
			{/*		<Grid item xs={12}>*/}
			{/*			<Box*/}
			{/*				width={1}*/}
			{/*				borderRadius={10}*/}
			{/*				pl={1.5}*/}
			{/*				pr={0.75}*/}
			{/*				pt={0.75}*/}
			{/*				pb={0.75}*/}
			{/*				className="backdrop-blur"*/}
			{/*				display="flex"*/}
			{/*				justifyContent="flex-start"*/}
			{/*				style={{*/}
			{/*					boxShadow:*/}
			{/*						'rgba(0, 0, 0, 0.04) 0px 24px 32px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 0px 1px',*/}
			{/*					backgroundColor: fade(*/}
			{/*						theme.palette.type === 'dark'*/}
			{/*							? theme.palette.common.black*/}
			{/*							: theme.palette.common.white,*/}
			{/*						0.7*/}
			{/*					),*/}
			{/*				}}*/}
			{/*			>*/}
			{/*				<InputBase*/}
			{/*					placeholder={t`Filter`}*/}
			{/*					type="search"*/}
			{/*					value={search}*/}
			{/*					onChange={e => setSearch(e.target.value)}*/}
			{/*					fullWidth*/}
			{/*				/>*/}
			{/*				<Box display="flex">*/}
			{/*					<IconButton type="submit" aria-label="search">*/}
			{/*						<SearchRoundedIcon />*/}
			{/*					</IconButton>*/}
			{/*				</Box>*/}
			{/*			</Box>*/}
			{/*		</Grid>*/}
			{/*	</Grid>*/}
			{/*</Box>*/}
			<CardBase mt={3} mb={4} p={1.5} pb={0} width={1}>
				<Grid container>
					<Grid item>
						<Typography variant="body1" color="textPrimary">
							<Trans>Liquidity</Trans>:{' '}
						</Typography>
						<Typography variant="h5" color="textPrimary">
							<Box component="span" mr={3} mb={1.5} display="flex">
								{formatUSD.format(totals.liquidity)}
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="body1" color="textPrimary">
							<Trans>Volume (24h)</Trans>:{' '}
						</Typography>
						<Typography variant="h5" color="textPrimary">
							<Box component="span" mr={3} mb={1.5} display="flex">
								{formatUSD.format(totals.volume)}
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="body1" color="textPrimary">
							<Trans>Fees (24h)</Trans>:{' '}
						</Typography>
						<Typography variant="h5" color="textPrimary">
							<Box component="span" mr={3} mb={1.5} display="flex">
								{formatUSD.format(totals.fees)}
							</Box>
						</Typography>
					</Grid>
				</Grid>
			</CardBase>
			<Box width={1}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="h6" gutterBottom color="textPrimary">
							<Trans>Top Pairs</Trans>
						</Typography>
					</Grid>
					<Grid item>
						<RouterLink
							component={({ navigate, ...props }) => (
								<Button
									disableRipple
									color="secondary"
									{...props}
									style={{ backgroundColor: 'transparent' }}
								/>
							)}
							to="/pairs"
						>
							<Trans>See All</Trans>
						</RouterLink>
					</Grid>
				</Grid>
				<TopPairs />
			</Box>
			<Box width={1}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="h6" gutterBottom color="textPrimary">
							<Trans>Top Tokens</Trans>
						</Typography>
					</Grid>
					<Grid item>
						<RouterLink
							component={({ navigate, ...props }) => (
								<Button
									disableRipple
									color="secondary"
									{...props}
									style={{ backgroundColor: 'transparent' }}
								/>
							)}
							to="/tokens"
						>
							<Trans>See All</Trans>
						</RouterLink>
					</Grid>
				</Grid>
				<TopTokens />
			</Box>
		</DefaultLayout>
	);
});

export default ChartsScreen;
