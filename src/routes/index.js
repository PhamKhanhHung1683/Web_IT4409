import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import configs from '~/configs';
import Search from '~/pages/Search';
import Login from '~/pages/Auth/Login';
import Signup from '~/pages/Auth/Signup/Signup';
import ForgotPassword from '~/pages/Auth/ForgotPassword';
const publicRoutes = [
    { path: configs.routes.home, component: Home },
    { path: configs.routes.profile, component: Profile},
    {path:configs.routes.search, component:Search},
    { path: configs.routes.login, component: Login,layout:null},
    { path: configs.routes.signup, component: Signup,layout:null},
    { path: configs.routes.forgotPassword, component: ForgotPassword,layout:null}
];

export { publicRoutes };
