import Footer5 from "@/components/layout/footer/Footer5";
import Header from "@/components/layout/header/Header";
import About5 from "@/components/sections/About/About5";
import Blogs5 from "@/components/sections/blogs/Blogs5";
import Cta4 from "@/components/sections/cta/Cta4";
import Features4 from "@/components/sections/features/Features4";
import Hero5 from "@/components/sections/heros/Hero5";
import Portfolios5 from "@/components/sections/portfolios/Portfolios5";
import Process from "@/components/sections/process/Process";
import Services5 from "@/components/sections/services/Services5";
import Team3 from "@/components/sections/teams/Team3";
import Testimonials4 from "@/components/sections/testimonials/Testimonials4";
import FeatureMarquee from "@/components/shared/marquee/FeatureMarquee";
import TjMagicCursor from "@/components/shared/others/TjMagicCursor";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
export default function Home5() {
	return (
		<div>
			<Header headerType={5} isHeaderTop={true} />
			<Header isStickyHeader={true} headerType={5} />
			<main>
				<Hero5 />
				<Features4 />
				<About5 />
				<Services5 />
				<FeatureMarquee />
				<Process />
				<Team3 />
				<Portfolios5 />
				<Testimonials4 />
				<Blogs5 />
				<Cta4 />
			</main>
			<Footer5 />
			<ClientWrapper />
			<TjMagicCursor />
		</div>
	);
}
