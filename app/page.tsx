import { HomeHero } from "@/features/home/components/home-hero";
import { HomePromises } from "@/features/home/components/home-promises";
import { HomeTrips } from "@/features/home/components/home-trips";
import { HomePermits } from "@/features/home/components/home-permits";
import { HomeSeasons } from "@/features/home/components/home-seasons";
import { HomeDestinations } from "@/features/home/components/home-destinations";
import { HomeBookingSteps } from "@/features/home/components/home-booking-steps";
import { HomeReviews } from "@/features/home/components/home-reviews";
import { HomeQuestions } from "@/features/home/components/home-questions";
import { HomeClose } from "@/features/home/components/home-close";
import { getTravelMonths } from "@/features/home/lib/travel-months";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata("/", { image: { id: "home-hero" } });
export const revalidate = 86400;

export default function HomePage() {
  const months = getTravelMonths(new Date());
  return <>
    <HomeHero months={months} />
    <HomePromises />
    <HomeTrips />
    <HomePermits />
    <HomeSeasons months={months} />
    <HomeDestinations />
    <HomeBookingSteps />
    <HomeReviews />
    <HomeQuestions />
    <HomeClose />
  </>;
}
