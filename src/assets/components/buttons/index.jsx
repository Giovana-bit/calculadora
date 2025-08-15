import "./Buttons.css";

function Index({value, type}) {
    return (
        <div>
            <p className={`buttons ${type ? type : ''}`}>{value}</p>
        </div>
    )
}

export default Index;