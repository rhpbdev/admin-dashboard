import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-slate-800">LegacyPrints</div>{' '}
        {/* Replace with your App Name/Logo */}
        <div className="space-x-4">
          <Button
            asChild
            variant="ghost"
            className="text-slate-700 hover:text-slate-900"
          >
            <Link href="/home">Home</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-slate-700 hover:text-slate-900"
          >
            <Link href="/products">Products</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-slate-700 hover:text-slate-900"
          >
            <Link href="/templates">Templates</Link>
          </Button>

          <Button
            variant="ghost"
            className="text-slate-700 hover:text-slate-900"
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="text-slate-700 hover:text-slate-900"
          >
            Contact
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
