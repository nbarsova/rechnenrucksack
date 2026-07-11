import { Outlet } from 'react-router-dom';
import { Header } from './header/Header.tsx';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
