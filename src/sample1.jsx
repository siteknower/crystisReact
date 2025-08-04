import { useEffect, useState } from 'react';
import { Crystal } from 'crystis-react';
import './sample1.css';

function SampleR1() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([
          { Id: 'ABDEN', Name: 'Maria Weiss', Town: 'Berlin', Country: 'Germany' },
          { Id: 'AXEIS', Name: 'Pedro Alvarez', Town: 'México D.F.', Country: 'Mexico' },
          { Id: 'BENOI', Name: 'Anna Tóth', Town: 'Szeged', Country: 'Hungary' },
          { Id: 'CAZLE', Name: 'Jan Eriksson', Town: 'Mannheim', Country: 'Sweden' },
          { Id: 'DRFOS', Name: 'Giulia Donatelli', Town: 'Milano', Country: 'Italia' },
        ]);
      }, []);

      
    const cs = new Crystal();

    const showReport = () => {    
        const json = JSON.stringify({ Users: users });
        cs.tjsonstring = json;
        cs.tcode = 'DEMO1';
        cs.tucode = '0000';
        // cs.trptfilePath = '/reports/CustomerReport1.rpt';
          //zbog: vite.config.ts  -  base: '/samplesreact/',
          cs.trptfilePath = '/samplesreact/reports/CustomerReport1.rpt';
        cs.tSortTableName = 'Users';
        cs.tSortField1 = 'Name';
    
        cs.showReport();
      };

      const showURL = async () => {
        const cjsonString = JSON.stringify({ users });
      
        cs.tjsonstring = cjsonString;
        cs.tcode = "DEMO1";
        cs.tucode = "0000";
        //cs.trptfilePath = "/reports/CustomerReport1.rpt"; // assuming file is in /public/reports/
        //zbog: vite.config.ts  -  base: '/samplesreact/',
        cs.trptfilePath = '/samplesreact/reports/CustomerReport1.rpt';

        try {
          const reportUrl = await cs.getReportUrl();
          if (reportUrl?.trim()) {
            window.location.href = reportUrl;
          } else {
            alert("Failed to get report URL: Empty response");
          }
        } catch (error) {
          console.error(error);
          alert("Unable to generate report URL");
        }
      };

    return (
      <>
      <p>Sample1</p>
      <div className="table-container1">
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Town</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.Id}>
                            <td>{user.Id}</td>
                            <td>{user.Name}</td>
                            <td>{user.Town}</td>
                            <td>{user.Country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br/>
            <button className="tbn1" onClick={showReport}>Print</button>  &nbsp;
            <button className="tbn1" onClick={showURL}>Open URL</button> 
        </div>
        </> 
    );
  }

export default SampleR1;


<p>sample1</p>