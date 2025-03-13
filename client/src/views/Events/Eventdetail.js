import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { AppContext } from "../common/AppContext.js";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import BackButton from '../common/BackButton';
import { RiTrophyLine, RiAddCircleLine } from "react-icons/ri";
import { MdOutlinePreview } from "react-icons/md";
import DataTable from '../../components/DataTableNetBase.js';
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Chips } from 'primereact/chips';
import './Events.css'; // Import the custom CSS file

const Eventdetail = () => {
    const { appData } = useContext(AppContext);
    const [event, setEvent] = useState([]);
    const [team, setTeam] = useState([]);
    const [match, setMatch] = useState([]);

    const location = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(location.search);
    const eventid = searchParams.get('eventId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/events/${eventid}`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/eventteams/${eventid}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matches/${eventid}`)
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/teams`)
        .then(response => setAllTeams(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [eventid]);

    const tdRight = {
        textAlign: 'right'
    };

    const handleViewItem = (pushTo) => {
        history.push(pushTo);
    };

    const renderTooltip = (props) => (<Tooltip {...props}>{props.text}</Tooltip>);

    /* ############################################################  */
    /* ### Add Team Dialong ### */
    const [showAddTeam, setShowAddTeam] = useState(false);
    const [allTeams, setAllTeams] = useState([]);

    const [selectedTeams, setSelectedTeams] = useState([]);
    const [chipsValue, setChipsValue] = useState([]);

    const [newTeam, setNewTeam] = useState({
        teamNumber: '',
        nickname: '',
        city: '',
        state_prov: '',
        country: ''
    });

    const handleDropdownChange = (e) => {
        if (e.value && !chipsValue.some(chip => chip.id === e.value)) {
            const selectedTeam = allTeams.find(team => team.id === e.value);
            setChipsValue([...chipsValue, { id: e.value, teamNumber: selectedTeam.teamNumber, nickname: selectedTeam.nickname }]);
        }
        setSelectedTeams(null); // Reset the dropdown selection
    };

    const handleNewTeamChange = (e) => {
        const { name, value } = e.target;
        setNewTeam(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddNewTeam = () => {
        if (newTeam.teamNumber && !chipsValue.some(chip => chip.teamNumber === newTeam.teamNumber)) {
            setChipsValue([...chipsValue, { 
                teamNumber: newTeam.teamNumber,
                nickname: newTeam.nickname,
                city: newTeam.city,
                state_prov: newTeam.state_prov,
                country: newTeam.country
            }]);
            setNewTeam({ teamNumber: '', nickname: '', city: '', state_prov: '', country: '' });
        }
        // setShowAddTeam(false);
    };
    
    const handleAddTeamCancel = () => {  
        setChipsValue([]);
        setNewTeam({ teamNumber: '', nickname: '', city: '', state_prov: '', country: '' });
        setShowAddTeam(false);
    };

    const handleSaveTeams = async () => {
        try {
            const updatedChipsValue = await Promise.all(chipsValue.map(async (chip) => {
                if (!chip.id) {
                    const response = await axios.post(`${APP_DATABASE_URL}/teams`, {
                        teamNumber: chip.teamNumber,
                        nickname: chip.nickname,
                        city: chip.city,
                        state_prov: chip.state_prov,
                        country: chip.country
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    return { ...chip, id: response.data.id };
                }
                return chip;
            }));

            await Promise.all(updatedChipsValue.map(async (chip) => {
                if (!team.some(t => t.id === chip.id)) {
                    await axios.post('http://localhost:3001/api/v1/eventteams', {
                        event_id: eventid,
                        team_id: chip.id
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            }));

            setChipsValue(updatedChipsValue);
            setTeam([...team, ...updatedChipsValue.filter(chip => !team.some(t => t.id === chip.id))]);
            setShowAddTeam(false);
        } catch (error) {
            console.error('Error saving teams:', error);
        }
    };

    const addTeamFooterContent = (
        <>
        <button className="btn btn-success" onClick={handleSaveTeams}>Save</button>&nbsp;
        <button className="btn btn-primary" onClick={() => handleAddTeamCancel()}>Cancel</button>
        
        </>
    );

    const teamItemTemplate = (option) => {
        return (
          <div className="flex align-items-center">
            <div>
              {option.teamNumber} - {option.nickname}
            </div>
          </div>
        );
      };
    
    const teamValueTemplate = (option, props) => {
    if (option) {
        return (
        <div className="flex align-items-center">
            {option.teamNumber} - {option.nickname}
        </div>
        );
    }
    return <span>{props.placeholder}</span>;
    };
    /* ############################################################  */

    /* ############################################################  */
    /* ### Add Match Dialog ### */
    const [showAddMatch, setShowAddMatch] = useState(false);

    const [newMatch, setNewMatch] = useState({
        matchNumber: '',
        matchType: '',
        blueOne: null,
        blueTwo: null,
        blueThree: null,
        redOne: null,
        redTwo: null,
        redThree: null
    });

    const handleMatchDropdownChange = (e, field) => {
        setNewMatch(prevState => ({ ...prevState, [field]: e.value }));
    };

    const isDuplicateTeam = (teamId) => {
        const selectedTeams = [newMatch.blueOne, newMatch.blueTwo, newMatch.blueThree, newMatch.redOne, newMatch.redTwo, newMatch.redThree];
        return selectedTeams.filter(id => id === teamId).length > 1;
    };

    const handleNewMatchChange = (e) => {
        const { name, value } = e.target;
        setNewMatch(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddMatch = () => {
        if (newMatch.matchNumber && 
            newMatch.matchType && 
            newMatch.blueOne && 
            newMatch.blueTwo && 
            newMatch.blueThree && 
            newMatch.redOne && 
            newMatch.redTwo && 
            newMatch.redThree &&
            appData.currentEventKey !== '' &&
            appData.currentEventID !== 0) {
            
            axios.post(`${APP_DATABASE_URL}/match`, 
                {   
                    matchNumber: newMatch.matchNumber,
                    blueScore: 0,
                    redScore: 0,
                    redOneTeamNumber: newMatch.redOne,
                    redTwoTeamNumber: newMatch.redTwo,
                    redThreeTeamNumber: newMatch.redThree,
                    blueOneTeamNumber: newMatch.blueOne,
                    blueTwoTeamNumber: newMatch.blueTwo,
                    blueThreeTeamNumber: newMatch.blueThree,
                    redRankingPoint: 0,
                    blueRankingPoint: 0,
                    matchKey: appData.currentEventKey + '_qm' + newMatch.matchNumber,
                    event_id: appData.currentEventID,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(response => {
                    console.log('Match added successfully:', response.data);
                    setMatch([...match, response.data]);
                    handleAddMatchCancel();
                })
                .catch(error => console.error('Error adding match:', error));
        } else {
            console.error('All fields are required to add a match');
        }
    };

    const handleAddMatchCancel = () => { 
        setNewMatch({ matchNumber: '', matchType: '',  blueOne: null, blueTwo: null, blueThree: null,  redOne: null, redTwo: null, redThree: null });
        setShowAddMatch(false);
    };

    const addMatchFooterContent = (
        <>
        <button className="btn btn-success" onClick={handleAddMatch}>Save</button>&nbsp;
        <button className="btn btn-primary" onClick={() => handleAddMatchCancel()}>Cancel</button>
        
        </>
    );

    const eventKeyText = `Match Type - Ex. qm, sf#m, f#m, etc.  Note: ${appData.currentEventKey}_ and Match Number will be added.`;

    /* ############################################################  */

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h2>{event.name}</h2>
                </Col>
                <hr></hr>
                <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID}; <em><b>{appData.name}</b></em></p>
            </Row>
            <Row>
                <Col md={1}>&nbsp;</Col>
                <Col md={11} style={tdRight}>
                    <Link to={`/eventdata/?eventId=${event.id}`}><button type="button" className="btn btn-primary"><RiTrophyLine /> Pick List</button></Link>
                    &nbsp;
                    <Link to={`/dataimport`}><button type="button" className="btn btn-success"><RiAddCircleLine /> Import Data</button></Link>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <hr></hr>
                </Col>
            </Row>
            <Row>
                {/* #################### Matches #################### */}
                <Col md={7}>
                    <Row>
                        <Col><h2>Matches:</h2></Col>
                        <Col style={tdRight}>
                        <button onClick={() => setShowAddMatch(true)} className="btn btn-success"><RiAddCircleLine /> Add Match</button>
                        <Dialog header="Add Match" visible={showAddMatch} modal footer={addMatchFooterContent} style={{ width: '50vw' }} onHide={() => {if (!showAddMatch) return; setShowAddMatch(false); }}>
                            <Row>
                                <Col md={12}>
                                    <h5>Match Details:</h5>
                                    <form className="was-validated">
                                    <div class="mb-3 mt-3">
                                        <input 
                                            type="text" 
                                            name="matchNumber"
                                            className="form-control"
                                            value={newMatch.matchNumber}
                                            onChange={handleNewMatchChange}
                                            placeholder="Match Number - Ex. 1"
                                            required
                                        />
                                    </div>
                                    <div class="mb-3 mt-3">
                                        <input 
                                            type="text" 
                                            name="matchType"
                                            className="form-control"
                                            value={newMatch.matchType}
                                            onChange={handleNewMatchChange}
                                            placeholder={eventKeyText}
                                            required
                                        />
                                    </div>
                                    </form>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h5>Blue Alliance:</h5>
                                    <Dropdown 
                                        value={newMatch.blueOne} 
                                        onChange={(e) => handleMatchDropdownChange(e, 'blueOne')}
                                        options={team} 
                                        optionLabel="teamNumber"
                                        optionValue="teamNumber"
                                        placeholder="Select Blue 1"
                                        itemTemplate={teamItemTemplate}
                                        valueTemplate={teamValueTemplate}
                                        className={`w-full`} 
                                        filter
                                        {...(isDuplicateTeam(newMatch.blueOne) ? { invalid: true } : {})}
                                    />
                                    <Dropdown 
                                        value={newMatch.blueTwo} 
                                        onChange={(e) => handleMatchDropdownChange(e, 'blueTwo')}
                                        options={team} 
                                        optionLabel="teamNumber"
                                        optionValue="teamNumber"
                                        placeholder="Select Blue 2"
                                        itemTemplate={teamItemTemplate}
                                        valueTemplate={teamValueTemplate}
                                        className={`w-full`}  
                                        filter
                                        {...(isDuplicateTeam(newMatch.blueTwo) ? { invalid: true } : {})}
                                    />
                                    <Dropdown 
                                        value={newMatch.blueThree} 
                                        onChange={(e) => handleMatchDropdownChange(e, 'blueThree')}
                                        options={team} 
                                        optionLabel="teamNumber"
                                        optionValue="teamNumber"
                                        placeholder="Select Blue 3"
                                        itemTemplate={teamItemTemplate}
                                        valueTemplate={teamValueTemplate}
                                        className={`w-full`}  
                                        filter
                                        {...(isDuplicateTeam(newMatch.blueThree) ? { invalid: true } : {})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <h5>Red Alliance:</h5>
                                    <Dropdown 
                                        value={newMatch.redOne} 
                                        onChange={(e) => handleMatchDropdownChange(e, 'redOne')}
                                        options={team} 
                                        optionLabel="teamNumber"
                                        optionValue="teamNumber"
                                        placeholder="Select Red 1"
                                        itemTemplate={teamItemTemplate}
                                        valueTemplate={teamValueTemplate}
                                        className={`w-full`} 
                                        filter
                                        {...(isDuplicateTeam(newMatch.redOne) ? { invalid: true } : {})}
                                    />
                                    <Dropdown 
                                        value={newMatch.redTwo} 
                                        onChange={(e) => handleMatchDropdownChange(e, 'redTwo')}
                                        options={team} 
                                        optionLabel="teamNumber"
                                        optionValue="teamNumber"
                                        placeholder="Select Red 2"
                                        itemTemplate={teamItemTemplate}
                                        valueTemplate={teamValueTemplate}
                                        className={`w-full`} 
                                        filter
                                        {...(isDuplicateTeam(newMatch.redTwo) ? { invalid: true } : {})}
                                    />
                                    <Dropdown 
                                        value={newMatch.redThree} 
                                        onChange={(e) => handleMatchDropdownChange(e, 'redThree')}
                                        options={team} 
                                        optionLabel="teamNumber"
                                        optionValue="teamNumber"
                                        placeholder="Select Red 3"
                                        itemTemplate={teamItemTemplate}
                                        valueTemplate={teamValueTemplate}
                                        className={`w-full`} 
                                        filter
                                        {...(isDuplicateTeam(newMatch.redThree) ? { invalid: true } : {})}
                                    />
                                </Col>
                            </Row>
                        </Dialog>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataTable 
                            data={match} 
                            options={{
                                columns: [
                                    { data: 'matchKey', searchable: false, orderable: false, },
                                    { data: 'matchKey' },
                                    { data: 'blueOneTeamNumber', className: 'bg-primary bg-opacity-10', },
                                    { data: 'blueTwoTeamNumber', className: 'bg-primary bg-opacity-10', },
                                    { data: 'blueThreeTeamNumber', className: 'bg-primary bg-opacity-10', },
                                    { data: 'redOneTeamNumber', className: 'bg-danger bg-opacity-10', },
                                    { data: 'redTwoTeamNumber', className: 'bg-danger bg-opacity-10', },
                                    { data: 'redThreeTeamNumber', className: 'bg-danger bg-opacity-10', },
                                    { data: 'blueScore', searchable: false, orderable: false, },
                                    { data: 'redScore', searchable: false, orderable: false, },
                                ],
                                responsive: true,
                                order: [], // Prevent initial sorting
                                // searching: true,
                                // info: false,
                                // scrollX: true,
                                // scrollY: '50vh',
                                // scrollCollapse: true,
                                // fixedColumns: true,
                                // fixedColumns: {
                                //     leftColumns: 1,
                                //     rightColumns: 1
                                // },
                            }}
                            slots={{
                                0: (data, row) => {
                                    return (
                                        <div onClick={() => handleViewItem(`/matchdetails/?matchId=${row.id}`)}><OverlayTrigger placement="top" overlay={renderTooltip({ text: 'View Match' })}><MdOutlinePreview size='2em' /></OverlayTrigger></div>
                                    );
                                },
                            }}
                            >
                            <thead>
                                    <tr>
                                        <th>View</th>
                                        <th>Match Key</th>
                                        <th>Blue 1</th>
                                        <th>Blue 2</th>
                                        <th>Blue 3</th>
                                        <th>Red 1</th>
                                        <th>Red 2</th>
                                        <th>Red 3</th>
                                        <th>Blue Score</th>
                                        <th>Red Score</th>
                                    </tr>
                            </thead>
                            </DataTable>
                        </Col>
                    </Row>
                </Col>
                {/* #################### Team List #################### */}
                <Col md={5}>
                    <Row>
                        <Col><h2>Team List:</h2></Col>
                        <Col style={tdRight}>
                            <button onClick={() => setShowAddTeam(true)} className="btn btn-success"><RiAddCircleLine /> Add Teams</button>
                            <Dialog header="Add Teams" visible={showAddTeam} modal footer={addTeamFooterContent} style={{ width: '50vw' }} onHide={() => {if (!showAddTeam) return; setShowAddTeam(false); }}>
                                <Row>
                                    <Col md={6}>
                                        <h5>Existing Teams:</h5>
                                        <ListBox 
                                            value={selectedTeams} 
                                            onChange={handleDropdownChange}
                                            options={allTeams} 
                                            optionLabel="teamNumber"
                                            optionValue="id"
                                            placeholder="Select a Team"
                                            itemTemplate={teamItemTemplate}
                                            valueTemplate={teamValueTemplate}
                                            className="w-full" 
                                            listStyle={{ maxHeight: '300px' }}
                                            filter
                                        />
                                        <br />
                                    </Col>
                                    <Col md={6}>   
                                        <form className="was-validated">
                                        <h5>Or Add New Team:</h5>
                                        <div class="mb-3 mt-3">
                                            <input 
                                                type="text" 
                                                name="teamNumber"
                                                className="form-control"
                                                value={newTeam.teamNumber}
                                                onChange={handleNewTeamChange}
                                                placeholder="Team Number - Ex. 3641"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3 mt-3">
                                            <input 
                                                type="text" 
                                                name="nickname"
                                                className="form-control"
                                                value={newTeam.nickname}
                                                onChange={handleNewTeamChange}
                                                placeholder="Nickname - Ex. The Flying Toasters"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3 mt-3">
                                            <input 
                                                type="text" 
                                                name="city"
                                                className="form-control"
                                                value={newTeam.city}
                                                onChange={handleNewTeamChange}
                                                placeholder="City - Ex. South Lyon"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3 mt-3">
                                            <input 
                                                type="text" 
                                                name="state_prov"
                                                className="form-control"
                                                value={newTeam.state_prov}
                                                onChange={handleNewTeamChange}
                                                placeholder="State/Province - Ex. Michigan"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3 mt-3">
                                            <input 
                                                type="text" 
                                                name="country"
                                                className="form-control"
                                                value={newTeam.country}
                                                onChange={handleNewTeamChange}
                                                placeholder="Country - Ex. USA"
                                                required
                                            />
                                        </div>
                                        </form> 
                                        <button className="btn btn-success" onClick={handleAddNewTeam}>Add New Team</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <h5>Selected Teams:</h5>
                                        <Chips 
                                            value={chipsValue} 
                                            onChange={(e) => setChipsValue(e.value)} 
                                            itemTemplate={(item) => <span>{item.teamNumber}</span>} 
                                        />
                                        <br />
                                        {/* {chipsValue ? JSON.stringify(chipsValue) : 'none'} */}
                                    </Col>
                                </Row>
                            </Dialog>
                        </Col>
                    </Row>  
                    <Row>
                        <Col md={12}>
                            <DataTable
                                data={team}
                                options={{
                                    columns: [
                                        { data: 'teamNumber', className: 'text-start' },
                                        { data: 'nickname',  },
                                        { data: 'id', searchable: false, orderable: false, defaultContent: '', className: 'text-end',},
                                    ],
                                    responsive: true,
                                    order: [], // Prevent initial sorting
                                }}
                                slots={{
                                    2: (data, row) => {
                                        return (
                                            <div onClick={() => handleViewItem(`/team/?teamId=${data}`)}><OverlayTrigger placement="top" overlay={renderTooltip({ text: 'View Team' })}><MdOutlinePreview size='2em' /></OverlayTrigger></div>
                                        );
                                    },
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            </DataTable>
                            {/* <p>{JSON.stringify(team)}</p> */}
                        </Col>
                    </Row> 
                </Col>
            </Row>
        </Container>
    );
}

export default Eventdetail;