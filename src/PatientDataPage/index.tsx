import axios from "axios";
import React from "react";
import { Patient } from "../types";
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientData } from "../state";


const PatientDataPage = () => {
    const [{patientData}, dispatch] = useStateValue();

    const {id} = useParams<{id: string}>();
    React.useEffect(() => {
        const fetchPatient = async () => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            console.log(patient);
            dispatch(setPatientData(patient.data));
        };
        void fetchPatient(); 
    }, [dispatch]);
    
    return(
        <>
        <h2>{patientData?.name}</h2>
        <div>
        {patientData?.ssn}<br />
        {patientData?.occupation}<br />
        {patientData?.gender}<br />
        {patientData?.dateOfBirth}
        </div>
        <h3>Entries</h3>
        <div>
            {patientData?.entries?.map(entry => {
                return(
                        <div key={entry.id}>
                        {entry.date}<br />
                        {entry.description}<br />
                        <ul>
                        {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
                        </ul>
                        
                        </div>
        
                    
                );
            })}


        </div>
        
        </>
    );
};

export default PatientDataPage;
