import { supabase } from "../client"

type tasks = {
	id?: number
    content: string,
    columnId: number
}

type columns = {
	id?: number
    title: string,
}

export const gettasks = async () => {
	try {
		const { data, error }: { data: any; error: any } = await supabase.from("tasks").select("*")
		if (error) throw error
		return data
	} catch (error) {
		return error
	}
}

export const response = async () => {
    try {
		const { data, error }: { data: any; error: any } = await supabase.from<any>("tasks").select("*")
		if (error) throw error
		return data
	} catch (error) {
		return error
	}
} 

export default async (async: any) => {
    // Get all users
    const { data: users } = await supabase.from<tasks>('tasks').select();
}

export async function columns(){
	try {
		const { data, error } = await supabase.from<any>('columns').select('id, title')
		if (error) {
		  throw error
		}
		if (data){
		  return data;
		}
	  } catch (error) {
		console.log("Erreur");
	  }
} 

let tasksList: any[] = [];

export async function tasks(){
	try {
		const { data, error } = await supabase.from<any>('tasks').select('id, content, columns(id)')
		if (error) {
		  console.log('erreur base de données - tasks');
		  throw error
		}
		if (data){
		  tasksList = data
		  return tasksList;
		}
		
	  } catch (error) {
		console.log("Erreur");
	  }
} 