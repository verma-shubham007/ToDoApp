import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskTypes = [
    {
      key: 'toDo',
      value: 'To do',
      tasks: Array()
    },
    {
      key: 'inProgress',
      value: 'In Progress',
      tasks: Array()
    },
    {
      key: 'completed',
      value: 'Completed',
      tasks: Array()
    }
  ]
  newTaskType: any = '';
  newTaskForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    type: new FormControl(null),
    user: new FormControl(null),
    isEditable: new FormControl(false)
  });
  taskList: any[] = [];
  currentUser: any;

  constructor(private _router: Router) { }

  ngOnInit() {
    const localData = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(localData!);
  }

  addTask(type: any) {
    this.newTaskType = type;
    this.newTaskForm.get('type')!.setValue(type);
    this.newTaskForm.get('user')!.setValue(this.currentUser!['name']);
  }

  saveTask() {
    const taskList = this.taskTypes.filter(item => item.key == this.newTaskForm.value['type']);
    if (taskList && taskList.length) {
      const formValue = this.newTaskForm.value;
      taskList[0]['tasks'].push(formValue);
    }
    this.newTaskForm.reset();
    this.newTaskType = '';
  }

  getTasks(type: any) {
    return this.taskList.filter((item: any) => item.type == type);
  }

  getTaskCount(type: any) {
    return this.taskList.filter((item: any) => item.type == type).length;
  }

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  signOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    this._router.navigate(['/auth']);
  }

  edit(task: any, taskType: any) {
    task['isEditable'] = true;
    this.newTaskForm.get('title')?.setValue(task.title);
    this.newTaskForm.get('description')?.setValue(task.description);
    this.newTaskForm.get('type')?.setValue(task.type);
    this.newTaskForm.get('user')?.setValue(task.user);
    this.newTaskForm.get('isEditable')?.setValue(true);
  }

  updateTask(taskType: any) {
    const taskTypeItem: any = this.taskTypes.filter(item => item.key == taskType);
    if (taskTypeItem && taskTypeItem.length) {
      const taskItem = taskTypeItem[0].tasks.filter((item: any) => item['isEditable'] == true);
      if (taskItem && taskItem.length) {
        taskItem[0]['title'] = this.newTaskForm.value['title'];
        taskItem[0]['description'] = this.newTaskForm.value['description'];
        taskItem[0]['isEditable'] = this.newTaskForm.value['false'];
      }
    }
  }

}
