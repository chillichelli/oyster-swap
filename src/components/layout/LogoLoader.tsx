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

const LogoLoader = () => {
	const styles = useStyles();
	return (
		<Box
			className={styles.animatedItem}
			position="fixed"
			left="50%"
			top="50%"
			mt={-2.5}
			ml={-2.5}
			width={40}
			height={40}
		>
			<Logo width="100%" height="100%" />
		</Box>
	);
};

export default LogoLoader;
