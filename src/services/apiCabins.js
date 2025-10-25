import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase
        .from("cabins")
        .select("*")

    if (error) {
        console.error("Cabin could not be fetched", error);
        throw new Error("Cabin could not be fetched");
    }
    return data;
}

export async function createCabin(newCabin) {
    //Create a unique image name and link address path
    const imageName =`${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

    /*https://ajujgwnjiasgnhxbvrbd.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg*/
    
    
    //Create a new cabin in the database
    const { data, error } = await supabase
        .from('cabins')
        .insert([{...newCabin, image: imagePath}])
        .select()

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }
        //upload image to storage
        const { error:storageError } = await supabase
        .storage
        .from('cabins-images')
        .upload(imageName, newCabin.image);

        //Ensure cabin deleted if image upload fails
        if (storageError) {
            await supabase
            .from('cabins')
            .delete()
            .eq('id', data[0].id);
            console.error(error);
            throw new Error("Cabin image could not be created and cabin creation rolled back");
        }

    return data;
}

export async function deleteCabin(id) {

    const { error } = await supabase
        .from("cabins")
        .delete()
        .eq("id", id)

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");

    }
    return data;

}

