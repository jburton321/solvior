import Footer8 from "@/components/layout/footer/Footer8";
import Header from "@/components/layout/header/Header";
import About8 from "@/components/sections/About/About8";
import Blogs8 from "@/components/sections/blogs/Blogs8";
import Cta6 from "@/components/sections/cta/Cta6";
import Cta7 from "@/components/sections/cta/Cta7";
import Features6 from "@/components/sections/features/Features6";
import Hero8 from "@/components/sections/heros/Hero8";
import Portfolios8 from "@/components/sections/portfolios/Portfolios8";
import Process4 from "@/components/sections/process/Process4";
import Services8 from "@/components/sections/services/Services8";
import Team5 from "@/components/sections/teams/Team5";
import Testimonials7 from "@/components/sections/testimonials/Testimonials7";
import FeatureMarquee3 from "@/components/shared/marquee/FeatureMarquee3";
import TjMagicCursor from "@/components/shared/others/TjMagicCursor";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

export default function Home8() {
	return (
		<div>
			<Header headerType={8} isHeaderTop={true} topbarType={4} />
			<Header isStickyHeader={true} headerType={8} />
			<main>
				<Hero8 />
				<Features6 />
				<FeatureMarquee3 />
				<About8 />
				<Services8 />
				<Process4 />
				<Cta6 />
				<Portfolios8 />
				<Team5 />
				<Testimonials7 />
				<Blogs8 />
				<Cta7 />
			</main>
			<Footer8 />
			<ClientWrapper />
			<TjMagicCursor />
		</div>
	);
}
