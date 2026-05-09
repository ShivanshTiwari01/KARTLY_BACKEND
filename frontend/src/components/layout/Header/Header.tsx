import { ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className='bg-surface text-text border-b border-border shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 py-3 flex items-center justify-between'>
        <a href='/' className='flex items-center gap-2 font-bold text-lg'>
          <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
            Kartly
          </span>
        </a>

        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <a href='#' className='text-text-muted hover:text-text'>
            Home
          </a>
          <a href='#' className='text-text-muted hover:text-text'>
            Shop
          </a>
          <a href='#' className='text-text-muted hover:text-text'>
            About
          </a>
          <a href='#' className='text-text-muted hover:text-text'>
            Contact
          </a>
        </nav>

        <button className='inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm hover:shadow-md'>
          <ShoppingCart className='h-4 w-4' />
          <span>Cart</span>
        </button>
      </div>
    </header>
  );
}
