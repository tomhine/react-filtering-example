import { useState } from "react";
// Dummy data imported from data.js, doesn't need to be stored in state as it doesn't change
import { data } from "./data";

// These are the available filters which don't change, so they don't need to be inside the function.
const filters = ["react", "vue", "solid", "javascript", "laravel", "php"];

export default function App() {
  // The active filters are the only state we need. When a filter is added or removed it'll trigger
  // a re-render which will run the whole App function again and rebuild the page with the new state.
  const [activeFilters, setActiveFilters] = useState([]);

  // This variable will either hold all the data in the case that there are no filters (activeFilters < 1),
  // or it will hold our filtered data
  // The filter is saying "for each data item, check that every active filter is in the data items tags"

  // If you aren't familiar with the ternary operator '?', this could just as easily be written out as:
  // if (activeFilters < 1) {
  //   const filteredData = data;
  // } else {
  //   const filteredData = data.filter(item => activeFilters.every(filter => item.tags.includes(filter)));

  const filteredData =
    activeFilters.length < 1
      ? data
      : data.filter(item => activeFilters.every(filter => item.tags.includes(filter)));

  // This click handler checks if the filter being passed in is already in the activeFilters array by trying to find its index
  // If indexOf doesn't find it it returns -1, so we check if the index is less than one. If it is less than one
  // we know it's not in activeFilters, so we can safely add it.
  // If the index is 0 or greater, it's in the array already. We can then filter it out
  const toggleFilters = filter => {
    const index = activeFilters.indexOf(filter);

    if (index < 0) {
      setActiveFilters(cur => [...cur, filter]);
    } else {
      setActiveFilters(cur => cur.filter(item => item !== filter));
    }
  };

  return (
    <div className="container flex flex-col gap-8 p-8">
      <div className="h-36">
        <h1 className="text-xl font-semibold mb-2">List</h1>
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <ul className="flex items-center flex-wrap gap-4">
          {filters.map(filter => (
            <li
              className="cursor-pointer rounded-md border px-3 py-1"
              key={filter}
              onClick={() => toggleFilters(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Active Filters</h2>
        <ul className="space-y-2">
          {activeFilters?.map(filter => (
            <li key={filter}>{filter}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
