import { useEffect, useState, useRef } from 'react';
import { Crystal } from 'crystis-react';
import './sample2.css';

const SampleR2 = () => {
  const [users, setUsers] = useState([]);
  const [currentSortColumn, setCurrentSortColumn] = useState('Id');
  const [isAscending, setIsAscending] = useState(true);
  const [direction, setDirection] = useState('ascending');
  const [optselected, setOptSelected] = useState('optscreen');
  const [chkselected, setChkSelected] = useState(false);

  const csRef = useRef(new Crystal());
  const sortSettingsRef = useRef({ field: 'Id', ascending: true });

  useEffect(() => {
    let storedUsers = localStorage.getItem('Users');
    if (storedUsers === '[]') storedUsers = null;

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const defaultUsers = [
        { Id: 'ABDEN', Name: 'Maria Weiss', Town: 'Berlin', Country: 'Germany' },
        { Id: 'AXEIS', Name: 'Pedro Alvarez', Town: 'Mexico D.F.', Country: 'Mexico' },
        { Id: 'BENOI', Name: 'Anna Tóth', Town: 'Szeged', Country: 'Hungary' },
        { Id: 'CAZLE', Name: 'Jan Eriksson', Town: 'Mannheim', Country: 'Sweden' },
        { Id: 'DRFOS', Name: 'Giulia Donatelli', Town: 'Milano', Country: 'Italia' },
      ];
      setUsers(defaultUsers);
      localStorage.setItem('Users', JSON.stringify(defaultUsers));
    }

    const savedCheck = localStorage.getItem('chkselected');
    if (savedCheck !== null) {
      setChkSelected(savedCheck === 'true');
    }

    const savedSortColumn = localStorage.getItem('currentSortColumn');
    const savedAscending = localStorage.getItem('isAscending');

    if (savedSortColumn && savedAscending !== null) {
      sortSettingsRef.current = {
        field: savedSortColumn,
        ascending: savedAscending === 'true',
      };
      setCurrentSortColumn(savedSortColumn);
      setIsAscending(savedAscending === 'true');
      setDirection(savedAscending === 'true' ? 'ascending' : 'descending');
    }
  }, []);

  const saveUsersToLocalStorage = (updatedUsers) => {
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
  };

  const sortTable = (column) => {
    let newDirection = direction;
    let ascending = isAscending;

    if (currentSortColumn === column) {
      ascending = !isAscending;
      newDirection = ascending ? 'ascending' : 'descending';
    } else {
      ascending = true;
      newDirection = 'ascending';
      setCurrentSortColumn(column.toString());
    }

    sortSettingsRef.current = {
      field: column.toString(),
      ascending,
    };

    const sortedUsers = [...users].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return ascending ? -1 : 1;
      if (valueA > valueB) return ascending ? 1 : -1;
      return 0;
    });

    setCurrentSortColumn(column);
    setUsers(sortedUsers);
    setIsAscending(ascending);
    setDirection(newDirection);

    localStorage.setItem('currentSortColumn', column.toString());
    localStorage.setItem('isAscending', newDirection.toString());
  };

  const addRow = (id, name, town, country, resetInputs) => {
    if (id && name && town && country) {
      const updatedUsers = [...users, { Id: id, Name: name, Town: town, Country: country }];
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
      resetInputs();
    } else {
      alert('All fields are required!');
    }
  };

  const deleteRow = (index) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
    }
  };

  const printReport = () => {
    const tUsers = [...users];
    saveUsersToLocalStorage(tUsers);
    const json = JSON.stringify({ Users: tUsers });

    const cs = csRef.current;
    cs.tjsonstring = json;
    cs.tcode = 'DEMO1';
    cs.tucode = '0000';
    cs.trptfilePath = '/samplesreact/reports/CustomerReport1.rpt';
    cs.tSortTableName = 'Users';
    cs.tSortField1 = sortSettingsRef.current.field;
    cs.tDEST = optselected === 'optscreen' ? '0' : '1';
    cs.tSortDirection = sortSettingsRef.current.ascending ? '1' : '2';
    cs.tReportFormula = chkselected ? "{Users.Country} = 'Germany'" : '';

    cs.showReport();
  };

  // Input states
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newTown, setNewTown] = useState('');
  const [newCountry, setNewCountry] = useState('');

  const resetInputs = () => {
    setNewId('');
    setNewName('');
    setNewTown('');
    setNewCountry('');
  };

  return (
    <>
      <div className="table-container2">
        <p>Sample2</p>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th onClick={() => sortTable('Id')}>Id</th>
              <th onClick={() => sortTable('Name')}>Name</th>
              <th onClick={() => sortTable('Town')}>Town</th>
              <th onClick={() => sortTable('Country')}>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td><input value={user.Id} onChange={e => {
                  const updated = [...users];
                  updated[i].Id = e.target.value;
                  setUsers(updated);
                }} /></td>
                <td><input value={user.Name} onChange={e => {
                  const updated = [...users];
                  updated[i].Name = e.target.value;
                  setUsers(updated);
                }} /></td>
                <td><input value={user.Town} onChange={e => {
                  const updated = [...users];
                  updated[i].Town = e.target.value;
                  setUsers(updated);
                }} /></td>
                <td><input value={user.Country} onChange={e => {
                  const updated = [...users];
                  updated[i].Country = e.target.value;
                  setUsers(updated);
                }} /></td>
                <td><button onClick={() => deleteRow(i)}>Delete</button></td>
              </tr>
            ))}
            <tr>
              <td><input value={newId} onChange={e => setNewId(e.target.value)} /></td>
              <td><input value={newName} onChange={e => setNewName(e.target.value)} /></td>
              <td><input value={newTown} onChange={e => setNewTown(e.target.value)} /></td>
              <td><input value={newCountry} onChange={e => setNewCountry(e.target.value)} /></td>
              <td><button onClick={() => addRow(newId, newName, newTown, newCountry, resetInputs)}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="groupbox-container">
        <div className="groupbox-left">
          <h3>Destination</h3>
          <label><input type="radio" name="options" value="optscreen" checked={optselected === 'optscreen'} onChange={() => setOptSelected('optscreen')} /> on screen</label>
          <br />
          <label><input type="radio" name="options" value="optpaper" checked={optselected === 'optpaper'} onChange={() => setOptSelected('optpaper')} /> on paper</label>
        </div>
        <div className="groupbox-right">
          <h3>Formula</h3>
          <label>Country = Germany</label><br />
          <label>
            <input
              type="checkbox"
              checked={chkselected}
              onChange={e => {
                setChkSelected(e.target.checked);
                localStorage.setItem('chkselected', String(e.target.checked));
              }}
            />
            include formula
          </label>
        </div>
      </div>

      <div className="groupbox-container">
        <div className="groupbox-left">
          <h3>Sort</h3>
          <label>Column:</label> <span className="lbl">{currentSortColumn}</span><br />
          <label>Direction:</label> <span className="lbl">{direction}</span>
        </div>
        <div className="groupbox-right2">
          <button className="tbtn2" onClick={printReport}>Print</button>
        </div>
      </div>
    </>
  );
};

export default SampleR2;
