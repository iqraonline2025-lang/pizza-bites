'use client';

import AboutHeader from "../components/AboutHeader";
import AboutStory from "../components/AboutStory";
import FAQSection from "../components/FAQSection";
import ImageGallery from "../components/ImageGallery";
import WhyChooseUs from "../components/WhyChooseUs";

export default function About() {
    return (
        <>
         <AboutHeader />
         <AboutStory />
         <ImageGallery />
         <WhyChooseUs />
         <FAQSection />
        </>
    )
}