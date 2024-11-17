"use client";

import StickyBox from "react-sticky-box";

// TODO: Create a form to upload documents
function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
}

export default function Documents() {
    return (
        <>
            
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Upload Documents</h1>
                <div className="flex flex-col items-center justify-center w-full">
                    <form className="flex flex-col items-center justify-center w-ful" onSubmit={handleSubmit}>
                        <input type="file" id="file" name="file" />
                        <label htmlFor="file">Choose a file</label>
                    </form>
                </div>
            </div>
        </>
    );
}
