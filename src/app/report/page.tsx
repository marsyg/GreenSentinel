"use client";

import { useState } from "react";
import Image from "next/image";
import {
	Camera,
	Upload,
	MapPin,
	Calendar,
	AlertTriangle,
	Info,
	ChevronRight,
	FileText,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";

// Mock data for environmental activities
const MOCK_ACTIVITIES = [
	{
		id: 1,
		title: "Community Tree Planting",
		date: "April 22, 2025",
		location: "Central Park, New York",
		organizer: "Green Earth Initiative",
		participants: 120,
		description:
			"Join us for a day of tree planting in Central Park. We'll be planting native species to help restore the local ecosystem.",
		image: "/placeholder.svg?height=200&width=400",
		distance: "2.3 miles away",
	},
	{
		id: 2,
		title: "Forest Conservation Workshop",
		date: "May 15, 2025",
		location: "Botanical Gardens",
		organizer: "Forest Protection Alliance",
		participants: 45,
		description:
			"Learn about forest conservation techniques and how you can contribute to protecting our forests.",
		image: "/placeholder.svg?height=200&width=400",
		distance: "5.1 miles away",
	},
	{
		id: 3,
		title: "Environmental Impact Assessment",
		date: "June 10, 2025",
		location: "Riverside Park",
		organizer: "EcoMonitor",
		participants: 30,
		description:
			"Participate in collecting data for environmental impact assessment of recent development near the forest area.",
		image: "/placeholder.svg?height=200&width=400",
		distance: "3.7 miles away",
	},
	{
		id: 4,
		title: "Reforestation Project Kickoff",
		date: "July 5, 2025",
		location: "Highland Forest",
		organizer: "TreeLife Foundation",
		participants: 85,
		description:
			"Help us kick off a major reforestation project in areas affected by recent wildfires.",
		image: "/placeholder.svg?height=200&width=400",
		distance: "8.2 miles away",
	},
	{
		id: 5,
		title: "Forest Cleanup Day",
		date: "August 12, 2025",
		location: "Evergreen National Park",
		organizer: "Clean Earth Coalition",
		participants: 150,
		description:
			"Join our effort to clean up litter and debris from one of our most precious forest areas.",
		image: "/placeholder.svg?height=200&width=400",
		distance: "12.5 miles away",
	},
];

// Mock data for recent reports
const MOCK_REPORTS = [
	{
		id: 1,
		title: "Illegal Logging Activity",
		date: "March 15, 2025",
		location: "Redwood Forest, CA",
		status: "Under Investigation",
		severity: "High",
		description:
			"Observed heavy machinery and unauthorized logging activity in protected area.",
	},
	{
		id: 2,
		title: "Forest Fire Risk",
		date: "March 10, 2025",
		location: "Pine Ridge Trail",
		status: "Verified",
		severity: "Critical",
		description:
			"Large amounts of dry brush and dead trees creating severe fire hazard.",
	},
	{
		id: 3,
		title: "Water Pollution in Forest Stream",
		date: "March 5, 2025",
		location: "Blue River Watershed",
		status: "Resolved",
		severity: "Medium",
		description:
			"Discoloration and unusual odor in stream running through forest area.",
	},
];

export default function ReportPage() {
	const [reportType, setReportType] = useState("deforestation");
	const [reportLocation, setReportLocation] = useState("");
	const [reportDescription, setReportDescription] = useState("");
	const [reportImages, setReportImages] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [activeTab, setActiveTab] = useState("new");

	const handleImageUpload = (e : any) => {
		// In a real app, this would handle file uploads
		// For this demo, we'll just simulate adding image references
		if (e.target.files && e.target.files.length > 0) {
			const newImages = Array.from(e.target.files).map((file, index) => ({
				id: reportImages.length + index + 1,
				name: file.name,
				// In a real app, this would be the uploaded file URL
				// For demo, we'll use a placeholder
				url: "/placeholder.svg?height=200&width=300",
			}));

			setReportImages([...reportImages, ...newImages]);
		}
	};

	const handleRemoveImage = (id) => {
		setReportImages(reportImages.filter((img) => img.id !== id));
	};

	const handleSubmitReport = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call with timeout
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);

			// Reset form after submission
			setTimeout(() => {
				setReportType("deforestation");
				setReportLocation("");
				setReportDescription("");
				setReportImages([]);
				setIsSubmitted(false);
				setActiveTab("status");
			}, 2000);
		}, 1500);
	};

	return (
		<SidebarProvider>
			<div className="flex h-screen">
				<Sidebar variant="inset" collapsible="icon">
					<SidebarHeader>
						<div className="flex items-center gap-2 px-4 py-2">
							<AlertTriangle className="h-5 w-5 text-red-500" />
							<h2 className="text-lg font-semibold">Environmental Reports</h2>
						</div>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Report Categories</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton className="text-red-600">
											<AlertTriangle className="h-4 w-4" />
											<span>Deforestation</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Camera className="h-4 w-4" />
											<span>Wildlife Poaching</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<FileText className="h-4 w-4" />
											<span>Illegal Logging</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Info className="h-4 w-4" />
											<span>Pollution</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarGroup>
							<SidebarGroupLabel>Recent Reports</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{MOCK_REPORTS.map((report) => (
										<SidebarMenuItem key={report.id}>
											<SidebarMenuButton>
												<div className="flex flex-col items-start">
													<span>{report.title}</span>
													<span className="text-xs text-muted-foreground">
														{report.date}
													</span>
												</div>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarGroup>
							<SidebarGroupLabel>Local Activities</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{MOCK_ACTIVITIES.slice(0, 3).map((activity) => (
										<SidebarMenuItem key={activity.id}>
											<SidebarMenuButton>
												<Calendar className="h-4 w-4" />
												<div className="flex flex-col items-start">
													<span>{activity.title}</span>
													<span className="text-xs text-muted-foreground">
														{activity.date}
													</span>
												</div>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
									<SidebarMenuItem>
										<SidebarMenuButton>
											<ChevronRight className="h-4 w-4" />
											<span>View All Activities</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>

					<SidebarFooter>
						<div className="p-4">
							<Button className="w-full bg-green-600 hover:bg-green-700">
								<AlertTriangle className="mr-2 h-4 w-4" />
								Emergency Report
							</Button>
						</div>
					</SidebarFooter>
				</Sidebar>

				<SidebarInset>
					<div className="container mx-auto px-4 py-8">
						<div className="flex items-center justify-between mb-6">
							<div>
								<h1 className="text-3xl font-bold">
									Environmental Reporting Center
								</h1>
								<p className="text-muted-foreground">
									Report environmental concerns and participate in local
									conservation activities
								</p>
							</div>
							<SidebarTrigger />
						</div>

						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="space-y-6"
						>
							<TabsList className="grid w-full grid-cols-3 mb-6">
								<TabsTrigger value="new" className="flex items-center">
									<AlertTriangle className="mr-2 h-4 w-4" />
									New Report
								</TabsTrigger>
								<TabsTrigger value="status" className="flex items-center">
									<Info className="mr-2 h-4 w-4" />
									Report Status
								</TabsTrigger>
								<TabsTrigger value="activities" className="flex items-center">
									<Users className="mr-2 h-4 w-4" />
									Local Activities
								</TabsTrigger>
							</TabsList>

							<TabsContent value="new">
								<Card>
									<CardHeader>
										<CardTitle>Submit Environmental Report</CardTitle>
										<CardDescription>
											Report deforestation, illegal activities, or environmental
											concerns in your area
										</CardDescription>
									</CardHeader>
									<CardContent>
										{isSubmitted ? (
											<div className="flex flex-col items-center justify-center py-8">
												<div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
													<svg
														className="h-8 w-8 text-green-600"
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
												<h3 className="text-xl font-semibold mb-2">
													Report Submitted Successfully
												</h3>
												<p className="text-center text-muted-foreground mb-4">
													Thank you for your report. Our team will review it and
													take appropriate action.
												</p>
												<p className="text-center text-sm text-muted-foreground">
													You can check the status of your report in the "Report
													Status" tab.
												</p>
											</div>
										) : (
											<form onSubmit={handleSubmitReport} className="space-y-6">
												<div className="space-y-4">
													<div>
														<Label htmlFor="report-type">Report Type</Label>
														<RadioGroup
															id="report-type"
															value={reportType}
															onValueChange={setReportType}
															className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
														>
															<div>
																<RadioGroupItem
																	value="deforestation"
																	id="deforestation"
																	className="peer sr-only"
																/>
																<Label
																	htmlFor="deforestation"
																	className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
																>
																	<AlertTriangle className="mb-3 h-6 w-6 text-red-500" />
																	<div className="space-y-1 text-center">
																		<p className="text-sm font-medium leading-none">
																			Deforestation
																		</p>
																		<p className="text-sm text-muted-foreground">
																			Illegal clearing, burning, or destruction
																			of forests
																		</p>
																	</div>
																</Label>
															</div>

															<div>
																<RadioGroupItem
																	value="wildlife"
																	id="wildlife"
																	className="peer sr-only"
																/>
																<Label
																	htmlFor="wildlife"
																	className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
																>
																	<Camera className="mb-3 h-6 w-6 text-amber-500" />
																	<div className="space-y-1 text-center">
																		<p className="text-sm font-medium leading-none">
																			Wildlife Concerns
																		</p>
																		<p className="text-sm text-muted-foreground">
																			Poaching, trafficking, or endangered
																			species threats
																		</p>
																	</div>
																</Label>
															</div>

															<div>
																<RadioGroupItem
																	value="logging"
																	id="logging"
																	className="peer sr-only"
																/>
																<Label
																	htmlFor="logging"
																	className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
																>
																	<FileText className="mb-3 h-6 w-6 text-orange-500" />
																	<div className="space-y-1 text-center">
																		<p className="text-sm font-medium leading-none">
																			Illegal Logging
																		</p>
																		<p className="text-sm text-muted-foreground">
																			Unauthorized timber harvesting in
																			protected areas
																		</p>
																	</div>
																</Label>
															</div>

															<div>
																<RadioGroupItem
																	value="pollution"
																	id="pollution"
																	className="peer sr-only"
																/>
																<Label
																	htmlFor="pollution"
																	className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
																>
																	<Info className="mb-3 h-6 w-6 text-blue-500" />
																	<div className="space-y-1 text-center">
																		<p className="text-sm font-medium leading-none">
																			Pollution
																		</p>
																		<p className="text-sm text-muted-foreground">
																			Waste dumping, water contamination, or air
																			pollution
																		</p>
																	</div>
																</Label>
															</div>
														</RadioGroup>
													</div>

													<div className="space-y-2">
														<Label htmlFor="location">Location</Label>
														<div className="flex gap-2">
															<Input
																id="location"
																placeholder="Enter location or coordinates"
																value={reportLocation}
																onChange={(e) =>
																	setReportLocation(e.target.value)
																}
																className="flex-1"
															/>
															<Button
																type="button"
																variant="outline"
																className="flex-shrink-0"
															>
																<MapPin className="mr-2 h-4 w-4" />
																Use Current Location
															</Button>
														</div>
													</div>

													<div className="space-y-2">
														<Label htmlFor="severity">Severity</Label>
														<Select defaultValue="medium">
															<SelectTrigger>
																<SelectValue placeholder="Select severity level" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="low">
																	Low - Minimal immediate impact
																</SelectItem>
																<SelectItem value="medium">
																	Medium - Moderate concern
																</SelectItem>
																<SelectItem value="high">
																	High - Significant threat
																</SelectItem>
																<SelectItem value="critical">
																	Critical - Immediate action required
																</SelectItem>
															</SelectContent>
														</Select>
													</div>

													<div className="space-y-2">
														<Label htmlFor="description">Description</Label>
														<Textarea
															id="description"
															placeholder="Describe what you observed in detail..."
															value={reportDescription}
															onChange={(e) =>
																setReportDescription(e.target.value)
															}
															className="min-h-[120px]"
														/>
													</div>

													<div className="space-y-2">
														<Label>Upload Images</Label>
														<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
															{reportImages.map((img) => (
																<div
																	key={img.id}
																	className="relative rounded-md overflow-hidden border border-muted"
																>
																	<Image
																		src={img.url || "/placeholder.svg"}
																		alt={img.name}
																		width={300}
																		height={200}
																		className="object-cover w-full h-[150px]"
																	/>
																	<Button
																		type="button"
																		variant="destructive"
																		size="sm"
																		className="absolute top-2 right-2"
																		onClick={() => handleRemoveImage(img.id)}
																	>
																		&times;
																	</Button>
																	<div className="p-2 text-xs truncate">
																		{img.name}
																	</div>
																</div>
															))}

															<Label
																htmlFor="image-upload"
																className="flex flex-col items-center justify-center h-[150px] rounded-md border border-dashed border-muted bg-muted/50 hover:bg-muted cursor-pointer"
															>
																<Upload className="h-8 w-8 text-muted-foreground mb-2" />
																<span className="text-sm text-muted-foreground">
																	Upload Images
																</span>
																<span className="text-xs text-muted-foreground mt-1">
																	(JPG, PNG, max 5MB)
																</span>
																<Input
																	id="image-upload"
																	type="file"
																	accept="image/*"
																	multiple
																	className="sr-only"
																	onChange={handleImageUpload}
																/>
															</Label>
														</div>
													</div>
												</div>

												<div className="flex justify-end gap-2">
													<Button type="button" variant="outline">
														Save as Draft
													</Button>
													<Button
														type="submit"
														className="bg-green-600 hover:bg-green-700"
														disabled={
															isSubmitting ||
															!reportLocation ||
															!reportDescription
														}
													>
														{isSubmitting ? (
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
																Submitting
															</span>
														) : (
															<span className="flex items-center">
																Submit Report
															</span>
														)}
													</Button>
												</div>
											</form>
										)}
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="status">
								<Card>
									<CardHeader>
										<CardTitle>Your Report Status</CardTitle>
										<CardDescription>
											Track the status of your submitted environmental reports
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-6">
											{MOCK_REPORTS.map((report) => (
												<div
													key={report.id}
													className="border rounded-lg overflow-hidden"
												>
													<div className="bg-muted p-4">
														<div className="flex justify-between items-start">
															<div>
																<h3 className="font-semibold">
																	{report.title}
																</h3>
																<p className="text-sm text-muted-foreground">
																	Reported on {report.date}
																</p>
															</div>
															<Badge
																className={
																	report.status === "Under Investigation"
																		? "bg-amber-500"
																		: report.status === "Verified"
																		? "bg-blue-500"
																		: report.status === "Resolved"
																		? "bg-green-600"
																		: "bg-red-500"
																}
															>
																{report.status}
															</Badge>
														</div>
													</div>
													<div className="p-4">
														<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
															<div>
																<p className="text-sm font-medium">Location</p>
																<p className="text-sm text-muted-foreground">
																	{report.location}
																</p>
															</div>
															<div>
																<p className="text-sm font-medium">Severity</p>
																<p className="text-sm text-muted-foreground">
																	{report.severity}
																</p>
															</div>
															<div>
																<p className="text-sm font-medium">Report ID</p>
																<p className="text-sm text-muted-foreground">
																	#{report.id.toString().padStart(6, "0")}
																</p>
															</div>
														</div>
														<p className="text-sm mb-4">{report.description}</p>
														<div className="flex justify-end">
															<Button variant="outline" size="sm">
																View Details
															</Button>
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="activities">
								<Card>
									<CardHeader>
										<CardTitle>Environmental Activities Near You</CardTitle>
										<CardDescription>
											Participate in local conservation efforts and community
											initiatives
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{MOCK_ACTIVITIES.map((activity) => (
												<Card key={activity.id} className="overflow-hidden">
													<div className="relative h-[200px] w-full">
														<Image
															src={activity.image || "/placeholder.svg"}
															alt={activity.title}
															fill
															className="object-cover"
														/>
														<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
															<Badge className="bg-green-600">
																{activity.distance}
															</Badge>
														</div>
													</div>
													<CardHeader className="pb-2">
														<CardTitle className="text-lg">
															{activity.title}
														</CardTitle>
														<CardDescription>
															{activity.date} • {activity.location}
														</CardDescription>
													</CardHeader>
													<CardContent className="pb-2">
														<p className="text-sm mb-2">
															{activity.description}
														</p>
														<div className="flex justify-between text-sm text-muted-foreground">
															<span>Organizer: {activity.organizer}</span>
															<span>{activity.participants} participants</span>
														</div>
													</CardContent>
													<CardFooter>
														<Button className="w-full bg-green-600 hover:bg-green-700">
															Register to Participate
														</Button>
													</CardFooter>
												</Card>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
