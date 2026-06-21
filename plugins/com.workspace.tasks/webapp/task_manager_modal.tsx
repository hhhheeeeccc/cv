// Reading this as: High-precision B2B task interface. Precision: 8, Motion: 3, Variance: 3.
import React, { useState, useMemo, useCallback } from 'react';
import {
  Plus, Search, Calendar, CheckCircle2,
  Circle, Clock, Filter, ArrowUpDown,
  LayoutGrid, List as ListIcon, ChevronRight, Hash
} from 'lucide-react';
import './task_manager_modal.scss';

// --- Definitions ---

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type ViewMode = 'list' | 'grid';

export interface Task {
  id: string; title: string; description: string;
  status: TaskStatus; priority: TaskPriority;
  dueDate?: string; createdAt: string;
}

const NAV_ITEMS = [
  { id: 'all', label: 'All Tasks', icon: ListIcon, count: 4 },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 }
] as const;

const VIEW_MODES = [
  { id: 'list' as const, icon: ListIcon },
  { id: 'grid' as const, icon: LayoutGrid }
] as const;

const TOOLBAR_FILTERS = [
  { id: 'status', label: 'Status', icon: Filter },
  { id: 'priority', label: 'Priority', icon: ArrowUpDown }
] as const;

const MOCK_TASKS: Task[] = [
  { id: 'TSK-101', title: 'Review design guidelines', description: 'Assimilate the rules in DESIGN_TASTE.md.', status: 'completed', priority: 'high', dueDate: '2024-06-20', createdAt: '2024-06-19' },
  { id: 'TSK-102', title: 'Implement RTL support', description: 'Apply logical CSS properties for seamless switching.', status: 'in-progress', priority: 'high', dueDate: '2024-06-21', createdAt: '2024-06-19' },
  { id: 'TSK-103', title: 'Refactor Task List view', description: 'Migrate to a high-density, professional grid layout.', status: 'todo', priority: 'medium', dueDate: '2024-06-22', createdAt: '2024-06-19' },
  { id: 'TSK-104', title: 'Finalize SCSS tokens', description: 'Sync Zinc-based neutral palette across components.', status: 'todo', priority: 'low', dueDate: '2024-06-23', createdAt: '2024-06-19' }
];

const COLUMNS = [
  { id: 'status', label: 'S' },
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'priority', label: 'Pri' },
  { id: 'date', label: 'Due' }
] as const;

// --- Components ---

const PriorityBars: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const isHigh = priority === 'high';
  const isMed = priority === 'medium' || isHigh;
  const color = priority === 'low' ? 'text-zinc-300' : priority === 'medium' ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="flex gap-0.5 items-center">
      <div className={`w-1 h-2 rounded-full text-zinc-300 bg-current`} />
      <div className={`w-1 h-3 rounded-full ${isMed ? color : 'text-zinc-100'} bg-current`} />
      <div className={`w-1 h-4 rounded-full ${isHigh ? color : 'text-zinc-100'} bg-current`} />
    </div>
  );
};

export const TaskManagerModal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewMode>('list');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return tasks;
    return tasks.filter(t =>
      t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    );
  }, [tasks, search]);

  const toggleStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t, status: t.status === 'completed' ? 'todo' : 'completed'
    } : t));
  }, []);

  return (
    <div className="tm-overlay">
      <div className="tm-modal" role="dialog" aria-modal="true">
        <aside className="tm-sidebar">
          <div className="tm-logo-area">
            <div className="tm-logo-mark"><Hash size={16} /></div>
            <span className="tm-logo-text">Workspace</span>
          </div>
          <nav className="tm-nav">
            {NAV_ITEMS.map(item => (
              <button key={item.id} className={`tm-nav-item ${item.id === 'all' ? 'is-active' : ''}`}>
                <item.icon size={16} />
                <span>{item.label}</span>
                {item.count && <span className="tm-nav-count">{item.count}</span>}
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-zinc-100/50">
             <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer">
               <div className="w-6 h-6 rounded-md bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold">J</div>
               <span className="text-xs font-semibold text-zinc-700">Jules Manager</span>
             </div>
          </div>
        </aside>

        <main className="tm-main">
          <header className="tm-top-bar">
            <div className="tm-breadcrumb">
              <span>Sprint 24</span><ChevronRight size={14} /><span>Tasks</span>
            </div>
            <div className="tm-actions">
              <div className="tm-view-toggle">
                {VIEW_MODES.map(v => (
                  <button key={v.id} onClick={() => setView(v.id)}
                    className={`tm-toggle-btn ${view === v.id ? 'is-active' : ''}`}><v.icon size={14} /></button>
                ))}
              </div>
              <button className="tm-btn-primary"><Plus size={14} /><span>New Issue</span></button>
            </div>
          </header>

          <div className="tm-toolbar">
            <div className="tm-search">
              <Search size={14} className="tm-search-icon" />
              <input type="text" placeholder="Filter issues..." value={search}
                onChange={(e) => setSearch(e.target.value)} className="tm-search-input" />
            </div>
            {TOOLBAR_FILTERS.map(f => (
              <button key={f.id} className="tm-filter-btn">
                <f.icon size={14} />
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          <div className="tm-content">
            <div className="tm-list-header">
              {COLUMNS.map(col => (
                <div key={col.id} className={`tm-col-${col.id}`}>{col.label}</div>
              ))}
            </div>
            <div className="tm-list-body">
              {filtered.map(t => (
                <div key={t.id} className={`tm-row ${t.status === 'completed' ? 'is-completed' : ''}`}>
                  <div className="tm-col-status">
                    <button onClick={() => toggleStatus(t.id)} className="tm-status-btn">
                      {t.status === 'completed' ? <CheckCircle2 size={16} className="text-blue-600" /> :
                       t.status === 'in-progress' ? <Clock size={16} className="text-amber-500" /> :
                       <Circle size={16} className="text-zinc-200" />}
                    </button>
                  </div>
                  <div className="tm-col-id">{t.id}</div>
                  <div className="tm-col-title">
                    <span className="tm-task-title">{t.title}</span>
                    <span className="tm-task-desc">{t.description}</span>
                  </div>
                  <div className="tm-col-priority"><PriorityBars priority={t.priority} /></div>
                  <div className="tm-col-date">{t.dueDate ? <div className="flex items-center gap-1.5 text-zinc-400 justify-end"><Calendar size={12} /><span className="tabular-nums">{t.dueDate}</span></div> : '-'}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskManagerModal;
