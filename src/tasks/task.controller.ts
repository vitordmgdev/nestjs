import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
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
