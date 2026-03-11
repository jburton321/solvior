const ButtonSearch = ({ headerType, handleSearchToggler }) => {
	const showExplore = ![
		7, 8, 9, 10
	].includes(headerType);
	const label = headerType === 4 ? "Search" : "Explore";
	return (
		<button
			className={`header_search ${
				headerType === 7 || headerType === 8 || headerType === 10
					? "header_contact "
					: ""
			} ${showExplore ? "header_search--explore" : ""} d-none ${
				headerType === 3 || headerType === 4
					? "d-xl-inline-flex"
					: "d-lg-inline-flex"
			}`}
			onClick={() => handleSearchToggler(true)}
		>
			{headerType === 7 ||
			headerType === 8 ||
			headerType === 9 ||
			headerType === 10
				? ""
				: label}
			{headerType === 7 ||
			headerType === 8 ||
			headerType === 9 ||
			headerType === 10 ? (
				<span className="icon">
					<i className="tji-search"></i>
				</span>
			) : (
				<span className="header_search__icon">
					<i className="tji-search"></i>
				</span>
			)}
		</button>
	);
};

export default ButtonSearch;
