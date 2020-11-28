import React, { useLayoutEffect, useRef, useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { getThemeByName } from '../themes';
import useColorScheme from '../hooks/useColorScheme';

export const ThemeContext = React.createContext({
	setThemeName: (themeName: string): void => {},
	themeName: '',
});

const ThemeProvider: React.FC = props => {
	const scheme = useColorScheme('dark');
	const firstUpdate = useRef(true);

	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		// system theme changed, set precedence to system
		localStorage.setItem('appThemePrecedence', 'system');
		_setThemeName(scheme ? 'dark' : 'light');
	}, [scheme]);

	// Read current theme from localStorage
	let curThemeName = scheme ? 'dark' : 'light';
	if (localStorage.getItem('appThemePrecedence') === 'ui') {
		curThemeName = localStorage.getItem('appTheme') || 'light';
	}

	// Set initial theme from localStorage
	const [themeName, _setThemeName] = useState(curThemeName);

	// Get theme from string
	const theme = getThemeByName(themeName);

	const setThemeName = (themeName: string): void => {
		localStorage.setItem('appTheme', themeName);

		// user changed theme manually, set precedence to default
		localStorage.setItem('appThemePrecedence', 'ui');
		_setThemeName(themeName);
	};

	return (
		<ThemeContext.Provider value={{ setThemeName, themeName }}>
			<MuiThemeProvider theme={{ ...theme }}>{props.children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
