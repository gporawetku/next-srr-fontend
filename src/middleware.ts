import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import rolesConsts from "./data/rolesConsts";
import { extractFirstSegmentUrl } from "./libs/utils/CheckSubstring";

export async function middleware(request: NextRequest) {
  const user: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const roles: any[] = user?.user?.roles || [];
  const rolePaths: any[] = rolesConsts?.rolePaths || [];

  if (pathname !== "/signin" && !user?.accessToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (pathname === "/signin" && !!user?.accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const currentPath = extractFirstSegmentUrl(pathname);

  if (!["/", "/signin", "/images", ""].includes(currentPath)) {
    const allowedPaths = roles?.reduce((acc, role) => {
      const rolePath = rolePaths?.find((r) => r?.id === role?.role_id);
      if (rolePath) acc?.push(rolePath?.path);
      return acc;
    }, []);

    const targetPath = extractFirstSegmentUrl(pathname);

    if (!allowedPaths?.includes(targetPath)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|media).*)"],
};
