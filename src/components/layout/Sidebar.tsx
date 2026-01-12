import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, TrendingUp, Shield, Leaf, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/document-processing',
    label: 'Document Processing',
    icon: FileText,
  },
  {
    path: '/due-diligence',
    label: 'Due Diligence',
    icon: TrendingUp,
  },
  {
    path: '/covenant-monitoring',
    label: 'Covenant Monitoring',
    icon: Shield,
  },
  {
    path: '/esg-monitoring',
    label: 'ESG Monitoring',
    icon: Leaf,
  },
  {
    path: '/esg-veritas',
    label: 'ESG Veritas',
    icon: Leaf,
  },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 glass-lg border-r border-white/20 h-full flex-col backdrop-blur-xl">
      {/* Logo Section */}
      <div className="px-6 pt-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg backdrop-blur-sm flex-shrink-0">
            <span className="font-black text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white leading-tight">SyndicateIQ</h1>
            <p className="text-xs text-white/60 font-medium leading-tight mt-0.5">Ultra Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative',
                    isActive
                      ? 'bg-white/12 text-white border border-cyan-500/40 shadow-lg backdrop-blur-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/8 hover:border-white/10'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-full"
                      />
                    )}
                    <Icon className={cn(
                      'h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110',
                      isActive ? 'text-cyan-400' : 'text-white/60'
                    )} />
                    <span className="flex-1 font-semibold">{item.label}</span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 transition-all text-white/40',
                        'opacity-0 group-hover:opacity-100 group-hover:translate-x-1',
                        isActive && 'opacity-100'
                      )}
                    />
                  </>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="glass-sm rounded-xl p-4 border border-white/15 backdrop-blur-sm hover:border-white/25 transition-all"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-sm font-bold text-cyan-400">
              LMA
            </p>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
