import * as React from "react";

import { ny } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";

export const components: {
	title: string;
	href: string;
	description: string;
	isTargetBlank?: boolean;
	rel?: "noopener noreferrer";
}[] = [
	{
		title: "Source Code",
		href: "https://github.com/paulbayfield/legaleagles",
		description:
			"View the source code on GitHub and contribute to the project.",
		isTargetBlank: true,
		rel: "noopener noreferrer",
	},
	{
		title: "Documentation",
		href: "https://github.com/paulbayfield/legaleagles",
		description: "Read the documentation to learn more about LegalEagles.",
		isTargetBlank: true,
	},
];

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={ny(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
const ListItem2 = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={ny(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
ListItem.displayName = "ListItem2";

export function Navigation() {
	return (
		<div className="border-grey sticky left-0 top-0 z-40 flex w-full items-center justify-center border-b bg-background p-2">
			<NavigationMenu>
				<NavigationMenuList className="hidden w-full items-center justify-between gap-32 py-3 sm:flex">
					<div>
						<NavigationMenuItem className="flex cursor-pointer items-center">
							<NavigationMenuLink href="/">
								<Logo withText />
							</NavigationMenuLink>
						</NavigationMenuItem>
					</div>
					<div className="flex">
						<NavigationMenuItem>
							<NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<a
												className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												href="/"
											>
												<Logo />
												<div className="mb-2 mt-4 text-lg font-medium">
													Paralegal.ai
												</div>
												<p className="text-sm leading-tight text-muted-foreground">
													An AI-powered paralegal to help you with your legal needs.
												</p>
											</a>
										</NavigationMenuLink>
									</li>
									<ListItem href="/chat" title="Chat">
										Chat with our AI-powered paralegal to get started!
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>{"Useful Links"}</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{components.map(
										({ description, href, title, isTargetBlank, rel }) => (
											<ListItem
												key={title}
												title={title}
												href={href}
												target={isTargetBlank ? "_blank" : "_self"}
												rel={rel}
											>
												{description}
											</ListItem>
										),
									)}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</div>
                    <div>
                        <ModeToggle />
                    </div>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}