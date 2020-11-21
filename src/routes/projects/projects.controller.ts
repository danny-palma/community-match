import { Request, Response } from "express";
import adminUsers from "../../administators/admin-users";
import adminProject from "../../administators/admin-projects";

export async function newProject(req: Request, res: Response) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'you don\'t provide authorization code' });
    if (!adminUsers.existKey(req.headers.authorization)) return res.status(403).json({ error: 'the authorization code is invalid' });
    console.log(req.body);
    try {
        res.send(await adminProject.newProject(req.headers.authorization, {
            description: req.body.description,
            links: req.body.links,
            name: req.body.name,
            reqiredSkills: req.body.required_skills,
            roles: req.body.roles
        }));
    } catch (err) {
        res.status(403).json({ error: err })
    }

};

export async function deleteProject(req: Request, res: Response) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'you don\'t provide authorization code' });
    if (!adminUsers.existKey(req.headers.authorization)) return res.status(403).json({ error: 'the authorization code is invalid' });
    if (!req.body.project_ID) return res.status(403).json({ error: 'you don\'t provide project id' });
    try {
        res.send(await adminProject.deleteProject(req.headers.authorization, req.body.project_ID))
    } catch (err) {
        console.log('error', err)
        res.status(304).json({ error: err });
    }
}
