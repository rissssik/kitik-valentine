import { createBrowserRouter } from 'react-router';
import { ValentineQuestion } from './screens/ValentineQuestion';
import { ApologyScreen } from './screens/ApologyScreen';
import { GiftChoice } from './screens/GiftChoice';
import { HeartGame } from './screens/HeartGame';
import { FinalScreen } from './screens/FinalScreen';
import { BackgroundParticles } from './components/BackgroundParticles';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-400 relative overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ValentineQuestion />
      </Layout>
    ),
  },
  {
    path: '/apology',
    element: (
      <Layout>
        <ApologyScreen />
      </Layout>
    ),
  },
  {
    path: '/gift',
    element: (
      <Layout>
        <GiftChoice />
      </Layout>
    ),
  },
  {
    path: '/game',
    element: (
      <Layout>
        <HeartGame />
      </Layout>
    ),
  },
  {
    path: '/final',
    element: (
      <Layout>
        <FinalScreen />
      </Layout>
    ),
  },
]);
