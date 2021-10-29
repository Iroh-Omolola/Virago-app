import { Search } from "@material-ui/icons";

export const SearchBox = ({placeholder,handleChange}) => {
    return (
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
           placeholder={placeholder}
            onChange={handleChange}
            className="searchInput"
          />
        </div>
    )
}
