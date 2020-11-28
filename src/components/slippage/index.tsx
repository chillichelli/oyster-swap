import { Box, Button, Grid, Input, InputAdornment, makeStyles, useTheme } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSlippageConfig } from './../../utils/connection';

const PRESETS = [0.1, 0.5, 1.0];

const useStyles = makeStyles(theme => ({
	root: {
		borderRadius: 10,
		padding: '0 10px',
		height: 30,
		boxSizing: 'border-box',
	},
	input: {
		fontSize: 16,
		color: theme.palette.text.primary,
		boxShadow: 'none',
		borderColor: 'transparent',
		outline: 'transparent',
		textAlign: 'right',
		fontWeight: 500,
		width: 50,
	},
}));

export const Slippage = () => {
	const theme = useTheme();
	const { slippage, setSlippage } = useSlippageConfig();
	const styles = useStyles();
	const slippagePct = slippage * 100;
	const [value, setValue] = useState(slippagePct.toString());
	let inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		setValue(slippagePct.toString());
	}, [slippage, slippagePct]);

	const isSelected = (val: number) => {
		return val === slippagePct ? 'contained' : 'outlined';
	};

	const handleSlippage = (val: number) => {
		setSlippage(val / 100.0);
		(inputRef as any).current.value = '';
	};

	return (
		<Grid container alignItems="center" spacing={1}>
			<Grid item>
				<Grid container spacing={1}>
					{PRESETS.map(item => {
						return (
							<Grid item key={item}>
								<Button
									size="small"
									disableRipple
									disableElevation
									variant={isSelected(item)}
									color={item === slippagePct ? 'primary' : 'default'}
									key={item.toString()}
									onClick={() => handleSlippage(item)}
									style={{ fontSize: 16, letterSpacing: '-0.06em' }}
								>
									{item}%
								</Button>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
			<Box component={Grid} flexGrow={1} />
			<Grid item>
				<Input
					style={{
						border: `1px solid ${
							PRESETS.includes(slippagePct) ? theme.palette.divider : theme.palette.primary.main
						}`,
					}}
					disableUnderline
					inputRef={inputRef}
					placeholder={value}
					classes={styles}
					onChange={(e: any) => {
						setValue(e.target.value);
						const newValue = parseFloat(e.target.value) / 100.0;
						if (Number.isFinite(newValue)) {
							setSlippage(newValue);
						}
					}}
					endAdornment={
						<InputAdornment position="end">
							<Box fontSize={16} fontWeight={500}>
								%
							</Box>
						</InputAdornment>
					}
				/>
			</Grid>
		</Grid>
	);
};
