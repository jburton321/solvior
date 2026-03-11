"use client";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import FunfactSingle from "@/components/shared/funfact/FunfactSingle";
import AnimatedOneLogo from "@/components/shared/AnimatedOneLogo";
import borderRadiusAnimation from "@/libs/borderRadiusAnimation";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const About1 = () => {
	const animContainerRef = useRef();
	const logoWrapRef = useRef(null);
	const [logoActive, setLogoActive] = useState(false);

	useEffect(() => {
		const el = logoWrapRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([e]) => setLogoActive(e.isIntersecting),
			{ threshold: 0.2 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useGSAP(
		() => {
			borderRadiusAnimation(".tj-about-section");
		},
		{ scope: animContainerRef }
	);
	return (
		<section ref={animContainerRef}>
			<div className="tj-about-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-6"></div>
						<div className="col-lg-6">
							<div className="about-left-content">
								<div className="sec-heading">
									<div
										ref={logoWrapRef}
										className="about-one-logo-wrap"
										style={{ maxWidth: "520px", height: "140px", color: "inherit", marginLeft: "-71px" }}
									>
										<AnimatedOneLogo
											active={logoActive}
											className="w-full h-full"
											style={{ width: "100%", height: "100%", display: "block" }}
										/>
									</div>
									<h2 className="sec-title text-anim">
										Orchestrating hyper-growth for market dominators
									</h2>
									<div className="desc wow fadeInUp" data-wow-delay="0.3s">
										<p>
											Through a fusion of our proprietary tech stack, persuasive creative and actionable data analytics, we deliver performance-driven digital strategies that propel brands to achieve lasting market leadership.
										</p>
									</div>
								</div>
								<div
									className="about-feature-item wow fadeInUp"
									data-wow-delay="0.5s"
								>
									<div className="feature-box">
										<div className="feature-left">
											<div className="check-list-one">
												<ul>
													<li>
														<i className="tji-double-check"></i>Proprietary tech
														stack
													</li>
													<li>
														<i className="tji-double-check"></i>Persuasive
														creative powerhouse
													</li>
													<li>
														<i className="tji-double-check"></i>Actionable data
														analytics
													</li>
												</ul>
											</div>
											<div className="about-button">
												<QuoteButton />
											</div>
										</div>
									</div>
									<div className="feature-box">
										<div className="client-experience">
											<ul className="images-thumb">
												<li>
													<Image
														src="/images/about/thumb-1.png"
														alt="Images"
														height={50}
														width={50}
													/>
												</li>
												<li>
													<Image
														src="/images/about/thumb-2.png"
														alt="Images"
														height={50}
														width={50}
													/>
												</li>
												<li>
													<Image
														src="/images/about/thumb-3.png"
														alt="Images"
														height={50}
														width={50}
													/>
												</li>
												<li className="plus">
													<i className="fa-sharp fa-solid fa-plus"></i>
												</li>
											</ul>
											<div className="funfact-item-one">
												<FunfactSingle currentValue={3} symbol={"K+"} />
												<span className="sub-title">
													Client-partners accelerating <br /> digital growth.
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="about-bg-images">
					<div className="about-shape-1 hover:shine">
						<Image
							src="/home/h2-shape-1.png"
							alt="Shapes"
							height={624}
							width={756}
						/>
					</div>
					<div className="about-shape-2 hover:shine">
						<Image
							src="/home/h2-shape-2.png"
							alt="Shapes"
							height={137}
							width={138}
						/>
					</div>
					<div className="about-shape-3 zoominout">
						<Image
							src="/images/icons/star.svg"
							alt="Shapes"
							height={42}
							width={42}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About1;
