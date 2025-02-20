import { Link } from "react-router-dom";

function Emptydata({type}) {
  const link = `/${type}/add`
  return (
    <div className="flex flex-col items-center">
        <h1 className="text-custom-responsive text-red-500">No {type} to display</h1>
        <Link 
            to={link}
            className="text-3xl mt-5 text-green-400">
            Add new {type}
        </Link>
    </div>
  );
}

export default Emptydata;