import React, { FC } from 'react';
import { emphasize, fade, makeStyles } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 10px',
		backgroundColor:
			theme.palette.type === 'dark' ? fade(theme.palette.common.black, 0.1) : theme.palette.common.white,
		border: `1px solid ${emphasize(theme.palette.background.default, 0.05)}`,
		borderRadius: 12,
		zIndex: 1,
		overflow: 'hidden',
	},
}));

const CardBase: FC<BoxProps> = ({ children, ...props }) => {
	const styles = useStyles();
	return (
		<Box className={styles.root} {...props}>
			{children}
		</Box>
	);
};

export default CardBase;
