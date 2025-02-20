import { EyeOff ,Eye } from "lucide-react";

function ShowHideIcon({isHidden ,setIsHidden }){
    const tooggleVisibility= ()=>{
        setIsHidden(!isHidden);
    }
    return(
        <div className="-ml-8 mt-2">
            {isHidden? 
            <EyeOff 
                onClick={tooggleVisibility}
            /> :
            <Eye 
                onClick={tooggleVisibility}
            />    
        }
        </div>
    )
}

export default ShowHideIcon;