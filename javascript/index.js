// The username and password
let username = 'coalition';
let password = 'skills-test';
let auth = btoa(`${username}:${password}`);

let patient = {};

//Kindly change the patientNumber to access another patient
let patientNumber= 3;
/////////////////////////////////JESSICA/////////////////////

// Authenticate api 
fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
	headers: {
		'Authorization': `Basic ${auth}`
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {

    patient = data[patientNumber];
    document.getElementById('PatientName').innerHTML= patient.name;
    let profilePicture = document.getElementById('ProfilePicture');
    profilePicture.src = patient.profile_picture;
    document.getElementById('dob').innerText = patient.date_of_birth;
    document.getElementById('Gender').innerText = patient.gender;
    document.getElementById('ContactInfo').innerText = patient.phone_number;
    document.getElementById('EmergencyContact').innerText = patient.emergency_contact;
    document.getElementById('InsuranceProvider').innerText = patient.insurance_type;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let ul = document.getElementById('Patients');
        let li = document.createElement('li');
        li.className="list-group-item";
        li.innerHTML = `<div class='row align_rows'><div class='col-sm-3'><img src='${element.profile_picture}' height="30"></div><div class='col-sm'><p style="font-weight:bold;">${element.name}</p><p>${element.gender},${element.age}</p></div><div class='col-sm-1'><a href=''# ><img src='./assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg'></a></div></div>`;
        ul.append(li);
    }

    for (let index = 0; index < patient.lab_results.length; index++) {
        const element = patient.lab_results[index];
        let ul = document.getElementById('LabResults')
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.innerHTML= `<div class="row labResults align_rows">
                                    <div class="col-md">
                                        <p>${element}</p>
                                    </div>
                                    <div class="col-md-2 m-2">
                                        <img src="./assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg" height="15" alt="">
                                    </div>
                                </div>`
        ul.append(li);
    }

    for (let index = 0; index < patient.diagnostic_list.length; index++) {
        const element = patient.diagnostic_list[index];
        p = document.createElement('div')
        p.className = 'row'
        p.innerHTML= `<div id="Diagnosis" class="col-sm m-2">${element.name}</div>
                            <div id="Description" class="col-sm-6 m-2">${element.description}</div>
                            <div id="Status" class="col-sm m-2">${element.status}</div>`
        document.getElementById('DL').append(p)
        }

    //populating the graph with chartjs.org API
    const BloodPressure = document.getElementById('BloodPressure');
    let systolic = [];
    let diastolic = [];
    let months = [];
    let blood_pressure = []

    for (let index = 0; index < patient.diagnosis_history.length; index++) {
         blood_pressure = patient.diagnosis_history[index].blood_pressure;
        
        const month = patient.diagnosis_history[index].month
        systolic[index]=blood_pressure.systolic.value
        diastolic[index]=blood_pressure.diastolic.value
        months[index]=month;

       
    }
    
    months = months.slice(-6,months.length)
    systolic = systolic.slice(-6,systolic.length)
    diastolic = diastolic.slice(-6,diastolic.length)

    new Chart(BloodPressure, {
        type: 'line',
        data: {
        labels: months,
        datasets: [{
            label: 'Systolic',
            data: systolic,
            borderWidth: 1
        },{
            label: 'Diastolic',
            data: diastolic,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });

    let systolic_value = document.getElementById('systolic_value');
    systolic_value.innerHTML = systolic[systolic.length-1];
    let systolic_comment = document.getElementById('systolic_comment');
    systolic_comment.innerHTML = blood_pressure.systolic.levels

    let diastolic_value = document.getElementById('diastolic_value');
    diastolic_value.innerHTML = diastolic[diastolic.length-1];
    let diastolic_comment = document.getElementById('diastolic_comment');
    diastolic_comment.innerHTML = blood_pressure.diastolic.levels


    let respiratory_rate = document.getElementById('respiratory_rate')
    respiratory_rate.innerHTML = patient.diagnosis_history[patient.diagnosis_history.length-1].respiratory_rate.value

    let respiratory_levels = document.getElementById('respiratory_levels');
    respiratory_levels.innerHTML = patient.diagnosis_history[patient.diagnosis_history.length-1].respiratory_rate.levels
    
    let temperature = document.getElementById('temperature')
    temperature.innerHTML = patient.diagnosis_history[patient.diagnosis_history.length-1].temperature.value

    let temperature_levels = document.getElementById('temperature_levels');
    temperature_levels.innerHTML = patient.diagnosis_history[patient.diagnosis_history.length-1].temperature.levels
   
    let heart_rate = document.getElementById('heart_rate')
    heart_rate.innerHTML = patient.diagnosis_history[patient.diagnosis_history.length-1].heart_rate.value

    let heart_rate_levels = document.getElementById('heart_rate_levels');
    heart_rate_levels.innerHTML = patient.diagnosis_history[patient.diagnosis_history.length-1].heart_rate.levels

   

}).catch(function (error) {
	console.warn(error);
});