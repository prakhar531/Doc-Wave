import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { auth } from "@clerk/nextjs";
import AdminNavItems from "./AdminNavItems";

const Header = () => {
  const { sessionClaims } = auth();
  const userId = (sessionClaims?.userId as string) || "";
  let finalId = Object.values(userId)[0];
  let flag = finalId == process.env.ADMIN_ID ? true : false;
  return (
    <header className="w-full border border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/docwave.svg"
            width={138}
            height={38}
            alt="Doc-wave Logo"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            {flag ? <AdminNavItems /> : <NavItems />}
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          {/* will only be used when user is signed out */}
          <SignedOut>
            <Button
              asChild
              className="rounded bg-[#1e3262] hover:bg-[#6385a3]"
              size="lg"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
