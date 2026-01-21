import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/interfaces/task-interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    private readonly tasks: Task[] = [];

    findAll(): Task[] {
        return this.tasks;
    }

    findOne(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException('Task not found', {
                description: 'The task with the given ID was not found',
            });
        }

        return task;
    }

    create(task: CreateTaskDto): Task {
        const id = uuidv4();
        const newTask = { id, ...task };

        this.tasks.push(newTask);
        return newTask;
    }

    update(id: string, data: UpdateTaskDto) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);

        if (taskIndex === -1) {
            throw new NotFoundException('Task not found', {
                description: 'The task with the given ID was not found',
            });
        }

        this.tasks.splice(taskIndex, 1, { ...this.tasks[taskIndex], ...data });

        return this.tasks[taskIndex];
    }

    remove(id: string) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);

        if (taskIndex === -1) {
            throw new NotFoundException('Task not found', {
                description: 'The task with the given ID was not found',
            });
        }

        this.tasks.splice(taskIndex, 1);

        return this.tasks;
    }
}
