import React, { FC } from 'react';
import { emphasize, makeStyles } from '@material-ui/core/styles';
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
		boxShadow:
			'rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px',
		backgroundColor: emphasize(theme.palette.background.default, 0.05),
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
