import ReactPlaceholder from "react-placeholder";

const Loader = ({ children }) => {
    return <ReactPlaceholder type="media" rows={4}>
        { children }
    </ReactPlaceholder>
}

export default Loader;