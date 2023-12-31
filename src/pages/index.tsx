import FlightSearchForm from "@/components/FlightSearchForm";
import FlightSearchResults from "@/components/FlightSearchResults";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google"

const interBold = Inter({ subsets: ['latin'],weight:["400","600","800"] })

export default function Home() {

  return (
    <MaxWidthWrapper className={`font-semibold ${interBold.className}`}>
      <Navbar/>
      <FlightSearchForm/>
    </MaxWidthWrapper>
  )
}
