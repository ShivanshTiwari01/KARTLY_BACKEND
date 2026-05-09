import { type PropsWithChildren } from 'react';
import Header from '@components/layout/Header/Header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen bg-background text-text'>
      <Header />
      <main className='mx-auto max-w-7xl p-4'>{children}</main>
    </div>
  );
}
