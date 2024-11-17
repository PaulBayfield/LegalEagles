"use client";

import { UploadIcon } from "lucide-react";
import StickyBox from "react-sticky-box";


const documents = [
    {
        id: 1,
        name: "Document 1",
        description: "This is document 1",
    },
    {
        id: 2,
        name: "Document 2",
        description: "This is document 2",
    },
    {
        id: 3,
        name: "Document 3",
        description: "This is document 3",
    },
];

export default function Documents() {
    return (
        <>
            <div className="relative h-[700px] mx-5 mb-8 flex-1 rounded-xl bg-surface px-5 py-16 shadow dark:bg-[#121212] lg:mx-0 lg:mb-0 lg:max-w-[30rem] lg:rounded-l-none lg:rounded-br-lg lg:rounded-tr-lg lg:px-10 xl:w-1/3 2xl:w-1/4">
				<StickyBox
					className="h-fit w-full text-xs text-muted-foreground lg:mb-0"
					offsetTop={120}
				>
					<h1 className="text-4xl font-bold">Documents</h1>
                    <div className="flex items-center justify-center w-full mt-8">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadIcon className="w-10 h-10 text-gray-500 dark:text-gray-400 mb-2" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Documents</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div> 
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold">Your Documents</h2>
                        {documents.map((document) => (
                            <p className="text-sm mt-1" key={document.id}>
                                {document.name}.pdf
                            </p>
                        ))}
                    </div>
				</StickyBox>
			</div>
        </>
    );
}
