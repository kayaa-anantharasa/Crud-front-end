import {CSSProperties, useState} from "react";
import {HashLoader} from "react-spinners";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Loader({loading}) {
    let [color, setColor] = useState("#11c3e7");
    return (
        <>
            {loading?<div className="sa-modal-bg">
                <div className="sa-modal-bg-modal">
                    <div className="sweet-loading">
                        {/*<button onClick={() => setLoading(!loading)}>Toggle Loader</button>*/}
                        <HashLoader
                            color={color}
                            loading={loading}
                            cssOverride={override}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            </div>:null}
        </>
    );
}

export default Loader;