import {OccupationalHealthcareEntry} from '../types';
import { useStateValue } from '../state';

const OccupationalEntry = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    const [{diagnosis}, ] = useStateValue();
    return(
        <>
        <div>
            <h4>{entry.date}</h4>
            Descripton: {entry.description}<br />
            Employer name: {entry.employerName}<br/>
            diagnosed by: {entry.specialist}<br/>
            Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}<br />
            Diagnose codes: <br />
            <ul>
                {entry.diagnosisCodes?.map(code => <li key={code}>
                {code} : {diagnosis.find(diagnose => diagnose.code == code)?.name}
                </li>)}
            </ul>
        </div>
        </>
    );
};

export default OccupationalEntry;