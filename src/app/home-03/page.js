import Footer3 from "@/components/layout/footer/Footer3";
import Header from "@/components/layout/header/Header";
import About3 from "@/components/sections/About/About3";
import Blogs3 from "@/components/sections/blogs/Blogs3";
import Brands2 from "@/components/sections/brands/Brands2";
import Cta2 from "@/components/sections/cta/Cta2";
import Features2 from "@/components/sections/features/Features2";
import Hero3 from "@/components/sections/heros/Hero3";
import Portfolios3 from "@/components/sections/portfolios/Portfolios3";
import Services3 from "@/components/sections/services/Services3";
import Testimonials3 from "@/components/sections/testimonials/Testimonials3";
import FeatureMarquee from "@/components/shared/marquee/FeatureMarquee";
import TjMagicCursor from "@/components/shared/others/TjMagicCursor";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

export default function Home3() {
	return (
		<div>
			<Header headerType={3} />
			<Header isStickyHeader={true} headerType={3} />
			<main>
				<Hero3 />
				<Brands2 />
				<About3 />
				<Services3 />
				<FeatureMarquee />
				<Features2 />
				<Portfolios3 />
				<Testimonials3 />
				<Blogs3 />
				<Cta2 />
			</main>
			<Footer3 />
			<ClientWrapper />
			<TjMagicCursor type={2} />
		</div>
	);
}
