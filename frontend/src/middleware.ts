import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isAuthPage = createRouteMatcher(['/', '/signup(.*)', '/login(.*)', '/sso-callback(.*)']);
const isPublicRoute = createRouteMatcher(['/', '/signup(.*)', '/login(.*)', '/sso-callback(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (userId && isAuthPage(req)) {
    const url = new URL('/dashboard', req.url);
    return Response.redirect(url);
  }

  if (!userId && !isPublicRoute(req)) {
    const url = new URL('/login', req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
