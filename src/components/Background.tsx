import React, { FC } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(circle, ${fade(
			theme.palette.primary.main,
			theme.palette.type === 'dark' ? 0.2 : 0.45
		)} 0%, ${fade(theme.palette.background.default, 0.001)} 40%)`,
	},
}));

const Background: FC = ({ children }) => {
	const styles = useStyles();
	const location = useLocation();
	return (
		<>
			{location.pathname.indexOf('info') < 0 &&
				location.pathname.indexOf('pool') < 0 &&
				location.pathname.indexOf('pairs') < 0 &&
				location.pathname.indexOf('tokens') < 0 &&
				location.pathname.indexOf('token/') < 0 &&
				location.pathname.indexOf('pair/') < 0 && (
					<Box
						position="absolute"
						left={0}
						top={0}
						mt={'-10%'}
						height="100%"
						right={0}
						className={styles.root}
					/>
				)}
			<Box position="relative">{children}</Box>
		</>
	);
};

export default Background;
