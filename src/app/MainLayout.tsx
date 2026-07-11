import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Header } from './header/Header.tsx';
import { useIntl } from 'react-intl';
import { isLocale } from './locales.ts';

const MainLayout = () => {
    const { locale: localeParam } = useParams();
    const { locale } = useIntl();

    if (!isLocale(localeParam)) {
        return <Navigate to={`/${locale}`} replace />;
    }

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
