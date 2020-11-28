import React from 'react';
import { useWallet } from '../utils/wallet';
import { shortenAddress } from '../utils/utils';
import { Identicon } from './identicon';
import { useNativeAccount } from '../utils/accounts';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Box, fade, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		height: 40,
		display: 'inline-flex',
		backgroundColor: fade(theme.palette.text.primary, 0.12),
		border: `1px solid ${fade(theme.palette.text.primary, 0.12)}`,
		overflow: 'hidden',
	},
	identicon: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: theme.spacing(1),
	},
	keyWrapper: {
		backgroundColor: fade(theme.palette.background.default, 0.48),
	},
}));

export const AccountInfo = (props: {}) => {
	const matches = useMediaQuery('(min-width:360px)');
	const styles = useStyles();
	const { wallet } = useWallet();
	const { account } = useNativeAccount();

	if (!wallet || !wallet.publicKey) {
		return null;
	}

	return (
		<Box display="inline" className={styles.container} borderRadius={10} alignItems="center">
			{matches && (
				<Box height={1} pl={1.5} pr={1.5} fontSize={16} color="text.primary" display="flex" alignItems="center">
					{((account?.lamports || 0) / LAMPORTS_PER_SOL).toFixed(6)} SOL
				</Box>
			)}
			<Box
				height={1}
				pl={1.5}
				pr={1.5}
				className={styles.keyWrapper}
				borderRadius={10}
				fontSize={16}
				display="flex"
				alignItems="center"
				color="text.primary"
			>
				{shortenAddress(`${wallet.publicKey}`)}
				<Identicon address={wallet.publicKey.toBase58()} className={styles.identicon} />
			</Box>
		</Box>
	);
};
