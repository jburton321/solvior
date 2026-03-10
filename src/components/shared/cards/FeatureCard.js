import Link from "next/link";

const FeatureCard = ({ feature, type, idx }) => {
	const { icon, title, desc, path } = feature ? feature : {};
	const content = (
		<>
			<div className="feature-icon svg-animate">{icon}</div>
			<div className="feature-content">
				<h5 className="title">{title}</h5>
				<div className="desc">
					<p>{desc}</p>
				</div>
			</div>
		</>
	);
	return (
		<div
			className={`feature-item ${
				type === 3
					? "style-5 wow fadeInUp"
					: type === 2
					? "style-4"
					: "hover-bg"
			} `}
			data-wow-delay={`0.${type === 3 ? idx + 1 + idx : 0}s`}
		>
			{path ? (
				<Link href={path} className="feature-item-link">
					{content}
				</Link>
			) : (
				content
			)}
		</div>
	);
};

export default FeatureCard;
