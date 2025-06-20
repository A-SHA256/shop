import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
    )
}

export default Loader;