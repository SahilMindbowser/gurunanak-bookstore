"use client";

import { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {children}
        </div>
    );
}
