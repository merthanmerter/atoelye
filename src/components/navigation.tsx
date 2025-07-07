import { Link } from '@/i18n/navigation';
import InalcomSvg from './inalcom-svg';
// import { NavMenu } from './nav-menu';
import { NavUser } from './nav-user';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/50 backdrop-blur-md">
      <div className="@container/header mx-auto flex h-16 w-full w-full max-w-7xl items-center gap-2 gap-x-9 px-4">
        <Link className="flex items-center gap-2" href="/">
          <InalcomSvg className="h-8 w-auto text-foreground" />
        </Link>

        {/* <NavMenu /> */}
        <div className="ml-auto">
          <NavUser />
        </div>
      </div>
    </header>
  );
}
