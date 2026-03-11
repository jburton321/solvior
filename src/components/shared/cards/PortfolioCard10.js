import Link from "next/link";
import QuoteButton from "../buttons/QuoteButton";

const PortfolioCard10 = ({ portfolio, idx, lastItem }) => {
	const { title, img6, id, tags } = portfolio ? portfolio : {};
	return (
		<div
			className={`h10-projects_item ${idx < lastItem ? "service-stack" : ""}`}
		>
			<div
				className="h10-project-img"
				style={{
					backgroundImage: `url('${
						img6 ? img6 : "/images/project/h10-project-img-1.webp"
					}')`,
				}}
			></div>

			<div className="project_content">
				<ul className="category">
					{tags?.length
						? tags?.map((tag, idx) => (
								<li key={idx + 11}>
									<Link key={100 + idx} href={`/portfolios`}>
										{tag}
									</Link>
								</li>
						  ))
						: ""}
				</ul>

				<h3 className="project_title">
					<Link href={`/portfolios/${id}`}>{title}</Link>
				</h3>

				<div className="desc">
					ONE Agency specializes in delivering rapid, actionable solutions
					that address your most pressing business on challenges. Whether you
					are facing.
				</div>
				<QuoteButton className="project_button" />
			</div>
		</div>
	);
};

export default PortfolioCard10;
