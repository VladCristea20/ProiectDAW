import { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('all')

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter)
    changeFilter(newFilter)//aici este apelata metoda de changeFilter din componenta Dashboard
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}//daca filtrul curent are valoarea egala cu cea la care a ajuns functia de map(iterator) atunci ii aplica clasa "active" ce ii aplica buttonului culoarea mov
          >{f}</button>
        ))}
      </nav>
    </div>
  )
}