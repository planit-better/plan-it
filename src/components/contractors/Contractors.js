/*jshint esversion: 6*/

import React from 'react';

const Contractor = ({contractors}) => (
  <table>
    <tr>
      <th>company_name</th>
      <th>cost</th>
      <th>contact</th>
      <th>date_hired</th>
      <th>deadline</th>
    </tr>
    <tr>
      <td>contractors.company_name</td>
      <td>contractors.cost</td>
      <td>contractors.contact</td>
      <td>contractors.date_hired</td>
      <td>contractors.deadline</td>
    </tr>
  </table>
);

export default Contractor;