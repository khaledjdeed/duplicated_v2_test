import React, { useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasksByUserId, mockUploads, getTasksByTeamId } from '../lib/mockData';
import { getUserById } from '../lib/mockUsers';
import { BackButton } from './BackButton';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Check, Image, FileText, Archive } from 'lucide-react';
import { Upload as UploadType, Task } from '../lib/types';
import toast from 'react-hot-toast';

export function FileUpload() {
  const { user, canManageAllUploads, canManageOwnUploads } = useAuth();
  const [uploads, setUploads] = useState<(UploadType & { status: 'uploading' | 'completed' | 'failed' })[]>(
    mockUploads.map(upload => ({ ...upload, status: 'completed' as const }))
  );

  const [selectedTaskId, setSelectedTaskId] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!selectedTaskId) {
      toast.error('Please select a task first');
      return;
    }

    acceptedFiles.forEach((file) => {
      const upload = {
        id: `upload-${Date.now()}-${Math.random()}`,
        task_id: selectedTaskId || undefined,
        uploaded_by: user?.id || '',
        file_name: file.name,
        file_path: `/uploads/${file.name}`,
        file_size: file.size,
        file_type: file.type,
        created_at: new Date().toISOString(),
        status: 'uploading' as const
      };

      setUploads(prev => [upload, ...prev]);

      // Simulate upload progress
      setTimeout(() => {
        setUploads(prev =>
          prev.map(u =>
            u.id === upload.id
              ? { ...u, status: 'completed' as const }
              : u
          )
        );
        toast.success(`${file.name} uploaded successfully`);
      }, 2000);
    });
  }, [selectedTaskId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
      'application/pdf': ['.pdf'],
      'application/zip': ['.zip'],
      'text/*': ['.txt', '.md'],
      'application/vnd.adobe.photoshop': ['.psd'],
      'application/vnd.adobe.illustrator': ['.ai']
    },
    maxFileSize: 50 * 1024 * 1024 // 50MB
  });

  const handleRemoveUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(u => u.id !== uploadId));
    toast.success('File removed successfully');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType === 'application/pdf') return FileText;
    if (fileType.includes('zip') || fileType.includes('archive')) return Archive;
    return File;
  };

  const getFilteredTasks = (): Task[] => {
    if (!user) return [];
    
    if (canManageAllUploads()) {
      // Can upload to any task
      return mockTasks;
    } else if (canManageOwnUploads()) {
      // Can only upload to own tasks
      return getTasksByUserId(user.id);
    }
    
    return [];
  };

  const getFilteredUploads = () => {
    if (!user) return [];
    
    if (canManageAllUploads()) {
      return uploads;
    } else if (canManageOwnUploads()) {
      return uploads.filter(upload => upload.uploaded_by === user.id);
    }
    
    return [];
  };

  const hasUploadAccess = canManageAllUploads() || canManageOwnUploads();
  const availableTasks = getFilteredTasks();
  const visibleUploads = getFilteredUploads();

  if (!hasUploadAccess) {
    return (
      <div className="p-6">
        <BackButton />
        <div className="text-center py-12">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to manage file uploads.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Upload className="h-6 w-6 mr-2 text-blue-600" />
            File Uploads
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {canManageAllUploads() ? 'Manage all file uploads' : 'Upload files for your assigned tasks'}
          </p>
        </div>
      </div>

      {/* Task Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Task
        </h2>
        <select
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Choose a task to upload files for...</option>
          {availableTasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.title} ({task.status})
            </option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : selectedTaskId
              ? 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
          }`}
        >
          <input {...getInputProps()} disabled={!selectedTaskId} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-blue-600 dark:text-blue-400">Drop the files here...</p>
          ) : selectedTaskId ? (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag 'n' drop files here, or click to select files
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports images, PDFs, ZIP files, and design files (up to 50MB)
              </p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Please select a task first before uploading files
            </p>
          )}
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {canManageAllUploads() ? 'All Uploaded Files' : 'My Uploaded Files'}
          </h2>
        </div>
        <div className="p-6">
          {visibleUploads.length === 0 ? (
            <div className="text-center py-8">
              <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleUploads.map((upload) => {
                const task = availableTasks.find(t => t.id === upload.task_id);
                const FileIcon = getFileIcon(upload.file_type);
                
                return (
                  <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {upload.file_name}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Task: {task?.title || 'Unknown'}</span>
                          <span>{formatFileSize(upload.file_size)}</span>
                          <span>{new Date(upload.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {upload.status === 'uploading' && (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                      )}
                      {upload.status === 'completed' && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {(canManageAllUploads() || upload.uploaded_by === user?.id) && (
                        <button
                          onClick={() => handleRemoveUpload(upload.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}