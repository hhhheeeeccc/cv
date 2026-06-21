// Reading this as: High-precision B2B task interface. Precision: 8, Motion: 3, Variance: 3.
import React, { useState, useMemo } from 'react';
import {
  Plus, Search, Calendar, CheckCircle2,
  Circle, Clock, Filter, ArrowUpDown,
  LayoutGrid, List as ListIcon, ChevronRight, Hash
} from 'lucide-react';
import './task_manager_modal.scss';

// --- Definitions ---

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string; title: string; description: string;
  status: TaskStatus; priority: TaskPriority;
  dueDate?: string; createdAt: string;
}

const NAV_ITEMS = [
  { id: 'all', label: 'All Tasks', icon: ListIcon, count: 4 },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 }
];

const MOCK_TASKS: Task[] = [
  { id: 'TSK-101', title: 'Review design guidelines', description: 'Assimilate the rules in DESIGN_TASTE.md.', status: 'completed', priority: 'high', dueDate: '2024-06-20', createdAt: '2024-06-19' },
  { id: 'TSK-102', title: 'Implement RTL support', description: 'Apply logical CSS properties for seamless switching.', status: 'in-progress', priority: 'high', dueDate: '2024-06-21', createdAt: '2024-06-19' },
  { id: 'TSK-103', title: 'Refactor Task List view', description: 'Migrate to a high-density, professional grid layout.', status: 'todo', priority: 'medium', dueDate: '2024-06-22', createdAt: '2024-06-19' },
  { id: 'TSK-104', title: 'Finalize SCSS tokens', description: 'Sync Zinc-based neutral palette across components.', status: 'todo', priority: 'low', dueDate: '2024-06-23', createdAt: '2024-06-19' }
];

// --- Components ---

const PriorityBars: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const isHigh = priority === 'high';
  const isMed = priority === 'medium' || isHigh;
  const colors = { low: 'text-zinc-300', medium: 'text-amber-500', high: 'text-rose-500' };

  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3].map(i => {
        const active = (i === 1) || (i === 2 && isMed) || (i === 3 && isHigh);
        return (
          <div key={i} className={`w-1 ${i === 1 ? 'h-2' : i === 2 ? 'h-3' : 'h-4'} rounded-full ${active ? colors[priority] : 'bg-zinc-100'} bg-current`} />
        );
      })}
    </div>
  );
};

export const TaskManagerModal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');

  const filtered = useMemo(() => tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
  ), [tasks, search]);

  const toggle = (id: string) => setTasks(prev => prev.map(t => t.id === id ? {
    ...t, status: t.status === 'completed' ? 'todo' : 'completed'
  } : t));

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
                {[ {id:'list', icon:ListIcon}, {id:'grid', icon:LayoutGrid} ].map(v => (
                  <button key={v.id} onClick={() => setView(v.id as any)}
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
            {['Status', 'Priority'].map(l => (
              <button key={l} className="tm-filter-btn">
                {l === 'Status' ? <Filter size={14} /> : <ArrowUpDown size={14} />}
                <span>{l}</span>
              </button>
            ))}
          </div>

          <div className="tm-content">
            <div className="tm-list-header">
              <div className="tm-col-status">S</div>
              <div className="tm-col-id">ID</div>
              <div className="tm-col-title">Title</div>
              <div className="tm-col-priority">Pri</div>
              <div className="tm-col-date">Due</div>
            </div>
            <div className="tm-list-body">
              {filtered.map(t => (
                <div key={t.id} className={`tm-row ${t.status === 'completed' ? 'is-completed' : ''}`}>
                  <div className="tm-col-status">
                    <button onClick={() => toggle(t.id)} className="tm-status-btn">
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
