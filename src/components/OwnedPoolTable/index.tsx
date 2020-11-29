import { Trans } from '@lingui/macro';
import { fade, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@material-ui/core';
import React from 'react';
import OwnedPoolTableRow from './OwnedPoolTableRow';
import { useOwnedPools } from '../../utils/pools';
import CardBase from '../layout/CardBase';

const OwnedPoolTable = () => {
	const theme = useTheme();
	const owned = useOwnedPools();

	return (
		<CardBase
			style={{
				borderColor: fade(
					theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.common.black,
					0.12
				),
			}}
		>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
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
						</TableRow>
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
