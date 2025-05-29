import { useSelector } from 'react-redux';
import { clothes } from "../reducers/filter";

const FilteredClothesList = () => {
  const { gender, season } = useSelector((state) => state.filter);

  const filtered = clothes.filter((item) => {
    const genderMatch = gender ? item.gender === gender : true;
    const seasonMatch = season ? item.season === season : true;
    return genderMatch && seasonMatch;
  });

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default FilteredClothesList;
