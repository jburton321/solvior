import QuoteButton from "@/components/shared/buttons/QuoteButton";

const About12 = () => {
	return (
		<section className="tj-history section-space">
			<div className="container">
				<div className="row rg-30 justify-content-between">
					<div className="col-xl-5">
						<div className="sec-heading mb-0">
							<span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
								Our background{" "}
							</span>
							<h2 className="sec-title text-anim">
								Discover how we have evolved into your{" "}
								<span>ONE.</span>
							</h2>
						</div>
					</div>
					<div className="col-xl-5">
						<div className="desc wow fadeInUp" data-wow-delay="0.3s">
							<p>
								ONE Agency hyperscales digital growth through customer
								acquisition, performance creative and MarTech. We deliver a
								symphony of digital performance and actionable data analytics
								for brands of all sizes. We empower brands to thrive in changing
								marketplaces.
							</p>
							<p>
								Committed to delivering exceptional value through our strategic
								insight, innovative approaches and proprietary tech stack.
							</p>
						</div>
						<div
							className="history-btn mt-30 wow fadeInUp"
							data-wow-delay="0.5s"
						>
							<QuoteButton />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About12;
