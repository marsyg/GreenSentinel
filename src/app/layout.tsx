import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google"
import Link from "next/link"
import { Leaf, MapPin, Users, AlertTriangle } from "lucide-react"
// import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
	title: "Forest Guardian - Prevent Deforestation",
	description:
		"Join our global initiative to prevent deforestation, preserve biodiversity, and combat climate change through community action and data-driven solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className={inter.className}>
				{/* <ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				> */}
					<div className="flex min-h-screen flex-col">
						<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
							<div className="container flex h-16 items-center">
								<Link href="/" className="flex items-center gap-2 mr-6">
									<Leaf className="h-6 w-6 text-green-600" />
									<span className="font-bold text-xl">Forest Guardian</span>
								</Link>
								<nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
									<Link
										href="/"
										className="font-medium transition-colors hover:text-green-600"
									>
										Home
									</Link>
									<Link
										href="/map"
										className="font-medium transition-colors hover:text-green-600 flex items-center"
									>
										<MapPin className="mr-1 h-4 w-4" />
										Map Analysis
									</Link>
									<Link
										href="/community"
										className="font-medium transition-colors hover:text-green-600 flex items-center"
									>
										<Users className="mr-1 h-4 w-4" />
										Community
									</Link>
									<Link
										href="/report"
										className="font-medium transition-colors hover:text-green-600 flex items-center"
									>
										<AlertTriangle className="mr-1 h-4 w-4" />
										Report
									</Link>
								</nav>
								<div className="flex items-center justify-end gap-4 flex-1">
									<Button
										variant="ghost"
										size="sm"
										asChild
										className="hidden md:flex"
									>
										<Link href="#">Sign In</Link>
									</Button>
									<Button
										size="sm"
										className="hidden md:flex bg-green-600 hover:bg-green-700"
									>
										<Link href="#">Sign Up</Link>
									</Button>
									<Button variant="outline" size="icon" className="md:hidden">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-5 w-5"
										>
											<line x1="4" x2="20" y1="12" y2="12" />
											<line x1="4" x2="20" y1="6" y2="6" />
											<line x1="4" x2="20" y1="18" y2="18" />
										</svg>
										<span className="sr-only">Toggle menu</span>
									</Button>
								</div>
							</div>
						</header>
						<main className="flex-1">{children}</main>
						<footer className="border-t py-6 md:py-0">
							<div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
								<p className="text-sm text-muted-foreground">
									© 2025 Forest Guardian. All rights reserved.
								</p>
								<nav className="flex gap-4 text-sm text-muted-foreground">
									<Link href="#" className="hover:underline">
										Privacy Policy
									</Link>
									<Link href="#" className="hover:underline">
										Terms of Service
									</Link>
									<Link href="#" className="hover:underline">
										Contact
									</Link>
								</nav>
							</div>
						</footer>
					</div>
				{/* </ThemeProvider> */}
			</body>
		</html>
	);
}
