
import React, { useEffect, useRef, useState } from 'react';
import { Crystal } from 'crystis-react';
import './sample3.css';

type InvItem = {
  Id: string;
  Code: string;
  Name: string;
  Amount: number;
  Price: number;
};

type DummyItem = {
  Text1: string;
};

const SampleR3: React.FC = () => {
  const [invItems, setInvItems] = useState<InvItem[]>([]);
  const [dummy, setDummy] = useState<DummyItem[]>([{ Text1: 'Phoenix inc.' }]);
  const csRef = useRef(new Crystal());

  useEffect(() => {
    const items: InvItem[] = [
      { Id: generateUUID(), Code: 'BB8527', Name: 'Bread', Amount: 1, Price: 2.15 },
      { Id: generateUUID(), Code: 'SA482', Name: 'Chocolate', Amount: 2, Price: 7.65 },
      { Id: generateUUID(), Code: 'QCI24', Name: 'Cheese', Amount: 1, Price: 2.08 },
      { Id: generateUUID(), Code: 'MOX58', Name: 'Juice', Amount: 1, Price: 3.55 },
      { Id: generateUUID(), Code: 'PB154', Name: 'Milk', Amount: 3, Price: 7.87 },
    ];
    setInvItems(items);
  }, []);

  const showReport = () => {
    const jsonData = JSON.stringify({
      InvItems: invItems,
      Dummy: dummy,
    });

    csRef.current.tjsonstring = jsonData;
    csRef.current.tcode = 'DEMO1';
    csRef.current.tucode = '0000';
    csRef.current.trptfilePath = '/reports/InvoiceReport.rpt';
    csRef.current.tDEST = '0';
    csRef.current.showReport();
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDummy([{ Text1: e.target.value }]);
  };

  return (
    <div>
      <p>Sample3</p>

      <label>Customer</label>
      <br />
      <input type="text" value={dummy[0]?.Text1 || ''} onChange={handleCustomerChange} />
      <br />

      <div className="table-container">
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {invItems.map((item, index) => (
              <tr key={index}>
                <td>{item.Code}</td>
                <td>{item.Name}</td>
                <td className="right-align">{item.Amount}</td>
                <td className="right-align">{item.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={showReport}>Print</button>
    </div>
  );
};

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export default SampleR3;

