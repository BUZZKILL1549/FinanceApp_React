import './Dashboard.css';

function Dashboard() {
  return (
    <div>
      <div className="tables">
        <div className="insurance">
          <h2>Insurance Breakdown</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Number of Insurances</th>
                <th>Premiums to be paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hello</td>
                <td>Bye</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="insurance">
          <h2>Investments Breakdown</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Number of Investments</th>
                <th>Premiums to be paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hello</td>
                <td>Bye</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
