import { DepartmentGrid } from "@/features/home/components/DepartmentGrid";
import { Hero } from "@/features/home/components/Hero";
import { SustainabilityBanner } from "@/features/home/components/SustainabilityBanner";
import { TrendingGrid } from "@/features/home/components/TrendingGrid";
import { ValueProps } from "@/features/home/components/ValueProps";

export default function HomePage() {
	return (
		<div className="bg-white">
			<Hero />
			<DepartmentGrid />
			<TrendingGrid />
			<SustainabilityBanner />
			<ValueProps />
		</div>
	);
}
