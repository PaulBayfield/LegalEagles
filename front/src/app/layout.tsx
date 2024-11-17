import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import Footer from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ny } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Paralegal.ai",
	description: "Paralegal.ai",
	applicationName: "Paralegal.ai",
	generator: "Next.js",
	creator: "Paralegal.ai",
	robots: "index, follow",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning>
			<body className={ny("bg-background", inter.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<StyledComponentsRegistry>
						<div className="flex min-h-screen flex-col">
							<Navigation />
							<main className="flex h-full min-h-screen flex-1 flex-col items-center justify-center py-4">
								{children}
							</main>
							<Footer />
						</div>
					</StyledComponentsRegistry>
				</ThemeProvider>
			</body>
		</html>
	);
}