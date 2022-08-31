import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { MDBContainer } from 'mdb-react-ui-kit';
import logo from '../assets/ff.png'
import { signupSchema } from '../schemas';
import { signUpUser } from '../api/UserAPI';
import {swals, swalse} from '../components/Swal';



const stateSelectItems = [
    {label: 'Alabama', value: 'AL'},
    {label: 'Alaska', value: 'AK'},
    {label: 'American Samoa', value: 'AS'},
    {label: 'Arizona', value: 'AZ'},
    {label: 'Arkansas', value: 'AR'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'Connecticut', value: 'CT'},
    {label: 'Delaware', value: 'DE'},
    {label: 'District Of Columbia', value: 'DC'},
    {label: 'Florida', value: 'FL'},
    {label: 'Georgia', value: 'GA'},
    {label: 'Guam', value: 'GU'},
    {label: 'Hawaii', value: 'HI'},
    {label: 'Idaho', value: 'ID'},
    {label: 'Illinois', value: 'IL'},
    {label: 'Indiana', value: 'IN'},
    {label: 'Iowa', value: 'IA'},
    {label: 'Kansas', value: 'KS'},
    {label: 'Kentucky', value: 'KY'},
    {label: 'Louisiana', value: 'LA'},
    {label: 'Maine', value: 'ME'},
    {label: 'Maryland', value: 'MD'},
    {label: 'Massachusetts', value: 'MA'},
    {label: 'Michigan', value: 'MI'},
    {label: 'Minnesota', value: 'MN'},
    {label: 'Mississippi', value: 'MS'},
    {label: 'Missouri', value: 'MO'},
    {label: 'Montana', value: 'MT'},
    {label: 'Nebraska', value: 'NE'},
    {label: 'Nevada', value: 'NV'},
    {label: 'New Hampshire', value: 'NH'},
    {label: 'New Jersey', value: 'NJ'},
    {label: 'New Mexico', value: 'NM'},
    {label: 'New York', value: 'NY'},
    {label: 'North Carolina', value: 'NC'},
    {label: 'North Dakota', value: 'ND'},
    {label: 'Northern Mariana Islands', value: 'MP'},
    {label: 'Ohio', value: 'OH'},
    {label: 'Oklahoma', value: 'OK'},
    {label: 'Oregon', value: 'OR'},
    {label: 'Pennsylvania', value: 'PA'},
    {label: 'Puerto Rico', value: 'PR'},
    {label: 'Rhode Island', value: 'RI'},
    {label: 'South Carolina', value: 'SC'},
    {label: 'South Dakota', value: 'SD'},
    {label: 'Tennessee', value: 'TN'},
    {label: 'Texas', value: 'TX'},
    {label: 'United States Minor Outlying Islands', value: 'UM'},
    {label: 'Utah', value: 'UT'},
    {label: 'Vermont', value: 'VT'},
    {label: 'Virgin Islands', value: 'VI'},
    {label: 'Virginia', value: 'VA'},
    {label: 'Washington', value: 'WA'},
    {label: 'West Virginia', value: 'WV'},
    {label: 'Wisconsin', value: 'WI'},
    {label: 'Wyoming', value: 'WY'},
];


function FormSignUp(){

    const [formData, setFormData] = useState({});
    const [submit, setSubmit] = useState(false);


    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            zipcode: '',
            state: 'null',
            email: '',
            password: '',
            confirmPassword: '',
            accept: false
        },
        validationSchema: signupSchema,
        onSubmit: (data) => {
            setFormData(data);
            setSubmit(true)
        }
    });

    useEffect( () => {
        if (submit != false){

            let response = signUpUser(formData)
            .then((response) => {
                if (response.data.data === "server error -user already exists !" ) {
                    swalse(response).then( () => {
                        formik.resetForm();
                        window.location.href = "/" })
                } else {
                    swals(response).then( () => {
                        formik.resetForm();
                        window.location.href = "/" })
                }
                    
                
            });
        } 
    }, [submit])

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="error">{formik.errors[name]}</small>;
    };


    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return(
        <MDBContainer className="pb-5">
            <div className="flex align-items-center justify-content-center mt-5 mb-5">
                <div className="p-4 w-50">
                    <div className="flex-column">
                        <div className="text-center mb-5"> 
                            <img src={logo} alt="RB" height={100} className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Please Register</div>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <InputText id="first_name" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur}  className={classNames({ 'input-error': isFormFieldValid('first_name') })} />
                                    <label htmlFor="first_name" className={classNames({ 'input-error': isFormFieldValid('first_name') })}>First Name*</label>
                                </span>
                                {getFormErrorMessage('first_name')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <InputText id="last_name" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ 'input-error': isFormFieldValid('last_name') })} />
                                    <label htmlFor="last_name" className={classNames({ 'input-error': isFormFieldValid('last_name') })}>Last Name*</label>
                                </span>
                                {getFormErrorMessage('last_name')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ 'input-error': isFormFieldValid('username') })} />
                                    <label htmlFor="username" className={classNames({ 'input-error': isFormFieldValid('username') })}>Username*</label>
                                </span>
                                {getFormErrorMessage('username')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <InputText id="zipcode" name="zipcode" value={formik.values.zipcode} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ 'input-error': isFormFieldValid('zipcode') })} />
                                    <label htmlFor="zipcode" className={classNames({ 'input-error': isFormFieldValid('zipcode') })}>Zipcode*</label>
                                </span>
                                {getFormErrorMessage('zipcode')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <Dropdown id="state" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} options={stateSelectItems} optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid('state') })} />
                                    <label htmlFor="state" className={classNames({ 'input-error': isFormFieldValid('state') })}>State or US Territory*</label>
                                </span>
                                {getFormErrorMessage('state')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ 'input-error': isFormFieldValid('email') })} />
                                    <label htmlFor="email" className={classNames({ 'input-error': isFormFieldValid('email') })}>Email*</label>
                                </span>
                                {getFormErrorMessage('email')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} toggleMask
                                        className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                    <label htmlFor="password" className={classNames({ 'input-error': isFormFieldValid('password') })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <div className="field pb-3">
                                <span className="p-float-label">
                                    <Password id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} toggleMask
                                        className={classNames({ 'p-invalid': isFormFieldValid('confirmPassword') })} />
                                    <label htmlFor="confirmPassword" className={classNames({ 'input-error': isFormFieldValid('confirmPassword') })}>Confirm Password*</label>
                                </span>
                                {getFormErrorMessage('confirmPassword')}
                            </div>
                            <div className="field-checkbox pb-2">
                                <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                                <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                            </div>
                            <Button type="submit" label="Submit" style={{ backgroundColor: '#62acee' }} className="text-dark mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </MDBContainer>
    )

}

export default FormSignUp