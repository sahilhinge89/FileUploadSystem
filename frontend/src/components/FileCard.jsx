function FileCard({ name, type, size }) {

    return (
        <div className="file-card">

            <div className="file-icon">
                {type === "image" ? "IMG" : "FILE"}
            </div>

            <div className="file-info">

                <h3>{name}</h3>

                <p>
                    {type} · {size}
                </p>

            </div>

            <button className="more-btn">
                ⋮
            </button>

        </div>
    );
}

export default FileCard;