import React, { useMemo, useState } from 'react';
import {
	Box,
	Collapse,
	Divider,
	fade,
	Grid,
	IconButton,
	TableCell,
	TableRow,
	Typography,
	withStyles,
} from '@material-ui/core';
import { PoolInfo } from '../../models';
import { useEnrichedPools } from '../../context/market';
import { useMint, useUserAccounts } from '../../utils/accounts';
import { formatNumber, formatUSD } from '../../utils/utils';
import { PoolIcon } from '../tokenIcon';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/macro';
import { RemoveLiquidity } from '../pool/remove';
import { ExplorerLink } from '../explorerLink';

const ResponsiveBox = withStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		flexWrap: 'wrap',
	},
}))(Box);

const useRowStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
	innerBorder: {
		backgroundColor:
			theme.palette.type === 'dark'
				? fade(theme.palette.common.white, 0.04)
				: fade(theme.palette.common.black, 0.04),
	},
}));

const OwnedPoolTableRow = ({ pool }: { pool: PoolInfo }) => {
	const styles = useRowStyles();
	const pools = useMemo(() => [pool].filter(p => p) as PoolInfo[], [pool]);
	const enriched = useEnrichedPools(pools)[0];
	const { userAccounts } = useUserAccounts();
	const [open, setOpen] = useState(false);

	const baseMintAddress = pool.pubkeys.holdingMints[0].toBase58();
	const quoteMintAddress = pool.pubkeys.holdingMints[1].toBase58();
	const lpMint = useMint(pool.pubkeys.mint);

	const ratio =
		userAccounts
			.filter(f => pool.pubkeys.mint.equals(f.info.mint))
			.reduce((acc, item) => item.info.amount.toNumber() + acc, 0) / (lpMint?.supply.toNumber() || 0);

	const sortedUserAccounts = userAccounts
		.filter(f => pool.pubkeys.mint.equals(f.info.mint))
		.sort((a, b) => a.info.amount.toNumber() - b.info.amount.toNumber());

	const largestUserAccount = sortedUserAccounts.length > 0 ? sortedUserAccounts[0] : null;

	if (!enriched) {
		return null;
	}

	return (
		<>
			<TableRow className={styles.root}>
				<TableCell>
					<Grid container alignItems="center" spacing={1}>
						<Grid item>
							<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
								{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</IconButton>
						</Grid>
						<Grid item>
							<PoolIcon
								mintA={baseMintAddress}
								mintB={quoteMintAddress}
								className="left-icon"
								style={{ display: 'inline-flex' }}
							/>
						</Grid>
						<Grid item>{enriched?.name}</Grid>
					</Grid>
				</TableCell>
				<TableCell align="right">{formatUSD.format(ratio * enriched.liquidity)}</TableCell>
				<TableCell align="right">{formatNumber.format(ratio * enriched.supply)}</TableCell>
				<TableCell align="right">
					{enriched.fees24h * ratio < 0.005 ? '< ' : ''}
					{formatUSD.format(enriched.fees24h * ratio)}
				</TableCell>
			</TableRow>
			<TableRow className={styles.root}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
					<Collapse in={open} timeout="auto" unmountOnExit collapsedHeight={0} component="span">
						<Grid container justify="space-between">
							<Grid item xs={12}>
								<Divider className={styles.innerBorder} />
							</Grid>
							<ResponsiveBox>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<Typography color="textSecondary">
											<Trans>Pool liquidity</Trans>
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<Typography>{formatUSD.format(enriched.liquidity)}</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<Typography>
											{formatNumber.format(enriched.liquidityA)} {enriched.names[0]}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<Typography>
											{formatNumber.format(enriched.liquidityB)} {enriched.names[1]}
										</Typography>
									</Box>
								</Grid>
							</ResponsiveBox>
							<Grid item xs={12}>
								<Divider className={styles.innerBorder} />
							</Grid>
							<Box mt={2} mb={2} width={1} component={props => <Grid container {...props} />}>
								<Grid item xs={6}>
									<Typography color="textSecondary">
										<Trans>LP Supply</Trans>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									{formatNumber.format(enriched.supply)}
								</Grid>
								<Grid item xs={6}>
									<Typography color="textSecondary">
										<Trans>Value per token</Trans>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.liquidity / enriched.supply)}
								</Grid>
								<Grid item xs={6}>
									<Typography color="textSecondary">
										<Trans>Volume (24h)</Trans>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.volume24h)}
								</Grid>
								<Grid item xs={6}>
									<Typography color="textSecondary">
										<Trans>Fees (24h)</Trans>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.fees24h)}
								</Grid>
								<Grid item xs={6}>
									<Typography color="textSecondary">
										<Trans>Approx. APY (24h)</Trans>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.apy24h)}
								</Grid>
							</Box>
							<Grid item xs={12}>
								<Divider className={styles.innerBorder} />
							</Grid>
							<ResponsiveBox>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<Typography color="textSecondary">
											<Trans>Address</Trans>
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<ExplorerLink address={enriched.address} type="account" length={4} />
									</Box>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<ExplorerLink
											address={pool.pubkeys.holdingAccounts[0]}
											type="account"
											length={4}
										/>{' '}
										{enriched.names[0]}
									</Box>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Box component="div" display="flex" alignItems="center">
										<ExplorerLink
											address={pool.pubkeys.holdingAccounts[1]}
											type="account"
											length={4}
										/>{' '}
										{enriched.names[1]}
									</Box>
								</Grid>
							</ResponsiveBox>
							{largestUserAccount && (
								<>
									<Grid item xs={12}>
										<Divider className={styles.innerBorder} />
									</Grid>
									<ResponsiveBox>
										<Grid item xs={12}>
											<Box component="div" display="flex" alignItems="center">
												<RemoveLiquidity instance={{ pool, account: largestUserAccount }} />
											</Box>
										</Grid>
									</ResponsiveBox>
								</>
							)}
						</Grid>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default OwnedPoolTableRow;
