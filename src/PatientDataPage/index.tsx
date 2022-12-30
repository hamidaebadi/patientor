import axios from "axios";
import React from "react";
import { Patient, Diagnosis, newEntryRecord, Entry } from "../types";
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientData, setDiagnosisData, addNewEntry } from "../state";
import EntryDetails from "../components/EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";

const PatientDataPage = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [{patientData}, dispatch] = useStateValue();
    const {id} = useParams<{id: string}>();

    const closeModal = (): void => {
        setModalOpen(false);
      };
    const openModal = (): void => setModalOpen(true);

 
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
    

    const submitNewEntry = async(values: newEntryRecord) =>{
        try{
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const {data: newEntry} = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientData?.id}/entries`,
            values);
            dispatch(addNewEntry(newEntry));
            closeModal();
        }catch(e: unknown){
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
              } else {
                console.error("Unknown error", e);
              }
        }
    };

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
        <br />
        <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        />
        <Button variant="contained" onClick={() => openModal()}>
        Add New Occupational healthcare Entry
        </Button>
        </>
    );
};

export default PatientDataPage;
