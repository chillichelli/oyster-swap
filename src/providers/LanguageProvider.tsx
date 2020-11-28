import React, { FC, useState } from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import { en, ru, ko, zh, es } from 'make-plural/plurals';
import { messages as messagesEn } from '../locale/en/messages.js';
import { messages as messagesKo } from '../locale/ko/messages.js';
import { messages as messagesRu } from '../locale/ru/messages.js';
import { messages as messagesEs } from '../locale/es/messages.js';
import { messages as messagesZh } from '../locale/zh/messages.js';

// Load plurals
i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('es', { plurals: es });
i18n.loadLocaleData('ru', { plurals: ru });
i18n.loadLocaleData('ko', { plurals: ko });
i18n.loadLocaleData('zh', { plurals: zh });

// Load all languages
i18n.load({ en: messagesEn, ru: messagesRu, es: messagesEs, zh: messagesZh, ko: messagesKo });

export const LanguageContext = React.createContext({
	setLanguage: (language: string): void => {},
	language: '',
});

const LanguageProvider: FC = ({ children }) => {
	const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

	const _setLanguage = (language: string): void => {
		localStorage.setItem('language', language);
		setLanguage(language);
	};

	i18n.activate(language);

	return (
		<LanguageContext.Provider value={{ setLanguage: _setLanguage, language }}>
			<I18nProvider i18n={i18n}>{children}</I18nProvider>
		</LanguageContext.Provider>
	);
};

export default LanguageProvider;
