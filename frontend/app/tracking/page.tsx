function App() {
    const [bl_number, set_bl_number] = React.useState("")
    const [data, set_data] = React.useState("")
    async function get_invoice_details(){
        let form_data = new FormData()
        form_data.append("bl_number", bl_number)
        const response = await fetch("http://localhost:5001/get/one_invoice_bl", {
            method: "post",
            body: form_data
        })
        const data = await response.text()
        set_data(data)
    }
    return(
        <div className="tracking">
            <h2>Tracking</h2>
            <input type="text" placeholder="Enter BL number to track" onChange={(e) => {set_bl_number(e.target.value)}}/>
            <button onClick={get_invoice_details}>Get Info</button>
            {data}
        </div>
    )
   
}

ReactDOM.render(<App />, document.getElementById("root"));
