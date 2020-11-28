import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import SnackbarUtils from './snackbarUtils';

export function notify({
	message = '',
	type = 'info',
	action = undefined as any,
	description = undefined as any,
	txid = '',
	placement = 'bottomLeft',
}) {
	let msg: string | React.ReactNode = message;
	if (description) {
		msg = (
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="subtitle1">{message}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color="textPrimary">{description}</Typography>
				</Grid>
			</Grid>
		);
	}

	(SnackbarUtils as any)[type](msg, action);
}
