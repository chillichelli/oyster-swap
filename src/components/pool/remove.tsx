import React, { useState } from 'react';

import { removeLiquidity } from '../../utils/pools';
import { useWallet } from '../../utils/wallet';
import { useConnection } from '../../utils/connection';
import { PoolInfo, TokenAccount } from '../../models';
import { notify } from '../../utils/notifications';
import { t, Trans } from '@lingui/macro';
import Button from '@material-ui/core/Button';

export const RemoveLiquidity = (props: { instance: { account: TokenAccount; pool: PoolInfo } }) => {
	const { account, pool } = props.instance;
	const [pendingTx, setPendingTx] = useState(false);
	const { wallet } = useWallet();
	const connection = useConnection();

	const onRemove = async () => {
		try {
			setPendingTx(true);
			// TODO: calculate percentage based on user input
			let liquidityAmount = account.info.amount.toNumber();
			await removeLiquidity(connection, wallet, liquidityAmount, account, pool);
		} catch {
			notify({
				description: t`Please try again and approve transactions from your wallet`,
				message: t`Removing liquidity cancelled.`,
				type: 'error',
			});
		} finally {
			setPendingTx(false);
			// TODO: force refresh of pool accounts?
		}
	};

	return (
		<>
			<Button variant="contained" color="primary" onClick={onRemove} disabled={pendingTx}>
				<Trans>Remove</Trans>
			</Button>
		</>
	);
};
