import { Link } from 'react-router-dom'
import { useAuth, LogoutButton } from "domains/auth";
import { Button } from "components/button";

export const AppShell = ({ children }) => {
  const { status, userName } = useAuth(); 

  return (
    <>
      <header className="md:sticky md:top-0 bg-white md:z-10">
        <div className="px-4">
          <div className="flex justify-between items-center py-2 max-w-7xl mx-auto border-b border-gray-200">
            <nav className="flex items-center">
              <Link to="/"
                className="text-xl inline-block mr-4 font-bold text-pink-700 hover:text-pink-900"
              >
                React Homework - day 4
                </Link>
              <div className="flex items-center gap-4">
              <Link to="/movie"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Movies
                </Link>
              </div>
            </nav>
            {status === "authenticated" ? (
              <div className="flex gap-3">
              Logged in as {userName}
                <LogoutButton />
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary">
                Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};
