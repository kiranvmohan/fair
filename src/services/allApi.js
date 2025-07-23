// register user

import { base_url } from "./base_url"
import { commonApi } from "./commonApi"

export const registerApi = async(userdata)=>{
    return await commonApi("POST",`${base_url}/user/register`,userdata,"")
}


// login user

export const loginApi = async(data)=>{
    return await commonApi("POST",`${base_url}/user/login`,data,"")
}

// add project

export const addProjectApi = async(data,reqHeader)=>{
    return await commonApi('POST', `${base_url}/project/add`,data,reqHeader)
}

// get home project

export const getHomeProjectApi = async()=>{
    return await commonApi('GET',`${base_url}/project/homeproject`,"","")
}

// get all projects

export const getAllProjectApi = async(searchkey,reqHeader)=>{
    return await commonApi('GET',`${base_url}/project/allproject?search=${searchkey}`,"",reqHeader)
}

// get user projects

export const getUserProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${base_url}/project/userproject`,"",reqHeader)
}


// update project

export const updateProjectApi = async(projectId,reqBody,reqHeader)=>{
    return await commonApi ('PUT',`${base_url}/project/updateproject${projectId}`,reqBody,reqHeader)
}


// delete project

export const deleteProjectApi = async(project_Id,reqHeader)=>{
    return await commonApi ('DELETE',`${base_url}/project/delete/${project_Id}`,{},reqHeader)
}