import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { SearchParamProps } from "@/types";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { HeroHighlightDemo } from "@/components/shared/HeroHighlightDemo";

export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = (sessionClaims?.userId as string) || "";
  let finalId = Object.values(userId)[0];
  let flag = finalId == process.env.ADMIN_ID ? true : false;

  return (
    <>
      {/* <SignedIn>
        {flag && (
          <div className="wrapper flex justify-center flex-col gap-5 md:flex-row 2xl:gap-0">
            <Button
              size="lg"
              asChild
              className=" button w-full sm:w-fit bg-[#1e3262] hover:bg-[#6385a3]"
            >
              <Link href="/admin">Switch to Admin Page</Link>
            </Button>
          </div>
        )}
      </SignedIn> */}

      {/* <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper flex flex-col gap-5 md:flex-row 2xl:gap-0">
          <div className="flex flex-col justify-center gap-2 w-full md:w-1/2 xl:w-3/5">
            <h1 className="h1-bold">Printing Magic At Your Fingertips</h1>
            <p className="p-regular-16 md:p-regular-20 mt-6">
              A web platform essential for safe and convenient services,
              connecting and revolutionizing document systems for students.
            </p>
            <p className="p-regular-16 md:p-regular-20 mb-6">
              DOC-WAVE facilitates easy document handling, enhancing
              productivity and operational efficiency in the digital landscape.
            </p>
            <SignedOut>
              <Button
                size="lg"
                asChild
                className="button w-full sm:w-fit bg-[#1e3262] hover:bg-[#6385a3] mt-6"
              ></Button>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                asChild
                className="button w-full sm:w-fit bg-[#1e3262] hover:bg-[#6385a3]"
              >
                {flag ? (
                  <Link href="/admin/orders">View All Orders</Link>
                ) : (
                  <Link href="/events/create">Upload Now</Link>
                )}
              </Button>
            </SignedIn>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center xl:max-h-[60vh] 2xl:max-h-[50vh]  w-full md:w-1/2"
          />
        </div>
      </section> */}

      <HeroHighlightDemo flag={flag} />
    </>
  );
}
