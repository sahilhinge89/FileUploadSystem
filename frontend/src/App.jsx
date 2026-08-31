import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import FileCard from "./components/FileCard";
import "./App.css";

function App() {

    return (
        <div className="app">

            <Navbar />

            <main>

                <section className="hero">

                    <p className="small-title">
                        FILE MANAGEMENT
                    </p>

                    <h1>
                        your files.
                        <br />
                        <span>your space.</span>
                    </h1>

                    <p className="hero-text">
                        securely upload and manage your
                        files in one place.
                    </p>

                </section>


                <UploadBox />


                <section className="recent">

                    <div className="section-header">

                        <div>
                            <p className="small-title">
                                STORAGE
                            </p>

                            <h2>
                                recent files
                            </h2>
                        </div>

                        <button className="view-btn">
                            view all →
                        </button>

                    </div>


                    <div className="file-list">

                        <FileCard
                            name="project-image.png"
                            type="image"
                            size="2.4 MB"
                        />

                        <FileCard
                            name="demo-video.mp4"
                            type="video"
                            size="18.7 MB"
                        />

                        <FileCard
                            name="resume.pdf"
                            type="document"
                            size="1.2 MB"
                        />

                    </div>

                </section>

            </main>

        </div>
    );
}

export default App;