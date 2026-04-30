'use client';

import ContactForm from "../components/ContactForm";
import ContactHeader from "../components/ContactHeader";
import MapSection from "../components/MapSection";
import OpeningHours from "../components/OpeningHours";

export default function Contact() {
    return (
        <>
         <ContactHeader />
         <MapSection />
         <ContactForm />
         <OpeningHours />
        </>
    )
}