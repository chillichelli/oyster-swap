import React from 'react';
import { shortenAddress } from '../utils/utils';
import { PublicKey } from '@solana/web3.js';
import { Link } from '@material-ui/core';

export const ExplorerLink = (props: {
	address: string | PublicKey;
	type: string;
	code?: boolean;
	style?: React.CSSProperties;
	length?: number;
}) => {
	const { type } = props;
	const address = typeof props.address === 'string' ? props.address : props.address?.toBase58();

	if (!address) {
		return null;
	}

	const length = props.length ?? 9;

	return (
		<Link
			href={`https://explorer.solana.com/${type}/${address}`}
			target="_blank"
			rel="noopener noreferrer"
			title={address}
			underline="none"
			color="secondary"
		>
			{shortenAddress(address, length)}
		</Link>
	);
};
