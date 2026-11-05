import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import React, { ElementType, ReactNode } from "react";

export default function Hero() {
  const proofs = ['Familiar ingredients', 'Familiar ingredients', 'Secure packing'];
  return (
    <section className="h-180 relative text-white">
      <img
        className="w-full h-full object-cover absolute inset-0"
        src="https://deshichuka.netlify.app/_next/image?url=%2Fimages%2Fdeshi-store-hero.png&w=2048&q=75"
        alt="An abundant table of Deshi Chauka pickles, thekua and makhana kheer"
      />
      <div className="bg-custom-gradient absolute inset-0"></div>
      <div className="max-w-215 pt-30 px-[5vw] pb-0  z-10 relative">
        <HeroContent />
        <HeroAction />
        <div className="flex gap-6.5 text-(--on-dark)/92 text-[15px] mt-11">
          {
            proofs.map((p) => <ProofItems text={p} />)
          }
        </div>
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <>
      <p className="text-accent font-extrabold text-[12px] tracking-widest ">
        FROM BIHAR, WITH LOVE
      </p>
      <h1 className="text-hero  leading-[.96] text-white mt-4 mb-5">
        Ghar ka swaad,
        <br />
        <em className="font-normal text-accent">made for sharing.</em>
      </h1>
      <p className="text-xl text-[oklch(0.95 0.03 88)] mb-5.2">
        Sun-matured pickles, handcrafted thekua and comforting makhana
        treats—made in small batches with recipes rooted in Mithila.
      </p>
    </>
  );
}

function HeroAction() {
  return (
    <div className="relative flex  gap-4 items-center mt-7.5 flex-wrap ">
      <a className="cursor-pointer bg-accent text-primary inline-flex items-center justify-center gap-2.5 py-3 px-6 font-extrabold rounded-md">
        Shop all product {<ArrowRight />}{" "}
      </a>
      <a className="cursor-pointer border border-(--on-dark)/80 bg-(--on-dark)/20 text-primary-foreground inline-flex items-center justify-center gap-2.5 py-3 px-6 font-bold rounded-md">
        Meet Desi Chauka {<ArrowRight />}{" "}
      </a>
    </div>
  );
}

type Props = {
  text: string;
};

function ProofItems({ text }: Props) {
  return (
    <span className="flex gap-2 items-center">
      <Check size={17} className="text-accent" />
      {text}
    </span>
  );
}
