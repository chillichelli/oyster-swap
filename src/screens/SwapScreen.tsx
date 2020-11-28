import React from 'react';
import DefaultLayout from '../components/defaultLayout';
import { TradeEntry } from '../components/trade';
import FormBase from '../components/layout/FormBase';

const SwapScreen = () => {
	// notify({
	// 	message: 'Trade executed',
	// 	type: 'success',
	// 	action: () => (
	// 		<Button
	// 			size="small"
	// 			component="a"
	// 			href={
	// 				'https://explorer.solana.com/transaction/5vUx3spzBCXh8mTuCHNVUQ3CeteBWTPTnzUSDDRrteKaDWciUn7TgG62p91JEjPUPurEMp9Nc7YxwSpZbusk97Y2'
	// 			}
	// 		>
	// 			explorer<sup>↗</sup>
	// 		</Button>
	// 	),
	// });

	return (
		<DefaultLayout>
			<FormBase>
				<TradeEntry />
			</FormBase>
		</DefaultLayout>
	);
};

export default SwapScreen;
