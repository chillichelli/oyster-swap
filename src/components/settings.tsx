import React, { useContext } from 'react';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import { useWallet, WALLET_PROVIDERS } from '../utils/wallet';
import { Slippage } from './slippage';
import { Box, Button, Divider, fade, ListItemText, MenuItem, Select, Typography, useTheme } from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Popover from '@material-ui/core/Popover/Popover';
import RaisedIconButton from './layout/RaisedIconButton';
import { ThemeContext } from '../providers/ThemeProvider';
import { Trans } from '@lingui/macro';

export const Settings = () => {
	const { setThemeName, themeName } = useContext(ThemeContext);
	const theme = useTheme();
	const { providerUrl, setProvider } = useWallet();
	const { endpoint, setEndpoint } = useConnectionConfig();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<RaisedIconButton onClick={handleClick} style={{ height: 40 }}>
				<SettingsOutlinedIcon />
			</RaisedIconButton>
			<Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
				<Box p={1.5}>
					<Typography component="span" color="textPrimary">
						<Box component="span" fontWeight={500}>
							<Trans>Transaction Settings</Trans>
						</Box>
					</Typography>
					<Box mt={1} mb={1}>
						<Divider />
					</Box>
					<Typography component="span" color="textSecondary" variant="body2">
						<Box fontWeight={500}>
							<Trans>Slippage</Trans>
						</Box>
					</Typography>
					<Box mb={1} />
					<Slippage />
					<Box mt={1} mb={1}>
						<Divider />
					</Box>
					<Typography component="span" color="textSecondary" variant="body2">
						<Box fontWeight={500}>
							<Trans>Network</Trans>
						</Box>
					</Typography>
					<Box mb={1} />
					<Select
						IconComponent={props => <ExpandMoreRoundedIcon {...props} color="inherit" />}
						disableUnderline
						fullWidth
						onChange={(e: any) => setEndpoint(e.target.value)}
						value={endpoint}
					>
						{ENDPOINTS.map(({ name, endpoint }) => (
							<MenuItem value={endpoint} key={endpoint} dense>
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
					<Box mt={1} mb={1}>
						<Divider />
					</Box>
					<Typography component="span" color="textSecondary" variant="body2">
						<Box fontWeight={500}>
							<Trans>Wallet</Trans>
						</Box>
					</Typography>
					<Box mb={1} />
					<Select
						disableUnderline
						fullWidth
						onChange={e => setProvider(e.target.value)}
						value={providerUrl}
						IconComponent={props => <ExpandMoreRoundedIcon {...props} color="inherit" />}
					>
						{WALLET_PROVIDERS.map(({ name, url }) => (
							<MenuItem value={url} key={url} dense>
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
					<Box mt={1} mb={1}>
						<Divider />
					</Box>
					<Typography component="span" color="textSecondary" variant="body2">
						<Box fontWeight={500}>
							<Trans>Toggle dark mode</Trans>
						</Box>
					</Typography>
					<Box mb={1} />
					<Box
						style={{ backgroundColor: fade(theme.palette.text.primary, 0.12) }}
						display="inline-flex"
						alignItems="center"
						justifyContent="center"
						borderRadius={10}
					>
						<Button
							size="small"
							disableRipple
							disableElevation
							variant={themeName === 'dark' ? 'contained' : 'text'}
							color={themeName === 'dark' ? 'primary' : 'default'}
							onClick={() => setThemeName('dark')}
							style={{ fontSize: 16, letterSpacing: '-0.06em', minWidth: 42 }}
						>
							<Trans>On</Trans>
						</Button>
						<Button
							size="small"
							disableRipple
							disableElevation
							variant={themeName === 'light' ? 'contained' : 'text'}
							color={themeName === 'light' ? 'primary' : 'default'}
							onClick={() => setThemeName('light')}
							style={{ fontSize: 16, letterSpacing: '-0.06em', minWidth: 42 }}
						>
							<Trans>Off</Trans>
						</Button>
					</Box>
				</Box>
			</Popover>
		</>
	);
};
