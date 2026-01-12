import { User, Settings, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <nav className="glass-lg border-b border-white/20 px-4 md:px-6 py-4 flex items-center justify-end sticky top-0 z-50 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="p-2.5 rounded-xl hover:bg-white/12 transition-all relative glass-sm border border-white/10 hover:border-white/20 hover:shadow-lg">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
          </button>
        </motion.div>
        <Button variant="ghost" size="sm" className="hidden sm:flex text-white hover:bg-white/10">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-sm border border-white/10 hover:bg-white/12 hover:border-white/20 transition-all cursor-pointer hover:shadow-lg"
        >
          <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-white/60">Administrator</p>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
