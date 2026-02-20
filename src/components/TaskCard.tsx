'use client'

import { Trash2, Edit, Clock, User } from 'lucide-react'

interface Task {
  _id: string
  title: string
  description: string
  status: 'todo' | 'inprogress' | 'done'
  assignee: 'me' | 'you'
  priority: 'low' | 'medium' | 'high'
  createdAt: number
  updatedAt: number
  dueDate?: number
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'task-todo'
      case 'inprogress': return 'task-inprogress'
      case 'done': return 'task-done'
      default: return 'task-todo'
    }
  }
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  const handleStatusChange = async (newStatus: 'todo' | 'inprogress' | 'done') => {
    // 临时实现 - 实际项目中连接到Convex
    console.log(`任务状态更改为: ${newStatus}`)
  }
  
  const handleDelete = async () => {
    if (window.confirm('确定要删除这个任务吗？')) {
      // 临时实现 - 实际项目中连接到Convex
      console.log('删除任务')
    }
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN')
  }
  
  return (
    <div className={`task-card ${getStatusColor(task.status)}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">{task.description}</p>
      
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <User size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {task.assignee === 'me' ? '我' : '你'}
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Clock size={12} />
          <span>创建于 {formatDate(task.createdAt)}</span>
        </div>
        
        {task.dueDate && (
          <div className="text-xs text-gray-500">
            截止: {formatDate(task.dueDate)}
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => handleStatusChange('todo')}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            task.status === 'todo' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-red-100'
          }`}
        >
          待办
        </button>
        <button
          onClick={() => handleStatusChange('inprogress')}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            task.status === 'inprogress' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
          }`}
        >
          进行中
        </button>
        <button
          onClick={() => handleStatusChange('done')}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            task.status === 'done' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-green-100'
          }`}
        >
          已完成
        </button>
      </div>
    </div>
  )
}