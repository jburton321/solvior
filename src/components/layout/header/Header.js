"use client";
import ButtonHeaderContact from "@/components/shared/buttons/ButtonHeaderContact";
import ButtonMenuToggler from "@/components/shared/buttons/ButtonMenuToggler";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import ButtonSearch from "@/components/shared/buttons/ButtonSearch";
import useIsSticky from "@/hooks/useIsSticky";
import { Fragment, useCallback, useState } from "react";
import HeaderSearchForm from "./HeaderSearchForm";
import HeaderTop from "./HeaderTop";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

const Header = ({ headerType, isHeaderTop, topbarType, isStickyHeader }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const isSticky = useIsSticky(isStickyHeader);
	const handleSearchToggler = useCallback(currentState => {
		setIsSearchOpen(currentState);
	}, []);
	const handleMobileToggler = useCallback(currentState => {
		setIsMobileMenuOpen(currentState);
	}, []);
	return (
		<Fragment>
			<header
				className={`tj-header-area ${
					headerType === 10
						? "header-2 header-7 header-10"
						: headerType === 9
						? "header-9 style-6"
						: headerType === 8
						? "header-8"
						: headerType === 7
						? "header-2 header-7"
						: headerType === 6
						? "header-6 style-6"
						: headerType === 5 && !isStickyHeader
						? "header-5"
						: headerType === 3 || headerType == 4
						? "header-3"
						: headerType === 2
						? "header-2"
						: "header-1"
				} ${
					isStickyHeader
						? `header-duplicate header-sticky ${isSticky ? "sticky" : ""}`
						: headerType === 9
						? ""
						: "header-absolute"
				}`}
			>
				{isHeaderTop ? <HeaderTop type={topbarType} /> : ""}
				<div className="header-bottom">
					<div className="container-fluid">
						<div className="row">
							<div className="col-12">
								<div className="header-wrapper">
									{/* <!-- logo --> */}
									<Logo
										isStickyHeader={isStickyHeader}
										headerType={headerType}
									/>

									{/* <!-- main navigation --> */}
									<Navbar
										isStickyHeader={isStickyHeader}
										headerType={headerType}
									/>

									<div
										className={`header_right_info d-none ${
											!headerType || headerType === 6 || headerType === 9
												? "d-md-inline-flex"
												: "d-lg-inline-flex"
										}`}
									>
										{/* <!-- contact --> */}
										{headerType === 2 || headerType === 9 ? (
											<ButtonHeaderContact type={headerType === 9 ? 2 : 0} />
										) : (
											""
										)}
										{/* <!-- search btn --> */}
										{headerType === 7 || headerType === 10 ? (
											""
										) : (
											<ButtonSearch
												headerType={headerType}
												handleSearchToggler={handleSearchToggler}
											/>
										)}
										{/* <!-- button --> */}
										{headerType === 2 ||
										headerType === 3 ||
										headerType == 4 ||
										headerType == 6 ? (
											<ButtonMenuToggler
												headerType={headerType}
												handleMobileToggler={handleMobileToggler}
											/>
										) : (
											""
										)}
										{headerType !== 2 ? (
											<QuoteButton className="white-btn" />
										) : (
											""
										)}{" "}
										{headerType === 7 ||
										headerType === 7 ||
										headerType === 10 ? (
											<ButtonSearch
												headerType={headerType}
												handleSearchToggler={handleSearchToggler}
											/>
										) : (
											""
										)}
										{headerType === 7 || headerType === 10 ? (
											<ButtonMenuToggler
												headerType={headerType}
												type={2}
												handleMobileToggler={handleMobileToggler}
											/>
										) : (
											""
										)}
									</div>

									{/* <!-- menu bar --> */}
									<ButtonMenuToggler
										headerType={headerType}
										isMobile={true}
										type={headerType === 7 || headerType === 10 ? 2 : 0}
										handleMobileToggler={handleMobileToggler}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Menu */}
			<MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				handleMobileToggler={handleMobileToggler}
			/>

			{/* Search Overlay */}
			<HeaderSearchForm
				handleSearchToggler={handleSearchToggler}
				isSearchOpen={isSearchOpen}
			/>
		</Fragment>
	);
};

export default Header;
