import React, { createRef, FC } from 'react';
import { SnackbarProvider as MuiSnackbarProvider } from 'notistack';
import { IconButton, useTheme } from '@material-ui/core';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { SnackbarUtilsConfigurator } from '../utils/snackbarUtils';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SnackbarProvider: FC = ({ children }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const notistackRef = createRef<MuiSnackbarProvider>();

	const onClickDismiss = (key: any) => () => {
		notistackRef.current?.closeSnackbar(key);
	};

	return (
		<MuiSnackbarProvider
			autoHideDuration={3000}
			hideIconVariant
			preventDuplicate
			dense={matches}
			maxSnack={3}
			anchorOrigin={{ horizontal: 'left', vertical: matches ? 'top' : 'bottom' }}
			ref={notistackRef}
			action={(key: any) => (
				<IconButton onClick={onClickDismiss(key)}>
					<ClearRoundedIcon />
				</IconButton>
			)}
		>
			<SnackbarUtilsConfigurator />
			{children}
		</MuiSnackbarProvider>
	);
};

export default SnackbarProvider;
