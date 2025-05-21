// app/signin/page.tsx
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // For logo
import { Mail, Lock, LogIn } from "lucide-react"; // For input icons
// You might need a Google icon, e.g., from react-icons: import { FcGoogle } from 'react-icons/fc';

// Simple Google Icon (SVG) - replace with a better one if available
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);


export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center 
                   bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 
                   dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 
                   px-4 py-8 sm:py-12">
      
      {/* Logo and App Name */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block mb-4">
          <Image 
            src="/logo.png" // Replace with your actual logo
            alt="ElectroMart Logo" 
            width={64} 
            height={64}
            className="h-12 w-auto sm:h-16" 
          />
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
          Welcome to Electro<span className="text-indigo-600 dark:text-amber-400">Mart</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Sign in to access your account and explore our products.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-10 w-full max-w-md">
        {/* Credentials form */}
        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/", // Or a specific dashboard page
              });
            } catch (error) {
              // Handle sign-in errors (e.g., display a message)
              // This requires client-side state, so for a pure server component,
              // you might redirect with an error query param.
              // For NextAuth.js, errors are often handled by redirecting to ?error=CredentialsSignin
              console.error("Sign-in error:", error);
              // If you want to show an error on this page, you'd need to pass it via URL
              // or convert parts of this page to client components.
              // Example: redirect(`/signin?error=CredentialsSignin`);
            }
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 
                           rounded-lg shadow-sm text-slate-900 dark:text-slate-100 
                           bg-white dark:bg-slate-700 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-500 
                           focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <Link href="/forgot-password" 
                    className="text-xs text-indigo-600 dark:text-amber-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 
                           rounded-lg shadow-sm text-slate-900 dark:text-slate-100
                           bg-white dark:bg-slate-700
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-500 
                           focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          
          {/* Error display area (requires handling error state, e.g., from URL query param) */}
          {/* Example:
            const searchParams = useSearchParams();
            const error = searchParams.get('error');
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">
                Sign-in failed. Please check your credentials.
              </p>
            )}
          */}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 
                       bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-500 dark:hover:bg-amber-600 
                       text-white font-semibold rounded-lg shadow-md
                       transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500 dark:focus:ring-amber-500 dark:focus:ring-offset-slate-800
                       transform hover:-translate-y-0.5"
          >
            <LogIn size={18} />
            Sign in with Email
          </button>
        </form>

        <div className="flex items-center my-6 sm:my-8">
          <div className="flex-grow h-px bg-slate-300 dark:bg-slate-600" />
          <span className="px-4 text-sm text-slate-500 dark:text-slate-400">OR</span>
          <div className="flex-grow h-px bg-slate-300 dark:bg-slate-600" />
        </div>

        {/* Social Sign-In (Google) */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 
                       bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600
                       text-slate-700 dark:text-slate-200 font-medium rounded-lg 
                       border border-slate-300 dark:border-slate-600 shadow-sm
                       transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500 dark:focus:ring-amber-500 dark:focus:ring-offset-slate-800
                       transform hover:-translate-y-0.5"
          >
            <GoogleIcon className="h-5 w-5" />
            Sign in with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-indigo-600 dark:text-amber-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <footer className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} ElectroMart. All rights reserved. <br />
        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link> | <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
      </footer>
    </main>
  );
}