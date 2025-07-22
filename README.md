# crystisReact Example Application

This repository demonstrates how to integrate **Crystal Reports into React applications** using `crystis` for React — a groundbreaking solution for React developers who want to embed professional Crystal Reports directly in their web apps.

About crystis for React
-------------
**crystis**   is a React library that enables developers to display **Crystal Reports** within React applications.
It is the only known global solution that connects Crystal Reports with React, offering seamless integration without requiring Crystal Reports or its runtime to be installed.

✨ **No Additional Installations Required:**  
You **do not need Crystal Reports or Crystal Reports Runtime installed** on your system. All report generation and display is handled by `crystis` itself.

📺 **Live Demo of crystisReact** [here](https://www.siteknower.com/samplesreact).

Features
--------
- Seamlessly display Crystal Reports in React apps.
- Works without Crystal Reports or runtime installed.
- Fully client-side integration.
- Multiple sample components included:
  1. 📄 **Basic Report** (e.g., Customer list)
  3. 🔍 **Sorted and Filtered Report**
  4. 🧾 **Invoice Report** with master-detail data

Getting Started
---------------

✅ Prerequisites
-------------
1. [Node.js](https://nodejs.org/en). and npm
2. [Vite](https://vite.dev/) or any React-compatible build tool
3. Access to an account at [siteknower.com](https://www.siteknower.com) 
   - Use `tcode: "DEMO1"` and `tucode: "0000"` for demo purposes 
   - ree for 30 days
4. No Crystal Reports installation required.


🛠️ Installation
------------
1. Clone this repository:
    ```
   git clone https://github.com/siteknower/crystisReact.git
   cd crystisReact
    ```

3. Install dependencies:
    ```
   npm install  
   npm install crystis-react
   ```

Setting Up crystis in a New Angular Project
-------------------------------------------
1. Add the following to your app.config.ts:
   
   import { provideHttpClient } from '@angular/common/http';  
   export const appConfig: ApplicationConfig = {
       providers: [
         provideHttpClient(),
       ]
   };

3. Place your .rpt files (e.g., CustomerReport1.rpt, InvoiceReport.rpt) in the asset/reports folder.

4. Use the following demo codes for testing:

   this.cs.tcode = "DEMO1";  // your account code  
   this.cs.tucode = "0000";  // your user code

📁 File Placement
-------------
Place your `.rpt` files (e.g., `CustomerReport1.rpt`, `InvoiceReport.rpt`) in:
 ```
 public/reports/
 ```

📄 Quick Start Example
-------------
 ```ts
// Sample2.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Crystal } from 'crystis';

const Sample2 = () => {
  const [users, setUsers] = useState([
    { Id: 'ABDEN', Name: 'Maria Weiss', Town: 'Berlin', Country: 'Germany' },
    { Id: 'AXEIS', Name: 'Pedro Alvarez', Town: 'México D.F.', Country: 'Mexico' },
    { Id: 'BENOI', Name: 'Anna Tóth', Town: 'Szeged', Country: 'Hungary' },
    { Id: 'CAZLE', Name: 'Jan Eriksson', Town: 'Mannheim', Country: 'Sweden' },
    { Id: 'DRFOS', Name: 'Giulia Donatelli', Town: 'Milano', Country: 'Italia' }
  ]);

  const csRef = useRef<Crystal>(new Crystal());

  const showReport = () => {
    const jsonData = JSON.stringify({ Users: users });

    csRef.current.tjsonstring = jsonData;
    csRef.current.tcode = 'DEMO1';
    csRef.current.tucode = '0000';
    csRef.current.trptfilePath = '/reports/CustomerReport1.rpt';
    csRef.current.tDEST = '0'; // 0 = screen, 1 = printer

    csRef.current.showReport();
  };

  return (
    <div>
      <h2>Crystal Report in React</h2>
      <button onClick={showReport}>Show Report</button>
    </div>
  );
};

export default Sample2;
 ```

📂 Configuring MIME Types for .rpt Files
-------------

If `.rpt` files are not loading properly, make sure your server knows how to serve them:

Vite (recommended for React)
-------------
In `vite.config.ts` (if needed, rarely required):
 ``` ts
import { defineConfig } from 'vite';
export default defineConfig({
  base: '/',
});
 ```

 ### **IIS**: Add the `.rpt` MIME type to the `web.config` file:
    ```xml
    <configuration>
      <system.webServer>
        <staticContent>
          <mimeMap fileExtension=".rpt" mimeType="application/octet-stream" />
        </staticContent>
      </system.webServer>
    </configuration>
    ```
### **Apache**: Add the following to your server configuration or `.htaccess` file:
    ```apache
    AddType application/octet-stream .rpt
    ```
### **NGINX**: Add the following to your `mime.types` file or NGINX configuration:
    ```nginx
    types {
        application/octet-stream rpt;
    }
    ```

**Note:** While some servers may handle `.rpt` files without additional configuration, explicitly adding the MIME type ensures compatibility and avoids potential issues.

   
🏃 Running the Application
-----------------------
 ```
npm run dev
 ```
Start the development server:
   ng serve

Visit [http://localhost:5173](http://localhost:5173)  in your browser.

🧪 Components Included
----------------
- `Sample1`: Basic Crystal Report display
- `Sample2`: Sorted and filtered dataset
- `Sample3`: Invoice layout with master-detail JSON

💡 Tips
----------------
- Use `.trptfilePath = '/reports/<YourFile>.rpt'
- For sorting, use:
 ```
csRef.current.tSortField1 = 'Country';
csRef.current.tSortDirection = '1'; // 1 = ascending, 2 = descending
 ```

Repository Usage
----------------
Use this repository to:
- Integrate Crystal Reports into any React project.
- A base for building your own reporting solutions.
- Quickly prototype professional report features.

Advertising crystis
-------------------
This project showcases the **exclusive power** of crystis.
It’s the **only known React-compatible** Crystal Reports solution, enabling advanced reports in modern web apps.

License
-------
This repository is licensed under MIT License (LICENSE).

## About Us
Maintained byaintained by **[Siteknower](https://www.siteknower.com)**.

Visit [contact page](https://www.siteknower.com/contact) for support or inquiries.


