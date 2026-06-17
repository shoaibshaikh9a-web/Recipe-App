import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/navbar/recipe-item";



export default function Favorites(){

    const {favoritesList,setFavoritesList,loading}= useContext(GlobalContext);
    

    if(loading) return <div>Loaing...Please Wait!!</div>
    return(
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {
                favoritesList && favoritesList.length>0
                ? favoritesList.map(item=><RecipeItem item={item}/>)
                :<div>
                    <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing is Added in Favorites.</p>
                </div>
            }
        </div>
    )
}