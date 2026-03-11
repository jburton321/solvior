import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const About11 = () => {
	return (
		<section className="tj-about-info section-space">
			<div className="container">
				<div className="row rg-30 justify-content-between">
					<div className="col-lg-6 col-md-12">
						<div className="about-left-content">
							<div className="sec-heading mb-0">
								<span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
									About ONE Agency
								</span>
								<h2 className="sec-title text-anim">
									We are a customer acquisition digital growth agency
								</h2>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div className="desc mb-30 wow fadeInUp" data-wow-delay="0.3s">
							<p>
								ONE Agency orchestrates hyper-growth for market dominators. Through a fusion of our proprietary tech stack, persuasive creative and actionable data analytics, we deliver performance-driven digital strategies that propel brands to lasting market leadership.
							</p>
							<p>
								We deliver the right message, at the right moment via the right channel, wrapped in immersive and conversion-centric creative that resonates.
							</p>
						</div>
						<div className="about-btn wow fadeInUp" data-wow-delay="0.5s">
							<ButtonPrimary text={"Contact ONE Agency"} url={"/contact"} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About11;
