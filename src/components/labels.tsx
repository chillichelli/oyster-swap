import { CurrencyContextState } from '../utils/currencyPair';
import { getTokenName, KnownTokenMap } from '../utils/utils';
import { t } from '@lingui/macro';

export const CREATE_POOL_LABEL = t`Create Liquidity Pool`;
export const INSUFFICIENT_FUNDS_LABEL = (tokenName: string) => t`Insufficient ${tokenName} funds`;
export const POOL_NOT_AVAILABLE = (tokenA: string, tokenB: string) => t`Pool ${tokenA}/${tokenB} doesn't exist`;
export const ADD_LIQUIDITY_LABEL = t`Provide Liquidity`;
export const SWAP_LABEL = t`Swap`;
export const CONNECT_LABEL = t`Connect Wallet`;
export const SELECT_TOKEN_LABEL = t`Select a token`;
export const ENTER_AMOUNT_LABEL = t`Enter an amount`;

export const generateActionLabel = (
	action: string,
	connected: boolean,
	tokenMap: KnownTokenMap,
	A: CurrencyContextState,
	B: CurrencyContextState,
	ignoreToBalance: boolean = false
) => {
	return !connected
		? CONNECT_LABEL
		: !A.mintAddress
		? SELECT_TOKEN_LABEL
		: !A.amount
		? ENTER_AMOUNT_LABEL
		: !B.mintAddress
		? SELECT_TOKEN_LABEL
		: !B.amount
		? ENTER_AMOUNT_LABEL
		: !A.sufficientBalance()
		? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, A.mintAddress))
		: ignoreToBalance || B.sufficientBalance()
		? action
		: INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, B.mintAddress));
};
