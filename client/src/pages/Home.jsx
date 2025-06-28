import { useState } from 'react';
import PieceCard from '../components/PieceCard';

function Home({ pieces, setRefreshCollection }) {
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearch(event){
        setSearchQuery(event.target.value);
    }

    const filteredPieces = pieces.filter(piece =>
      piece.description.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="container my-5 text-white">
            <h1>Alleyway Collections</h1>
            <h2 className="mb-4" style={{ color: '#8B0000' }}>Latest Finds</h2>
            <div className="search-bar">
                <input
                    type="text"
                    className="form-control search-input"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="🔍︎ Search pieces"
                    aria-label="Search thrift pieces"
                />
                <button className="search-button" onClick={() => {}}>
                    Search
                </button>
            </div>
            <div className="row">
                {filteredPieces.map((piece) => (
                <div className="col-md-4 mb-4" key={piece.id}>
                    <PieceCard piece={piece} setRefreshCollection={setRefreshCollection}/>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Home;
