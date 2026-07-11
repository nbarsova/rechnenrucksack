import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import { puzzles } from './puzzles';

import Puzzles from './puzzles/Puzzles';

import MainLayout from './MainLayout.tsx';
import LocaleProvider from './LocaleProvider.tsx';
import PuzzleLayout from './PuzzleLayout.tsx';
import PrintContainer from '../components/print/PrintContainer.tsx';
import { LOCALES } from './locales.ts';
import { useIntl } from 'react-intl';

const LocaleRedirect = () => {
    const { locale } = useIntl();
    return <Navigate to={`/${locale}`} replace />;
};

const App = () => {
    return (
        <LocaleProvider>
            <Routes>
                <Route path="/" element={<LocaleRedirect />} />
                <Route path="/print" element={<PrintContainer />} />
                <Route path="/:locale" element={<MainLayout />}>
                    <Route index element={<Puzzles />} />
                    <Route element={<PuzzleLayout />}>
                        {puzzles.flatMap((puzzle) =>
                            LOCALES.map((locale) => (
                                <Route
                                    key={`${locale}-${puzzle.key}`}
                                    path={puzzle.slugs[locale]}
                                    element={puzzle.component}
                                />
                            )),
                        )}
                    </Route>
                </Route>
                <Route path="*" element={<LocaleRedirect />} />
            </Routes>
        </LocaleProvider>
    );
};

export default App;
