"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	Send,
	MessageSquare,
	Users,
	UserPlus,
	Bell,
	Search,
	ThumbsUp,
	MessageCircle,
	Share2,
	MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for community page
const MOCK_USERS = [
	{
		id: 1,
		name: "Alex Johnson",
		avatar: "/placeholder.svg?height=40&width=40",
		role: "Conservationist",
	},
	{
		id: 2,
		name: "Maria Garcia",
		avatar: "/placeholder.svg?height=40&width=40",
		role: "Biologist",
	},
	{
		id: 3,
		name: "David Kim",
		avatar: "/placeholder.svg?height=40&width=40",
		role: "Environmental Activist",
	},
	{
		id: 4,
		name: "Sarah Patel",
		avatar: "/placeholder.svg?height=40&width=40",
		role: "Forest Ranger",
	},
	{
		id: 5,
		name: "James Wilson",
		avatar: "/placeholder.svg?height=40&width=40",
		role: "Climate Scientist",
	},
];

const MOCK_POSTS = [
	{
		id: 1,
		author: MOCK_USERS[0],
		content:
			"Just returned from a reforestation project in the Amazon. We planted over 500 trees in a previously cleared area. The local community was incredibly supportive and joined our efforts!",
		image: "/placeholder.svg?height=400&width=600",
		timestamp: "2 hours ago",
		likes: 42,
		comments: 8,
		shares: 5,
		tags: ["reforestation", "amazon", "community"],
	},
	{
		id: 2,
		author: MOCK_USERS[2],
		content:
			"Alarming satellite imagery showing new deforestation hotspots in the Congo Basin. We need immediate action to protect one of Earth's most important carbon sinks. Who's working in this region and can share insights?",
		timestamp: "5 hours ago",
		likes: 31,
		comments: 15,
		shares: 12,
		tags: ["congo", "deforestation", "satellite"],
	},
	{
		id: 3,
		author: MOCK_USERS[4],
		content:
			"New research paper published on the correlation between forest density and local rainfall patterns. The data clearly shows that deforestation is directly impacting precipitation in tropical regions, creating a dangerous feedback loop.",
		image: "/placeholder.svg?height=300&width=600",
		timestamp: "1 day ago",
		likes: 76,
		comments: 23,
		shares: 18,
		tags: ["research", "climate", "rainfall"],
	},
];

const MOCK_GROUPS = [
	{ id: 1, name: "Rainforest Protection Alliance", members: 1243, posts: 56 },
	{ id: 2, name: "Sustainable Forestry Practices", members: 876, posts: 32 },
	{ id: 3, name: "Indigenous Forest Guardians", members: 654, posts: 41 },
	{ id: 4, name: "Reforestation Volunteers", members: 1892, posts: 87 },
	{ id: 5, name: "Forest Policy Advocates", members: 543, posts: 29 },
];

const MOCK_EVENTS = [
	{
		id: 1,
		title: "Global Reforestation Day",
		date: "April 22, 2025",
		location: "Worldwide",
		participants: 1243,
		description:
			"Join thousands of volunteers around the world in planting trees in your local community.",
	},
	{
		id: 2,
		title: "Forest Conservation Workshop",
		date: "May 15, 2025",
		location: "Virtual",
		participants: 432,
		description:
			"Learn practical skills for forest conservation from leading experts in the field.",
	},
	{
		id: 3,
		title: "Amazon Rainforest Expedition",
		date: "June 10-20, 2025",
		location: "Manaus, Brazil",
		participants: 28,
		description:
			"A 10-day expedition to document biodiversity and assess deforestation impacts.",
	},
];

