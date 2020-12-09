export const VOLUME_API = 'https://serum-api.bonfida.com/pools/volumes';
export const LIQUIDITY_API = 'https://serum-api.bonfida.com/pools/liquidity';

export enum ChartView {
	VOLUME = 'VOLUME',
	LIQUIDITY = 'LIQUIDITY',
}

export interface BonfidaLiquidityData {
	liquidityAinUsd: number;
	liquidityBinUsd: number;
	time: number;
}

export interface BonfidaVolumeData {
	volume: number;
	time: number;
}

export interface TraderdomeLiquidityData {
	date: number;
	reserveUSD: number;
}
