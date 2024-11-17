import { ny } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export default function Logo({ withText, ...props }: any) {
	return (
		<div className="m-0 flex items-center" {...props}>
			<Image
				src={`/logos/logo.webp`}
				width={40}
				height={40}
				alt="Paralegal.ai Logo"
				className={ny(
					"transition-all duration-300 hover:scale-110",
					withText && "mr-2",
				)}
			/>
			{withText && <span className="ml-2 text-2xl font-bold">Paralegal.ai</span>}
		</div>
	);
}