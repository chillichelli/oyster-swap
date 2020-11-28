import React, { FC } from 'react';
import { Hidden, Toolbar, AppBar as MuiAppBar, Grid, Box, Container } from '@material-ui/core';
import AppBar from './appBar';
import AppBarRight from './appBar/right';

const DefaultLayout: FC = ({ children }) => {
	return (
		<>
			<AppBar
				right={
					<Hidden xsDown implementation="css">
						<Box display="flex">
							<AppBarRight />
						</Box>
					</Hidden>
				}
			/>
			<Container maxWidth="lg">
				<>{children}</>
			</Container>
			<Hidden smUp>
				<Toolbar style={{ height: 72 }} />
				<MuiAppBar
					elevation={0}
					position="fixed"
					color="default"
					style={{
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
						bottom: 0,
						top: 'auto',
						padding: '0 12px',
						border: 'none',
						height: 72,
						justifyContent: 'center',
						display: 'flex',
					}}
				>
					<Grid container justify="flex-end">
						<AppBarRight />
					</Grid>
				</MuiAppBar>
			</Hidden>
		</>
	);
};

export default DefaultLayout;
