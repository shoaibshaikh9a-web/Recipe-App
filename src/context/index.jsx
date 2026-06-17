import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const GlobalContext=createContext(null);

export default function GlobalState({children}){
    const[searchParam,setSearchParam]=useState("");
    const[loading,setLoading]=useState(false);
    const[recipeList,setRecipeList]=useState([]);
    const[recipeDetailsData,setRecipeDetailsData]=useState(null);
    const[favoritesList,setFavoritesList]=useState([]);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            setLoading(true);
            const res=await fetch(`https://forkify-api.jonas.io/api/v2/recipes?search=${searchParam}`)
            const data=await res.json();
            console.log(data);
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes)
                setLoading(false);
                setSearchParam('');
                navigate('/');
            }
        }catch(e){
            console.error(e);
            setLoading(false);
        }
    }
    console.log(loading,recipeList);

    function handleAddToFavorite(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavoritesList=[...favoritesList];
        const index=cpyFavoritesList.findIndex(item=>item.id=== getCurrentItem.id);
        console.log(index);
        if(index === -1){
            cpyFavoritesList.push(getCurrentItem);
        }else{
            cpyFavoritesList.splice(index);
        }
        setFavoritesList(cpyFavoritesList);
    }
    console.log(favoritesList,'recipe-list');
    
    return (
    <GlobalContext.Provider 
    value={{searchParam,
    setSearchParam,
    handleSubmit,
    loading,
    recipeList,
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
    favoritesList,
    setFavoritesList
    }}>
        {children}
    </GlobalContext.Provider>
    )
}
