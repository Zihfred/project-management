import { ProjectApi, TaskApi } from "../services/generated/index.ts";

const projectAPI = new ProjectApi();
const tasksAPI = new TaskApi();
export default class ProjectService {
  static async getProjects() {
    const projects = await projectAPI.getProjects();
    return projects.data;
  }
  static async createProject(name) {
    await projectAPI.createProject({
      name,
    });
    return await this.getProjects();
  }

  static async updateProject(id, data) {
    await projectAPI.patchProject(id, { name: data.name });
    return await this.getProjects();
  }

  static async deleteProject(id) {
    await projectAPI.deleteProject(id);
    return await this.getProjects();
  }

  static async getProjectById(id) {
    const project = await projectAPI.getProjectById(id);
    return project.data;
  }

  static async getProjectTasks(id) {
    const tasks = await tasksAPI.getTasks(id);
    return tasks.data;
  }
  static async addTask(projectId, name) {
    await tasksAPI.createTask(projectId, {
      name: name,
      completed: false,
    });
    return await this.getProjectTasks(projectId);
  }

  static async updateTask(projectId, data) {
    await tasksAPI.patchTask(data.id, {
      name: data.name,
      completed: data.completed,
    });
    return await this.getProjectTasks(projectId);
  }
  static async deleteTask(projectId, taskId) {
    await tasksAPI.deleteTask(taskId);
    return await this.getProjectTasks(projectId);
  }
}