export default function CommunityPage() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [activeTab, setActiveTab] = useState("feed");
	const [newPost, setNewPost] = useState("");
	const [posts, setPosts] = useState(MOCK_POSTS);
	const [chatMessages, setChatMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const messagesEndRef = useRef(null);
	const router = useRouter();

	// Simulate login for demo purposes
	useEffect(() => {
		// Check if user is logged in (in a real app, this would check auth state)
		const checkLoginStatus = () => {
			// For demo, we'll just set to true after a delay to simulate checking auth
			setTimeout(() => {
				setIsLoggedIn(true);
			}, 1000);
		};

		checkLoginStatus();
	}, []);

	// Auto-scroll chat to bottom when new messages arrive
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatMessages]);

	const handlePostSubmit = (e) => {
		e.preventDefault();
		if (!newPost.trim()) return;

		// Add new post to the top of the feed
		const newPostObj = {
			id: posts.length + 1,
			author: MOCK_USERS[0], // Current user
			content: newPost,
			timestamp: "Just now",
			likes: 0,
			comments: 0,
			shares: 0,
			tags: [],
		};

		setPosts([newPostObj, ...posts]);
		setNewPost("");
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		// Add new message to chat
		setChatMessages([
			...chatMessages,
			{
				id: chatMessages.length + 1,
				sender: "me",
				content: newMessage,
				timestamp: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);

		setNewMessage("");

		// Simulate response after a short delay
		setTimeout(() => {
			setChatMessages((prev) => [
				...prev,
				{
					id: prev.length + 1,
					sender: "other",
					content:
						"Thanks for your message! Our community moderator will respond shortly.",
					timestamp: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				},
			]);
		}, 1000);
	};

	// Login/Registration form if not logged in
	if (!isLoggedIn) {
		return (
			<div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl text-center">
							Join Our Community
						</CardTitle>
						<CardDescription className="text-center">
							Connect with fellow environmental advocates and make a difference
							together
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="login">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="login">Login</TabsTrigger>
								<TabsTrigger value="register">Register</TabsTrigger>
							</TabsList>

							<TabsContent value="login">
								<form className="space-y-4">
									<div className="space-y-2">
										<label htmlFor="email" className="text-sm font-medium">
											Email
										</label>
										<Input
											id="email"
											type="email"
											placeholder="your@email.com"
										/>
									</div>
									<div className="space-y-2">
										<label htmlFor="password" className="text-sm font-medium">
											Password
										</label>
										<Input id="password" type="password" />
									</div>
									<Button
										className="w-full"
										onClick={() => setIsLoggedIn(true)}
									>
										Sign In
									</Button>
								</form>
							</TabsContent>

							<TabsContent value="register">
								<form className="space-y-4">
									<div className="space-y-2">
										<label htmlFor="name" className="text-sm font-medium">
											Full Name
										</label>
										<Input id="name" placeholder="Your Name" />
									</div>
									<div className="space-y-2">
										<label htmlFor="reg-email" className="text-sm font-medium">
											Email
										</label>
										<Input
											id="reg-email"
											type="email"
											placeholder="your@email.com"
										/>
									</div>
									<div className="space-y-2">
										<label
											htmlFor="reg-password"
											className="text-sm font-medium"
										>
											Password
										</label>
										<Input id="reg-password" type="password" />
									</div>
									<div className="space-y-2">
										<label htmlFor="interests" className="text-sm font-medium">
											Areas of Interest
										</label>
										<Input
											id="interests"
											placeholder="e.g., Reforestation, Policy, Education"
										/>
									</div>
									<Button
										className="w-full"
										onClick={() => setIsLoggedIn(true)}
									>
										Create Account
									</Button>
								</form>
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-muted-foreground">
							By joining, you agree to our Terms of Service and Privacy Policy
						</p>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-6">
				{/* Left Sidebar */}
				<div className="w-full md:w-64 space-y-6">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">My Profile</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col items-center">
								<Avatar className="h-16 w-16 mb-2">
									<AvatarImage
										src="/placeholder.svg?height=64&width=64"
										alt="Profile"
									/>
									<AvatarFallback>AJ</AvatarFallback>
								</Avatar>
								<h3 className="font-medium">Alex Johnson</h3>
								<p className="text-sm text-muted-foreground">Conservationist</p>
								<Badge className="mt-2 bg-green-600">Active Member</Badge>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">My Groups</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<ScrollArea className="h-[200px]">
								<div className="p-4">
									{MOCK_GROUPS.slice(0, 3).map((group) => (
										<div
											key={group.id}
											className="flex items-center py-2 group cursor-pointer"
										>
											<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3">
												<Users className="h-4 w-4" />
											</div>
											<div>
												<p className="text-sm font-medium group-hover:text-green-600">
													{group.name}
												</p>
												<p className="text-xs text-muted-foreground">
													{group.members} members
												</p>
											</div>
										</div>
									))}
									<Button variant="ghost" size="sm" className="w-full mt-2">
										View All Groups
									</Button>
								</div>
							</ScrollArea>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">Upcoming Events</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<ScrollArea className="h-[200px]">
								<div className="p-4">
									{MOCK_EVENTS.map((event) => (
										<div key={event.id} className="py-2 group cursor-pointer">
											<p className="text-sm font-medium group-hover:text-green-600">
												{event.title}
											</p>
											<p className="text-xs text-muted-foreground">
												{event.date}
											</p>
											<p className="text-xs text-muted-foreground">
												{event.participants} participants
											</p>
										</div>
									))}
									<Button variant="ghost" size="sm" className="w-full mt-2">
										View All Events
									</Button>
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className="flex-1">
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<div className="flex justify-between items-center mb-6">
							<TabsList>
								<TabsTrigger value="feed" className="flex items-center">
									<MessageSquare className="mr-2 h-4 w-4" />
									Feed
								</TabsTrigger>
								<TabsTrigger value="chat" className="flex items-center">
									<MessageCircle className="mr-2 h-4 w-4" />
									Live Chat
								</TabsTrigger>
								<TabsTrigger value="discover" className="flex items-center">
									<Users className="mr-2 h-4 w-4" />
									Discover
								</TabsTrigger>
							</TabsList>

							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon">
									<Bell className="h-5 w-5" />
								</Button>
								<Button variant="ghost" size="icon">
									<UserPlus className="h-5 w-5" />
								</Button>
							</div>
						</div>

						<TabsContent value="feed" className="space-y-6">
							{/* Create Post */}
							<Card>
								<CardContent className="pt-6">
									<form onSubmit={handlePostSubmit}>
										<div className="flex gap-4">
											<Avatar>
												<AvatarImage
													src="/placeholder.svg?height=40&width=40"
													alt="Profile"
												/>
												<AvatarFallback>AJ</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<Textarea
													placeholder="Share your thoughts or updates about forest conservation..."
													value={newPost}
													onChange={(e) => setNewPost(e.target.value)}
													className="min-h-[100px]"
												/>
												<div className="flex justify-between items-center mt-4">
													<div className="flex gap-2">
														<Button type="button" variant="outline" size="sm">
															Add Photo
														</Button>
														<Button type="button" variant="outline" size="sm">
															Add Tags
														</Button>
													</div>
													<Button
														type="submit"
														className="bg-green-600 hover:bg-green-700"
													>
														Post
													</Button>
												</div>
											</div>
										</div>
									</form>
								</CardContent>
							</Card>

							{/* Posts Feed */}
							<div className="space-y-6">
								{posts.map((post) => (
									<Card key={post.id} className="overflow-hidden">
										<CardHeader className="pb-2">
											<div className="flex justify-between items-start">
												<div className="flex items-center gap-3">
													<Avatar>
														<AvatarImage
															src={post.author.avatar}
															alt={post.author.name}
														/>
														<AvatarFallback>
															{post.author.name.charAt(0)}
														</AvatarFallback>
													</Avatar>
													<div>
														<CardTitle className="text-base">
															{post.author.name}
														</CardTitle>
														<CardDescription>{post.timestamp}</CardDescription>
													</div>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon">
															<MoreHorizontal className="h-5 w-5" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem>Save Post</DropdownMenuItem>
														<DropdownMenuItem>Report</DropdownMenuItem>
														<DropdownMenuItem>Hide</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</CardHeader>
										<CardContent className="pb-2">
											<p className="whitespace-pre-line mb-4">{post.content}</p>
											{post.image && (
												<div className="relative h-[300px] w-full rounded-md overflow-hidden mb-4">
													<Image
														src={post.image || "/placeholder.svg"}
														alt="Post image"
														fill
														className="object-cover"
													/>
												</div>
											)}
											{post.tags && post.tags.length > 0 && (
												<div className="flex flex-wrap gap-2 mt-2">
													{post.tags.map((tag) => (
														<Badge
															key={tag}
															variant="secondary"
															className="bg-green-50 text-green-700 hover:bg-green-100"
														>
															#{tag}
														</Badge>
													))}
												</div>
											)}
										</CardContent>
										<CardFooter>
											<div className="w-full flex justify-between">
												<Button
													variant="ghost"
													size="sm"
													className="flex items-center gap-1"
												>
													<ThumbsUp className="h-4 w-4" />
													<span>{post.likes}</span>
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="flex items-center gap-1"
												>
													<MessageCircle className="h-4 w-4" />
													<span>{post.comments}</span>
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="flex items-center gap-1"
												>
													<Share2 className="h-4 w-4" />
													<span>{post.shares}</span>
												</Button>
											</div>
										</CardFooter>
									</Card>
								))}
							</div>
						</TabsContent>

						<TabsContent value="chat" className="h-[70vh] flex flex-col">
							<Card className="flex-1 flex flex-col">
								<CardHeader className="pb-2">
									<CardTitle className="text-lg">Community Chat</CardTitle>
									<CardDescription>
										Connect with other members in real-time
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-1 overflow-hidden p-0">
									<div className="flex flex-col h-full">
										<ScrollArea className="flex-1 p-4">
											{chatMessages.length === 0 ? (
												<div className="h-full flex flex-col items-center justify-center text-center p-4">
													<MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
													<h3 className="font-medium text-lg">
														No messages yet
													</h3>
													<p className="text-muted-foreground">
														Start a conversation with the community about forest
														conservation
													</p>
												</div>
											) : (
												<div className="space-y-4">
													{chatMessages.map((message) => (
														<div
															key={message.id}
															className={`flex ${
																message.sender === "me"
																	? "justify-end"
																	: "justify-start"
															}`}
														>
															<div
																className={`max-w-[80%] rounded-lg px-4 py-2 ${
																	message.sender === "me"
																		? "bg-green-600 text-white"
																		: "bg-muted"
																}`}
															>
																<p>{message.content}</p>
																<span
																	className={`text-xs ${
																		message.sender === "me"
																			? "text-white/70"
																			: "text-muted-foreground"
																	}`}
																>
																	{message.timestamp}
																</span>
															</div>
														</div>
													))}
													<div ref={messagesEndRef} />
												</div>
											)}
										</ScrollArea>
										<Separator />
										<form onSubmit={handleSendMessage} className="p-4">
											<div className="flex gap-2">
												<Input
													placeholder="Type your message..."
													value={newMessage}
													onChange={(e) => setNewMessage(e.target.value)}
													className="flex-1"
												/>
												<Button
													type="submit"
													size="icon"
													className="bg-green-600 hover:bg-green-700"
												>
													<Send className="h-4 w-4" />
												</Button>
											</div>
										</form>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="discover" className="space-y-6">
							<div className="mb-6">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Search for members, groups, or topics..."
										className="pl-10"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle>People to Follow</CardTitle>
										<CardDescription>
											Connect with experts in forest conservation
										</CardDescription>
									</CardHeader>
									<CardContent className="p-0">
										<div className="divide-y">
											{MOCK_USERS.map((user) => (
												<div
													key={user.id}
													className="flex items-center justify-between p-4"
												>
													<div className="flex items-center gap-3">
														<Avatar>
															<AvatarImage src={user.avatar} alt={user.name} />
															<AvatarFallback>
																{user.name.charAt(0)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{user.name}</p>
															<p className="text-sm text-muted-foreground">
																{user.role}
															</p>
														</div>
													</div>
													<Button size="sm" variant="outline">
														Follow
													</Button>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Popular Groups</CardTitle>
										<CardDescription>
											Join groups focused on forest conservation
										</CardDescription>
									</CardHeader>
									<CardContent className="p-0">
										<div className="divide-y">
											{MOCK_GROUPS.map((group) => (
												<div key={group.id} className="p-4">
													<div className="flex items-center justify-between mb-2">
														<h3 className="font-medium">{group.name}</h3>
														<Button size="sm" variant="outline">
															Join
														</Button>
													</div>
													<div className="flex justify-between text-sm text-muted-foreground">
														<span>{group.members} members</span>
														<span>{group.posts} posts this week</span>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								<Card className="md:col-span-2">
									<CardHeader>
										<CardTitle>Upcoming Events</CardTitle>
										<CardDescription>
											Participate in forest conservation events
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
											{MOCK_EVENTS.map((event) => (
												<Card key={event.id} className="border border-muted">
													<CardHeader className="pb-2">
														<CardTitle className="text-base">
															{event.title}
														</CardTitle>
													</CardHeader>
													<CardContent>
														<p className="text-sm mb-2">{event.description}</p>
														<div className="text-sm text-muted-foreground">
															<p>
																<strong>Date:</strong> {event.date}
															</p>
															<p>
																<strong>Location:</strong> {event.location}
															</p>
															<p>
																<strong>Participants:</strong>{" "}
																{event.participants}
															</p>
														</div>
													</CardContent>
													<CardFooter>
														<Button className="w-full bg-green-600 hover:bg-green-700">
															Register
														</Button>
													</CardFooter>
												</Card>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>

				{/* Right Sidebar */}
				<div className="w-full md:w-64 space-y-6">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">Active Now</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<ScrollArea className="h-[200px]">
								<div className="p-4">
									{MOCK_USERS.map((user) => (
										<div key={user.id} className="flex items-center py-2">
											<div className="relative">
												<Avatar className="h-8 w-8">
													<AvatarImage src={user.avatar} alt={user.name} />
													<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
												</Avatar>
												<span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
											</div>
											<div className="ml-3">
												<p className="text-sm font-medium">{user.name}</p>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">Trending Topics</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="p-4">
								<div className="space-y-3">
									<div className="group cursor-pointer">
										<p className="text-sm font-medium group-hover:text-green-600">
											#AmazonDeforestation
										</p>
										<p className="text-xs text-muted-foreground">1,245 posts</p>
									</div>
									<div className="group cursor-pointer">
										<p className="text-sm font-medium group-hover:text-green-600">
											#ReforestationTechniques
										</p>
										<p className="text-xs text-muted-foreground">892 posts</p>
									</div>
									<div className="group cursor-pointer">
										<p className="text-sm font-medium group-hover:text-green-600">
											#IndigenousRights
										</p>
										<p className="text-xs text-muted-foreground">756 posts</p>
									</div>
									<div className="group cursor-pointer">
										<p className="text-sm font-medium group-hover:text-green-600">
											#ClimateAction
										</p>
										<p className="text-xs text-muted-foreground">1,893 posts</p>
									</div>
									<div className="group cursor-pointer">
										<p className="text-sm font-medium group-hover:text-green-600">
											#SustainableForestry
										</p>
										<p className="text-xs text-muted-foreground">654 posts</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">Resources</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="p-4">
								<div className="space-y-3">
									<a
										href="#"
										className="block text-sm font-medium text-green-600 hover:underline"
									>
										Forest Conservation Guide
									</a>
									<a
										href="#"
										className="block text-sm font-medium text-green-600 hover:underline"
									>
										Reforestation Best Practices
									</a>
									<a
										href="#"
										className="block text-sm font-medium text-green-600 hover:underline"
									>
										Satellite Monitoring Tools
									</a>
									<a
										href="#"
										className="block text-sm font-medium text-green-600 hover:underline"
									>
										Community Engagement Toolkit
									</a>
									<a
										href="#"
										className="block text-sm font-medium text-green-600 hover:underline"
									>
										Policy Advocacy Resources
									</a>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
