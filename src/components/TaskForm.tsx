'use client'

import { useState } from 'react'
import { useMutation } from '@convex-dev/react'

interface TaskFormProps {
  onClose: () => void
  editTask?: {
    _id: string
    title: string
    description: string
    assignee: 'me' | 'you'
    priority: 'low' | 'medium' | 'high'
    dueDate?: number
  } | null
}

export default function TaskForm({ onClose, editTask }: TaskFormProps) {
  const createTask = useMutation('tasks:createTask')
  const updateTask = useMutation('tasks:updateTask')
  
  const [formData, setFormData] = useState({
    title: editTask?.title || '',
    description: editTask?.description || '',
    assignee: editTask?.assignee || 'me' as 'me' | 'you',
    priority: editTask?.priority || 'medium' as 'low' | 'medium' | 'high',
    dueDate: editTask?.dueDate ? new Date(editTask.dueDate).toISOString().split('T')[0] : '',
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const taskData = {
      title: formData.title,
      description: formData.description,
      assignee: formData.assignee,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).getTime() : undefined,
    }
    
    if (editTask) {
      await updateTask({
        id: editTask._id,
        ...taskData,
      })
    } else {
      await createTask(taskData)
    }
    
    onClose()
  }
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {editTask ? '编辑任务' : '创建新任务'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              任务标题
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              任务描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分配给
            </label>
            <select
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="me">我</option>
              <option value="you">你</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              优先级
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              截止日期 (可选)
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {editTask ? '更新任务' : '创建任务'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}