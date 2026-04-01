import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			{children}
		</div>
	);
}
