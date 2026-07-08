"use client";

import { useState } from "react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { tasks } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Plus, Search, Filter, CheckSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  const [taskList, setTaskList] = useState(tasks);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    priority: "Medium",
    due: "",
    tag: "Follow-up",
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskData.title) return;

    const newTask = {
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      title: newTaskData.title,
      due: newTaskData.due || "Today",
      priority: newTaskData.priority,
      tag: newTaskData.tag,
      completed: false,
    };

    setTaskList(prev => [newTask, ...prev]);
    setAddModalOpen(false);
    setNewTaskData({ title: "", priority: "Medium", due: "", tag: "Follow-up" });
  };

  const toggleTask = (id: string) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Operations"
        title="Tasks"
        description="Manage deliverables, follow-ups, and personal to-dos."
        actions={
          <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated border-0" onClick={() => setAddModalOpen(true)}>
            <Plus className="h-3.5 w-3.5" />New Task
          </Button>
        }
      />

      <div data-reveal className="flex flex-wrap items-center gap-2 rounded-[24px] border border-border/40 bg-card p-3 shadow-elevated mt-5">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tasks by keyword or tag…" className="h-9 rounded-lg pl-9 bg-secondary/40 border-border/70" />
        </div>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 border-border/70"><Filter className="h-3.5 w-3.5" />Priority</Button>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 border-border/70"><Filter className="h-3.5 w-3.5" />Status</Button>
      </div>

      <div data-reveal className="mt-5 rounded-[24px] border border-border/40 bg-card shadow-elevated overflow-hidden">
        <div className="divide-y divide-border/40">
          {taskList.map((task) => (
            <div key={task.id} className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-secondary/20">
              <div className="flex items-start gap-4">
                <button 
                  className="mt-0.5 text-muted-foreground hover:text-primary transition-colors outline-none"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div>
                  <div className={cn("text-[14px] font-medium leading-snug transition-colors", task.completed ? "text-slate-500" : "text-slate-900")}>
                    {task.title}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11.5px] font-medium">
                    <span className={cn(
                      "flex items-center gap-1.5",
                      task.due === "Yesterday" ? "text-red-500" : "text-slate-500"
                    )}>
                      <Clock className="h-3 w-3" /> Due {task.due}
                    </span>
                    <Badge variant="outline" className="rounded-full border-border/70 bg-secondary/40 px-2 py-0 font-medium text-slate-500">
                      {task.tag}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  task.priority === "High" && "bg-red-50 text-red-600",
                  task.priority === "Medium" && "bg-amber-50 text-amber-600",
                  task.priority === "Low" && "bg-slate-100 text-slate-600",
                )}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          <div className="p-6 border-b border-border/70 bg-slate-50/80">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                  <CheckSquare className="h-4 w-4" />
                </div>
                <div className="text-[17px] font-bold tracking-tight">Create New Task</div>
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleCreateTask}>
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Task Title <span className="text-red-500">*</span></label>
                <Input 
                  required
                  placeholder="e.g. Follow up with Acme Corp" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newTaskData.title}
                  onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Due Date</label>
                  <Input 
                    type="date"
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newTaskData.due}
                    onChange={(e) => setNewTaskData({...newTaskData, due: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Priority</label>
                  <select 
                    className="w-full h-10 rounded-xl bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    value={newTaskData.priority}
                    onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Tag / Category</label>
                <select 
                  className="w-full h-10 rounded-xl bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  value={newTaskData.tag}
                  onChange={(e) => setNewTaskData({...newTaskData, tag: e.target.value})}
                >
                  <option value="Follow-up">Follow-up</option>
                  <option value="Meeting Prep">Meeting Prep</option>
                  <option value="Review">Review</option>
                  <option value="Administrative">Administrative</option>
                </select>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <Button 
                type="button"
                variant="ghost"
                className="font-medium px-4 rounded-xl h-10"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-medium px-6 rounded-xl h-10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
