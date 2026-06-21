// Reading this as: B2B high-precision task management interface, leaning toward Linear-style minimalist language, with restrained motion and a focus on typographic hierarchy.
import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Hash
} from 'lucide-react';
import './task_manager_modal.scss';

// --- Types ---

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  assignee?: string;
}

// --- Mock Data ---

const MOCK_TASKS: Task[] = [
  {
    id: 'TSK-101',
    title: 'Review design guidelines',
    description: 'Ensure compliance with DESIGN_TASTE.md for the new task manager component.',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-06-20',
    createdAt: '2024-06-19',
    assignee: 'Jules'
  },
  {
    id: 'TSK-102',
    title: 'Implement RTL support',
    description: 'Apply logical CSS properties to handle bidirectional layouts seamlessly.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-06-21',
    createdAt: '2024-06-19',
    assignee: 'Jules'
  },
  {
    id: 'TSK-103',
    title: 'Refactor Task List view',
    description: 'Migrate to a high-density, professional grid layout with refined typography.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-06-22',
    createdAt: '2024-06-19',
    assignee: 'Jules'
  },
  {
    id: 'TSK-104',
    title: 'Finalize SCSS tokens',
    description: 'Sync Zinc-based neutral palette across all component states.',
    status: 'todo',
    priority: 'low',
    dueDate: '2024-06-23',
    createdAt: '2024-06-19',
    assignee: 'Jules'
  }
];

// --- Sub-components ---

const PriorityIndicator: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const colors = {
    low: 'text-zinc-400',
    medium: 'text-amber-500',
    high: 'text-rose-500',
  };

  return (
    <div className="flex gap-0.5">
      <div className={`w-1 h-3 rounded-full ${priority === 'low' || priority === 'medium' || priority === 'high' ? colors[priority] : 'bg-zinc-200'} bg-current opacity-40`} />
      <div className={`w-1 h-3 rounded-full ${priority === 'medium' || priority === 'high' ? colors[priority] : 'bg-zinc-200'} bg-current opacity-60`} />
      <div className={`w-1 h-3 rounded-full ${priority === 'high' ? colors[priority] : 'bg-zinc-200'} bg-current`} />
    </div>
  );
};

// --- Main Component ---

export const TaskManagerModal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = task.title.toLowerCase().includes(query) ||
                           task.description.toLowerCase().includes(query) ||
                           task.id.toLowerCase().includes(query);
      const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filterStatus]);

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      status: t.status === 'completed' ? 'todo' : 'completed'
    } : t));
  };

  return (
    <div className="tm-overlay">
      <div className="tm-modal" role="dialog" aria-modal="true">
        {/* Navigation / Header */}
        <aside className="tm-sidebar">
          <div className="tm-logo-area">
            <div className="tm-logo-mark">
              <Hash size={18} />
            </div>
            <span className="tm-logo-text">Workspace</span>
          </div>

          <nav className="tm-nav">
            <button className="tm-nav-item is-active">
              <ListIcon size={18} />
              <span>All Tasks</span>
              <span className="tm-nav-count">{tasks.length}</span>
            </button>
            <button className="tm-nav-item">
              <Clock size={18} />
              <span>Recent</span>
            </button>
            <button className="tm-nav-item">
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </button>
          </nav>

          <div className="mt-auto p-4 border-t border-zinc-100">
             <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-50 cursor-pointer transition-colors">
               <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-bold">J</div>
               <span className="text-xs font-medium text-zinc-700">Jules Manager</span>
             </div>
          </div>
        </aside>

        <main className="tm-main">
          <header className="tm-top-bar">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-zinc-900">Task Overview</h2>
              <ChevronRight size={14} className="text-zinc-300" />
              <span className="text-xs text-zinc-500 font-medium">Sprint 24</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="tm-view-toggle">
                <button
                  onClick={() => setViewMode('list')}
                  className={`tm-toggle-btn ${viewMode === 'list' ? 'is-active' : ''}`}
                >
                  <ListIcon size={14} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`tm-toggle-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                >
                  <LayoutGrid size={14} />
                </button>
              </div>
              <button className="tm-btn-primary">
                <Plus size={16} />
                <span>Issue</span>
              </button>
            </div>
          </header>

          <div className="tm-toolbar">
            <div className="tm-search">
              <Search size={14} className="tm-search-icon" />
              <input
                type="text"
                placeholder="Filter issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tm-search-input"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="tm-toolbar-btn">
                <Filter size={14} />
                <span>Status</span>
              </button>
              <button className="tm-toolbar-btn">
                <ArrowUpDown size={14} />
                <span>Priority</span>
              </button>
            </div>
          </div>

          <div className="tm-content">
            <div className="tm-list-header">
              <div className="tm-col-status">Status</div>
              <div className="tm-col-id">ID</div>
              <div className="tm-col-title">Title</div>
              <div className="tm-col-priority">Priority</div>
              <div className="tm-col-date">Due Date</div>
            </div>

            <div className="tm-list-body">
              {filteredTasks.map(task => (
                <div key={task.id} className={`tm-row ${task.status === 'completed' ? 'is-completed' : ''}`}>
                  <div className="tm-col-status">
                    <button
                      onClick={() => toggleStatus(task.id)}
                      className="tm-status-indicator"
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle2 size={16} className="text-blue-600" />
                      ) : task.status === 'in-progress' ? (
                        <Clock size={16} className="text-amber-500" />
                      ) : (
                        <Circle size={16} className="text-zinc-300" />
                      )}
                    </button>
                  </div>
                  <div className="tm-col-id">{task.id}</div>
                  <div className="tm-col-title">
                    <span className="tm-task-title-text">{task.title}</span>
                    <span className="tm-task-desc-peek">{task.description}</span>
                  </div>
                  <div className="tm-col-priority">
                    <PriorityIndicator priority={task.priority} />
                  </div>
                  <div className="tm-col-date">
                    {task.dueDate ? (
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Calendar size={12} />
                        <span>{task.dueDate}</span>
                      </div>
                    ) : '-'}
                  </div>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <div className="tm-empty">
                  <div className="tm-empty-icon">
                    <Search size={32} />
                  </div>
                  <p className="tm-empty-text">No issues found matching your filters</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskManagerModal;
