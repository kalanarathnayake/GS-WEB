import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default function EditPackage() {
    const [id, setID] = useState(null);
    const [budgetName, setBudgetName] = useState('');
    const [department, setDepartment] = useState('');
    const [cost, setCost] = useState('');


    useEffect(() => {
        console.log("View package is" + localStorage.getItem('Id'));
        setID(localStorage.getItem('Id'))
        setBudgetName(localStorage.getItem('BudgetName'));
        setDepartment(localStorage.getItem('Department'));
        setCost(localStorage.getItem('Cost'));
        console.log("View package id" + setID(localStorage.getItem('Id')));
    }, []);

    const updateAPIData = (e) => {
        e.preventDefault();
        const budget = {
            budgetName: budgetName,
            department: department,
            cost: cost,
        }
        console.log(budget);
        if (budget.budgetName.length <= 3 || !budget.department) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Item length is too short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000
            })
        } else if (budget.cost.length <= 3 || !budget.cost) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid amount',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000
            })
        }
        else if (budget.department.length <= 3 || !budget.department) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Department name is too short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000
            })
        }
        else {

            axios.put(`http://localhost:5000/budget/${id}`, budget)
                .then(res => {

                    console.log(res.status);

                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Budget data has been Updated!!',
                            background: '#fff',
                            showConfirmButton: true,
                            confirmButtonText: 'Okay',
                            confirmButtonColor: '#0712e0',
                            iconColor: '#60e004',
                            timer: 2800000
                        }).then(() => {
                            window.location = '/budget';
                        });

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in updating!',
                            background: '#fff',
                            showConfirmButton: true,
                            confirmButtonText: 'Okay',
                            confirmButtonColor: '#f2220f',
                            iconColor: '#60e004',
                            timer: 2800000
                        })
                    }

                })
        }

    }

    const goBack = () => {
        window.location = "/budget"
    }

    return (
        <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Update Budget Details</p>
                                        <div className="grid grid-cols-1 gap-4 form-group">
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Budget Name
                                                </label>
                                                <input type="text"
                                                    required
                                                    // readOnly
                                                    className="form-control"
                                                    value={budgetName}
                                                    onChange={(e) => setBudgetName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Department
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                />
                                            </div>
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                    Cost
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    value={cost}
                                                    onChange={(e) => setCost(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update" onClick={updateAPIData} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}