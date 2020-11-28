import React from 'react';
import { Link } from 'react-router-dom';
import MuiAppBar from '@material-ui/core/AppBar';
import { Box, Button, Container, Toolbar, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../layout/Logo';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles(theme => ({
	header: {
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			padding: `0 8px`,
		},
	},
}));

const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
	const styles = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<MuiAppBar color="transparent" position="relative" elevation={0} style={{ border: 'none' }}>
				<Toolbar disableGutters>
					<Container maxWidth="xl" className={styles.header}>
						<Grid container justify={matches ? 'space-between' : 'flex-start'} alignItems="center">
							<Grid item>
								<Link
									to="/"
									component={({ navigate, ...props }) => (
										<Box {...props} mr={1.5} display="flex">
											<Logo width={26} height={26} />
										</Box>
									)}
								/>
							</Grid>
							<Grid item xs>
								<Grid container alignItems="center">
									<Grid item>
										<Link
											component={({ navigate, ...props }) => (
												<Button disableRipple {...props} size="large" />
											)}
											to="/"
										>
											<Trans>Swap</Trans>
										</Link>
									</Grid>
									<Grid item>
										<Link
											component={({ navigate, ...props }) => (
												<Button disableRipple {...props} size="large" />
											)}
											to="/pool"
										>
											<Trans>Pool</Trans>
										</Link>
									</Grid>
									<Grid item>
										<Link
											component={({ navigate, ...props }) => (
												<Button disableRipple {...props} size="large" />
											)}
											to="/info"
										>
											<Trans>Charts</Trans>
										</Link>
									</Grid>
									{!matches && (
										<>
											<Grid item>
												<Button
													size="large"
													component="a"
													href="https://dex.projectserum.com"
													target="_blank"
													rel="noopener noreferrer"
												>
													<Trans>Trade</Trans>
													<sup>↗</sup>
												</Button>
											</Grid>
											<Grid item>
												<Button
													size="large"
													href="https://serum-academy.com/en/serum-swap/"
													target="_blank"
													rel="noopener noreferrer"
												>
													<Trans>Help</Trans>
													<sup>↗</sup>
												</Button>
											</Grid>
										</>
									)}
									<Box component={Grid} flexGrow={1} />
									{props.right}
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</MuiAppBar>
			<Box mb={3} />
		</>
	);
};

export default AppBar;
