import CollectionsSection from '../components/home/collections-section.jsx'
import HeroSection from '../components/home/hero-section.jsx'
import StackedSections from '../components/home/stacked-sections.jsx'
import StoreSection from '../components/home/store-section.jsx'
import TestimonialsSection from '../components/home/testimonials-section.jsx'

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <CollectionsSection />
            <StackedSections />
            <TestimonialsSection />
            <StoreSection />
        </>
    )
}
