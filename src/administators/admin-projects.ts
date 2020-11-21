import modelProjects from "../models/projects";
import IProjects from "../interfaces/projects";
import adminUsers from "./admin-users";
import { v4 as uuidv4 } from 'uuid';
import { convertStringToArray } from "../helpers/string-to-array";

interface infoProject {
    name?: string;
    description?: string;
    links?: IProjects["links"];
    reqiredSkills?: IProjects['requiredSkills'];
    roles?: IProjects['roles'];
    oauthCode?: string; // that is for some fuctions & not is nessesary
}

export default new class AdminProjects {
    /**
     * the cache of the projects to avoid queries to the database
     */
    private projectsCache: Map<string, IProjects> = new Map();
    /**
     * get project, obtain the specified project whit id 
     * @see obtainUserProject if you need all the projects of one user project
     */
    public async getProject(id: string): Promise<IProjects> {
        let project = this.projectsCache.get(id) || await modelProjects.findOne({ projectID: id });
        if (!project) throw 'cannot find the specified project';
        this.projectsCache.set(id, project);
        return project;
    };
    /**
     * save new project into database
     * @param infoProject the info to update the project
     */
    public async newProject(key: string, infoProject: infoProject): Promise<IProjects> {
        let owner = adminUsers.getUser(key);
        if (!owner) throw 'the auth code is invalid';
        if (!infoProject.name) throw "the name is undefined";
        if (!infoProject.description) throw 'the description is undefined';
        if (!infoProject.links) throw 'the links are undefined';
        if (!infoProject.reqiredSkills) throw 'the required skills are undefined';
        let newProject = new modelProjects({
            projectID: uuidv4(),
            name: infoProject.name,
            description: infoProject.description,
            links: convertStringToArray(infoProject.links),
            ownerID: owner.userID,
            requiredSkills: convertStringToArray(infoProject.reqiredSkills),
            starts: 1,
            roles: [
                {
                    permissions: 4,
                    user_id: owner.userID
                }
            ].concat(infoProject.roles || [])
        });
        owner.projects.push({
            description: newProject.description,
            name: newProject.name,
            projectID: newProject.projectID
        });
        this.projectsCache.set(newProject.projectID, newProject);
        await owner.save();
        return await newProject.save();
    };
    /**
     * update any project
     * @param id id of the project
     * @param infoProject the info to update the project
     * @deprecated
     */
    public async updateProject(id: string, infoProject: infoProject): Promise<IProjects> {
        let project = this.projectsCache.get(id) || await modelProjects.findOne({ projectID: id });
        if (!project) throw 'cannot find the specified project';
        this.projectsCache.set(project.projectID, project);
        return project;
    };

    /**
     * get user projects, to get all projects & permissions of one user
     * @param key the key to access to account of an user
     */
    public async getUserProjects(key: string): Promise<IProjects[]> {
        if (!key) throw new ReferenceError('the key was not provided');
        let user = adminUsers.getUser(key);
        if (!user) throw 'the key is invalid';
        let ArrayProjects: IProjects[] = [];
        for (let i = 0; i < user.projects.length; i++) {
            const userProjects = user.projects[i];
            try {
                let obtainedProject = await this.getProject(userProjects.projectID)
                ArrayProjects.push(obtainedProject);
                this.projectsCache.set(obtainedProject.projectID, obtainedProject);
            } catch (err) {
                throw `(${err}) in project ${userProjects.projectID}`;
            }
        }
        return ArrayProjects;
    };

    /**
     * delete project delete a project
     */
    public async deleteProject(key: string, projectID: string): Promise<boolean> {
        if (!key) throw new ReferenceError('the key was not provided');
        let user = adminUsers.getUser(key);
        if (!user) throw 'the key is invalid';
        if (!(user.projects.some(value => value.projectID == projectID))) throw 'the user isn\'t in the specified project';
        let project = await this.getProject(projectID);
        if (!(project.ownerID == user.userID)) throw 'the user isn\'t the owner';
        project.roles.map(async value => {
            let gettedUser = await adminUsers.adminGetUser(value.user_id);
            if (!gettedUser) return console.log('retrun!');
            gettedUser.projects.map(async (adminValue, index) => {
                if (adminValue.projectID == project.projectID) {
                    gettedUser?.projects.splice(index, 1);
                    gettedUser?.notifications.push({
                        title: 'Se elimino un proyecto',
                        body: `El proyecto ${project.name} se ha eliminado, por su consecuente ya no estas en el`,
                        timeStamp: new Date(),
                        type: 'projects'
                    });
                    await gettedUser?.save();
                };
            });
        });
        this.projectsCache.delete(project.projectID);
        modelProjects.remove({ projectID: project.projectID });
        return true;
    };

};
