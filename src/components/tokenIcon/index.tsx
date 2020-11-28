import { Identicon } from './../identicon';
import React from 'react';
import { getTokenIcon } from '../../utils/utils';
import { useConnectionConfig } from '../../utils/connection';
import { Box } from '@material-ui/core';

export const TokenIcon = (props: { mintAddress: string; style?: React.CSSProperties; className?: string }) => {
	const { tokenMap } = useConnectionConfig();
	const icon = getTokenIcon(tokenMap, props.mintAddress);

	if (icon) {
		return (
			<img
				alt="Token icon"
				width={24}
				height={24}
				className={props.className}
				key={props.mintAddress}
				src={icon}
				style={{
					borderRadius: '50%',
					...props.style,
				}}
			/>
		);
	}

	return (
		<Identicon
			address={props.mintAddress}
			style={{
				borderRadius: '50%',
				width: 24,
				height: 24,
				...props.style,
			}}
		/>
	);
};

export const PoolIcon = (props: { mintA: string; mintB: string; style?: React.CSSProperties; className?: string }) => {
	return (
		<Box display="inline-flex" className={props.className}>
			<TokenIcon mintAddress={props.mintA} style={{ zIndex: 1, marginRight: '-0.5rem', ...props.style }} />
			<TokenIcon mintAddress={props.mintB} />
		</Box>
	);
};
