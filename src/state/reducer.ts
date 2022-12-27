import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |
    {
      type: "SET_PATIENT_DATA";
      payload: Patient
    }
  ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
     
    case "SET_PATIENT_DATA":
      return{
        ...state,
        patientData: action.payload
      }
    ;
    default:
      return state;
  }
};

//action creators
export const setPatientList = (list: Patient[]): Action => {
  return{
    type: "SET_PATIENT_LIST",
    payload: list
  };
};

export const setPatientData = (patient: Patient): Action => {
  return{
    type: "SET_PATIENT_DATA",
    payload: patient
  };
};

export const addNewPatient = (patient: Patient): Action => {
  return{
    type: "ADD_PATIENT",
    payload: patient
  };
};

