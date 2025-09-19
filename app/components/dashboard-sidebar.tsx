'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart3, Users, FileText, Settings, Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: BarChart3, current: true },
  { name: 'Students', icon: Users, current: false },
  { name: 'Reports', icon: FileText, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)} className="bg-card">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <span className="text-sidebar-accent-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-sidebar-foreground font-bold text-xl">Fayeda</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  item.current
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/60 text-center">© 2025 Fayeda Academy</p>
          </div>
        </div>
      </div>
    </>
  );
}