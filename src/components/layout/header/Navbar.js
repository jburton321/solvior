import QuoteButton from "@/components/shared/buttons/QuoteButton";
import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ headerType, isStickyHeader }) => {
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems();
	const homeNav = makeActiveLink(navItems[0]);
	const pagesNav = makeActiveLink(navItems[1]);
	const serviceNav = makeActiveLink(navItems[2]);
	const solutionsNav = makeActiveLink(navItems[3]);
	const portfolioNav = makeActiveLink(navItems[4]);
	const blogNav = makeActiveLink(navItems[5]);
	const contactNav = makeActiveLink(navItems[6]);

	return (
		<div
			className={`mainmenu ${
				(headerType === 3 || headerType == 4) && !isStickyHeader ? "menu-3" : ""
			}  d-lg-block d-none`}
			id={isStickyHeader ? "mainmenu" : "main-menu"}
		>
			<ul>
				<li
					className={`has-dropdown ${
						homeNav?.isActive ? "current-menu-ancestor" : ""
					}`}
				>
					<Link href={homeNav?.path ? homeNav?.path : "#"}>
						{homeNav?.name}
					</Link>
					<ul className="sub-menu header__mega-menu mega-menu mega-menu-pages">
						<li>
							<div className="mega-menu-wrapper">
								{[0, 1, 2, 3, 4].map((col) => (
									<div key={col} className="mega-menu-pages-single">
										<div className="mega-menu-pages-single-inner">
											<h6 className="mega-menu-title">
												{["Starter", "Business", "Agency", "Enterprise", "Custom"][col]}
											</h6>
											<div className="mega-menu-list">
												{homeNav?.submenu?.slice(col * 2, col * 2 + 2).map((item, idx) => (
													<Link
														key={idx}
														href={item?.path ? item?.path : "/"}
														className={item?.isActive ? "active" : ""}
													>
														<i className="tji-square-cube" style={{ fontSize: "14px", marginRight: "8px" }} />
														{item?.name}
														{item?.badge ? (
															<span className="mega-menu-badge">
																{item?.badge}
															</span>
														) : (
															""
														)}
													</Link>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</li>
					</ul>
				</li>
				<li>
					<Link href="/about">Company</Link>
				</li>
				<li
					className={`has-dropdown ${
						serviceNav?.isActive ? "current-menu-ancestor" : ""
					}`}
				>
					<Link href="#" onClick={(e) => e.preventDefault()}>{serviceNav?.name}</Link>
					<ul className="sub-menu header__mega-menu mega-menu mega-menu-pages">
						<li>
							<div className="mega-menu-wrapper">
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Paid Media</h6>
										<div className="mega-menu-list">
											{serviceNav?.submenu?.length
												? serviceNav?.submenu?.slice(0, 2).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Programmatic & Data</h6>
										<div className="mega-menu-list">
											{serviceNav?.submenu?.length
												? serviceNav?.submenu?.slice(2, 4).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Creative & ORM</h6>
										<div className="mega-menu-list">
											{serviceNav?.submenu?.length
												? serviceNav?.submenu?.slice(4, 6).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Technology</h6>
										<div className="mega-menu-list">
											{serviceNav?.submenu?.length
												? serviceNav?.submenu?.slice(6, 8).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="col-12 col-lg-3 mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<div
											className="tj-sidebar-cta"
											style={{
												backgroundImage: "url('/images/blog/widget-cta.webp')",
											}}
										>
											<div className="content">
												<div className="icon">
													<Image
														src="/images/shapes/widget-cta-icon.png"
														alt="image"
														width={55}
														height={55}
													/>
												</div>
												<h3>
													Need help? <br /> Feel free contact us
												</h3>
												<p>
													Delivering a Symphony of Digital Performance.
												</p>
											</div>
											<div className="cta-btn">
												<QuoteButton className="white-btn" />
												<Image
													className="shapes move-anim-2"
													src="/images/shapes/carrow.png"
													alt="shape"
													width={115}
													height={117}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
				<li
					className={`has-dropdown ${
						solutionsNav?.isActive ? "current-menu-ancestor" : ""
					}`}
				>
					<Link href="#" onClick={(e) => e.preventDefault()}>{solutionsNav?.name}</Link>
					<ul className="sub-menu header__mega-menu mega-menu mega-menu-pages">
						<li>
							<div className="mega-menu-wrapper">
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Acquisition & Creative</h6>
										<div className="mega-menu-list">
											{solutionsNav?.submenu?.length
												? solutionsNav?.submenu?.slice(0, 2).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Engagement & Growth</h6>
										<div className="mega-menu-list">
											{solutionsNav?.submenu?.length
												? solutionsNav?.submenu?.slice(2, 4).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">Data & Platform</h6>
										<div className="mega-menu-list">
											{solutionsNav?.submenu?.length
												? solutionsNav?.submenu?.slice(4, 6).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<h6 className="mega-menu-title">AI & Integration</h6>
										<div className="mega-menu-list">
											{solutionsNav?.submenu?.length
												? solutionsNav?.submenu?.slice(6, 8).map((item, idx) => (
														<Link
															key={idx}
															href={item?.path ? item?.path : "/"}
															className={item?.isActive ? "active" : ""}
														>
															{item?.name ?? ""}
														</Link>
												  ))
												: ""}
										</div>
									</div>
								</div>
								<div className="col-12 col-lg-3 mega-menu-pages-single">
									<div className="mega-menu-pages-single-inner">
										<div
											className="tj-sidebar-cta"
											style={{
												backgroundImage: "url('/images/blog/widget-cta.webp')",
											}}
										>
											<div className="content">
												<div className="icon">
													<Image
														src="/images/shapes/widget-cta-icon.png"
														alt="image"
														width={55}
														height={55}
													/>
												</div>
												<h3>
													Need help? <br /> Feel free contact us
												</h3>
												<p>
													Delivering a Symphony of Digital Performance.
												</p>
											</div>
											<div className="cta-btn">
												<QuoteButton className="white-btn" />
												<Image
													className="shapes move-anim-2"
													src="/images/shapes/carrow.png"
													alt="shape"
													width={115}
													height={117}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
				<li
					className={`has-dropdown ${
						portfolioNav?.isActive ? "current-menu-ancestor" : ""
					}`}
				>
					<Link href={portfolioNav?.path ? portfolioNav?.path : "#"}>
						{portfolioNav?.name}
					</Link>
					<ul className="sub-menu">
						{portfolioNav?.submenu?.length
							? portfolioNav?.submenu?.map((item, idx) => (
									<li
										key={idx}
										className={item?.isActive ? "current-menu-item" : ""}
									>
										<Link href={item?.path ? item?.path : "/portfolios"}>
											{item?.name ? item?.name : "Portfolio"}
										</Link>
									</li>
							  ))
							: ""}
					</ul>
				</li>
				<li
					className={`has-dropdown ${
						blogNav?.isActive ? "current-menu-ancestor" : ""
					}`}
				>
					<Link href={blogNav?.path ? blogNav?.path : "#"}>
						{blogNav?.name}
					</Link>
					<ul className="sub-menu">
						{blogNav?.submenu?.length
							? blogNav?.submenu?.map((item, idx) => (
									<li
										key={idx}
										className={item?.isActive ? "current-menu-item" : ""}
									>
										<Link href={item?.path ? item?.path : "/portfolios"}>
											{item?.name ? item?.name : "Portfolio"}
										</Link>
									</li>
							  ))
							: ""}
					</ul>
				</li>
				<li className={contactNav?.isActive ? "current-menu-ancestor" : ""}>
					<Link href={contactNav?.path ? contactNav?.path : "#"}>
						{contactNav?.name ? contactNav?.name : "Contact"}
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
