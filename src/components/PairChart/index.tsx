import React, { useCallback, useEffect, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatNumber, formatShortDate, formatUSD, toK, toNiceDate } from '../../utils/utils';
import { Box, darken, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { PoolInfo } from '../../models';
import { Trans } from '@lingui/macro';
import LogoLoader from '../layout/LogoLoader';
import {
	BonfidaLiquidityData,
	BonfidaVolumeData,
	ChartView,
	LIQUIDITY_API,
	TraderdomeLiquidityData,
	VOLUME_API,
} from './types';

interface IPairChart {
	color: string;
	type: ChartView;
	pool?: PoolInfo;
}

const PairChart = ({ color, type, pool }: IPairChart) => {
	const theme = useTheme();
	const [chartView] = useState<ChartView>(type);
	const [liquidityChartData, setLiquidityChartData] = useState<TraderdomeLiquidityData[]>([]);
	const [volumeChartData, setVolumeChartData] = useState<BonfidaVolumeData[]>([]);

	let apiFilter: string = '';

	if (pool) {
		const baseMintAddress = pool.raw.pubkeys.holdingMints[0].toBase58();
		const quoteMintAddress = pool.raw.pubkeys.holdingMints[1].toBase58();
		apiFilter = `?mintA=${baseMintAddress}&mintB=${quoteMintAddress}`;
	}

	const bonfidaLiquidityQuery = useCallback(async filter => {
		try {
			const resp = await window.fetch(`${LIQUIDITY_API}${filter}`);
			const data = await resp.json();
			const liquidityData = data?.data.slice(0, 7) as BonfidaLiquidityData[];

			const transformed = liquidityData.map<TraderdomeLiquidityData>(el => ({
				date: el.time / 1000,
				reserveUSD: el.liquidityAinUsd + el.liquidityBinUsd,
			}));

			setLiquidityChartData(transformed);
		} catch (e) {
			console.log(e);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const bonfidaVolumeQuery = useCallback(async filter => {
		try {
			const resp = await window.fetch(`${VOLUME_API}${filter}`);
			const data = await resp.json();
			const volumeData = data?.data.slice(0, 30) as BonfidaVolumeData[];

			setVolumeChartData(volumeData);
		} catch (e) {
			console.log(e);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (chartView === ChartView.VOLUME) bonfidaVolumeQuery(apiFilter);
		if (chartView === ChartView.LIQUIDITY) bonfidaLiquidityQuery(apiFilter);
	}, [apiFilter]);

	const below1600 = useMediaQuery(theme.breakpoints.down('xl'));
	const below1080 = useMediaQuery(theme.breakpoints.down('lg'));
	const aspect = below1080 ? 60 / 20 : below1600 ? 60 / 28 : 60 / 22;

	return (
		<>
			<Typography variant="body1" color="textSecondary">
				{chartView === ChartView.LIQUIDITY && <Trans>Liquidity</Trans>}
				{chartView === ChartView.VOLUME && <Trans>Volume</Trans>}
			</Typography>
			{chartView === ChartView.LIQUIDITY && (
				<ResponsiveContainer aspect={aspect}>
					{liquidityChartData.length === 0 ? (
						<Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
							<LogoLoader width={32} height={32} />
						</Box>
					) : (
						<AreaChart
							margin={{ top: 0, right: 10, bottom: 6, left: 0 }}
							barCategoryGap={1}
							data={liquidityChartData}
						>
							<defs>
								<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={color} stopOpacity={0.35} />
									<stop offset="95%" stopColor={color} stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis
								tickLine={false}
								axisLine={false}
								interval="preserveEnd"
								tickMargin={14}
								minTickGap={80}
								tickFormatter={tick => toNiceDate(tick)}
								dataKey="date"
								tick={{ fill: theme.palette.text.primary }}
								type={'number'}
								domain={['dataMin', 'dataMax']}
							/>
							<YAxis
								type="number"
								orientation="right"
								tickFormatter={tick => '$' + toK(tick)}
								axisLine={false}
								tickLine={false}
								interval="preserveEnd"
								minTickGap={80}
								yAxisId={0}
								tickMargin={16}
								tick={{ fill: theme.palette.text.primary }}
							/>
							<Tooltip
								cursor={true}
								formatter={val => formatUSD.format(+val)}
								labelFormatter={label => formatShortDate.format(new Date(+label * 1000))}
								labelStyle={{ paddingTop: 4 }}
								contentStyle={{
									padding: '10px 14px',
									borderRadius: 10,
									borderColor: color,
									color: 'black',
								}}
								wrapperStyle={{ top: -70, left: -10 }}
							/>
							<Area
								strokeWidth={2}
								dot={false}
								type="monotone"
								name={' (USD)'}
								dataKey={'reserveUSD'}
								yAxisId={0}
								stroke={darken(color, 0.12)}
								fill="url(#colorUv)"
							/>
						</AreaChart>
					)}
				</ResponsiveContainer>
			)}
			{chartView === ChartView.VOLUME && (
				<ResponsiveContainer aspect={aspect}>
					{volumeChartData.length === 0 ? (
						<Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
							<LogoLoader width={32} height={32} />
						</Box>
					) : (
						<BarChart
							margin={{ top: 0, right: 0, bottom: 6, left: below1080 ? 0 : 10 }}
							barCategoryGap={1}
							data={volumeChartData}
						>
							<XAxis
								tickLine={false}
								axisLine={false}
								interval="preserveEnd"
								minTickGap={80}
								tickMargin={14}
								tickFormatter={tick => toNiceDate(tick / 1000)}
								dataKey="time"
								tick={{ fill: theme.palette.text.primary }}
								type={'number'}
								domain={['dataMin', 'dataMax']}
							/>
							<YAxis
								type="number"
								axisLine={false}
								tickMargin={16}
								tickFormatter={tick => '$' + toK(tick)}
								tickLine={false}
								interval="preserveEnd"
								orientation="right"
								minTickGap={80}
								yAxisId={0}
								tick={{ fill: theme.palette.text.primary }}
							/>
							<Tooltip
								cursor={{ fill: color, opacity: 0.1 }}
								formatter={val => formatNumber.format(+val)}
								labelFormatter={label => formatShortDate.format(+label)}
								labelStyle={{ paddingTop: 4 }}
								contentStyle={{
									padding: '10px 14px',
									borderRadius: 10,
									borderColor: color,
									color: 'black',
								}}
								wrapperStyle={{ top: -70, left: -10 }}
							/>
							<Bar
								name={'Volume'}
								dataKey={'volume'}
								fill={color}
								opacity={'0.4'}
								yAxisId={0}
								stroke={color}
							/>
						</BarChart>
					)}
				</ResponsiveContainer>
			)}
		</>
	);
};

export default PairChart;
