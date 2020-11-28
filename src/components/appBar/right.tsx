import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { AccountInfo } from '../accountInfo';
import { useWallet } from '../../utils/wallet';
import { Settings } from '../settings';
import RaisedButton from '../layout/RaisedButton';
import { Trans } from '@lingui/macro';

const AppBarRight = () => {
	const { connected, wallet } = useWallet();

	return (
		<Grid container spacing={1} justify="flex-end">
			<Box component={Grid} alignItems="center" mr={1} display="flex">
				<AccountInfo />
			</Box>
			{!connected && (
				<Grid item>
					<RaisedButton
						style={{ height: 40 }}
						disableRipple
						onClick={connected ? wallet.disconnect : wallet.connect}
					>
						<Trans>Connect</Trans>
					</RaisedButton>
				</Grid>
			)}
			{/*<Grid item>*/}
			{/*	<LanguageSwitch />*/}
			{/*</Grid>*/}
			<Grid item>
				<Settings />
			</Grid>
		</Grid>
	);
};

export default AppBarRight;
