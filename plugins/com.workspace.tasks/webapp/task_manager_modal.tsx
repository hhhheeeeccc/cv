// Reading this as: Task management interface for professional users, with a clean SaaS language, leaning toward a balanced functional layout with subtle motion and neutral aesthetics.
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
  ArrowUpDown, ListChecks
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
}

// --- Mock Data ---

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Review design guidelines',
    description: 'Assimilate the rules in DESIGN_TASTE.md for the new task manager component.',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-06-20',
    createdAt: '2024-06-19',
  },
  {
    id: '2',
    title: 'Implement RTL support',
    description: 'Use logical CSS properties for seamless RTL/LTR switching.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-06-21',
    createdAt: '2024-06-19',
  },
  {
    id: '3',
    title: 'Refactor Task List view',
    description: 'Build the main Task List view inside task_manager_modal.tsx with Taste-Skill dials.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-06-22',
    createdAt: '2024-06-19',
  },
  {
    id: '4',
    title: 'Finalize SCSS styles',
    description: 'Apply sophisticated neutral colors and smooth motion transitions.',
    status: 'todo',
    priority: 'low',
    dueDate: '2024-06-23',
    createdAt: '2024-06-19',
  }
];

// --- Sub-components ---

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles = {
    low: 'bg-slate-100 text-slate-600 border-slate-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${styles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

// --- Main Component ---

export const TaskManagerModal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filterStatus]);

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextStatus: TaskStatus = task.status === 'completed' ? 'todo' : 'completed';
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  return (
    <div className="task-manager-backdrop">
      <div className="task-manager-container" role="dialog" aria-labelledby="modal-title">
        {/* Header */}
        <header className="task-manager-header">
          <div>
            <h1 id="modal-title" className="text-xl font-semibold text-zinc-900 tracking-tight">
              Task Manager
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your project objectives and daily tasks.
            </p>
          </div>
          <button className="btn-primary">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </header>

        {/* Toolbar */}
        <div className="task-manager-toolbar">
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="filter-group">
              <Filter size={14} className="text-zinc-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button className="btn-ghost">
              <ArrowUpDown size={16} />
            </button>
          </div>
        </div>

        {/* Task List */}
        <main className="task-manager-content">
          {filteredTasks.length > 0 ? (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`task-item ${task.status === 'completed' ? 'is-completed' : ''}`}>
                  <div className="task-item-main">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="task-status-toggle"
                      aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      ) : (
                        <Circle size={20} className="text-zinc-300" />
                      )}
                    </button>

                    <div className="task-details">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="task-title">{task.title}</h3>
                        <PriorityBadge priority={task.priority} />
                      </div>
                      <p className="task-description">{task.description}</p>

                      <div className="task-meta">
                        {task.dueDate && (
                          <div className="task-meta-item">
                            <Calendar size={12} />
                            <span>{task.dueDate}</span>
                          </div>
                        )}
                        <div className="task-meta-item">
                          <Clock size={12} />
                          <span>Created {task.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="task-actions">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="action-btn text-zinc-400 hover:text-rose-500"
                        aria-label="Delete task"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="action-btn text-zinc-400">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <ListChecks size={40} className="text-zinc-200" />
              </div>
              <h3>No tasks found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="task-manager-footer">
          <div className="text-xs text-zinc-400">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
          </div>
          <div className="flex gap-4">
            <button className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Keyboard Shortcuts
            </button>
            <button className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Documentation
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TaskManagerModal;
