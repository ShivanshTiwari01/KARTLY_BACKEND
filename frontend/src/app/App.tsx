import MainLayout from '@/components/layout/MainLayout';

function App() {
  return (
    <>
      <MainLayout />
      <main className='mx-auto max-w-7xl p-4'>
        <div className='rounded-lg border border-border bg-surface p-6 shadow-sm'>
          <h1 className='text-2xl font-semibold'>Welcome to E-Store</h1>
          <p className='mt-2 text-text-muted'>
            If you can see this header and the styles, your setup is working.
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
