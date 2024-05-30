import axios from "./axios";

export default class ProjectService {
  static async getProjects() {
    const projects = await axios.get("/projects");
    return projects.data.data;
  }
  static async createProject(name) {
    await axios.post("/projects", { data: { name } });
    return await this.getProjects();
  }

  static async updateProject(id, data) {
    await axios.put(`/projects/${id}`, { data });
    return await this.getProjects();
  }

  static async deleteProject(id) {
    await axios.delete(`/projects/${id}`);
    return await this.getProjects();
  }

  static async getProjectById(id) {
    const project = await axios.get(`/projects/${id}`);
    return project.data.data;
  }
  static async addTask(projectId, name) {
    await axios.post(`/tasks`, {
      data: { name, completed: false, project: projectId },
    });
    return await this.getProjectById(projectId);
  }

  static async updateTask(projectId, data) {
    await axios.put(`/tasks/${data.id}`, {
      data: { name: data.name, completed: data.completed },
    });
    return await this.getProjectById(projectId);
  }
  static async deleteTask(projectId, taskId) {
    await axios.delete(`/tasks/${taskId}`);
    return await this.getProjectById(projectId);
  }
}
