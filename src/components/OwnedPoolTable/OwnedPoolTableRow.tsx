import React, { useMemo, useState } from 'react';
import { Box, Collapse, Grid, IconButton, TableCell, TableRow } from '@material-ui/core';
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

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
});

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
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>
					<Box display="flex" alignItems="center">
						<PoolIcon
							mintA={baseMintAddress}
							mintB={quoteMintAddress}
							className="left-icon"
							style={{ display: 'inline-flex' }}
						/>
						<Box ml={1}>{enriched?.name}</Box>
					</Box>
				</TableCell>
				<TableCell align="right">{formatUSD.format(ratio * enriched.liquidity)}</TableCell>
				<TableCell align="right">{ratio * enriched.supply}</TableCell>
				<TableCell align="right">
					{enriched.fees24h * ratio < 0.005 ? '< ' : ''}
					{formatUSD.format(enriched.fees24h * ratio)}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} />
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
					<Collapse in={open} timeout="auto" unmountOnExit collapsedHeight={0}>
						<Box mb={2} p={2}>
							<Grid container justify="space-between">
								<Grid item xs={6}>
									<Trans>Pool liquidity</Trans>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.liquidity)}
								</Grid>
								<Grid item xs={6} />
								<Grid item>
									{formatNumber.format(enriched.liquidityA)} {enriched.names[0]}
								</Grid>
								<Grid item xs={6} />
								<Grid item>
									{formatNumber.format(enriched.liquidityB)} {enriched.names[1]}
								</Grid>
								<Grid item xs={6}>
									<Trans>LP Supply</Trans>
								</Grid>
								<Grid item xs={6}>
									{formatNumber.format(enriched.supply)}
								</Grid>
								<Grid item xs={6}>
									<Trans>Value per token</Trans>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.liquidity / enriched.supply)}
								</Grid>
								<Grid item xs={6}>
									<Trans>Volume (24h)</Trans>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.volume24h)}
								</Grid>
								<Grid item xs={6}>
									<Trans>Fees (24h)</Trans>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.fees24h)}
								</Grid>
								<Grid item xs={6}>
									<Trans>Approx. APY (24h)</Trans>
								</Grid>
								<Grid item xs={6}>
									{formatUSD.format(enriched.apy24h)}
								</Grid>
								<Grid item xs={6}>
									<Trans>Address</Trans>
								</Grid>
								<Grid item xs={6}>
									<ExplorerLink address={enriched.address} type="account" length={4} />
								</Grid>
								<Grid item xs={6} />
								<Grid item xs={6}>
									<ExplorerLink address={pool.pubkeys.holdingAccounts[0]} type="account" length={4} />
									{enriched.names[0]}
								</Grid>
								<Grid item xs={6} />
								<Grid item xs={6}>
									<ExplorerLink address={pool.pubkeys.holdingAccounts[1]} type="account" length={4} />
									{enriched.names[1]}
								</Grid>
								{largestUserAccount && (
									<Grid item xs={12}>
										<RemoveLiquidity instance={{ pool, account: largestUserAccount }} />
									</Grid>
								)}
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default OwnedPoolTableRow;
