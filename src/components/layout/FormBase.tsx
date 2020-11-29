import React, { FC } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, BoxProps, Typography } from '@material-ui/core';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles(theme => ({
	root: {
		overflow: 'hidden',
		borderRadius: 20,
		maxWidth: theme.spacing(52),
		zIndex: 1,
		margin: theme.spacing(2),
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor:
			theme.palette.type === 'dark'
				? fade(theme.palette.common.black, 0.07)
				: fade(theme.palette.common.white, 0.7),
	},
}));

const FormBase: FC<BoxProps> = ({ children, ...props }) => {
	const styles = useStyles();
	return (
		<Box mt={5}>
			<Box display="flex" justifyContent="center">
				<Typography>
					<Trans>Swap is unaudited software. Use at your own risk</Trans>
				</Typography>
			</Box>
			<Box className={[styles.root].join(' ')} {...props}>
				{children}
			</Box>
		</Box>
	);
};

export default FormBase;
