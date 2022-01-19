export class Task{
    _id: string;
    taskName: string;
    priority:  string;
    totalTime:  string;
    timeLeft:  string;
    isDeleted: boolean;
    status: TASK_STATUS;
    date: string;
  }

  export const API_URL = {
    BASE: 'https://backend.akshayrathi.com',
    FETCH_TASKS: '/taskManager/getOngoingTasks',
    FETCH_PREV_TASKS: '/taskManager/getPreviousTasks',
    DELETE_TASK: '/taskManager/deleteTask',
    ANALYTICS: '/taskManager/analytics',
    FILTER_TASK: '/taskManager/filterTasks',
  };

  export enum TASK_STATUS {
    SUCCESSFULLY_COMPLETED = 'successfullyCompleted',
    NOT_STARTED = 'notStarted',
    INCOMPLETE = 'incomplete',
    IN_PROGRESS = 'inProgress',
    PAUSED = 'paused',
  }
  
  export enum TASK_MANAGER_ANALTYICS {
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
  }
  
  export enum PRIORITY {
    ALL = 'all',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
  }

  export interface TaskAnalytics{
    totalTasks: number;
    completedTasks: number;
    inCompleteTasks: number;
  }