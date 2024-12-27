import React from 'react';
import { ChefHat, Heart, Home, Info, LogOut, User } from 'lucide-react';

interface NavbarProps {
  username?: string;
  onLogout: () => void;
}

export function Navbar({ username, onLogout }: NavbarProps) {
  return (
    <nav className="bg-emerald-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <ChefHat className="w-8 h-8" />
            <span className="text-xl font-bold">Food Muse</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <NavLink icon={<Home className="w-5 h-5" />} text="Home" />
            <NavLink icon={<Info className="w-5 h-5" />} text="About" />
            <NavLink icon={<Heart className="w-5 h-5" />} text="Saved Recipes" />
            
            <div className="relative group">
              <button className="flex items-center space-x-2 hover:text-emerald-200">
                <User className="w-5 h-5" />
                <span>{username || 'Profile'}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <button
                  onClick={onLogout}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-emerald-50 w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <a href="#" className="flex items-center space-x-1 hover:text-emerald-200">
      {icon}
      <span>{text}</span>
    </a>
  );
}