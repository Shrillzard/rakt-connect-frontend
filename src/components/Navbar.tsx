import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Phone, Menu, X, Droplet, User } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("userProfile");
    setIsLoggedIn(!!userData);

    // Listen for storage changes
    const handleStorageChange = () => {
      const userData = localStorage.getItem("userProfile");
      setIsLoggedIn(!!userData);
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener("userLoginStateChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoginStateChanged", handleStorageChange);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    !isLoggedIn && { name: "Sign In", path: "/signin" },
    !isLoggedIn && { name: "Register", path: "/register" },
    isLoggedIn && { name: "Profile", path: "/profile" },
    { name: "Find Donors", path: "/find-donors" },
  ].filter(Boolean);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <Droplet className="h-8 w-8 text-primary fill-primary" />
              <Heart className="h-4 w-4 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="font-bold text-xl">RaktKosh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/emergency">
              <Button variant="emergency" size="sm">
                <Phone className="h-4 w-4" />
                Emergency
              </Button>
            </Link>
            {isLoggedIn ? (
              <Link to="/profile">
                <Button variant="hero" size="sm">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button variant="hero" size="sm">
                  Donate Blood
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 text-foreground/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 px-4">
                <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="emergency" size="sm" className="w-full">
                    <Phone className="h-4 w-4" />
                    Emergency
                  </Button>
                </Link>
                {isLoggedIn ? (
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full">
                      Donate Blood
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;