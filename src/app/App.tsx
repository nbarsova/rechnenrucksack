import { Route, Routes } from 'react-router-dom';
import './App.css';

import { puzzleKeys } from './puzzles';

import Puzzles from './puzzles/Puzzles';

import MainLayout from './MainLayout.tsx';
import LocaleProvider from './LocaleProvider.tsx';
import PuzzleLayout from './PuzzleLayout.tsx';
import TreasureHunt from '../components/treasure/TreasureHunt.tsx';
import SecretCode from '../components/secret/SecretCode.tsx';
import { LockMonster } from '../components/monster/LockMonster.tsx';
import PrintContainer from '../components/print/PrintContainer.tsx';

const App = () => {
    return (
        <LocaleProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Puzzles />} />
                    <Route element={<PuzzleLayout />}>
                        <Route
                            path={puzzleKeys.TREASURE_PUZZLE_KEY}
                            element={<TreasureHunt />}
                        />
                        <Route
                            path={puzzleKeys.SECRET_CODE_PUZZLE_KEY}
                            element={<SecretCode />}
                        />
                        <Route
                            path={puzzleKeys.MONSTER_PUZZLE_KEY}
                            element={<LockMonster />}
                        />
                    </Route>
                </Route>
                <Route path="/print" element={<PrintContainer />} />
            </Routes>
        </LocaleProvider>
    );
};

export default App;
