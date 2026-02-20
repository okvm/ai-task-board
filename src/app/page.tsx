'use client'

import { useState } from 'react'
import { useQuery } from '@convex-dev/react'
import { Plus, Filter, BarChart3 } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

export default function TaskBoard() {
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState<any>(null)
  const [filter, setFilter] = useState<'all' | 'me' | 'you'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'inprogress' | 'done'>('all')
  
  const tasks = useQuery('tasks:getTasks') || []
  
  // 过滤任务
  const filteredTasks = tasks.filter((task: any) => {
    const assigneeMatch = filter === 'all' || task.assignee === filter
    const statusMatch = statusFilter === 'all' || task.status === statusFilter
    return assigneeMatch && statusMatch
  })
  
  // 按状态分组任务
  const todoTasks = filteredTasks.filter((task: any) => task.status === 'todo')
  const inProgressTasks = filteredTasks.filter((task: any) => task.status === 'inprogress')
  const doneTasks = filteredTasks.filter((task: any) => task.status === 'done')
  
  // 统计数据
  const totalTasks = tasks.length
  const myTasks = tasks.filter((task: any) => task.assignee === 'me').length
  const yourTasks = tasks.filter((task: any) => task.assignee === 'you').length
  const completedTasks = tasks.filter((task: any) => task.status === 'done').length
  
  const handleEditTask = (task: any) => {
    setEditTask(task)
    setShowForm(true)
  }
  
  const handleCloseForm = () => {
    setShowForm(false)
    setEditTask(null)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI任务看板</h1>
              <p className="text-gray-600 mt-1">24小时AI任务管理系统</p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>新建任务</span>
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 统计面板 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="text-blue-500" size={24} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总任务数</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                我
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">我的任务</p>
                <p className="text-2xl font-bold text-gray-900">{myTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI任务</p>
                <p className="text-2xl font-bold text-gray-900">{yourTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                ✓
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">已完成</p>
                <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 过滤器 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-gray-500" />
            <div className="flex space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有任务</option>
                <option value="me">我的任务</option>
                <option value="you">AI任务</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有状态</option>
                <option value="todo">待办</option>
                <option value="inprogress">进行中</option>
                <option value="done">已完成</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 任务看板 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 待办任务 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                待办任务 ({todoTasks.length})
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {todoTasks.map((task: any) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))}
              {todoTasks.length === 0 && (
                <p className="text-gray-500 text-center py-8">暂无待办任务</p>
              )}
            </div>
          </div>
          
          {/* 进行中任务 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                进行中 ({inProgressTasks.length})
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {inProgressTasks.map((task: any) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))}
              {inProgressTasks.length === 0 && (
                <p className="text-gray-500 text-center py-8">暂无进行中任务</p>
              )}
            </div>
          </div>
          
          {/* 已完成任务 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                已完成 ({doneTasks.length})
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {doneTasks.map((task: any) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))}
              {doneTasks.length === 0 && (
                <p className="text-gray-500 text-center py-8">暂无已完成任务</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 任务表单模态框 */}
      {showForm && (
        <TaskForm
          onClose={handleCloseForm}
          editTask={editTask}
        />
      )}
    </div>
  )
}