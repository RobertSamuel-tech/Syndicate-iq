import { User, Settings, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-gold to-accent-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-primary-navy font-black text-xl">S</span>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">SyndicateIQ</span>
            <span className="text-xs text-gray-500 ml-2 font-medium">Ultra</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-semantic-danger-500 rounded-full" />
        </motion.button>
        <Button variant="ghost" size="sm" className="hidden sm:flex">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary-navy to-primary-800 rounded-full flex items-center justify-center shadow-sm">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
