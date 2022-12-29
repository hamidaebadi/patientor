import axios from "axios";
import React from "react";
import { Patient, Diagnosis } from "../types";
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientData, setDiagnosisData } from "../state";
import EntryDetails from "../components/EntryDetails";

const PatientDataPage = () => {
    const [{patientData}, dispatch] = useStateValue();
    const {id} = useParams<{id: string}>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            const diagnosis = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

            dispatch(setPatientData(patient.data));
            dispatch(setDiagnosisData(diagnosis.data));
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
            {patientData?.entries?.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
        </div>
        
        </>
    );
};

export default PatientDataPage;
