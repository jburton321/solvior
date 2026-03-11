"use client";
import ServiceCard1 from "@/components/shared/cards/ServiceCard1";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import getALlServices from "@/libs/getALlServices";
import tjStackAnimation from "@/libs/tjStackAnimation";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";

const Services1 = () => {
	const animContainerRef = useRef();
	const allServices = getALlServices();
	const services = useMemo(() => (allServices?.length ? allServices.slice(0, 3) : []), [allServices]);
	useGSAP(
		context => {
			tjStackAnimation(".service-stack");
		},
		{ scope: animContainerRef }
	);
	return (
		<section ref={animContainerRef} className="tj-service-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading">
							<div className="sec-text">
								<span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
									Solutions & Services
								</span>
								<h2 className="sec-title text-anim">
									The ONE solution for digital advertising performance
								</h2>
							</div>
							<div
								className="service-rating wow fadeInRight"
								data-wow-delay="0.1s"
							>
								<div className="star-fill">
									<div className="star-ratings">
										<div className="fill-ratings" style={{ width: "73%" }}>
											<span>★★★★★</span>
										</div>
										<div className="empty-ratings">
											<span>★★★★★</span>
										</div>
									</div>
								</div>
								<div className="review">
									Client review (<strong>4.8</strong>/5.0)
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="service-wrapper">
							{services.map((service, idx) => (
								<ServiceCard1
									key={idx}
									service={service}
									idx={idx}
									lastItem={services.length - 1}
								/>
							))}
						</div>
						<div className="flex justify-center mt-12">
							<ButtonPrimary text="View All Services" url="/services" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services1;
