import PieceCard from '../components/PieceCard';

function Home({ pieces }) {


    return (
        <div className="container my-5 text-white">
            <h1>Alleyway Collections</h1>
            <p>Undiscovered</p>
            <h2 className="mb-4" style={{ color: '#8B0000' }}>Latest Finds</h2>
            <div className="row">
                {pieces.map((piece) => (
                <div className="col-md-4 mb-4" key={piece.id}>
                    <PieceCard piece={piece} />
                </div>
                ))}
            </div>
        </div>
    )
}

export default Home
