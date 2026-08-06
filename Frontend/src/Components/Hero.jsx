import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Content/search";
import "./Hero.css";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const { searchData } = useSearch();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    return searchData
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [query, searchData]);

  const handleSelect = (item) => {
    navigate(item.path);
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div className="hero">
      <h1>Discover Amazing Events Near You</h1>
      <p>Book tickets for concerts, sports, theater, and more.</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for events, movies, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />

        <button className="search-btn">
          <i className="pi pi-search"></i>
        </button>

        {isFocused && query && (
          <div className="hero-search-results">
            {suggestions.length ? (
              suggestions.map((item, index) => (
                <div
                  key={index}
                  className="hero-search-item"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="hero-search-image"
                  />

                  <div className="hero-search-info">
                    <h4>{item.title}</h4>
                    <p>{item.subtitle}</p>
                  </div>

                  <span className="hero-type">{item.type}</span>
                </div>
              ))
            ) : (
              <div className="hero-no-results">No matching results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
