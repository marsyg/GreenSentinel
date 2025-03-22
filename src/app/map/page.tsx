"use client";

import { useState, useEffect, useRef } from "react";
import {
	Search,
	MapPin,
	Info,
	Wind,
	Droplets,
	Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import * as d3 from "d3";
import MapComponent from "@/my-components/map";

export default function MapPage() {
	const [searchMethod, setSearchMethod] = useState("name");
	const [searchQuery, setSearchQuery] = useState("bpit+rohini+new+delhi");
	const [secSearchQuery, setSecSearchQuery] = useState("");
	const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
	const [secCoordinates, setSecCoordinates] = useState({ lat: "", lng: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [areaData, setAreaData] = useState(null);
	const [error, setError] = useState("");
	const mapRef = useRef(null);
	const chartRef = useRef(null);

	// Initialize map on component mount
	// useEffect(() => {
	// 	// In a real implementation, you would initialize a map library like Leaflet or Google Maps here
	// 	// For this example, we'll just show a placeholder
	// 	const mapContainer = mapRef.current;
	// 	if (mapContainer) {
	// 		// Simulate map initialization with a colored background
	// 		mapContainer.innerHTML = "";
	// 		mapContainer.style.backgroundColor = "#e5f5e0";

	// 		// Add a simple visual element to represent the map
	// 		const mapVisual = document.createElement("div");
	// 		mapVisual.className = "absolute inset-0 flex items-center justify-center";
	// 		mapVisual.innerHTML = `
	//     <div class="text-green-700 flex flex-col items-center">
	//       <MapPin class="h-12 w-12 mb-2" />
	//       <span class="text-lg font-medium">Interactive Map</span>
	//       <span class="text-sm text-green-600">Search for a location to view data</span>
	//     </div>
	//   `.replace(
	// 			"MapPin",
	// 			`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="h-12 w-12 mb-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
	// 		);

	// 		mapContainer.appendChild(mapVisual);
	// 	}
	// }, []);

	// Create D3 visualization when area data is available
	// useEffect(() => {
	// 	if (areaData && chartRef.current) {
	// 		createVisualization();
	// 	}
	// }, [areaData]);

	const handleNameSearch = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Simulate API call with timeout
		try {
			setSearchMethod("name");

			setSearchQuery(secSearchQuery);
			setIsLoading(false);

			// In a real app, you would fetch actual data based on the search query
			// For this example, we'll generate mock data
			// const mockData = generateMockData(
			// 	searchMethod === "name"
			// 		? searchQuery
			// 		: `${coordinates.lat}, ${coordinates.lng}`
			// );
			// setAreaData(mockData);
			// setIsLoading(false);

			// Update the map to focus on the searched location
			// updateMapLocation(mockData.location);
		} catch (err) {
			setError("Failed to fetch data for this location. Please try again.");
			setIsLoading(false);
			setAreaData(null);
		}
	};

	const handleCoordinatesSearch = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			setSearchMethod("coordinates");
			setCoordinates({ ...secCoordinates });
			setIsLoading(false);
		} catch (err) {
			setError("Failed to fetch data for this location. Please try again.");
			setIsLoading(false);
			setAreaData(null);
		}
	};

	const updateMapLocation = (location) => {
		// In a real implementation, you would update the map to center on the location
		// For this example, we'll just update the visual
		const mapContainer = mapRef.current;
		if (mapContainer) {
			const mapVisual = mapContainer.querySelector("div");
			if (mapVisual) {
				mapVisual.innerHTML = `
          <div class="text-green-700 flex flex-col items-center">
            <MapPin class="h-12 w-12 mb-2" />
            <span class="text-lg font-medium">${location.name}</span>
            <span class="text-sm text-green-600">${location.coordinates.lat}, ${location.coordinates.lng}</span>
          </div>
        `.replace(
					"MapPin",
					`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="h-12 w-12 mb-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
				);
			}
		}
	};

	const createVisualization = () => {
		// Clear previous visualization
		const container = chartRef.current;
		container.innerHTML = "";

		// Set up dimensions
		const width = container.clientWidth;
		const height = 300;
		const margin = { top: 20, right: 30, bottom: 40, left: 40 };
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		// Create SVG
		const svg = d3
			.select(container)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Prepare data for visualization
		const data = [
			{ name: "Forest Cover", value: areaData.forestCover, color: "#2E7D32" },
			{
				name: "Deforestation",
				value: areaData.deforestationRate,
				color: "#C62828",
			},
			{
				name: "Carbon Storage",
				value: areaData.carbonStorage,
				color: "#1565C0",
			},
			{ name: "Biodiversity", value: areaData.biodiversity, color: "#6A1B9A" },
		];

		// Create scales
		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			.range([0, innerWidth])
			.padding(0.3);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) * 1.1])
			.range([innerHeight, 0]);

		// Add axes
		svg
			.append("g")
			.attr("transform", `translate(0,${innerHeight})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-45)");

		svg.append("g").call(d3.axisLeft(y));

		// Add bars with animation
		svg
			.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d) => x(d.name))
			.attr("width", x.bandwidth())
			.attr("y", innerHeight)
			.attr("height", 0)
			.attr("fill", (d) => d.color)
			.transition()
			.duration(800)
			.delay((d, i) => i * 100)
			.attr("y", (d) => y(d.value))
			.attr("height", (d) => innerHeight - y(d.value));

		// Add values on top of bars
		svg
			.selectAll(".label")
			.data(data)
			.enter()
			.append("text")
			.attr("class", "label")
			.attr("x", (d) => x(d.name) + x.bandwidth() / 2)
			.attr("y", (d) => y(d.value) - 5)
			.attr("text-anchor", "middle")
			.text((d) => d.value)
			.style("opacity", 0)
			.transition()
			.duration(800)
			.delay((d, i) => i * 100 + 400)
			.style("opacity", 1);
	};

	const generateMockData = (location) => {
		// Generate random but realistic-looking data
		const forestCover = Math.floor(Math.random() * 40) + 10; // 10-50%
		const deforestationRate = Math.floor(Math.random() * 8) + 2; // 2-10%
		const carbonStorage = Math.floor(Math.random() * 50) + 50; // 50-100 tons/hectare
		const biodiversity = Math.floor(Math.random() * 60) + 20; // 20-80 index

		// Generate random but plausible coordinates if searching by name
		let lat, lng;
		if (searchMethod === "name") {
			lat = (Math.random() * 180 - 90).toFixed(4);
			lng = (Math.random() * 360 - 180).toFixed(4);
		} else {
			lat = coordinates.lat;
			lng = coordinates.lng;
		}

		return {
			location: {
				name: searchMethod === "name" ? searchQuery : "Custom Location",
				coordinates: { lat, lng },
			},
			forestCover,
			deforestationRate,
			carbonStorage,
			biodiversity,
			airQuality: {
				aqi: Math.floor(Math.random() * 150) + 50, // 50-200
				particulateMatter: (Math.random() * 20 + 5).toFixed(1), // 5-25 μg/m³
				ozone: (Math.random() * 40 + 20).toFixed(1), // 20-60 ppb
			},
			climate: {
				temperature: (Math.random() * 10 + 20).toFixed(1), // 20-30°C
				humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
				rainfall: Math.floor(Math.random() * 1500) + 500, // 500-2000mm annually
			},
			oxygen: {
				production: (Math.random() * 15 + 5).toFixed(1), // 5-20 tons/hectare/year
				concentration: (Math.random() * 2 + 19).toFixed(1), // 19-21%
			},
			impact: {
				carbonEmissions: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 tons/year
				waterQuality: (Math.random() * 3 + 2).toFixed(1), // 2-5 index (lower is worse)
				soilErosion: Math.floor(Math.random() * 20) + 5, // 5-25 tons/hectare/year
			},
		};
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Environmental Data Explorer</h1>

			{/* Map Section */}
			<div className="mb-8">
				{/* <MapComponent searchType={searchMethod} place={searchQuery} coordinates={coordinates} /> */}
			</div>

			{/* Search Section */}
			<div className="mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Search Location</CardTitle>
						<CardDescription>
							Enter a location name or coordinates to view environmental data
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="name">
							<TabsList className="mb-4">
								<TabsTrigger value="name">Search by Name</TabsTrigger>
								<TabsTrigger value="coordinates">
									Search by Coordinates
								</TabsTrigger>
							</TabsList>

							<TabsContent value="name">
								<form onSubmit={handleNameSearch} className="flex gap-2">
									<div className="flex-1">
										<Input
											placeholder="Enter location name (e.g., Amazon Rainforest)"
											value={secSearchQuery}
											onChange={(e) => setSecSearchQuery(e.target.value)}
											className="w-full"
										/>
									</div>
									<Button type="submit" disabled={isLoading || !secSearchQuery}>
										{isLoading ? (
											<span className="flex items-center">
												<svg
													className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Searching
											</span>
										) : (
											<span className="flex items-center">
												<Search className="mr-2 h-4 w-4" />
												Search
											</span>
										)}
									</Button>
								</form>
							</TabsContent>

							<TabsContent value="coordinates">
								<form onSubmit={handleCoordinatesSearch} className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="latitude"
												className="block text-sm font-medium mb-1"
											>
												Latitude
											</label>
											<Input
												id="latitude"
												placeholder="e.g., 40.7128"
												value={secCoordinates.lat}
												onChange={(e) =>
													setSecCoordinates({
														...secCoordinates,
														lat: e.target.value,
													})
												}
											/>
										</div>
										<div>
											<label
												htmlFor="longitude"
												className="block text-sm font-medium mb-1"
											>
												Longitude
											</label>
											<Input
												id="longitude"
												placeholder="e.g., -74.0060"
												value={secCoordinates.lng}
												onChange={(e) =>
													setSecCoordinates({
														...secCoordinates,
														lng: e.target.value,
													})
												}
											/>
										</div>
									</div>
									<Button
										type="submit"
										className="w-full"
										disabled={isLoading || !secCoordinates.lat || !secCoordinates.lng}
									>
										{isLoading ? (
											<span className="flex items-center justify-center">
												<svg
													className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Searching
											</span>
										) : (
											<span className="flex items-center justify-center">
												<MapPin className="mr-2 h-4 w-4" />
												Search by Coordinates
											</span>
										)}
									</Button>
								</form>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>

			{/* Error Message */}
			{error && (
				<Alert variant="destructive" className="mb-8">
					<Info className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Results Section */}
			{isLoading ? (
				<div className="space-y-4 mb-8">
					<Skeleton className="h-8 w-3/4" />
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Skeleton className="h-[200px] rounded-lg" />
						<Skeleton className="h-[200px] rounded-lg" />
						<Skeleton className="h-[200px] rounded-lg" />
					</div>
					<Skeleton className="h-[300px] rounded-lg" />
				</div>
			) : areaData ? (
				<div className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-4">
							Environmental Data for {areaData.location.name}
						</h2>
						<p className="text-muted-foreground mb-2">
							Coordinates: {areaData.location.coordinates.lat},{" "}
							{areaData.location.coordinates.lng}
						</p>
					</div>

					{/* Data Visualization */}
					<div>
						<h3 className="text-xl font-semibold mb-4">
							Forest Health Metrics
						</h3>
						<div
							ref={chartRef}
							className="w-full h-[300px] bg-white rounded-lg p-4 border border-gray-200"
						></div>
					</div>

					{/* Detailed Metrics */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card>
							<CardHeader className="pb-2">
								<div className="flex items-center">
									<Wind className="mr-2 h-5 w-5 text-blue-500" />
									<CardTitle className="text-lg">Air Quality</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<dl className="space-y-2">
									<div className="flex justify-between">
										<dt className="text-muted-foreground">AQI:</dt>
										<dd className="font-medium">{areaData.airQuality.aqi}</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-muted-foreground">
											Particulate Matter:
										</dt>
										<dd className="font-medium">
											{areaData.airQuality.particulateMatter} μg/m³
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Ozone:</dt>
										<dd className="font-medium">
											{areaData.airQuality.ozone} ppb
										</dd>
									</div>
								</dl>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<div className="flex items-center">
									<Droplets className="mr-2 h-5 w-5 text-green-500" />
									<CardTitle className="text-lg">Oxygen Metrics</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<dl className="space-y-2">
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Production:</dt>
										<dd className="font-medium">
											{areaData.oxygen.production} tons/hectare/year
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Concentration:</dt>
										<dd className="font-medium">
											{areaData.oxygen.concentration}%
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Forest Cover:</dt>
										<dd className="font-medium">{areaData.forestCover}%</dd>
									</div>
								</dl>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<div className="flex items-center">
									<Thermometer className="mr-2 h-5 w-5 text-orange-500" />
									<CardTitle className="text-lg">Climate Data</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<dl className="space-y-2">
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Temperature:</dt>
										<dd className="font-medium">
											{areaData.climate.temperature}°C
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Humidity:</dt>
										<dd className="font-medium">
											{areaData.climate.humidity}%
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-muted-foreground">Annual Rainfall:</dt>
										<dd className="font-medium">
											{areaData.climate.rainfall} mm
										</dd>
									</div>
								</dl>
							</CardContent>
						</Card>
					</div>

					{/* Impact Analysis */}
					<Card>
						<CardHeader>
							<CardTitle>Environmental Impact Analysis</CardTitle>
							<CardDescription>
								Based on our ML model analysis of the data for this region
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<Alert className="bg-red-50 border-red-200">
									<AlertTitle className="text-red-800 flex items-center">
										<svg
											className="h-4 w-4 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
											/>
										</svg>
										Critical Concerns
									</AlertTitle>
									<AlertDescription className="text-red-700">
										<ul className="list-disc pl-5 space-y-1">
											<li>
												Deforestation rate of {areaData.deforestationRate}% is{" "}
												{areaData.deforestationRate > 5 ? "above" : "below"} the
												critical threshold of 5%
											</li>
											<li>
												Carbon emissions of {areaData.impact.carbonEmissions}{" "}
												tons/year are contributing to climate change
											</li>
											<li>
												Soil erosion at {areaData.impact.soilErosion}{" "}
												tons/hectare/year is leading to reduced agricultural
												productivity
											</li>
										</ul>
									</AlertDescription>
								</Alert>

								<div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
									<h4 className="font-semibold text-amber-800 mb-2">
										Projected Outcomes (5-Year Forecast)
									</h4>
									<p className="text-amber-700 mb-3">
										If current trends continue, this region will experience:
									</p>
									<ul className="list-disc pl-5 space-y-1 text-amber-700">
										<li>
											Further {areaData.deforestationRate * 5}% loss in forest
											cover
										</li>
										<li>
											Reduction in biodiversity by approximately{" "}
											{Math.round(areaData.biodiversity * 0.15)}%
										</li>
										<li>
											Decreased water quality affecting local communities and
											wildlife
										</li>
										<li>
											Increased risk of natural disasters such as flooding and
											landslides
										</li>
									</ul>
								</div>

								<div className="p-4 bg-green-50 border border-green-200 rounded-md">
									<h4 className="font-semibold text-green-800 mb-2">
										Recommended Actions
									</h4>
									<ul className="list-disc pl-5 space-y-1 text-green-700">
										<li>
											Implement reforestation initiatives targeting at least{" "}
											{Math.round(areaData.deforestationRate * 1.5)}% annual
											recovery
										</li>
										<li>
											Establish protected zones to preserve biodiversity
											hotspots
										</li>
										<li>
											Introduce sustainable agricultural practices to reduce
											soil erosion
										</li>
										<li>Engage local communities in conservation efforts</li>
										<li>
											Monitor and enforce regulations against illegal logging
										</li>
									</ul>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full">
								Download Full Report
							</Button>
						</CardFooter>
					</Card>
				</div>
			) : null}
		</div>
	);
}
