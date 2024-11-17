import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import CoolHeaderText from "./cool-header-text";
import Link from "next/link";

export default function Header() {
	return (
		<>
			<section
				id="hero"
				className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 text-center md:mt-[-50px] md:px-8"
			>
				<div className="relative">
					<CoolHeaderText />
				</div>
				<p className="mb-16 mt-2 -translate-y-4 animate-fade-in text-balance text-base tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-base">
					Chat now with our AI-powered paralegal to get started!
				</p>
				<div className="flex w-full flex-col justify-center md:flex-row">
					<Link href="/chat" prefetch={true}>
						<Button className="-translate-y-4 animate-fade-in gap-1 text-white opacity-0 ease-in-out [--animation-delay:600ms] dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200">
							<span>Chat now</span>
							<ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>
			</section>
		</>
	);
}