import { t } from '@lingui/macro';
import { Box, Button, Hidden, Typography } from '@material-ui/core';
import { TokenIcon } from './tokenIcon';
import React, { useContext, useMemo } from 'react';
import CardBase from './layout/CardBase';
import DefaultTable from './layout/DefaultTable/index';
import { CellProps } from 'react-table';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';
import { formatUSD } from '../utils/utils';
import { Link } from 'react-router-dom';

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
							component={({ navigate, ...props }) => <Button color="secondary" {...props} />}
							to={`/token/${data.mint}`}
						>
							{props.value}
						</Link>
					</Box>
				),
				// @ts-ignore
				[data.mint, props.value, props.cell.rowIndex]
			);
		},
		sortDescFirst: true,
	},
	{
		align: 'right',
		Header: t`Liquidity`,
		accessor: 'liquidity',
		Cell: valueFormatter,
		sortDescFirst: true,
	},
	{
		align: 'right',
		Header: t`Volume (24h)`,
		accessor: 'volume24h',
		Cell: valueFormatter,
		sortDescFirst: true,
	},
	{
		align: 'right',
		Header: t`Price`,
		accessor: 'price',
		Cell: ({ value }: any) => formatUSD.format(value),
		sortDescFirst: true,
	},
];

interface ITopPairs {
	initialState?: {};
}

const TopTokens = ({ initialState }: ITopPairs) => {
	const { enrichedTokens } = useContext(EnrichedDataContext);

	return (
		<>
			<CardBase width={1}>
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
