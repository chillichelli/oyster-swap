import React from 'react';
import Logo from './Logo';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	animatedItem: {
		animationDirection: 'alternate',
		animation: `$myEffect 175ms ${theme.transitions.easing.easeInOut} infinite`,
	},
	'@keyframes myEffect': {
		'0%': {
			opacity: 1,
			transform: 'scale(1)',
		},
		'100%': {
			opacity: 1,
			transform: 'scale(1.04)',
		},
	},
}));

const LogoLoader = ({ width = 40, height = 40 }: { width?: number; height?: number }) => {
	const styles = useStyles();
	return (
		<Box className={styles.animatedItem} width={width} height={height}>
			<Logo width="100%" height="100%" />
		</Box>
	);
};

export default LogoLoader;
