import { t } from '@lingui/macro';
import { Box, Button, Hidden, Typography } from '@material-ui/core';
import { PoolIcon } from './tokenIcon';
import React, { useContext, useMemo } from 'react';
import CardBase from './layout/CardBase';
import DefaultTable from './layout/DefaultTable/index';
import { CellProps } from 'react-table';
import { EnrichedDataContext } from '../providers/EnrichedDataProvider';
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
		accessor: 'name',
		sortType: 'basic',
		Cell: (props: CellProps<any>) => {
			const data = props.cell.row.original;
			const [mintA, mintB] = data.mints;
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
						<PoolIcon mintA={mintA} mintB={mintB} />
						<Box mr={1} />
						<Link
							color="secondary"
							component={props => <Button color="secondary" {...props} />}
							to={`/pair/${data.key}`}
						>
							{props.value}
						</Link>
					</Box>
				),
				// @ts-ignore
				[mintA, mintB, data.link, props.value, props.cell.rowIndex]
			);
		},
	},
	{
		align: 'right',
		accessor: 'liquidity',
		sortType: 'basic',
		Cell: valueFormatter,
		Header: t`Liquidity`,
	},
	// {
	// 	align: 'right',
	// 	accessor: 'supply',
	// 	sortType: 'basic',
	// 	Cell: ({ value }: any) => {
	// 		return `${(+value).toLocaleString('en-US', {
	// 			minimumFractionDigits: 4,
	// 			maximumFractionDigits: 4,
	// 		})}`;
	// 	},
	// 	Header: t`Supply`,
	// },
	{
		align: 'right',
		accessor: 'volume24h',
		sortType: 'basic',
		Cell: valueFormatter,
		Header: t`Volume (24h)`,
	},
	{
		align: 'right',
		accessor: 'fees24h',
		sortType: 'basic',
		Cell: valueFormatter,
		Header: t`Fees (24h)`,
	},
	{
		align: 'right',
		accessor: 'apy',
		sortType: 'basic',
		Cell: ({ value }: any) => {
			return `${(+value * 100).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}
					%`;
		},
		Header: t`APY`,
	},
	// {
	// 	align: 'left',
	// 	Header: t`Address`,
	// 	accessor: 'key',
	// 	sortType: 'basic',
	// 	Cell: ({ value }: any) => {
	// 		return <ExplorerLink address={value} type="address" />;
	// 	},
	// },
];

interface ITopPairs {
	initialState?: {};
}

const TopPairs = ({ initialState }: ITopPairs) => {
	const { enrichedPools } = useContext(EnrichedDataContext);
	return (
		<>
			<CardBase width={1} mb={3}>
				<DefaultTable
					columns={columns}
					data={enrichedPools}
					initialState={initialState || { sortBy: [{ id: 'liquidity', desc: true }] }}
				/>
			</CardBase>
		</>
	);
};

export default TopPairs;
