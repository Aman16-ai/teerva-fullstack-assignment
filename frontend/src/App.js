import { useState } from 'react';
import './App.css';
import fileDownloader from "js-file-download";

function App() {

  const [selectedFile, setSelectedFile] = useState()
  const [FormattedFile, setFormattedFile] = useState(null)
  const handleUpload = async () => {
    const formData = new FormData()
    formData.append("file", selectedFile)

    let url = 'http://localhost:5000/api/parser/parseFile'
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    console.log(data)
    setFormattedFile(data.formattedFile)
  }
  const handleDownload = async () => {
    let url = `http://localhost:5000/api/parser/downloadFile/${FormattedFile._id}`
    const response = await fetch(url)
    const data = await response.blob()
    console.log(data, FormattedFile.name)
    fileDownloader(data, FormattedFile.name + ".xlsx")
  }
  return (
    <>
      <div className="container my-3">
        <h3>File Formatter Get Insights From Your Data</h3>
        <h5 style={{ marginTop: "30px" }}>Pick File</h5>
        <div className="input-group my-3 mb-3">
          <input type="file" className="form-control" onChange={e => setSelectedFile(e.target.files[0])} id="inputGroupFile02" />
          <button onClick={handleUpload}className='btn btn-primary'>Upload</button>
        </div>
        <div style={{ width: "100%", height: "auto", marginTop: "35px" }} className="container output-container">
          {
            FormattedFile ? <>
              <div>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Formatted File</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{FormattedFile?.name}</h6>
                    <p className="card-text">Created at : {FormattedFile?.createdAt}</p>
                    <button onClick={handleDownload} className='btn btn-primary'>Download</button>
                  </div>
                </div>
              </div>
            </> : null
          }
        </div>
      </div>
    </>
  );
}

export default App;
