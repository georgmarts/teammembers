
const { useState, useEffect } = React;
const femaleProfile = 'femaleProfile.jpg'
const maleProfile = 'maleProfile.jpg';

function App () {

  const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || 'TeamB')

  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeList')) ||
    [{
      id: 1,
      fullName: "Bob Jones",
      designation: "JavaScript Developer",
      gender: "male",
      teamName: "TeamA"
    },
    {
      id: 2,
      fullName: "Jill Bailey",
      designation: "Node Developer",
      gender: "female",
      teamName: "TeamA"
    },
    {
      id: 3,
      fullName: "Gail Shepherd",
      designation: "Java Developer",
      gender: "female",
      teamName: "TeamA"
    },
    {
      id: 4,
      fullName: "Sam Reynolds",
      designation: "React Developer",
      gender: "male",
      teamName: "TeamB"
    },
    {
      id: 5,
      fullName: "David Henry",
      designation: "DotNet Developer",
      gender: "male",
      teamName: "TeamB"
    },
    {
      id: 6,
      fullName: "Sarah Blake",
      designation: "SQL Server DBA",
      gender: "female",
      teamName: "TeamB"
    },
    {
      id: 7,
      fullName: "James Bennet",
      designation: "Angular Developer",
      gender: "male",
      teamName: "TeamC"
    },
    {
      id: 8,
      fullName: "Jessica Faye",
      designation: "API Developer",
      gender: "female",
      teamName: "TeamC"
    },
    {
      id: 9,
      fullName: "Lita Stone",
      designation: "C++ Developer",
      gender: "female",
      teamName: "TeamC"
    },
    {
      id: 10,
      fullName: "Daniel Young",
      designation: "Python Developer",
      gender: "male",
      teamName: "TeamD"
    },
    {
      id: 11,
      fullName: "Adrian Jacobs",
      designation: "Vue Developer",
      gender: "male",
      teamName: "TeamD"
    },
    {
      id: 12,
      fullName: "Devin Monroe",
      designation: "Graphic Designer",
      gender: "male",
      teamName: "TeamD"
    }]);

  useEffect(() => {

    localStorage.setItem('employeeList', JSON.stringify(employees))

  }, [employees])

  useEffect(() => {

    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam))

  }, [selectedTeam])

    function handleTeamSelectionChange(event) {
        setTeam(event.target.value);
    }

    function handleEmployeeCardClick(event){
        const transformedEmployees = employees.map((employee) => employee.id === parseInt(event.currentTarget.id)
                                                  ? (employee.teamName === selectedTeam) ? { ...employee, teamName: '' } : { ...employee, teamName: selectedTeam }
                                                  : employee);
        setEmployees(transformedEmployees);
    }

  return (<div>
    
    <Header selectedTeam = {selectedTeam}
            teamMembersCount = {employees.filter((test) => test.teamName === selectedTeam).length}
  
    />

    <Employees employees = {employees}
               selectedTeam = {selectedTeam}
               handleEmployeeCardClick = {handleEmployeeCardClick}
               handleTeamSelectionChange = {handleTeamSelectionChange}
      />

    <Footer />
    <GroupedTeamMembers  employees={employees}
          selectedTeam={selectedTeam} setTeam={setTeam}/>
  </div>)
  }

const Employees = ({employees, selectedTeam, handleEmployeeCardClick, handleTeamSelectionChange}) => {

    return (
      <main className='container'>

        <div className='row justify-content-center mt-3 mb-3'>
          <div className='col-6'>
          <Teams selectedTeam = {selectedTeam} handleTeamSelectionChange = {handleTeamSelectionChange}
          />
          </div>
        </div>

        <div className='row justify-content-center mt-3 mb-3'>
          <div className='col-8'>
            <div className='card-collection'>
        {
          employees.map((employee) => (
            <div key={employee.id} id={employee.id} className={(employee.teamName === selectedTeam? 'card m-2 standout': 'card m-2')} style={{cursor:'pointer'}} onClick={handleEmployeeCardClick}>

            {(employee.gender === 'male')?<img src={maleProfile} className='card-img-top' />
                                         :<img src={femaleProfile} className='card-img-top' /> 
          
            }

            <div className='card-body'>
              <h5 className='card-title'>Full Name: {employee.fullName}</h5>
              <p className='card-text'><b>Designation:</b> {employee.designation}</p>
            </div>
            </div>
            ))}
            </div>
          </div>
        </div>
      </main>
    )

  }

