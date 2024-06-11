import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AuthPage from './Pages/AuthPage/AuthPage';
import PageLayout from './Layout/PageLayout';
import './GlobalStyle.scss';
import ScreenContextProvider from './contexts/ScreenContext';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import useAuthStore from './stores/authStore';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from './Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostPage from './PostPage/PostPage';
import TicTacToe from './Pages/Game/TicTacToe/TicTacToe';
import InGame from './Pages/Game/TicTacToe/InGame';
function App() {
    const authUser = useAuthStore((state) => state.user);
    const { setUser } = useAuthStore();
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        let unsub;
        if (authUser) {
            unsub = onSnapshot(doc(firestore, 'users', authUser.uid), (userSnapShot) => {
                setUser(userSnapShot.data());
                localStorage.setItem('user-info', JSON.stringify(userSnapShot.data()));
            });
        }
        return unsub;
    }, [authUser]);
    return (
        <Router>
            <ScreenContextProvider>
                <PageLayout>
                    <Routes>
                        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
                        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to={'/'} />} />
                        <Route
                            path="/profile/:nickname"
                            element={authUser ? <ProfilePage /> : <Navigate to="/auth" />}
                        />
                        <Route path="/post/:id" element={authUser ? <PostPage /> : <Navigate to="/auth" />} />
                        <Route path="/game/xo" element={authUser ? <TicTacToe /> : <Navigate to="/auth" />} />
                        <Route path="/game/xo/:id" element={authUser ? <InGame /> : <Navigate to="/auth" />} />
                        <Route path="*" element={<Navigate to="/" />} />                    
                    </Routes>
                </PageLayout>
            </ScreenContextProvider>
        </Router>
    );
}

export default App;
