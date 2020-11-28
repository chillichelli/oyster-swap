import React from 'react';
import { PoolInfo } from '../../models';
import { ExplorerLink } from './../explorerLink';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@material-ui/core';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { TokenIcon } from '../tokenIcon';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import Popover from '@material-ui/core/Popover/Popover';
import { Trans } from '@lingui/macro';

const Address = (props: { address: string; mint?: string; style?: React.CSSProperties; label?: string }) => {
	return (
		<ListItem disableGutters button>
			{props.mint && (
				<ListItemIcon>
					<TokenIcon mintAddress={props.mint} />
				</ListItemIcon>
			)}
			<ListItemText
				inset={!props.mint}
				disableTypography
				primary={
					<Typography component="span" color="textPrimary">
						<Box display="flex" fontWeight={500}>
							<Box minWidth={56}>{props.label}</Box>
							<Box
								fontWeight={400}
								textOverflow="ellipsis"
								whiteSpace="nowrap"
								overflow="hidden"
								textAlign="right"
							>
								<ExplorerLink address={props.address} type="address" />
							</Box>
						</Box>
					</Typography>
				}
			/>
			<ListItemSecondaryAction color="textPrimary">
				<IconButton onClick={() => navigator.clipboard.writeText(props.address)}>
					<Box fontSize={16} display="flex">
						<FileCopyRoundedIcon fontSize="inherit" />
					</Box>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export const PoolAddress = (props: {
	pool?: PoolInfo;
	style?: React.CSSProperties;
	showLabel?: boolean;
	label?: string;
}) => {
	const { pool } = props;
	const label = props.label || 'Address';

	if (!pool?.pubkeys.account) {
		return null;
	}

	return <Address address={pool.pubkeys.account.toBase58()} style={props.style} label={label} />;
};

export const AccountsAddress = (props: {
	pool?: PoolInfo;
	style?: React.CSSProperties;
	aName?: string;
	aMint?: string;
	bName?: string;
	bMint?: string;
}) => {
	const { pool, aMint, bMint } = props;
	const account1 = pool?.pubkeys.holdingAccounts[0];
	const account2 = pool?.pubkeys.holdingAccounts[1];
	return (
		<>
			{account1 && <Address address={account1.toBase58()} mint={aMint} style={props.style} label={props.aName} />}
			{account2 && <Address address={account2.toBase58()} mint={bMint} style={props.style} label={props.bName} />}
		</>
	);
};

export const AdressesPopover = (props: {
	pool?: PoolInfo;
	aName?: string;
	aMint?: string;
	bName?: string;
	bMint?: string;
}) => {
	const { pool, aName, bName, aMint, bMint } = props;
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
			<IconButton onClick={handleClick} color="inherit">
				<ExploreOutlinedIcon />
			</IconButton>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Box p={1.5}>
					<Typography component="span" color="textPrimary">
						<Box fontWeight={600}>
							<Trans>Addresses</Trans>
						</Box>
					</Typography>
					<Box mt={1} mb={1}>
						<Divider />
					</Box>
					<Box mr={-2}>
						<List dense disablePadding>
							<AccountsAddress pool={pool} aName={aName} bName={bName} aMint={aMint} bMint={bMint} />
							<PoolAddress pool={pool} showLabel={true} label={'Pool'} />
						</List>
					</Box>
				</Box>
			</Popover>
		</>
	);
};
