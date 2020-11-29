import React from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import RaisedIconButton from './layout/RaisedIconButton';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Trans } from '@lingui/macro';
import TelegramIcon from '@material-ui/icons/Telegram';

const MoreInfo = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<RaisedIconButton onClick={handleClick} style={{ height: 40 }}>
				<MoreHorizRoundedIcon />
			</RaisedIconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					onClick={handleClose}
					component="a"
					target="_blank"
					href="https://github.com/chillichelli/oyster-swap"
				>
					<ListItemIcon>
						<CodeRoundedIcon />
					</ListItemIcon>
					<ListItemText>
						<Trans>Code</Trans>
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleClose} component="a" target="_blank" href="https://discord.gg/zxPsXcB">
					<ListItemIcon>
						<ChatRoundedIcon />
					</ListItemIcon>
					<ListItemText>
						<Trans>Discord</Trans>
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleClose} component="a" target="_blank" href="https://twitter.com/traderdome">
					<ListItemIcon>
						<TwitterIcon />
					</ListItemIcon>
					<ListItemText>
						<Trans>Twitter</Trans>
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleClose} component="a" target="_blank" href="https://t.me/ProjectSerum">
					<ListItemIcon>
						<TelegramIcon />
					</ListItemIcon>
					<ListItemText>
						<Trans>Telegram</Trans>
					</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default MoreInfo;
