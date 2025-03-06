"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Camera, X, FileText, Image, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type UploadedFile = {
  id: string
  name: string
  size: number
  type: string
  progress: number
  url?: string
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = []

    Array.from(fileList).forEach((file) => {
      // Create a preview URL for images
      const url = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined

      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        url,
      })
    })

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }

      setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
    }, 300)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Image className="h-6 w-6" />
    if (fileType.includes("pdf")) return <FileText className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">Drag and drop your files here</p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse from your computer</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={triggerFileInput}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <Button variant="outline" onClick={triggerCameraInput}>
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG, DOCX, XLSX (Max 10MB)</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileInputChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        />
        <input
          type="file"
          ref={cameraInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileInputChange}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Uploaded Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary rounded-md p-2 flex-shrink-0">
                      {file.url ? (
                        <div className="h-10 w-10 relative rounded overflow-hidden">
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="truncate">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-right mt-1">
                          {file.progress === 100 ? "Complete" : `${file.progress}%`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {files.some((file) => file.progress === 100) && (
            <div className="flex justify-end">
              <Button>Analyze Documents</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

