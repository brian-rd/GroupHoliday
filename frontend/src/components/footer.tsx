import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t py-6 px-24 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
            <span className="font-bold">Voyagen</span>
            </div>

            <div className="text-sm text-muted-foreground">© 2025 Voyagen. All rights reserved.</div>

            <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help
            </Link>
            </div>
        </div>
        </footer>
    );
}