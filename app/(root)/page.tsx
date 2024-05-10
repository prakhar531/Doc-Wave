import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  // {
  //   console.log(events);
  // }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper flex flex-col gap-5 md:flex-row 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 w-full md:w-1/2 xl:w-3/5">
            <h1 className="h1-bold">Printing Magic At Your Fingertips</h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <SignedOut>
              <Button
                size="lg"
                asChild
                className="button w-full sm:w-fit bg-[#1e3262] hover:bg-[#6385a3]"
              >
                <Link href="/sign-in">SingnUp to get started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                asChild
                className="button w-full sm:w-fit bg-[#1e3262] hover:bg-[#6385a3]"
              >
                <Link href="/events/create">Upload Now</Link>
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
      </section>
    </>
  );
}
