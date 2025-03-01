import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="space-x-4 m-4">
			<Link href="/auth/login">
				<Button>Sign In</Button>
			</Link>
			<Link href="/auth/register">
				<Button>Sign Up</Button>
			</Link>
		</div>
	);
}