const Teams = ({selectedTeam, handleTeamSelectionChange}) => {
    return (
      <select className='form-select form-select-lg' value={selectedTeam} onChange={handleTeamSelectionChange}>
            <option value='TeamA'>TeamA</option>
            <option value='TeamB'>TeamB</option>
            <option value='TeamC'>TeamC</option>
            <option value='TeamD'>TeamD</option>
          </select>
    )
}



const Header = ({selectedTeam, teamMembersCount}) => {
  return (
    <div className='container'>
      <div className='row justify-content-center mt-1 mb-4'>
        <div className='col-8'>
          <h1>Team Allocation</h1>
          <h3>{selectedTeam} has {teamMembersCount} {teamMembersCount===1?'member':'members'}</h3>
        </div>
      </div>
    </div>
)
  }

const Footer = () => {

  const today = new Date();

  return (
    <div className='container'>
      <div className='row justify-content-center mt-1 mb-4'>
        <div className='col-8'>
          <h3>{today.getFullYear()}</h3>
        </div>
      </div>
    </div>
  )
}

const GroupedTeamMembers = ({ employees, selectedTeam, setTeam }) => {

  const [groupedEmployees, setGroupedData] = useState(groupTeamMembers());

  function groupTeamMembers() {
    var teams = [];

    var teamAMembers = employees.filter((employee) => employee.teamName === 'TeamA');
    var teamA = { team: 'TeamA', members: teamAMembers, collapsed: selectedTeam === 'TeamA' ? false : true }
    teams.push(teamA);

    var teamBMembers = employees.filter((employee) => employee.teamName === 'TeamB');
    var teamB = { team: 'TeamB', members: teamBMembers, collapsed: selectedTeam === 'TeamB' ? false : true }
    teams.push(teamB);

    var teamCMembers = employees.filter((employee) => employee.teamName === 'TeamC');
    var teamC = { team: 'TeamC', members: teamCMembers, collapsed: selectedTeam === 'TeamC' ? false : true }
    teams.push(teamC);

    var teamDMembers = employees.filter((employee) => employee.teamName === 'TeamD');
    var teamD = { team: 'TeamD', members: teamDMembers, collapsed: selectedTeam === 'TeamD' ? false : true }
    teams.push(teamD);

    return teams;

  }

  function handleTeamClick(event) {
    var transformedGroupData = groupedEmployees.map((groupedData) => groupedData.team === event.currentTarget.id
      ? { ...groupedData, collapsed: !groupedData.collapsed }
      : groupedData);
    setGroupedData(transformedGroupData);
    setTeam(event.currentTarget.id);
  }

  return (
    <main className="container">
      {
        groupedEmployees.map((item) => {
          return (
            <div key={item.team} className='card mt-2' style={{ cursor: "pointer" }}>
              <h4 id={item.team} className="card-header text-secondary bg-white" onClick={handleTeamClick}>
                Team Name: {item.team}
              </h4>
              <div id={"collapse_" + item.team}
                className={item.collapsed === true ? "collapse" : ""}>
                <hr />
                {
                  item.members.map(member => {
                    return (
                      <div className="mt-2">
                        <h5 className="card-title mt-2">
                          <span className="text-dark">Full Name: {member.fullName}</span>
                        </h5>
                        <p>Designation: {member.designation}</p>
                      </div>
                    );
                  })
                }
              </div>
              <hr />
            </div>
          );
        })
      }
    </main>
  )

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
