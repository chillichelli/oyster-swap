import { t } from '@lingui/macro';
import { Box, Hidden, Link, Typography } from '@material-ui/core';
import { TokenIcon } from './tokenIcon';
import React, { useContext, useMemo } from 'react';
import CardBase from './layout/CardBase';
import DefaultTable from './layout/DefaultTable/index';
import { CellProps } from 'react-table';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';

const valueFormatter = ({ value }: any) => {
	return `$${value.toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})}`;
};

const columns = [
	{
		Header: t`Name`,
		accessor: 'symbol',
		Cell: (props: CellProps<any>) => {
			const data = props.cell.row.original;
			return useMemo(
				() => (
					<Box display="flex" alignItems="center">
						<Hidden xsDown>
							<Typography component="span">
								<Box mr={2} lineHeight={1}>
									{/*// @ts-ignore*/}
									{+props.cell.rowIndex + 1}
								</Box>
							</Typography>
						</Hidden>
						<TokenIcon mintAddress={data.mint} />
						<Box mr={1} />
						<Link
							color="secondary"
							component="a"
							href={data.link}
							target="_blank"
							rel="noopener noreferrer"
							underline="none"
						>
							{props.value}
						</Link>
					</Box>
				),
				// @ts-ignore
				[data.mint, data.link, props.value, props.cell.rowIndex]
			);
		},
	},
	{
		align: 'right',
		Header: t`Liquidity`,
		accessor: 'liquidity',
		Cell: valueFormatter,
	},
	{
		align: 'right',
		Header: t`Volume (24h)`,
		accessor: 'volume24h',
		Cell: valueFormatter,
	},
];

interface ITopPairs {
	initialState?: {};
}

const TopTokens = ({ initialState }: ITopPairs) => {
	const { enrichedTokens } = useContext(EnrichedDataContext);

	return (
		<>
			<CardBase width={1} mb={3}>
				<DefaultTable
					data={enrichedTokens}
					columns={columns}
					initialState={initialState || { sortBy: [{ id: 'liquidity', desc: true }] }}
				/>
			</CardBase>
		</>
	);
};

export default TopTokens;
