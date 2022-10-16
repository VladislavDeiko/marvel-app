
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spiner from "../components/spinner/Spiner";


const setContent = (process,data, Component) => {
    switch (process) {
        case 'waiting': 
            return <Skeleton/>;
        case "loading": 
            return <Spiner/>;
        case "confirmed": 
            return <Component data = {data}/>;
        case "error": 
            return <ErrorMessage/>;
        default: 
            throw new Error ('Unexpected process state')
    }
}

export default setContent;