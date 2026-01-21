import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private tasksService: TaskService) {}

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const task = this.tasksService.findOne(id);

        if (!task) {
            throw new NotFoundException('Task not found', {
                description: 'The task with the given ID was not found',
            });
        }

        return task;
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const task = this.tasksService.findOne(id);

        if (!task) {
            throw new NotFoundException('Task not found', {
                description: 'The task with the given ID was not found',
            });
        }

        return this.tasksService.remove(id);
    }
}