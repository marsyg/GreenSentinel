import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, MapPin, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="/bg.jpg"
						alt="Forest canopy"
						fill
						className="object-cover brightness-[0.7]"
						priority
					/>
				</div>
				<div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
					<div className="inline-block animate-bounce mb-4">
						<Leaf className="h-12 w-12 text-green-400" />
					</div>
					<h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
						Protect Our Forests,{" "}
						<span className="text-green-400">Secure Our Future</span>
					</h1>
					<p className="max-w-[700px] text-lg md:text-xl text-white/90 mb-8">
						Join our global initiative to prevent deforestation, preserve
						biodiversity, and combat climate change through community action and
						data-driven solutions.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button
							size="lg"
							className="bg-green-600 hover:bg-green-700 text-white"
						>
							Get Started
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
						>
							Learn More
						</Button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 md:py-24 bg-white">
				<div className="container px-4 md:px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							How We Make a Difference
						</h2>
						<p className="text-muted-foreground max-w-[700px] mx-auto">
							Our platform combines technology, community engagement, and direct
							action to combat deforestation effectively.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<FeatureCard
							icon={<MapPin className="h-10 w-10 text-green-600" />}
							title="Data-Driven Insights"
							description="Analyze environmental data from any location to understand deforestation risks and impacts."
							link="/map"
						/>
						<FeatureCard
							icon={<Users className="h-10 w-10 text-green-600" />}
							title="Community Engagement"
							description="Connect with like-minded individuals to share knowledge and coordinate conservation efforts."
							link="/community"
						/>
						<FeatureCard
							icon={<AlertTriangle className="h-10 w-10 text-green-600" />}
							title="Report & Act"
							description="Report environmental concerns in your area and help us take targeted action where it's needed most."
							link="/report"
						/>
					</div>
				</div>
			</section>

			{/* Impact Stats */}
			<section className="py-16 md:py-24 bg-green-50">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
								Our Impact So Far
							</h2>
							<p className="text-muted-foreground mb-6">
								Through collective action and technology-driven solutions, we've
								made significant progress in the fight against deforestation.
							</p>
							<ul className="space-y-4">
								<li className="flex items-start">
									<div className="mr-2 mt-1 bg-green-600 rounded-full p-1">
										<svg
											className="h-3 w-3 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<span>
										Prevented over 10,000 hectares of forest from being cleared
									</span>
								</li>
								<li className="flex items-start">
									<div className="mr-2 mt-1 bg-green-600 rounded-full p-1">
										<svg
											className="h-3 w-3 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<span>Engaged with 500+ communities across 50 countries</span>
								</li>
								<li className="flex items-start">
									<div className="mr-2 mt-1 bg-green-600 rounded-full p-1">
										<svg
											className="h-3 w-3 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<span>Planted over 1 million trees in deforested areas</span>
								</li>
							</ul>
							<Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
								View Detailed Impact Report
							</Button>
						</div>
						<div className="relative h-[400px] rounded-lg overflow-hidden">
							<Image
								src="/placeholder.svg?height=800&width=600"
								alt="Reforestation project"
								fill
								className="object-cover rounded-lg"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 md:py-24 bg-green-900 text-white">
				<div className="container px-4 md:px-6 text-center">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						Join Our Mission Today
					</h2>
					<p className="max-w-[700px] mx-auto mb-8 text-white/80">
						Every action counts in the fight against deforestation. Start by
						exploring our interactive map, joining our community, or reporting
						environmental concerns in your area.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							asChild
							className="bg-white text-green-900 hover:bg-white/90"
						>
							<Link href="/map">Explore the Map</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							asChild
							className="border-white/20 hover:bg-white/10"
						>
							<Link href="/community">Join the Community</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

function FeatureCard({ icon, title, description, link }) {
	return (
		<div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-green-100 group">
			<div className="mb-4 p-3 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
				{icon}
			</div>
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground mb-4">{description}</p>
			<Link
				href={link}
				className="text-green-600 font-medium inline-flex items-center group-hover:text-green-700"
			>
				Explore
				<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Link>
		</div>
	);
}
