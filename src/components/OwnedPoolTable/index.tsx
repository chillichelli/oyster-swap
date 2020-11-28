import { Trans } from '@lingui/macro';
import { Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import React from 'react';
import OwnedPoolTableRow from './OwnedPoolTableRow';
import { useOwnedPools } from '../../utils/pools';
import CardBase from '../layout/CardBase';

const OwnedPoolTable = () => {
	const owned = useOwnedPools();

	return (
		<CardBase>
			<TableContainer>
				<Table>
					<TableHead>
						<TableCell />
						<TableCell>
							<Trans>Liquidity Pool</Trans>
						</TableCell>
						<TableCell align="right">
							<Trans>Your liquidity</Trans>
						</TableCell>
						<TableCell align="right">
							<Trans>Your quantity</Trans>
						</TableCell>
						<TableCell align="right">
							<Trans>Your fees (24h)</Trans>
						</TableCell>
					</TableHead>
					<TableBody>
						{owned.map((el, i) => (
							<OwnedPoolTableRow pool={el.pool} key={i} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</CardBase>
	);
};

export default OwnedPoolTable;
