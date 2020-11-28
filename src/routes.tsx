import { HashRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { WalletProvider } from './utils/wallet';
import { ConnectionProvider } from './utils/connection';
import { AccountsProvider } from './utils/accounts';
import { CurrencyPairProvider } from './utils/currencyPair';
import { MarketProvider } from './context/market';
import { PoolOverview } from './components/pool/view';
import { CssBaseline } from '@material-ui/core';
import { AddView } from './components/pool/addView';
import Background from './components/Background';
import ThemeProvider from './providers/ThemeProvider';
import SnackbarProvider from './providers/SnackbarProvider';
import LanguageProvider from './providers/LanguageProvider';
import PairsScreen from './screens/PairsScreen';
import TokensScreen from './screens/TokensScreen';
import EnrichedDataProvider from './providers/EnrichedDataProvider';
import ChartsScreen from './screens/ChartsScreen';
import PairScreen from './screens/PairScreen';
import SwapScreen from './screens/SwapScreen';

export function Routes() {
	return (
		<>
			<HashRouter basename={'/'}>
				<ConnectionProvider>
					<WalletProvider>
						<AccountsProvider>
							<MarketProvider>
								<CurrencyPairProvider>
									<LanguageProvider>
										<ThemeProvider>
											<CssBaseline />
											<SnackbarProvider>
												<Background>
													<Switch>
														<Route exact path="/" component={SwapScreen} />
														<Route exact path="/pool" component={() => <PoolOverview />} />
														<Route exact path="/add" component={() => <AddView />} />
														<EnrichedDataProvider>
															<Route
																exact
																path="/pairs"
																component={() => <PairsScreen />}
															/>
															<Route exact path="/pair/:address" component={PairScreen} />
															<Route
																exact
																path="/info"
																component={() => <ChartsScreen />}
															/>
															<Route
																exact
																path="/tokens"
																component={() => <TokensScreen />}
															/>
														</EnrichedDataProvider>
													</Switch>
												</Background>
											</SnackbarProvider>
										</ThemeProvider>
									</LanguageProvider>
								</CurrencyPairProvider>
							</MarketProvider>
						</AccountsProvider>
					</WalletProvider>
				</ConnectionProvider>
			</HashRouter>
		</>
	);
}
