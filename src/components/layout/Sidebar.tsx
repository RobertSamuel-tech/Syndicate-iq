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
    <aside className="hidden lg:flex w-72 bg-gradient-to-b from-primary-navy to-primary-900 border-r border-primary-800 h-full flex-col shadow-xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-primary-800/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-accent-gold to-accent-600 rounded-lg shadow-lg">
            <span className="text-primary-navy font-black text-xl">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SyndicateIQ</h1>
            <p className="text-xs text-primary-300 font-medium">Ultra Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-gradient-to-r from-accent-gold/20 to-accent-gold/10 text-accent-gold border border-accent-gold/30 shadow-md'
                    : 'text-primary-200 hover:text-white hover:bg-primary-800/50'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent-gold rounded-r-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className={cn(
                    'h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110',
                    isActive ? 'text-accent-gold' : 'text-primary-300'
                  )} />
                  <span className="flex-1 font-semibold">{item.label}</span>
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-all',
                      'opacity-0 group-hover:opacity-100 group-hover:translate-x-1',
                      isActive && 'opacity-100'
                    )}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-800/50">
        <div className="bg-gradient-to-r from-primary-800/50 to-primary-900/50 rounded-lg p-4 border border-accent-gold/20 backdrop-blur-sm">
          <p className="text-xs text-primary-300 mb-1 font-medium">Hackathon Build</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-semantic-success-500 rounded-full animate-pulse" />
            <p className="text-sm font-bold text-accent-gold">
              LMA 2025
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
