export function surveyProcessValidations(values) {
    console.log("surveyProcessValidations" + JSON.stringify(values));

    const errors = {};
    if (!values.SurveyNoOfHeads) {
        errors.SurveyNoOfHeads = "Please enter the No. of Heads";
    }
    if (!values.Remarks) {
        errors.Remarks = "Please enter the General Remarks";
    }  

    return errors;
}
