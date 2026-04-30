'use client';

import AboutPreview from "./components/AboutPreview";
import Categories from "./components/Categories";
import DeliveryBanner from "./components/DeliveryBanner";
import FinalCTA from "./components/FinalCTA";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

export default function  Home() {
  return (
    <>
   <Hero />
   <Categories />
   <AboutPreview />
   <DeliveryBanner />
   <Testimonials />
   <FinalCTA />
    </>
  )
}