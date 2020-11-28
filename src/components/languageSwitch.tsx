import { Box, Menu, MenuItem } from '@material-ui/core';
import React, { useContext } from 'react';
import { LanguageContext } from '../providers/LanguageProvider';
import RaisedIconButton from './layout/RaisedIconButton';

const languages: Record<string, any> = {
	en: {
		flag: '🇬🇧',
	},
	es: {
		flag: '🇪🇸',
	},
	ru: {
		flag: '🇷🇺',
	},
	ko: {
		flag: '🇰🇷',
	},
	zh: {
		flag: '🇨🇳',
	},
};

const LanguageSwitch = () => {
	const { language, setLanguage } = useContext(LanguageContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onSelectLanguage = (language: string) => {
		handleClose();
		setLanguage(language);
	};

	return (
		<>
			<RaisedIconButton style={{ padding: '4px 8px' }} onClick={handleClick}>
				{languages[language].flag}
			</RaisedIconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{Object.entries(languages).map(([k, v]) => (
					<MenuItem key={k} disableGutters onClick={() => onSelectLanguage(k)}>
						<Box component="span" fontSize={24}>
							{v.flag}
						</Box>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default LanguageSwitch;
