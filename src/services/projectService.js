import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  getDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { auth, firestoreDatabase } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default class ProjectService {
  static async getProjects() {
    const projects = [];
    const user = auth.currentUser;
    const tasksRef = collection(firestoreDatabase, "projects");
    const q = query(tasksRef, where("user_id", "==", user?.uid));
    const projectsSnapshot = await getDocs(q);

    projectsSnapshot.forEach((doc) => {
      projects.push(doc.data());
    });
    return projects;
  }
  static async createProject(name) {
    console.log(name);
    const user = auth.currentUser;
    const newId = uuidv4();
    const tasksRef = collection(firestoreDatabase, "projects");
    await setDoc(doc(tasksRef, newId), {
      name: name || "New Project",
      user_id: user?.uid,
      id: newId,
      created_at: serverTimestamp(),
    });
    return await this.getProjects();
  }

  static async updateProject(id, data) {
    const user = auth.currentUser;
    const tasksRef = collection(firestoreDatabase, "projects");
    await setDoc(doc(tasksRef, id), {
      ...data,
      user_id: user?.uid,
      updated_at: serverTimestamp(),
    });
    return await this.getProjects();
  }

  static async deleteProject(id) {
    const tasksRef = collection(firestoreDatabase, "projects");
    await deleteDoc(doc(tasksRef, id));
    return await this.getProjects();
  }

  static async getProjectById(id) {
    const tasksRef = collection(firestoreDatabase, "projects");
    const docRef = doc(tasksRef, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  static async getProjectTasks(id) {
    const tasks = [];
    const tasksRef = collection(firestoreDatabase, "tasks");
    const q = query(tasksRef, where("project_id", "==", id));
    const tasksSnapshot = await getDocs(q);

    tasksSnapshot.forEach((doc) => {
      tasks.push(doc.data());
    });
    return tasks;
  }

  // static async addTask(projectId, task) {
  // console.log(projectId, task);
  // const newId = uuidv4();
  // const tasksRef = collection(firestoreDatabase, "tasks");
  // await setDoc(doc(tasksRef, newId), {
  //   project_id: projectId,
  //   completed: false,
  //   id: newId,
  //   name: task,
  //   created_at: serverTimestamp(),
  // });
  // return await this.getProjectTasks(projectId);
  // }
  static async addTask(projectId, name) {
    console.log("add task");
    const newId = uuidv4();
    const tasksRef = collection(firestoreDatabase, "tasks");
    await setDoc(doc(tasksRef, newId), {
      name: name,
      project_id: projectId,
      completed: false,
      id: newId,
      created_at: serverTimestamp(),
    });
    return await this.getProjectTasks(projectId);
  }

  static async updateTask(projectId, data) {
    const tasksRef = collection(firestoreDatabase, "tasks");
    await setDoc(doc(tasksRef, data.id), {
      ...data,
      updated_at: serverTimestamp(),
    });
    return await this.getProjectTasks(projectId);
  }
  static async deleteTask(projectId, taskId) {
    const tasksRef = collection(firestoreDatabase, "tasks");
    await deleteDoc(doc(tasksRef, taskId));
    return await this.getProjectTasks(projectId);
  }
}
