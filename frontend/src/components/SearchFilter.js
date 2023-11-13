import React from 'react'

const SearchFilter = ({ keyword, setKeyword, selectedStatus, setSelectedStatus, formData}) => {

    const statusArray = ["Pending", "In Progress", "Completed", "Overdue"];
    
      const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
      };

      const handleStatusSearchChange = (e) => {
        e.preventDefault();
        setSelectedStatus(e.target.value);
      };

  return (
    <div className='search-form'>
        <div className='task-search'>
            <label htmlFor="taskName">Serach With Name</label>
            <input
            type='search'
            placeholder='Filter'
            value={keyword}
            onChange={handleSearchChange}
            />
        </div>

        <div className='task-search'>
        <label htmlFor="status">Serach With Status</label>
            <select name="status" onChange={handleStatusSearchChange} value={selectedStatus}>
                <option value=''>All</option>
                {statusArray.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default SearchFilter
