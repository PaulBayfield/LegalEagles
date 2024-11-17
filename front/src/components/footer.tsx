import Logo from "./logo";
import {
	GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function Footer() {
	return (
		<div className="border-grey align-center mt-10 flex w-full flex-col border-t px-10 py-10 font-medium md:px-0">
			<div className="mx-auto flex w-full justify-between gap-[20px] border-b px-10 pb-10 pt-10 lg:!w-2/3 lg:px-0">
				<div className="flex flex-col">
					<Logo />
					<div className="mt-6">
						<h1 className="text-2xl font-bold opacity-80">Paralegal.ai</h1>
						<div className="mt-4 flex opacity-70">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/paulbayfield/legaleagles"
							>
								<GitHubLogoIcon className="h-5 w-5" />
							</a>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row">
					<div>
						<h2 className="text-md font-bold opacity-80">Get Started</h2>
						<ul className="mt-4 font-normal opacity-70">
							<li>
								<a href="/chat">Chat</a>
							</li>
						</ul>
					</div>
					<div className="mt-10 md:ml-12 md:mt-0 lg:ml-24">
						<h2 className="text-md font-bold opacity-80">Resources</h2>
						<ul className="mt-4 font-normal opacity-70">
							<li className="mt-2">
								<a
									target="_blank"
									href="https://github.com/paulbayfield/legaleagles"
								>
									Source Code
								</a>
							</li>
							<li className="mt-2">
								<a target="_blank" href="https://github.com/paulbayfield/legaleagles">
									Documentation
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="mx-auto flex w-full items-center pl-3 pr-5 pt-10 lg:!w-2/3 text-xs font-normal opacity-70">
				<p>
					Crafted with ❤️ by the LegalEagles - Copyright ©{" "}
					{new Date().getFullYear()} LegalEagles
				</p>
				<a href="/chat" className="ml-auto">
					<Button className="ml-auto">Chat now</Button>
				</a>
			</div>
		</div>
	);
}