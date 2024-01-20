import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useGetAllProductsQuery } from "../../features/productsApi";

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [showResults, setShowResults] = useState(true); // State to manage visibility of search results
  const { data, error, isLoading } = useGetAllProductsQuery();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data?.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleResultClick = () => {
    // Hide search results, clear input, and navigate to the selected product page
    setShowResults(false);
    clearInput();
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search products"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {showResults && filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value) => (
            <Link key={value.id} to={`/product/${value._id}`} onClick={handleResultClick}>
              <p>{value.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
