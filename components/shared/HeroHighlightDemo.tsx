"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export function HeroHighlightDemo({ flag }: any) {
  if (flag) {
    console.log(flag);
  }
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0.6,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <p className="mb-5">
          <Highlight className="text-black dark:text-white flex px-10 py-2">
            DocWave
          </Highlight>
        </p>
        Printing Magic at your FingerTips{" "}
        <p className="p-regular-16 md:p-regular-20 mt-6">
          A web platform essential for safe and convenient services, connecting
          and revolutionizing document systems for students.
        </p>
        <p className="p-regular-16 md:p-regular-20 mb-6">
          DOC-WAVE facilitates easy document handling, enhancing productivity
          and operational efficiency in the digital landscape.
        </p>
        <SignedOut>
          <Button
            size="lg"
            asChild
            className="button w-full sm:w-fit bg-[#1e3262] hover:bg-[#6385a3]"
          >
            <Link href="/sign-in">Login to get started!!</Link>
          </Button>
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
      </motion.h1>
    </HeroHighlight>
  );
}
