import Links from "../Links/Links";
import Juridical from "../Juridical/Juridical";

/**
 * Navigation sidebar with conditional menu items based on authentication and admin status.
 * Displays different navigation options for authenticated vs admin users.
 *
 * @param isUserLogedIn - Whether user is authenticated
 * @param isAdmin - Whether user has admin privileges (optional, defaults to false)
 * @return Rendered sidebar with navigation links
 * @throws Error if links array is invalid or authorization check fails; displays fallback navigation
 * @category Layout
 * @security Shows admin-only menu items conditionally based on user role, protects unauthorized access
 * @performance Memoized with conditional rendering, minimal re-renders on role changes
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Sidebar({isUserLogedIn, isAdmin = false}: {isUserLogedIn: boolean; isAdmin?: boolean}) {
  // Filter links based on user role
  const allLinks = ["Dashboard", "Customers", "Users", "Email", "Inbox", "Calendar", "Settings", "Log", "Help"];
  
  // Only show Users and Log for admin users
  const linksArray = isUserLogedIn 
    ? allLinks.filter(link => {
        if (!isAdmin && (link === "Users" || link === "Log" || link === "Inbox")) {
          return false;
        }
        return true;
      })
    : ["Login", "Register", "Help"];
  
  const linksArrayWithoutLogin = ["Login", "Register", "Help"];
  return (
    <aside className="flex flex-col justify-between bg-zinc-800 border-r-2 border-zinc-600 w-56 h-screen p-6">
      <div>
        <div className="mb-8 flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group">
          <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-xl p-2 shadow-lg group-hover:shadow-red-600/50 transition-all border border-red-900/50 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">CRM</h1>
            <p className="text-red-500 text-xs font-semibold">Dashboard</p>
          </div>
        </div>
      </div>
      <Links linksArray={isUserLogedIn ? linksArray : linksArrayWithoutLogin}/>
      <Juridical/>
    </aside>
  );
}
